import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SectionCard from '../components/SectionCard';
import StatCard from '../components/StatCard';
import { colors } from '../theme';
import { stats, recent } from '../data';

export default function DashboardScreen() {
  return (
    <View>
      <Text style={styles.h1}>VoicePay360 Dashboard</Text>
      <Text style={styles.sub}>Live voice commerce, fraud tracking, and accessibility-first payments.</Text>

      <View style={styles.statGrid}>
        {stats.map((s) => (
          <StatCard key={s.label} label={s.label} value={s.value} />
        ))}
      </View>

      <SectionCard title="Recent Transactions">
        {recent.map((item) => (
          <View key={item.id} style={styles.row}>
            <View>
              <Text style={styles.rowTitle}>{item.title}</Text>
              <Text style={styles.rowSub}>{item.subtitle}</Text>
            </View>
            <Text style={[styles.badge, item.status === 'blocked' ? styles.blocked : styles.approved]}>
              {item.status}
            </Text>
          </View>
        ))}
      </SectionCard>
    </View>
  );
}

const styles = StyleSheet.create({
  h1: { fontSize: 28, fontWeight: '800', color: colors.text, marginBottom: 6 },
  sub: { color: colors.subtext, marginBottom: 16, fontSize: 15 },
  statGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rowTitle: { fontSize: 15, fontWeight: '700', color: colors.text },
  rowSub: { color: colors.subtext, marginTop: 2 },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    color: 'white',
    overflow: 'hidden',
    fontSize: 12,
    fontWeight: '700',
  },
  approved: { backgroundColor: colors.success },
  blocked: { backgroundColor: colors.danger },
});