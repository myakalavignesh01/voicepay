import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import SectionCard from '../components/SectionCard';
import { colors } from '../theme';
import { processVoice } from '../api';

const langs = ['en-IN', 'hi-IN', 'te-IN', 'ta-IN', 'kn-IN', 'mr-IN', 'bn-IN', 'gu-IN'];

export default function VoicePayScreen() {
  const [command, setCommand] = useState('Pay ₹500 to Ramesh');
  const [lang, setLang] = useState('en-IN');
  const [output, setOutput] = useState('Tap Process to run the voice pipeline.');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    try {
      const data = await processVoice(command, lang);
      setOutput(JSON.stringify(data, null, 2));
    } catch (e) {
      setOutput('Backend unavailable. Run FastAPI locally or deploy it on Render.');
    }
    setLoading(false);
  };

  return (
    <View>
      <Text style={styles.h1}>Voice Pay</Text>
      <Text style={styles.sub}>Speak naturally in your preferred language.</Text>

      <SectionCard title="Command Input">
        <TextInput
          style={styles.input}
          value={command}
          onChangeText={setCommand}
          multiline
        />
        <View style={styles.langRow}>
          {langs.map((l) => (
            <Pressable
              key={l}
              onPress={() => setLang(l)}
              style={[styles.langChip, lang === l && styles.langChipActive]}
            >
              <Text style={[styles.langText, lang === l && styles.langTextActive]}>{l}</Text>
            </Pressable>
          ))}
        </View>
        <Pressable style={styles.button} onPress={submit}>
          <Text style={styles.buttonText}>{loading ? 'Processing...' : 'Process Command'}</Text>
        </Pressable>
      </SectionCard>

      <SectionCard title="AI Result">
        <Text style={styles.result}>{output}</Text>
      </SectionCard>
    </View>
  );
}

const styles = StyleSheet.create({
  h1: { fontSize: 28, fontWeight: '800', color: colors.text, marginBottom: 6 },
  sub: { color: colors.subtext, marginBottom: 16, fontSize: 15 },
  input: {
    minHeight: 110,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 14,
    backgroundColor: '#fff',
    marginBottom: 14,
  },
  langRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 14 },
  langChip: { paddingHorizontal: 10, paddingVertical: 8, borderRadius: 999, backgroundColor: '#eef2ff' },
  langChipActive: { backgroundColor: colors.primary },
  langText: { fontSize: 12, fontWeight: '700', color: colors.text },
  langTextActive: { color: 'white' },
  button: { backgroundColor: colors.primary, padding: 14, borderRadius: 14, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: '800' },
  result: { fontFamily: 'monospace', color: colors.text, lineHeight: 20 },
});