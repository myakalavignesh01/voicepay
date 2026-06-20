import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, shadow } from '../theme';

export default function StatCard({ label, value }) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow,
  },
  label: { color: colors.subtext, fontSize: 13, marginBottom: 8 },
  value: { color: colors.text, fontSize: 22, fontWeight: '800' },
});
