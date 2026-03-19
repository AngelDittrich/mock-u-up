import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Colors } from '@/constants/theme';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function FormsScreen() {
    const [activeSegment, setActiveSegment] = useState<'Weight' | 'Measurements'>('Weight');

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>Entries</Text>
                    <Text style={styles.subtitle}>Add or edit your training data</Text>
                </View>
            </View>

            <View style={styles.segmentControl}>
                <Button
                    title="Weight"
                    variant={activeSegment === 'Weight' ? 'primary' : 'outline'}
                    style={styles.segmentButton}
                    onPress={() => setActiveSegment('Weight')}
                />
                <Button
                    title="Measurements"
                    variant={activeSegment === 'Measurements' ? 'primary' : 'outline'}
                    style={styles.segmentButton}
                    onPress={() => setActiveSegment('Measurements')}
                />
            </View>

            <Card>
                {activeSegment === 'Weight' ? (
                    <>
                        <Input label="Date" placeholder="YYYY-MM-DD" />
                        <Input label="Weight (kg)" placeholder="e.g. 75.5" keyboardType="numeric" />
                        <Input label="Body Fat (%)" placeholder="e.g. 15" keyboardType="numeric" />
                        <Button title="Save Entry" style={{ marginTop: 16 }} />
                    </>
                ) : (
                    <>
                        <Input label="Date" placeholder="YYYY-MM-DD" />
                        <View style={styles.row}>
                            <View style={styles.flexHalf}><Input label="Arm" keyboardType="numeric" /></View>
                            <View style={styles.flexHalf}><Input label="Chest" keyboardType="numeric" /></View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.flexHalf}><Input label="Leg" keyboardType="numeric" /></View>
                            <View style={styles.flexHalf}><Input label="Calf" keyboardType="numeric" /></View>
                        </View>
                        <Button title="Save Measurements" style={{ marginTop: 16 }} />
                    </>
                )}
            </Card>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.dark.background },
    content: { padding: 24, paddingTop: 60, paddingBottom: 100 },
    header: { marginBottom: 32 },
    title: { fontSize: 36, fontWeight: 'bold', color: Colors.dark.text, marginBottom: 8 },
    subtitle: { fontSize: 16, color: Colors.dark.textMuted },
    segmentControl: { flexDirection: 'row', gap: 12, marginBottom: 24 },
    segmentButton: { flex: 1 },
    row: { flexDirection: 'row', gap: 16 },
    flexHalf: { flex: 1 },
});
