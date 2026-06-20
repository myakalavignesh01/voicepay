import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SectionCard from '../components/SectionCard';
import { colors } from '../theme';
import { contacts } from '../data';

export default function ContactsScreen() {
  return (
    <View>
      <Text style={styles.h1}>Contacts</Text>
      <Text style={styles.sub}>Quick pay with UPI IDs and saved recipients.</Text>

      <SectionCard title="Saved Contacts">
        {contacts.map((c) => (
          <View key={c.id} style={styles.row}>
            <View>
              <Text style={styles.name}>{c.name}</Text>
              <Text style={styles.meta}>{c.upi}</Text>
            </View>
            <Text style={styles.amount}>{c.amount}</Text>
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
  name: { fontWeight: '700', color: colors.text },
  meta: { color: colors.subtext, marginTop: 2 },
  amount: { color: colors.primary, fontWeight: '800' },
});