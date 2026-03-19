import React from 'react';
import { TextInput, StyleSheet, TextInputProps, View, Text } from 'react-native';
import { Colors } from '@/constants/theme';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
}

export function Input({ label, error, style, ...props }: InputProps) {
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                style={[styles.input, error && styles.inputError, style]}
                placeholderTextColor={Colors.dark.textMuted}
                {...props}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        color: Colors.dark.textMuted,
        marginBottom: 8,
        fontSize: 14,
    },
    input: {
        backgroundColor: Colors.dark.background,
        borderWidth: 1,
        borderColor: Colors.dark.border,
        borderRadius: 12,
        color: Colors.dark.text,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
    },
    inputError: {
        borderColor: Colors.dark.danger,
    },
    errorText: {
        color: Colors.dark.danger,
        fontSize: 12,
        marginTop: 4,
    },
});
