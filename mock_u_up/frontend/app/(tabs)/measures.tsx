import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { Colors } from '@/constants/theme';
import { Card } from '@/components/ui/Card';
import { Ruler, Users, Target } from 'phosphor-react-native';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get("window").width;

export default function MeasuresScreen() {
    const chartConfig = {
        backgroundColor: Colors.dark.card,
        backgroundGradientFrom: Colors.dark.card,
        backgroundGradientTo: Colors.dark.card,
        decimalPlaces: 1,
        color: (opacity = 1) => `rgba(38, 198, 218, ${opacity})`,
        labelColor: (opacity = 1) => Colors.dark.textMuted,
        style: { borderRadius: 16 },
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>Body Profile</Text>
                    <Text style={styles.subtitle}>Detailed measurements and skinfolds history</Text>
                </View>
            </View>

            <View style={styles.bentoGrid}>
                <Card style={styles.bentoCard}>
                    <View style={styles.profileIcon}><Ruler size={24} color={Colors.dark.primary} /></View>
                    <Text style={styles.label}>Height</Text>
                    <Text style={styles.value}>176 <Text style={styles.unit}>cm</Text></Text>
                </Card>
                <Card style={styles.bentoCard}>
                    <View style={styles.profileIcon}><Users size={24} color={Colors.dark.primary} /></View>
                    <Text style={styles.label}>Body Type</Text>
                    <Text style={styles.value}>Ectomorph</Text>
                </Card>
                <Card style={styles.bentoCard}>
                    <View style={styles.profileIcon}><Target size={24} color={Colors.dark.primary} /></View>
                    <Text style={styles.label}>Goal</Text>
                    <Text style={styles.value}>Hypertrophy</Text>
                </Card>
            </View>

            <Text style={styles.sectionTitle}>Measurement History</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tableContainer}>
                <View style={styles.table}>
                    <View style={styles.tableHeader}>
                        {['Date', 'Weight', 'Arm', 'Chest', 'Abd', 'Leg', 'Calf'].map((col, idx) => (
                            <Text key={`col-${idx}`} style={styles.th}>{col}</Text>
                        ))}
                    </View>
                    {[1, 2, 3].map(row => (
                        <View key={`row-${row}`} style={styles.tableRow}>
                            <Text style={styles.td}>2026-03-01</Text>
                            <Text style={styles.td}>75.0</Text>
                            <Text style={styles.td}>36.2</Text>
                            <Text style={styles.td}>101</Text>
                            <Text style={styles.td}>82</Text>
                            <Text style={styles.td}>59</Text>
                            <Text style={styles.td}>37</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>

            <Text style={styles.sectionTitle}>Skinfolds (mm)</Text>
            <Card style={styles.chartCardWrapper}>
                <BarChart
                    data={{
                        labels: ["Biceps", "Subscapular", "Crest", "Abs", "Femoral"],
                        datasets: [{ data: [4, 9, 12, 11, 8] }]
                    }}
                    width={screenWidth - 96}
                    height={220}
                    yAxisLabel=""
                    yAxisSuffix=""
                    chartConfig={{
                        ...chartConfig,
                        color: (opacity = 1) => `rgba(94, 106, 210, ${opacity})`
                    }}
                    style={{ marginVertical: 8, borderRadius: 16, marginLeft: -16 }}
                />
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
    bentoGrid: { flexDirection: 'row', gap: 12, marginBottom: 32 },
    bentoCard: { flex: 1, padding: 16, alignItems: 'center' },
    profileIcon: { width: 40, height: 40, backgroundColor: Colors.dark.hover, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
    label: { color: Colors.dark.textMuted, fontSize: 13, marginBottom: 4, textAlign: 'center' },
    value: { color: Colors.dark.text, fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
    unit: { fontSize: 12, color: Colors.dark.textMuted, fontWeight: 'normal' },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', color: Colors.dark.text, marginBottom: 16, marginTop: 8 },
    tableContainer: { backgroundColor: Colors.dark.card, borderRadius: 16, borderWidth: 1, borderColor: Colors.dark.border, marginBottom: 32 },
    table: { minWidth: screenWidth * 1.5, padding: 16 },
    tableHeader: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: Colors.dark.border, paddingBottom: 12, marginBottom: 12 },
    th: { flex: 1, color: Colors.dark.textMuted, fontWeight: '600', fontSize: 13, textTransform: 'uppercase' },
    tableRow: { flexDirection: 'row', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: Colors.dark.border },
    td: { flex: 1, color: Colors.dark.text, fontSize: 14 },
    chartCardWrapper: { marginBottom: 32 },
});
