import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import { challengeService } from '../services/challengeService';
import { Program } from '../types/challenge';

export const ProgramsListScreen = ({ navigation }: any) => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPrograms();
  }, []);

  const loadPrograms = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await challengeService.getPrograms();
      setPrograms(data);
    } catch (error: any) {
      console.error('Error loading programs:', error);
      setError(error.message || 'Failed to load programs');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadPrograms();
    setRefreshing(false);
  };

  const renderProgram = ({ item }: { item: Program }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ProgramDetails', { programId: item.id, programName: item.name })}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.title} numberOfLines={2}>{item.name}</Text>
        <View style={[styles.badge, { backgroundColor: getBadgeColor(item.type) }]}>
          <Text style={styles.badgeText}>{formatType(item.type)}</Text>
        </View>
      </View>

      <Text style={styles.description} numberOfLines={2}>
        {item.description}
      </Text>

      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{item.duration_days}</Text>
          <Text style={styles.statLabel}>Days</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{item.total_lessons}</Text>
          <Text style={styles.statLabel}>Lessons</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{item.total_tests}</Text>
          <Text style={styles.statLabel}>Tests</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{item.participant_count.toLocaleString()}</Text>
          <Text style={styles.statLabel}>Students</Text>
        </View>
      </View>

      {item.avg_progress !== undefined && (
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {item.active_users || 0} active • {item.avg_progress?.toFixed(0)}% avg progress
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const formatType = (type: string) => {
    return type.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'skill_assessment': return '#6366f1';
      case 'invest_challenge': return '#10b981';
      case 'trading_challenge': return '#f59e0b';
      default: return '#8b5cf6';
    }
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4f46e5" />
        <Text style={styles.loadingText}>Loading programs...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>❌ {error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadPrograms}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Challenge Programs</Text>
      <FlatList
        data={programs}
        renderItem={renderProgram}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#4f46e5"
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No programs available</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0e1a',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a0e1a',
  },
  loadingText: {
    color: '#9ca3af',
    marginTop: 16,
    fontSize: 16,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  retryButton: {
    marginTop: 16,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#4f46e5',
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    padding: 20,
    paddingBottom: 10,
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: '#141b2d',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#1a2235',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    marginRight: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  description: {
    color: '#9ca3af',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#1a2235',
    paddingTop: 12,
    marginBottom: 12,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    color: '#4f46e5',
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#6b7280',
    fontSize: 12,
    marginTop: 4,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#1a2235',
    paddingTop: 12,
  },
  footerText: {
    color: '#6b7280',
    fontSize: 12,
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    color: '#9ca3af',
    fontSize: 16,
  },
});
