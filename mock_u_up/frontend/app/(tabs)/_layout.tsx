import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { Colors } from '@/constants/theme';
import { Barbell, ChartLineUp, Lightning, SquaresFour, Notepad } from 'phosphor-react-native';

export default function TabLayout() {
  const colorScheme = 'dark'; // Forcing dark theme for this application

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme].panel,
          borderTopColor: Colors[colorScheme].border,
          elevation: 0, // for Android
          shadowOpacity: 0, // for iOS
          height: Platform.OS === 'ios' ? 88 : 68,
          paddingBottom: Platform.OS === 'ios' ? 28 : 12,
          paddingTop: 12,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => <SquaresFour color={color} size={size} weight="fill" />,
        }}
      />
      <Tabs.Screen
        name="measures"
        options={{
          title: 'Measures',
          tabBarIcon: ({ color, size }) => <ChartLineUp color={color} size={size} weight="fill" />,
        }}
      />
      <Tabs.Screen
        name="forms"
        options={{
          title: 'Entries',
          tabBarIcon: ({ color, size }) => <Notepad color={color} size={size} weight="fill" />,
        }}
      />
      <Tabs.Screen
        name="strength"
        options={{
          title: 'Strength',
          tabBarIcon: ({ color, size }) => <Barbell color={color} size={size} weight="fill" />,
        }}
      />
      <Tabs.Screen
        name="calisthenics"
        options={{
          title: 'Calisthenics',
          tabBarIcon: ({ color, size }) => <Lightning color={color} size={size} weight="fill" />,
        }}
      />
    </Tabs>
  );
}
