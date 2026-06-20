import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SectionCard from '../components/SectionCard';
import { colors } from '../theme';

export default function BiometricsScreen() {
  return (
    <View>
      <Text style={styles.h1}>Voice Biometrics</Text>
      <Text style={styles.sub}>Speaker identity, liveness, and behavioural checks.</Text>

      <SectionCard title="Identity Match">
        <Text style={styles.big}>97.4%</Text>
        <Text style={styles.note}>Voice fingerprint matched successfully.</Text>
      </SectionCard>

      <SectionCard title="Behavioural Signals">
        <Text style={styles.line}>Speaking rate: normal</Text>
        <Text style={styles.line}>Pitch variance: stable</Text>
        <Text style={styles.line}>Anomaly score: low</Text>
      </SectionCard>
    </View>
  );
}

const styles = StyleSheet.create({
  h1: { fontSize: 28, fontWeight: '800', color: colors.text, marginBottom: 6 },
  sub: { color: colors.subtext, marginBottom: 16, fontSize: 15 },
  big: { fontSize: 40, fontWeight: '900', color: colors.primary },
  note: { color: colors.subtext, marginTop: 8 },
  line: { color: colors.text, marginBottom: 8 },
});