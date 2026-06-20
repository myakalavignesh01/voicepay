import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { colors, shadow } from '../theme';

const items = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'voice', label: 'Voice Pay' },
  { key: 'history', label: 'History' },
  { key: 'contacts', label: 'Contacts' },
  { key: 'biometrics', label: 'Biometrics' },
  { key: 'analytics', label: 'Analytics' },
  { key: 'insights', label: 'AI Insights' },
  { key: 'settings', label: 'Settings' },
];

export default function BottomNav({ active, setActive }) {
  return (
    <View style={styles.wrap}>
      {items.map((item) => (
        <Pressable
          key={item.key}
          onPress={() => setActive(item.key)}
          style={[styles.item, active === item.key && styles.active]}
        >
          <Text style={[styles.text, active === item.key && styles.activeText]}>
            {item.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    backgroundColor: colors.card,
    padding: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow,
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: '#f8fafc',
  },
  active: {
    backgroundColor: colors.primary,
  },
  text: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '600',
  },
  activeText: {
    color: 'white',
  },
});