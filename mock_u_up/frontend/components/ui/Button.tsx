import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, ActivityIndicator } from 'react-native';
import { Colors } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    variant?: 'primary' | 'secondary' | 'outline';
    loading?: boolean;
}

export function Button({ title, variant = 'primary', loading, style, ...props }: ButtonProps) {
    const containerStyle = [
        styles.button,
        variant === 'primary' && styles.primary,
        variant === 'secondary' && styles.secondary,
        variant === 'outline' && styles.outline,
        style,
    ];

    const content = (
        <>
            {loading ? (
                <ActivityIndicator color={variant === 'outline' ? Colors.dark.text : '#fff'} />
            ) : (
                <Text
                    style={[
                        styles.text,
                        variant === 'outline' ? styles.textOutline : styles.textPrimary,
                    ]}
                >
                    {title}
                </Text>
            )}
        </>
    );

    if (variant === 'primary') {
        return (
            <TouchableOpacity activeOpacity={0.8} style={style} disabled={loading} {...props}>
                <LinearGradient
                    colors={[Colors.dark.primary, '#4b56b0']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.button}
                >
                    {content}
                </LinearGradient>
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity activeOpacity={0.8} disabled={loading} style={containerStyle} {...props}>
            {content}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    primary: {},
    secondary: {
        backgroundColor: Colors.dark.hover,
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: Colors.dark.border,
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
    },
    textPrimary: {
        color: '#fff',
    },
    textOutline: {
        color: Colors.dark.text,
    },
});
