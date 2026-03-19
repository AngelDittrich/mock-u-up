import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';
import { TrendUp, TrendDown } from 'phosphor-react-native';

interface StatBadgeProps {
    label: string;
    value: string | number;
    unit?: string;
    trend?: 'up' | 'down' | 'neutral';
    trendText?: string;
    icon?: React.ReactNode;
    primary?: boolean;
}

export function StatBadge({ label, value, unit, trend, trendText, icon, primary }: StatBadgeProps) {
    return (
        <View style={styles.container}>
            {icon && <View style={styles.iconContainer}>{icon}</View>}
            <View style={styles.info}>
                <Text style={styles.label}>{label}</Text>
                <View style={styles.valueGroup}>
                    <Text style={styles.value}>{value}</Text>
                    {unit && <Text style={styles.unit}>{unit}</Text>}
                </View>
                {(trend || trendText) && (
                    <View style={styles.trendRow}>
                        {trend === 'up' && <TrendUp size={12} color={Colors.dark.success} />}
                        {trend === 'down' && <TrendDown size={12} color={Colors.dark.danger} />}
                        <Text style={[styles.trendText, trend === 'up' && styles.trendUp, trend === 'down' && styles.trendDown]}>
                            {trendText}
                        </Text>
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
    iconContainer: {
        width: 64,
        height: 64,
        backgroundColor: Colors.dark.background,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    info: {
        flex: 1,
    },
    label: {
        color: Colors.dark.textMuted,
        fontSize: 14,
        marginBottom: 8,
    },
    valueGroup: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 4,
    },
    value: {
        fontSize: 32,
        fontWeight: '700',
        color: Colors.dark.text,
    },
    unit: {
        color: Colors.dark.textMuted,
        fontSize: 16,
    },
    trendRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 4,
    },
    trendText: {
        fontSize: 13,
        color: Colors.dark.textMuted,
    },
    trendUp: {
        color: Colors.dark.success,
    },
    trendDown: {
        color: Colors.dark.danger,
    },
});
