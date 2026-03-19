import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View } from 'react-native';
import { Colors } from '@/constants/theme';
import { Barbell, ChartLineUp, Lightning, SquaresFour, Plus } from 'phosphor-react-native';

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
          title: '',
          tabBarIcon: ({ focused }) => (
            <View style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: focused ? '#5e6ad2' : '#3d448a',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: Platform.OS === 'ios' ? 30 : 40,
              shadowColor: '#5e6ad2',
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.6,
              shadowRadius: 12,
              elevation: 8,
              borderWidth: 4,
              borderColor: Colors[colorScheme].panel,
            }}>
              <Plus color="#fff" size={28} weight="bold" />
            </View>
          ),
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
