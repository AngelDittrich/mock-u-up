import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { Colors } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';

interface CardProps extends ViewProps {
    primary?: boolean;
}

export function Card({ children, style, primary, ...props }: CardProps) {
    if (primary) {
        return (
            <LinearGradient
                colors={['rgba(94, 106, 210, 0.15)', 'rgba(0, 0, 0, 0)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[styles.card, styles.primaryCard, style]}
            >
                {children}
            </LinearGradient>
        );
    }

    return (
        <View style={[styles.card, style]} {...props}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.dark.card,
        borderRadius: 16,
        padding: 24,
        borderWidth: 1,
        borderColor: Colors.dark.border,
    },
    primaryCard: {
        borderColor: Colors.dark.primary,
    },
});
