import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { Colors } from '@/constants/theme';
import { Card } from '@/components/ui/Card';
import { HandFist, PersonArmsSpread, Chair, ArrowUp, Check, Timer } from 'phosphor-react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get("window").width;

export default function CalisthenicsScreen() {
    const chartConfig = {
        backgroundColor: Colors.dark.card,
        backgroundGradientFrom: Colors.dark.card,
        backgroundGradientTo: Colors.dark.card,
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(94, 106, 210, ${opacity})`,
        labelColor: (opacity = 1) => Colors.dark.textMuted,
        style: { borderRadius: 16 },
        propsForDots: { r: "4", strokeWidth: "2", stroke: Colors.dark.card }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>Calisthenics</Text>
                    <Text style={styles.subtitle}>Skill progression and endurance tracking</Text>
                </View>
            </View>

            <View style={styles.bentoGrid}>
                <View style={styles.bentoCol}>
                    <Card style={[styles.calisthenicCard, { height: 160 }]}>
                        <View style={styles.cardHeader}>
                            <View style={styles.iconBox}><HandFist size={24} color={Colors.dark.primary} /></View>
                            <Text style={styles.cardTitle}>Handstand</Text>
                        </View>
                        <View style={styles.metricRow}>
                            <Text style={styles.metricValue}>35</Text>
                            <Text style={styles.metricUnit}>sec</Text>
                        </View>
                        <Timer style={styles.timerIcon} size={24} color={Colors.dark.textMuted} />
                    </Card>

                    <Card style={[styles.calisthenicCard, { height: 160 }]}>
                        <View style={styles.cardHeader}>
                            <View style={styles.iconBox}><PersonArmsSpread size={24} color={Colors.dark.primary} /></View>
                            <Text style={styles.cardTitle}>Push-Ups</Text>
                        </View>
                        <View style={styles.metricRow}>
                            <Text style={styles.metricValue}>40</Text>
                            <Text style={styles.metricUnit}>reps</Text>
                        </View>
                    </Card>
                </View>

                <View style={styles.bentoCol}>
                    <Card style={[styles.calisthenicCard, { height: 102 }]}>
                        <View style={styles.cardHeader}>
                            <View style={styles.iconBox}><Chair size={24} color={Colors.dark.secondary} /></View>
                            <Text style={styles.cardTitle}>L-Sit</Text>
                        </View>
                        <View style={styles.metricRow}>
                            <Text style={styles.metricValue}>15</Text>
                            <Text style={styles.metricUnit}>sec</Text>
                        </View>
                    </Card>

                    <Card style={[styles.calisthenicCard, { height: 102 }]}>
                        <View style={styles.cardHeader}>
                            <View style={styles.iconBox}><ArrowUp size={24} color={Colors.dark.secondary} /></View>
                            <Text style={styles.cardTitle}>Pull-Ups</Text>
                        </View>
                        <View style={styles.metricRow}>
                            <Text style={styles.metricValue}>12</Text>
                            <Text style={styles.metricUnit}>reps</Text>
                        </View>
                    </Card>

                    <Card style={[styles.calisthenicCard, { height: 102 }]}>
                        <View style={styles.cardHeader}>
                            <View style={styles.iconBox}><Check size={24} color={Colors.dark.secondary} /></View>
                            <Text style={styles.cardTitle}>V-Sit</Text>
                        </View>
                        <View style={styles.metricRow}>
                            <Text style={styles.metricValue}>5</Text>
                            <Text style={styles.metricUnit}>sec</Text>
                        </View>
                    </Card>
                </View>
            </View>

            <Text style={styles.sectionTitle}>Progress Tracking</Text>

            <Card style={styles.chartCardWrapper}>
                <Text style={styles.chartTitle}>Handstand Progress</Text>
                <LineChart
                    data={{
                        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                        datasets: [{ data: [5, 10, 15, 20, 25, 30] }]
                    }}
                    width={screenWidth - 96}
                    height={220}
                    yAxisSuffix="s"
                    chartConfig={chartConfig}
                    bezier
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
    bentoCol: { flex: 1, gap: 12 },
    calisthenicCard: { padding: 16, position: 'relative' },
    cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
    iconBox: { width: 36, height: 36, backgroundColor: Colors.dark.hover, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
    cardTitle: { color: Colors.dark.textMuted, fontSize: 14, fontWeight: '600' },
    metricRow: { flexDirection: 'row', alignItems: 'baseline', gap: 4, marginTop: 'auto' },
    metricValue: { color: Colors.dark.text, fontSize: 28, fontWeight: 'bold' },
    metricUnit: { color: Colors.dark.textMuted, fontSize: 14 },
    timerIcon: { position: 'absolute', bottom: 16, right: 16, opacity: 0.5 },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', color: Colors.dark.text, marginBottom: 16, marginTop: 8 },
    chartCardWrapper: { marginBottom: 32 },
    chartTitle: { fontSize: 18, fontWeight: '600', color: Colors.dark.text, marginBottom: 16 },
});
