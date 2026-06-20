import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SectionCard from '../components/SectionCard';
import { colors } from '../theme';

export default function AnalyticsScreen() {
  return (
    <View>
      <Text style={styles.h1}>Analytics</Text>
      <Text style={styles.sub}>Spending trends, budget signals, and fraud insights.</Text>

      <SectionCard title="Budget Forecast">
        <Text style={styles.big}>₹18,400</Text>
        <Text style={styles.note}>Predicted next month spending</Text>
      </SectionCard>

      <SectionCard title="Savings Rate">
        <Text style={styles.big}>22%</Text>
        <Text style={styles.note}>Improving across the last 6 months</Text>
      </SectionCard>
    </View>
  );
}

const styles = StyleSheet.create({
  h1: { fontSize: 28, fontWeight: '800', color: colors.text, marginBottom: 6 },
  sub: { color: colors.subtext, marginBottom: 16, fontSize: 15 },
  big: { fontSize: 36, fontWeight: '900', color: colors.primary },
  note: { color: colors.subtext, marginTop: 8 },
});