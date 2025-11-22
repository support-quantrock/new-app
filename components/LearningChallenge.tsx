import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { BookOpen, CircleCheck as CheckCircle, Crown, Book, ChevronDown, Info } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { router } from 'expo-router';
import { ChallengeInfoModal } from './ChallengeInfoModal';

const TOTAL_DAYS = 28;
const LESSONS_PER_DAY = 4;

const ICON_CONFIG = {
  completedIcon: {
    size: 24,
    color: '#fff',
    fill: '#5b5fff',
    circleSize: 60,
  },
  activeIcon: {
    size: 20,
    color: '#fff',
    circleSize: 60,
  },
  lockedIcon: {
    size: 20,
    color: '#94a3b8',
    circleSize: 60,
  },
};

export default function LearningChallenge() {
  const [selectedDay, setSelectedDay] = useState(1);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set());

  const handleLessonPress = (dayNumber: number, lessonId: number) => {
    router.push(`/lesson-content?day=${dayNumber}&lesson=${lessonId}`);
  };

  const toggleDayExpansion = (dayNumber: number) => {
    setExpandedDays((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(dayNumber)) {
        newSet.delete(dayNumber);
      } else {
        newSet.add(dayNumber);
      }
      return newSet;
    });
  };

  const generateDays = () => {
    const generatedDays = [];
    for (let day = 1; day <= TOTAL_DAYS; day++) {
      const lessons = [];
      for (let lesson = 1; lesson <= LESSONS_PER_DAY; lesson++) {
        if (day === 1) {
          if (lesson <= 3) {
            lessons.push({ id: lesson, completed: true, locked: false });
          } else if (lesson === 4) {
            lessons.push({ id: lesson, completed: false, locked: false, isDaily: true });
          } else {
            lessons.push({ id: lesson, completed: false, locked: true });
          }
        } else {
          lessons.push({ id: lesson, completed: false, locked: true });
        }
      }
      generatedDays.push({ day, lessons });
    }
    return generatedDays;
  };

  const days = generateDays();

  const renderLesson = (lessonData: any, dayNumber: number, lessonIndex: number) => {
    // Odd days (1, 3, 5...) go right to left, Even days (2, 4, 6...) go left to right
    const isOddDay = dayNumber % 2 === 1;
    const isSecondIcon = lessonIndex === 1;
    const isThirdIcon = lessonIndex === 2;
    const isFourthIcon = lessonIndex === 3;
    const isLastLesson = lessonIndex === LESSONS_PER_DAY - 1;

    let extraPadding = {};
    if (isSecondIcon) {
      extraPadding = isOddDay ? { paddingRight: '10%' } : { paddingLeft: '20%' };
    } else if (isThirdIcon) {
      extraPadding = isOddDay ? { paddingRight: '30%' } : { paddingLeft: '30%' };
    } else if (isFourthIcon) {
      extraPadding = isOddDay ? { paddingRight: '60%' } : { paddingLeft: '60%' };
    }

    const lesson = lessonData;
    if (lesson.locked) {
      return (
        <View key={`day-${dayNumber}-lesson-${lessonIndex}`} style={[styles.lessonItem, extraPadding]}>
          <View style={styles.lessonContainer}>
            <View style={[styles.lessonCircle, styles.lessonLocked]}>
              {isLastLesson ? (
                <Crown size={ICON_CONFIG.lockedIcon.size} color={ICON_CONFIG.lockedIcon.color} strokeWidth={2} />
              ) : (
                <BookOpen size={ICON_CONFIG.lockedIcon.size} color={ICON_CONFIG.lockedIcon.color} strokeWidth={2} />
              )}
            </View>
          </View>
        </View>
      );
    }

    if (lesson.completed) {
      return (
        <TouchableOpacity
          key={`day-${dayNumber}-lesson-${lessonIndex}`}
          style={[styles.lessonItem, extraPadding]}
          onPress={() => handleLessonPress(dayNumber, lesson.id)}>
          <View style={styles.lessonContainer}>
            <View style={[
              styles.lessonCircle,
              {
                width: ICON_CONFIG.completedIcon.circleSize,
                height: ICON_CONFIG.completedIcon.circleSize,
                borderRadius: ICON_CONFIG.completedIcon.circleSize / 2,
                backgroundColor: '#5b5fff',
            //    justifyContent: 'center',
             //   alignItems: 'center',
              }
            ]}>
              <CheckCircle
                size={ICON_CONFIG.completedIcon.size}
                color={ICON_CONFIG.completedIcon.color}
                strokeWidth={2}
                fill={ICON_CONFIG.completedIcon.fill}
              />
            </View>
          </View>
        </TouchableOpacity>
      );
    }

    if (lesson.isDaily) {
      return (
        <TouchableOpacity
          key={`day-${dayNumber}-lesson-${lessonIndex}`}
          style={[styles.lessonItem, extraPadding]}
          onPress={() => handleLessonPress(dayNumber, lesson.id)}>
          <View style={styles.lessonContainer}>

            <View style={[styles.lessonCircle, styles.lessonActive]}>
              {isLastLesson ? (
                <Crown size={ICON_CONFIG.activeIcon.size} color={ICON_CONFIG.activeIcon.color} strokeWidth={2} />
              ) : (
                <Book size={ICON_CONFIG.activeIcon.size} color={ICON_CONFIG.activeIcon.color} strokeWidth={2} />
              )}
            </View>
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        key={`day-${dayNumber}-lesson-${lessonIndex}`}
        style={[styles.lessonItem, extraPadding]}
        onPress={() => handleLessonPress(dayNumber, lesson.id)}>
        <View style={styles.lessonContainer}>
          <View style={[styles.lessonCircle, styles.lessonActive]}>
            {isLastLesson ? (
              <Crown size={ICON_CONFIG.activeIcon.size} color={ICON_CONFIG.activeIcon.color} strokeWidth={2} />
            ) : (
              <BookOpen size={ICON_CONFIG.activeIcon.size} color={ICON_CONFIG.activeIcon.color} strokeWidth={2} />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>

          <View style={styles.statsContainer}>

            <View style={styles.statItem}>
              <Text style={styles.statIcon}>💰</Text>
              <Text style={styles.statValue}>$2,198</Text>
            </View>
          </View>
        </View>

      </View>

      <View style={styles.progressSection}>
        <View style={styles.progressBar}>
          {Array.from({ length: 20 }).map((_, index) => (
            <View key={index} style={styles.progressBlockContainer}>
              {index < 1 && (
                <Text style={styles.activeDayNumber}>{index + 1}</Text>
              )}
              <View
                style={[
                  styles.progressBlock,
                  index < 1 && styles.progressBlockFilled,
                ]}
              />
            </View>
          ))}
        </View>
      </View>

      <View style={styles.challengeHeader}>
        <View style={styles.titleRow}>
          <Text style={styles.challengeTitle}>28 day Skill challenge</Text>
          <TouchableOpacity
            style={styles.infoButton}
            onPress={() => setShowInfoModal(true)}
          >
            <Info size={20} color="#60a5fa" strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>

      <ChallengeInfoModal
        visible={showInfoModal}
        onClose={() => setShowInfoModal(false)}
      />

      <ScrollView style={styles.daysScroll} showsVerticalScrollIndicator={false}>
        {days.map((dayData) => (
          <View key={dayData.day} style={styles.daySection}>
            <View style={styles.dayHeaderContainer}>
              <Text style={styles.dayLabel}>Day {String(dayData.day).padStart(2, '0')}</Text>
              <View style={styles.dayObjectiveContainer}>
                <Text style={styles.dayObjective}>Learn the basics</Text>
                <TouchableOpacity
                  style={styles.arrowButton}
                  onPress={() => toggleDayExpansion(dayData.day)}
                >
                  <ChevronDown
                    size={20}
                    color="#6b7280"
                    strokeWidth={2}
                    style={[
                      styles.arrowIcon,
                      expandedDays.has(dayData.day) && styles.arrowIconExpanded
                    ]}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {expandedDays.has(dayData.day) && (
              <View style={styles.dayDetailsContainer}>
                <Text style={styles.dayDetailsText}>
                  Master the fundamentals of trading including buy, sell, and hold decisions.
                </Text>
                <Text style={styles.dayDetailsText}>
                  Understand risk management and develop your trading strategy.
                </Text>
              </View>
            )}
            <View style={styles.dayLine} />

            <View style={styles.lessonsContainer}>
              {dayData.lessons.map((lesson, index) => renderLesson(lesson, dayData.day, index))}
            </View>
          </View>
        ))}

        <LinearGradient
          colors={['#7c3aed', '#5b21b6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.premiumCard}>
          <Text style={styles.premiumTitle}>🔓 Unlock Premium Account</Text>
          <Text style={styles.premiumDescription}>
            Get access to advanced features, exclusive content, and personalized coaching to accelerate your trading journey.
          </Text>

          <View style={styles.premiumFeatures}>
            <View style={styles.premiumFeatureItem}>
              <CheckCircle size={20} color="#fff" strokeWidth={2} />
              <Text style={styles.premiumFeatureText}>Unlimited portfolio sizes</Text>
            </View>
            <View style={styles.premiumFeatureItem}>
              <CheckCircle size={20} color="#fff" strokeWidth={2} />
              <Text style={styles.premiumFeatureText}>Advanced analytics & insights</Text>
            </View>
            <View style={styles.premiumFeatureItem}>
              <CheckCircle size={20} color="#fff" strokeWidth={2} />
              <Text style={styles.premiumFeatureText}>Priority support</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.premiumButton} onPress={() => router.push('/(tabs)')}>
            <Text style={styles.premiumButtonText}>Upgrade Now</Text>
          </TouchableOpacity>
        </LinearGradient>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#000000',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#5b5fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statIcon: {
    fontSize: 20,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  chartIcon: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  candleStick: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'flex-end',
  },
  candle: {
    width: 8,
    borderRadius: 2,
  },
  greenCandle: {
    height: 24,
    backgroundColor: '#10b981',
  },
  redCandle: {
    height: 32,
    backgroundColor: '#ef4444',
  },
  progressSection: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  progressBar: {
    flexDirection: 'row',
    gap: 4,
  },
  progressBlockContainer: {
    flex: 1,
    alignItems: 'center',
  },
  activeDayNumber: {
    fontSize: 12,
    fontWeight: '700',
    color: '#5b5fff',
    marginBottom: 4,
  },
  progressBlock: {
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
  },
  progressBlockFilled: {
    backgroundColor: '#5b5fff',
  },
  challengeHeader: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  challengeTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 16,
    flex: 1,
  },
  infoButton: {
    padding: 8,
    marginBottom: 16,
  },
  daysScroll: {
    flex: 1,
    paddingHorizontal: 20,
  },
  daySection: {
    marginBottom: 32,
  },
  dayHeaderContainer: {
    width: '100%',
    backgroundColor: '#f3f4f6',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dayLabel: {
    fontSize: 18,
    color: '#1f2937',
    fontWeight: '700',
  },
  dayObjectiveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dayObjective: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  arrowButton: {
    padding: 4,
  },
  arrowIcon: {
    transition: 'transform 0.3s',
  },
  arrowIconExpanded: {
    transform: [{ rotate: '180deg' }],
  },
  dayDetailsContainer: {
    backgroundColor: '#f9fafb',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
    gap: 8,
  },
  dayDetailsText: {
    fontSize: 13,
    color: '#4b5563',
    lineHeight: 20,
  },
  dayLine: {
    position: 'absolute',
    left: 0,
    top: 80,
    width: 0,
    height: '100%',
    backgroundColor: 'transparent',
    zIndex: -1,
  },
  lessonsContainer: {
    alignItems: 'center',
    gap: 24,
  },
  lessonItem: {
    width: '100%',
  },
  lessonContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  dailyLessonLabel: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#fff',
    marginBottom: 8,
  },
  dailyLessonText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '600',
  },
  lessonCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  lessonCompleted: {
    backgroundColor: '#5b5fff',
    borderWidth: 3,
    borderTopColor: '#7c7cff',
    borderLeftColor: '#7c7cff',
    borderRightColor: '#3a3acc',
    borderBottomColor: '#3a3acc',
    elevation: 12,
    shadowColor: '#5b5fff',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
  },
  lessonActive: {
    backgroundColor: '#5b5fff',
    borderWidth: 3,
    borderTopColor: '#7c7cff',
    borderLeftColor: '#7c7cff',
    borderRightColor: '#3a3acc',
    borderBottomColor: '#3a3acc',
    elevation: 12,
    shadowColor: '#5b5fff',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
  },
  lessonLocked: {
    backgroundColor: '#e2e8f0',
    borderWidth: 3,
    borderTopColor: '#f1f5f9',
    borderLeftColor: '#f1f5f9',
    borderRightColor: '#cbd5e1',
    borderBottomColor: '#cbd5e1',
    elevation: 4,
    shadowColor: '#94a3b8',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  premiumCard: {
    marginTop: 32,
    marginBottom: 32,
    padding: 24,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(139, 92, 246, 0.5)',
  },
  premiumTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
  },
  premiumDescription: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 20,
    marginBottom: 20,
    textAlign: 'center',
    opacity: 0.9,
  },
  premiumFeatures: {
    marginBottom: 24,
    gap: 12,
  },
  premiumFeatureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  premiumFeatureText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  premiumButton: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
  },
  premiumButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#7c3aed',
  },
});