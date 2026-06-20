import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SectionCard from '../components/SectionCard';
import { colors } from '../theme';
import { insights } from '../data';

export default function InsightsScreen() {
  return (
    <View>
      <Text style={styles.h1}>AI Insights</Text>
      <Text style={styles.sub}>Personalized reminders and optimization ideas.</Text>

      <SectionCard title="Recommendations">
        {insights.map((item, idx) => (
          <Text key={idx} style={styles.item}>• {item}</Text>
        ))}
      </SectionCard>
    </View>
  );
}

const styles = StyleSheet.create({
  h1: { fontSize: 28, fontWeight: '800', color: colors.text, marginBottom: 6 },
  sub: { color: colors.subtext, marginBottom: 16, fontSize: 15 },
  item: { color: colors.text, marginBottom: 10, lineHeight: 20 },
});