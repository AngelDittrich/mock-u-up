import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { Colors } from '@/constants/theme';
import { Card } from '@/components/ui/Card';
import { StatBadge } from '@/components/ui/StatBadge';
import { GradientBar } from '@/components/ui/GradientBar';
import { Scales, Heartbeat, Ruler } from 'phosphor-react-native';
import { LineChart } from 'react-native-chart-kit';

export default function DashboardScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Dashboard</Text>
          <Text style={styles.subtitle}>Overview of your physical evolution</Text>
        </View>
      </View>

      <View style={styles.statsGrid}>
        <Card primary style={styles.cardWrapper}>
          <StatBadge
            label="Current Weight"
            value="75"
            unit="kg"
            trend="up"
            trendText="+1.2kg vs last"
            icon={<Scales size={32} color={Colors.dark.primary} weight="duotone" />}
          />
        </Card>

        <Card style={styles.cardWrapper}>
          <StatBadge
            label="BMI (IMC)"
            value="22.5"
            trendText="Normal"
            icon={<Heartbeat size={32} color={Colors.dark.primary} weight="duotone" />}
          />
        </Card>

        <Card style={styles.cardWrapper}>
          <StatBadge
            label="Key Gains (Last)"
            value="Arm"
            unit="+1cm"
            trend="up"
            icon={<Ruler size={32} color={Colors.dark.primary} weight="duotone" />}
          />
        </Card>
      </View>

      <View style={styles.progressContainer}>
        <GradientBar label="Body Fat" position={3} />
        <GradientBar label="Weight" position={5} />
      </View>

      <Card style={styles.chartCardWrapper}>
        <Text style={styles.chartTitle}>Weight Evolution</Text>
        <LineChart
          data={{
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [
              {
                data: [72, 72.5, 73, 73.8, 74.5, 75],
                color: (opacity = 1) => `rgba(38, 198, 218, ${opacity})`,
              }
            ]
          }}
          width={Dimensions.get("window").width - 96} // from padding 24 on sides and card padding 24
          height={220}
          yAxisSuffix="kg"
          chartConfig={{
            backgroundColor: Colors.dark.card,
            backgroundGradientFrom: Colors.dark.card,
            backgroundGradientTo: Colors.dark.card,
            decimalPlaces: 1,
            color: (opacity = 1) => Colors.dark.textMuted,
            labelColor: (opacity = 1) => Colors.dark.textMuted,
            style: { borderRadius: 16 },
            propsForDots: {
              r: "4",
              strokeWidth: "2",
              stroke: Colors.dark.card
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
            marginLeft: -16
          }}
        />
      </Card>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  content: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 100, // accommodate tab bar
  },
  header: {
    marginBottom: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: Colors.dark.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.dark.textMuted,
  },
  statsGrid: {
    flexDirection: 'column',
    gap: 16,
    marginBottom: 32,
  },
  cardWrapper: {
    marginBottom: 8,
  },
  progressContainer: {
    marginBottom: 16,
  },
  chartCardWrapper: {
    marginTop: 16,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark.text,
    marginBottom: 16,
  },
  chartPlaceholder: {
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 12,
  }
});
