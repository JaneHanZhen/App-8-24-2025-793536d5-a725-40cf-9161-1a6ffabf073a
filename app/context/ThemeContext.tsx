import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';

// Define theme color types
export type ThemeColors = {
  background: string;
  card: string;
  text: string;
  subtitleText: string;
  statusBar: 'light' | 'dark' | 'auto';
  tabBarActive: string;
  tabBarInactive: string;
  headerBackground: string;
  headerTint: string;
};

// Theme definitions
export const themes = {
  light: {
    background: '#f5f5f5',
    card: '#ffffff',
    text: '#333333',
    subtitleText: '#666666',
    statusBar: 'dark' as const,
    tabBarActive: '#3498db',
    tabBarInactive: '#95a5a6',
    headerBackground: '#ffffff',
    headerTint: '#333333',
  },
  dark: {
    background: '#121212',
    card: '#1e1e1e',
    text: '#ffffff',
    subtitleText: '#cccccc',
    statusBar: 'light' as const,
    tabBarActive: '#60a5fa',
    tabBarInactive: '#6b7280',
    headerBackground: '#1e1e1e',
    headerTint: '#ffffff',
  },
};

// Create the context
type ThemeContextType = {
  isDark: boolean;
  colors: ThemeColors;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Provider component
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Get device theme preference
  const deviceTheme = useColorScheme();
  
  // State to track the current theme
  const [isDark, setIsDark] = useState(deviceTheme === 'dark');
  
  // Update theme if device preference changes
  useEffect(() => {
    setIsDark(deviceTheme === 'dark');
  }, [deviceTheme]);
  
  // Get the current theme colors
  const colors = isDark ? themes.dark : themes.light;
  
  // Toggle between light and dark themes
  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };
  
  return (
    <ThemeContext.Provider value={{ isDark, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook to use the theme
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}