import { StyleSheet, Text, View, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function HomeScreen() {
  const { colors, isDark } = useTheme();
  
  // Animation value for the fade-in effect
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  // Start the animation when the component mounts
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, []);

  // Create dynamic styles based on theme
  const dynamicStyles = {
    container: {
      backgroundColor: colors.background,
    },
    card: {
      backgroundColor: colors.card,
    },
    title: {
      color: colors.text,
    },
    subtitle: {
      color: colors.subtitleText,
    },
  };

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <Animated.View 
        style={[
          styles.card,
          dynamicStyles.card,
          {
            opacity: fadeAnim,
            transform: [{
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0]
              })
            }]
          }
        ]}
      >
        <Text style={[styles.title, dynamicStyles.title]}>Hello {isDark ? 'Dark' : 'Light'} World!</Text>
        <Text style={[styles.subtitle, dynamicStyles.subtitle]}>Welcome to my React Native app</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    borderRadius: 15,
    padding: 30,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
  },
});