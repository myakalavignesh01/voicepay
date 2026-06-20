import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import SectionCard from '../components/SectionCard';
import { colors } from '../theme';

export default function SettingsScreen() {
  return (
    <View>
      <Text style={styles.h1}>Settings</Text>
      <Text style={styles.sub}>Control security, reminders, and language preferences.</Text>

      <SectionCard title="Security Toggles">
        <Row label="Biometric auth" value />
        <Row label="Fraud AI" value />
        <Row label="Liveness detection" value />
        <Row label="Smart reminders" value />
        <Row label="Anomaly alerts" value />
      </SectionCard>
    </View>
  );
}

function Row({ label, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Switch value={value} />
    </View>
  );
}

const styles = StyleSheet.create({
  h1: { fontSize: 28, fontWeight: '800', color: colors.text, marginBottom: 6 },
  sub: { color: colors.subtext, marginBottom: 16, fontSize: 15 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.border },
  label: { color: colors.text, fontWeight: '600' },
});