import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { Colors } from '@/constants/theme';
import { Card } from '@/components/ui/Card';
import { LineChart } from 'react-native-chart-kit';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';

const screenWidth = Dimensions.get("window").width;

export default function StrengthScreen() {
    const chartConfig = {
        backgroundColor: Colors.dark.card,
        backgroundGradientFrom: Colors.dark.card,
        backgroundGradientTo: Colors.dark.card,
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(38, 198, 218, ${opacity})`,
        labelColor: (opacity = 1) => Colors.dark.textMuted,
        style: { borderRadius: 16 },
        propsForDots: { r: "4", strokeWidth: "2", stroke: Colors.dark.card }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Animated.View entering={FadeIn.duration(400)} style={styles.header}>
                <View>
                    <Text style={styles.title}>Strength Progress</Text>
                    <Text style={styles.subtitle}>Tracking weights on key compound movements</Text>
                </View>
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(100).duration(500)}>
                <Card style={styles.chartCardWrapper}>
                    <Text style={styles.chartTitle}>Big 3 (Bench, Squat, Deadlift)</Text>
                    <LineChart
                        data={{
                            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                            datasets: [
                                { data: [60, 65, 70, 75, 80, 85], color: (opacity = 1) => `rgba(94, 106, 210, ${opacity})` },
                                { data: [80, 85, 95, 100, 110, 120], color: (opacity = 1) => `rgba(38, 198, 218, ${opacity})` },
                                { data: [100, 110, 120, 130, 140, 150], color: (opacity = 1) => `rgba(255, 112, 67, ${opacity})` }
                            ]
                        }}
                        width={screenWidth - 96}
                        height={220}
                        yAxisSuffix="kg"
                        chartConfig={chartConfig}
                        bezier
                        style={{ marginVertical: 8, borderRadius: 16, marginLeft: -16 }}
                    />
                </Card>
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(200).duration(500)}>
                <Card style={styles.chartCardWrapper}>
                    <Text style={styles.chartTitle}>Accessory Lifts</Text>
                    <LineChart
                        data={{
                            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                            datasets: [
                                { data: [15, 17.5, 20, 20, 22.5, 25], color: (opacity = 1) => `rgba(0, 230, 118, ${opacity})` }
                            ]
                        }}
                        width={screenWidth - 96}
                        height={220}
                        yAxisSuffix="kg"
                        chartConfig={{ ...chartConfig, color: (opacity = 1) => `rgba(0, 230, 118, ${opacity})` }}
                        bezier
                        style={{ marginVertical: 8, borderRadius: 16, marginLeft: -16 }}
                    />
                </Card>
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(300).duration(500)}>
                <Text style={styles.sectionTitle}>Training Log</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tableContainer}>
                    <View style={styles.table}>
                        <View style={styles.tableHeader}>
                            {['Date', 'Military', 'Bench', 'Pull ups', 'Curl', 'Ext', 'Deadlift', 'Squat'].map((col, idx) => (
                                <Text key={`col-${idx}`} style={styles.th}>{col}</Text>
                            ))}
                        </View>
                        {[1, 2, 3].map(row => (
                            <View key={`row-${row}`} style={styles.tableRow}>
                                <Text style={styles.td}>03-01</Text>
                                <Text style={styles.td}>45</Text>
                                <Text style={styles.td}>85</Text>
                                <Text style={styles.td}>12</Text>
                                <Text style={styles.td}>25</Text>
                                <Text style={styles.td}>30</Text>
                                <Text style={styles.td}>150</Text>
                                <Text style={styles.td}>120</Text>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </Animated.View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.dark.background },
    content: { padding: 24, paddingTop: 60, paddingBottom: 100 },
    header: { marginBottom: 32 },
    title: { fontSize: 36, fontWeight: 'bold', color: Colors.dark.text, marginBottom: 8 },
    subtitle: { fontSize: 16, color: Colors.dark.textMuted },
    chartCardWrapper: { marginBottom: 32 },
    chartTitle: { fontSize: 18, fontWeight: '600', color: Colors.dark.text, marginBottom: 16 },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', color: Colors.dark.text, marginBottom: 16, marginTop: 8 },
    tableContainer: { backgroundColor: Colors.dark.card, borderRadius: 16, borderWidth: 1, borderColor: Colors.dark.border, marginBottom: 32 },
    table: { minWidth: screenWidth * 1.8, padding: 16 },
    tableHeader: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: Colors.dark.border, paddingBottom: 12, marginBottom: 12 },
    th: { flex: 1, color: Colors.dark.textMuted, fontWeight: '600', fontSize: 13, textTransform: 'uppercase' },
    tableRow: { flexDirection: 'row', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: Colors.dark.border },
    td: { flex: 1, color: Colors.dark.text, fontSize: 14 },
});
