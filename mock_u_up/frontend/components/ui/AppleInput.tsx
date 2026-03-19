import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps } from 'react-native';
import { Colors } from '@/constants/theme';

interface AppleInputProps extends TextInputProps {
    label: string;
}

export function AppleInput({ label, style, ...props }: AppleInputProps) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={[
                    styles.input,
                    isFocused && styles.inputFocused,
                    style
                ]}
                placeholderTextColor="rgba(255,255,255,0.3)"
                onFocus={(e) => {
                    setIsFocused(true);
                    props.onFocus && props.onFocus(e);
                }}
                onBlur={(e) => {
                    setIsFocused(false);
                    props.onBlur && props.onBlur(e);
                }}
                {...props}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        color: Colors.dark.textMuted,
        marginBottom: 8,
        fontWeight: '500',
        marginLeft: 4,
    },
    input: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 16,
        paddingHorizontal: 20,
        paddingVertical: 18,
        color: '#fff',
        fontSize: 16,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    inputFocused: {
        borderColor: Colors.dark.primary,
        backgroundColor: 'rgba(94, 106, 210, 0.08)',
    }
});
