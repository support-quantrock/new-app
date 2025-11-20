import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { challengeService } from '../services/challengeService';
import { API_CONFIG } from '../config/api.config';

export const TestConnectionScreen = () => {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    setResult('🔄 Testing connection...\n');

    try {
      const programs = await challengeService.getPrograms();

      setResult(
        `✅ SUCCESS!\n\n` +
        `Connected to: ${API_CONFIG.BASE_URL}\n\n` +
        `Found ${programs.length} programs:\n\n` +
        programs.map(p => `• ${p.name}\n  Type: ${p.type}\n  Lessons: ${p.total_lessons}\n`).join('\n')
      );
    } catch (error: any) {
      setResult(
        `❌ CONNECTION FAILED!\n\n` +
        `Error: ${error.message}\n\n` +
        `Checklist:\n` +
        `☐ Dashboard running on port 3000?\n` +
        `☐ IP address correct in api.config.ts?\n` +
        `☐ Phone on same WiFi as computer?\n` +
        `☐ Firewall not blocking connection?\n\n` +
        `Current API URL:\n${API_CONFIG.BASE_URL}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>API Connection Test</Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Current Configuration</Text>
          <Text style={styles.infoText}>API URL: {API_CONFIG.BASE_URL}</Text>
          <Text style={styles.infoText}>Timeout: {API_CONFIG.TIMEOUT}ms</Text>
        </View>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={testConnection}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Test Connection</Text>
          )}
        </TouchableOpacity>

        {result ? (
          <View style={styles.resultBox}>
            <Text style={styles.resultText}>{result}</Text>
          </View>
        ) : null}

        <View style={styles.helpBox}>
          <Text style={styles.helpTitle}>💡 Quick Setup:</Text>
          <Text style={styles.helpText}>
            1. Find your IP: Run 'ipconfig' (Windows) or 'ifconfig' (Mac/Linux){'\n'}
            2. Update config/api.config.ts{'\n'}
            3. Ensure dashboard is running{'\n'}
            4. Test connection above
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0e1a',
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  infoBox: {
    backgroundColor: '#141b2d',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#1a2235',
  },
  infoTitle: {
    color: '#4f46e5',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  infoText: {
    color: '#9ca3af',
    fontSize: 12,
    fontFamily: 'monospace',
    marginBottom: 4,
  },
  button: {
    backgroundColor: '#4f46e5',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resultBox: {
    backgroundColor: '#141b2d',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#1a2235',
  },
  resultText: {
    color: '#e5e7eb',
    fontSize: 14,
    fontFamily: 'monospace',
    lineHeight: 20,
  },
  helpBox: {
    backgroundColor: '#0f172a',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  helpTitle: {
    color: '#fbbf24',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  helpText: {
    color: '#94a3b8',
    fontSize: 12,
    lineHeight: 18,
  },
});
