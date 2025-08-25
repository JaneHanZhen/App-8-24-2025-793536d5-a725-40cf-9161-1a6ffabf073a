import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { Switch, View, Text, StyleSheet } from 'react-native';

export default function TabLayout() {
  const { colors, isDark, toggleTheme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.headerBackground,
        },
        headerTintColor: colors.headerTint,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarActiveTintColor: colors.tabBarActive,
        tabBarInactiveTintColor: colors.tabBarInactive,
        tabBarStyle: {
          backgroundColor: colors.headerBackground,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Hello World',
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
          tabBarLabel: 'Home',
          headerRight: () => (
            <View style={styles.themeToggleContainer}>
              <Ionicons name="sunny" size={18} color={colors.headerTint} style={styles.themeIcon} />
              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isDark ? '#60a5fa' : '#f4f3f4'}
              />
              <Ionicons name="moon" size={18} color={colors.headerTint} style={styles.themeIcon} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  themeToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  themeIcon: {
    marginHorizontal: 6,
  }
});