import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';
import { ArrowDown, ArrowUp } from 'phosphor-react-native';

interface GradientBarProps {
    label: string;
    position: number; // 0 to 8
    highLabel?: string;
    lowLabel?: string;
}

export function GradientBar({ label, position, highLabel, lowLabel }: GradientBarProps) {
    const colors = [
        Colors.dark.danger,
        Colors.dark.accent,
        '#ffeb3b', // yellow
        Colors.dark.success,
        Colors.dark.best,
        Colors.dark.success,
        '#ffeb3b', // yellow
        Colors.dark.accent,
        Colors.dark.danger
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.grid}>
                <ArrowDown size={24} color={Colors.dark.textMuted} />
                <View style={styles.barsContainer}>
                    {colors.map((color, index) => (
                        <View key={index} style={[styles.bar, { backgroundColor: color }]} />
                    ))}
                    <View style={[styles.marker, { left: `${(position / 8) * 100}%` }]} />
                </View>
                <ArrowUp size={24} color={Colors.dark.textMuted} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
    },
    label: {
        color: Colors.dark.textMuted,
        marginBottom: 12,
        textAlign: 'center',
        fontSize: 14,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    grid: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.dark.card,
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Colors.dark.border,
        gap: 12,
    },
    barsContainer: {
        flex: 1,
        flexDirection: 'row',
        height: 50,
        gap: 4,
        position: 'relative',
        alignItems: 'center',
    },
    bar: {
        flex: 1,
        height: '100%',
        borderRadius: 6,
        opacity: 0.25, // glassmorphism simulation
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    marker: {
        position: 'absolute',
        width: 8,
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 4,
        shadowColor: Colors.dark.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 5,
        marginLeft: -4, // center the marker
    }
});
