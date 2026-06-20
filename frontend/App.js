import React, { useState } from 'react';
import { SafeAreaView, View, ScrollView, StyleSheet } from 'react-native';
import { colors } from './src/theme';
import BottomNav from './src/components/BottomNav';
import DashboardScreen from './src/screens/DashboardScreen';
import VoicePayScreen from './src/screens/VoicePayScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import ContactsScreen from './src/screens/ContactsScreen';
import BiometricsScreen from './src/screens/BiometricsScreen';
import AnalyticsScreen from './src/screens/AnalyticsScreen';
import InsightsScreen from './src/screens/InsightsScreen';
import SettingsScreen from './src/screens/SettingsScreen';

export default function App() {
  const [active, setActive] = useState('dashboard');

  const renderScreen = () => {
    switch (active) {
      case 'voice': return <VoicePayScreen />;
      case 'history': return <HistoryScreen />;
      case 'contacts': return <ContactsScreen />;
      case 'biometrics': return <BiometricsScreen />;
      case 'analytics': return <AnalyticsScreen />;
      case 'insights': return <InsightsScreen />;
      case 'settings': return <SettingsScreen />;
      default: return <DashboardScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.wrap}>
        {renderScreen()}
        <View style={{ height: 18 }} />
        <BottomNav active={active} setActive={setActive} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  wrap: { padding: 20, paddingBottom: 40 },
});