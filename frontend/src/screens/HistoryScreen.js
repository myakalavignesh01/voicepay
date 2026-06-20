import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SectionCard from '../components/SectionCard';
import { colors } from '../theme';
import { recent } from '../data';

export default function HistoryScreen() {
  return (
    <View>
      <Text style={styles.h1}>History</Text>
      <Text style={styles.sub}>Voice, UPI, bill payments, recurring transfers, and flagged attempts.</Text>

      <SectionCard title="Transaction Log">
        {recent.map((item) => (
          <View key={item.id} style={styles.row}>
            <View>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtxt}>{item.subtitle}</Text>
            </View>
            <Text style={[styles.status, item.status === 'blocked' ? styles.blocked : styles.ok]}>
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
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border },
  title: { fontWeight: '700', color: colors.text },
  subtxt: { color: colors.subtext, marginTop: 2 },
  status: { color: 'white', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6, fontWeight: '700', overflow: 'hidden', fontSize: 12 },
  ok: { backgroundColor: colors.success },
  blocked: { backgroundColor: colors.danger },
});