import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Timer, Check, GraduationCap, ChevronDown, Search, Star, Bell, User, Zap } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { router } from 'expo-router';
import { useChallengeContext } from '@/context/ChallengeContext';

export default function HomeScreen() {
  const { st, setSt } = useChallengeContext();
  const [isFirstCardExpanded, setIsFirstCardExpanded] = useState(false);
  const [isSecondCardExpanded, setIsSecondCardExpanded] = useState(false);
  const [isThirdCardExpanded, setIsThirdCardExpanded] = useState(false);

  const firstCardAnimatedStyle = useAnimatedStyle(() => {
    return {
      maxHeight: withTiming(isFirstCardExpanded ? 2000 : 0, { duration: 300 }),
      opacity: withTiming(isFirstCardExpanded ? 1 : 0, { duration: 300 }),
      overflow: 'hidden',
    };
  });

  const secondCardAnimatedStyle = useAnimatedStyle(() => {
    return {
      maxHeight: withTiming(isSecondCardExpanded ? 2000 : 0, { duration: 300 }),
      opacity: withTiming(isSecondCardExpanded ? 1 : 0, { duration: 300 }),
      overflow: 'hidden',
    };
  });

  const thirdCardAnimatedStyle = useAnimatedStyle(() => {
    return {
      maxHeight: withTiming(isThirdCardExpanded ? 2000 : 0, { duration: 300 }),
      opacity: withTiming(isThirdCardExpanded ? 1 : 0, { duration: 300 }),
      overflow: 'hidden',
    };
  });

  const firstArrowAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: withTiming(isFirstCardExpanded ? '180deg' : '0deg', { duration: 300 }) }],
    };
  });

  const secondArrowAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: withTiming(isSecondCardExpanded ? '180deg' : '0deg', { duration: 300 }) }],
    };
  });

  const thirdArrowAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: withTiming(isThirdCardExpanded ? '180deg' : '0deg', { duration: 300 }) }],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.avatarButton}>
            <View style={styles.avatar}>
              <User size={24} color="#fff" strokeWidth={2} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <Search size={24} color="#fff" strokeWidth={2} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Star size={24} color="#fff" strokeWidth={2} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Bell size={24} color="#fff" strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>

      <View style={styles.card}>
        <LinearGradient
          colors={['#065f46', '#064e3b']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientCard}>
          <View style={[styles.iconContainer, styles.iconContainerGreen]}>
            <Timer size={28} color="#22c55e" strokeWidth={2} />
          </View>

          <Text style={styles.cardTitle}>Learn Challenge</Text>
          <Text style={[styles.cardSubtitle, styles.cardSubtitleGreen]}>Beginners – Free Simulator Training</Text>

          <Text style={[styles.cardDescription, styles.cardDescriptionWhite]}>
            The Learn Challenge is an optional program designed specifically for new users who want to understand the fundamentals of trading and develop essential investment skills step by step. It is ideal for beginners, university students, and high-school learners who wish to practice trading with zero financial risk through a free virtual simulation account.
            {'\n\n'}
            The challenge runs for 28 days of hands-on trading practice and includes daily interactive lessons and exercises that help you strengthen your skills and build a solid investment foundation — all within a safe training environment that closely mirrors real market behavior.
            {'\n\n'}
            This challenge is the perfect starting point for beginners, with the flexibility to move directly to the Invest Challenge at any time.
          </Text>

          <View style={[styles.highlightBox, styles.highlightBoxGreen]}>
            <Text style={styles.highlightTitle}>🎁 Monthly Prizes</Text>
            <Text style={[styles.highlightText, { marginBottom: 12 }]}>
              The winner is announced on the first day of every month and receives:
            </Text>
            <View style={styles.highlightItem}>
              <Check size={16} color="#22c55e" strokeWidth={3} />
              <Text style={styles.highlightText}>Their name listed on the monthly Leaderboard</Text>
            </View>
            <View style={styles.highlightItem}>
              <Check size={16} color="#22c55e" strokeWidth={3} />
              <Text style={styles.highlightText}>One month of free Premium subscription</Text>
            </View>
            <View style={styles.highlightItem}>
              <Check size={16} color="#22c55e" strokeWidth={3} />
              <Text style={styles.highlightText}>Direct nomination to the next stage: the Investment Challenge</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.expandButton}
            onPress={() => setIsFirstCardExpanded(!isFirstCardExpanded)}>
            <Text style={styles.expandButtonText}>📚Challenge Rules:</Text>
            <Animated.View style={firstArrowAnimatedStyle}>
              <ChevronDown size={24} color="#22c55e" strokeWidth={2} />
            </Animated.View>
          </TouchableOpacity>

          <Animated.View style={firstCardAnimatedStyle}>
            <View style={styles.featuresList}>
              <View style={styles.featureItem}>
                <Check size={20} color="#22c55e" strokeWidth={3} />
                <Text style={styles.featureText}>Start anytime</Text>
              </View>

              <View style={styles.featureItem}>
                <Check size={20} color="#22c55e" strokeWidth={3} />
                <Text style={styles.featureText}>28-day duration (can continue indefinitely)
                </Text>
              </View>

              <View style={styles.featureItem}>
                <Check size={20} color="#22c55e" strokeWidth={3} />
                <Text style={styles.featureText}>Complete 28 days of daily skill lessons
                </Text>
              </View>

              <View style={styles.featureItem}>
                <Check size={20} color="#22c55e" strokeWidth={3} />
                <Text style={styles.featureText}>70%+ success rate in daily exercises
                </Text>
              </View>

              <View style={styles.featureItem}>
                <Check size={20} color="#22c55e" strokeWidth={3} />
                <Text style={styles.featureText}>Daily loss limit: 5%
                </Text>
              </View>

              <View style={styles.featureItem}>
                <Check size={20} color="#22c55e" strokeWidth={3} />
                <Text style={styles.featureText}>Total loss limit: 10%
                </Text>
              </View>

              <View style={styles.featureItem}>
                <Check size={20} color="#22c55e" strokeWidth={3} />
                <Text style={styles.featureText}>Target profit threshold: 6%
                </Text>
              </View>

              <View style={styles.featureItem}>
                <Check size={20} color="#22c55e" strokeWidth={3} />
                <Text style={styles.featureText}>Maximum asset weight: 10%

                </Text>
              </View>

              <View style={styles.featureItem}>
                <Check size={20} color="#22c55e" strokeWidth={3} />
                <Text style={styles.featureText}>Minimum trades: 30
                </Text>
              </View>

              <View style={styles.featureItem}>
                <Check size={20} color="#22c55e" strokeWidth={3} />
                <Text style={styles.featureText}>Allowed assets: S&P 500 stocks / Gold / EUR/USD / Bitcoin
                </Text>
              </View>

              <View style={styles.featureItem}>
                <Check size={20} color="#22c55e" strokeWidth={3} />
                <Text style={styles.featureText}>Account leverage: 1:1</Text>
              </View>
            </View>
          </Animated.View>

          <TouchableOpacity style={[styles.button, styles.buttonGreen]} onPress={() => { setSt(1); router.push('/challenge-signup?mode=free'); }}>
            <Text style={styles.buttonText}>Start Learning Challenge</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>

      <View style={styles.card}>
        <LinearGradient
          colors={['#7c3aed', '#4c1d95']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientCard}>
          <View style={[styles.iconContainer, styles.iconContainerPurple]}>
            <Zap size={28} color="#a78bfa" strokeWidth={2} />
          </View>

          <Text style={styles.cardTitle}>Invest Challenge</Text>
          <Text style={[styles.cardSubtitle, styles.cardSubtitlePurple]}>Qualified & Exclusively for Premium Pro Members</Text>

          <Text style={[styles.cardDescription, styles.cardDescriptionWhite]}>
            The Invest Challenge is an advanced, professional-level competition designed for qualified users and Premium Pro members, featuring real monetary rewards. It is tailored for experienced traders who want to enhance their investment capabilities through a high-fidelity simulation that replicates the strategies and workflows of professional investors and hedge funds — without any actual financial risk.
            {'\n\n'}
            Participants manage a $100,000 virtual portfolio in a market environment that mimics real-world conditions 100%, over a 28-day period. Performance is evaluated across several key criteria, including risk management, execution quality, trading discipline, and practical investment skills.
          </Text>

          <View style={[styles.benefitsBox, styles.benefitsBoxPurple]}>
            <Text style={styles.benefitsTitle}>🎁 Monthly Prizes:</Text>
            <Text style={[styles.benefitText, { marginBottom: 12 }]}>
              The winner is announced on the first day of each month and receives:
            </Text>
            <View style={styles.benefitItem}>
              <Check size={16} color="#a78bfa" strokeWidth={3} />
              <Text style={styles.benefitText}>A $1,000 cash prize</Text>
            </View>
            <View style={styles.benefitItem}>
              <Check size={16} color="#a78bfa" strokeWidth={3} />
              <Text style={styles.benefitText}>Their name listed on the Leaderboard</Text>
            </View>
            <View style={styles.benefitItem}>
              <Check size={16} color="#a78bfa" strokeWidth={3} />
              <Text style={styles.benefitText}>One month of free Premium subscription</Text>
            </View>
            <View style={styles.benefitItem}>
              <Check size={16} color="#a78bfa" strokeWidth={3} />
              <Text style={styles.benefitText}>One year of free access to a professional course from Capital Academy</Text>
            </View>

            <Text style={[styles.benefitsTitle, { marginTop: 16 }]}>📌 Premium Pro Membership Benefits</Text>
            <View style={styles.benefitItem}>
              <Check size={16} color="#a78bfa" strokeWidth={3} />
              <Text style={styles.benefitText}>Direct access to the Investment Challenge</Text>
            </View>
            <View style={styles.benefitItem}>
              <Check size={16} color="#a78bfa" strokeWidth={3} />
              <Text style={styles.benefitText}>Real-time analysis of global banks' recommendations</Text>
            </View>
            <View style={styles.benefitItem}>
              <Check size={16} color="#a78bfa" strokeWidth={3} />
              <Text style={styles.benefitText}>Tracking of hedge funds' and top politicians' trades</Text>
            </View>
            <View style={styles.benefitItem}>
              <Check size={16} color="#a78bfa" strokeWidth={3} />
              <Text style={styles.benefitText}>Smart Money Flow – Insight into institutional money movements</Text>
            </View>
            <View style={styles.benefitItem}>
              <Check size={16} color="#a78bfa" strokeWidth={3} />
              <Text style={styles.benefitText}>Comprehensive performance analytics highlighting your strengths and weaknesses</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.expandButton}
            onPress={() => setIsThirdCardExpanded(!isThirdCardExpanded)}>
            <Text style={styles.expandButtonText}>📚 Challenge Rules:</Text>
            <Animated.View style={thirdArrowAnimatedStyle}>
              <ChevronDown size={24} color="#a78bfa" strokeWidth={2} />
            </Animated.View>
          </TouchableOpacity>

          <Animated.View style={thirdCardAnimatedStyle}>
            <View style={styles.featuresList}>
              <View style={styles.featureItem}>
                <Check size={20} color="#a78bfa" strokeWidth={3} />
                <Text style={styles.featureText}>You can start at any time.</Text>
              </View>

              <View style={styles.featureItem}>
                <Check size={20} color="#a78bfa" strokeWidth={3} />
                <Text style={styles.featureText}>Challenge duration: 28 days, and it continues for an unlimited period.</Text>
              </View>

              <View style={styles.featureItem}>
                <Check size={20} color="#a78bfa" strokeWidth={3} />
                <Text style={styles.featureText}>Complete 28 days of daily skill lessons.</Text>
              </View>

              <View style={styles.featureItem}>
                <Check size={20} color="#a78bfa" strokeWidth={3} />
                <Text style={styles.featureText}>Achieve a 70% or higher success rate in the daily exercises.</Text>
              </View>

              <View style={styles.featureItem}>
                <Check size={20} color="#a78bfa" strokeWidth={3} />
                <Text style={styles.featureText}>Daily loss limit: 5%</Text>
              </View>

              <View style={styles.featureItem}>
                <Check size={20} color="#a78bfa" strokeWidth={3} />
                <Text style={styles.featureText}>Total loss limit: 10%</Text>
              </View>

              <View style={styles.featureItem}>
                <Check size={20} color="#a78bfa" strokeWidth={3} />
                <Text style={styles.featureText}>Target profit threshold: Exceed 6%</Text>
              </View>

              <View style={styles.featureItem}>
                <Check size={20} color="#a78bfa" strokeWidth={3} />
                <Text style={styles.featureText}>Maximum weight of any single asset: 10%</Text>
              </View>

              <View style={styles.featureItem}>
                <Check size={20} color="#a78bfa" strokeWidth={3} />
                <Text style={styles.featureText}>Minimum number of trades: 30 trades</Text>
              </View>

              <View style={styles.featureItem}>
                <Check size={20} color="#a78bfa" strokeWidth={3} />
                <Text style={styles.featureText}>Allowed Assets: S&P 500 stocks / Gold / EUR/USD / Bitcoin</Text>
              </View>

              <View style={styles.featureItem}>
                <Check size={20} color="#a78bfa" strokeWidth={3} />
                <Text style={styles.featureText}>Account Leverage: 1:1</Text>
              </View>

              <View style={styles.featureItem}>
                <Check size={20} color="#a78bfa" strokeWidth={3} />
                <Text style={styles.featureText}>Everyone can participate multiple times, while the winner is allowed to rejoin after 90 days.</Text>
              </View>
            </View>
          </Animated.View>

          <TouchableOpacity style={[styles.button, styles.buttonPurple]} onPress={() => { setSt(2); router.push('/challenge-signup'); }}>
            <Text style={styles.buttonText}>Start Investment Challenge</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>

      {/* Third card (Quantrock Skill Challenge) is now accessible via info icon in qchat page */}

      <View style={styles.aboutSection}>
        <Text style={styles.aboutTitle}>About the Challenge</Text>
        <Text style={styles.aboutSubtitle}>
          The largest investment challenge that combines training, competition, and real rewards.
        </Text>
        <Text style={styles.aboutDescription}>
          Quantrock's Investment Simulation Challenge is designed to bridge the gap between academic knowledge and real-world trading practice. It takes you on a 28-day investment journey filled with practical learning, where participants receive daily interactive lessons and exercises aimed at enhancing their trading and investment skills step by step.
          {'\n\n'}
          The challenge offers professionals, beginners, university students, and high-school students a realistic and risk-free experience. You will take on the role of a portfolio manager and executive trader inside a professional simulation environment that reflects the workflow of expert investors and replicates the markets with 100% accuracy.
          {'\n\n'}
          This experience blends hands-on training, real competitive challenges, and tangible rewards—providing a realistic simulation that helps you develop your investment skills, strengthen your practical abilities, and progressively advance toward higher levels of professionalism.
        </Text>
      </View>
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 6,
    backgroundColor: '#0a0a0a',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerLeft: {
    flex: 1,
  },
  avatarButton: {
    width: 40,
    height: 40,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1e3a8a',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#3b82f6',
  },
  headerRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 16,
  },
  iconButton: {
    width: 24,
    height: 24,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingTop: 20,
  },
  card: {
    marginBottom: 24,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  gradientCard: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
    alignSelf: 'center',
  },
  iconContainerGreen: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderColor: 'rgba(34, 197, 94, 0.3)',
  },
  iconContainerBlue: {
    backgroundColor: 'rgba(96, 165, 250, 0.1)',
    borderColor: 'rgba(96, 165, 250, 0.3)',
  },
  iconContainerPurple: {
    backgroundColor: 'rgba(167, 139, 250, 0.1)',
    borderColor: 'rgba(167, 139, 250, 0.3)',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 6,
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#3b82f6',
    marginBottom: 12,
    textAlign: 'center',
  },
  cardSubtitlePurple: {
    color: '#fff',
  },
  cardSubtitleGreen: {
    color: '#fff',
  },
  cardSubtitleBlue: {
    color: '#fff',
  },
  cardDescription: {
    fontSize: 11,
    color: '#94a3b8',
    lineHeight: 17,
    marginBottom: 16,
    textAlign: 'center',
  },
  cardDescriptionWhite: {
    color: '#fff',
  },
  expandButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingVertical: 6,
  },
  expandButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
  },
  featuresList: {
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 11,
    color: '#fff',
    marginLeft: 10,
    fontWeight: '500',
    flex: 1,
    lineHeight: 16,
  },
  button: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#3b82f6',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonGreen: {
    borderColor: '#22c55e',
  },
  buttonBlue: {
    borderColor: '#60a5fa',
  },
  buttonPurple: {
    borderColor: '#a78bfa',
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
  },
  aboutSection: {
    marginTop: 8,
    marginBottom: 32,
    padding: 24,
    backgroundColor: 'rgba(30, 41, 59, 0.4)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
  },
  aboutTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  aboutSubtitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#3b82f6',
    marginBottom: 16,
    lineHeight: 20,
  },
  aboutDescription: {
    fontSize: 11,
    color: '#cbd5e1',
    lineHeight: 18,
    letterSpacing: 0.2,
  },
  highlightBox: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
  },
  highlightBoxGreen: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderColor: 'rgba(34, 197, 94, 0.3)',
  },
  highlightBoxBlue: {
    backgroundColor: 'rgba(96, 165, 250, 0.1)',
    borderColor: 'rgba(96, 165, 250, 0.3)',
  },
  highlightTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  highlightText: {
    fontSize: 11,
    color: '#fff',
    marginLeft: 8,
    fontWeight: '500',
    flex: 1,
    lineHeight: 16,
  },
  benefitsBox: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.3)',
  },
  benefitsBoxPurple: {
    backgroundColor: 'rgba(167, 139, 250, 0.1)',
    borderColor: 'rgba(167, 139, 250, 0.3)',
  },
  benefitsTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  benefitText: {
    fontSize: 11,
    color: '#fff',
    marginLeft: 8,
    fontWeight: '500',
    flex: 1,
    lineHeight: 16,
  },
  joinText: {
    fontSize: 12,
    color: '#22c55e',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 17,
  },
  joinTextPurple: {
    color: '#fff',
  },
  roundsContainer: {
    backgroundColor: 'rgba(167, 139, 250, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(167, 139, 250, 0.3)',
  },
  roundsTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 10,
  },
  roundItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  roundText: {
    fontSize: 11,
    color: '#fff',
    marginLeft: 8,
    fontWeight: '500',
  },
});
