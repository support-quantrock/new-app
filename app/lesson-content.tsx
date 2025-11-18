import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated, Dimensions, PanResponder } from 'react-native';
import { X, TextAlignJustify as AlignJustify, Headphones, Gamepad2, Sparkles, ChevronLeft, Lightbulb } from 'lucide-react-native';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { useState, useRef, useEffect } from 'react';

export default function LessonContent() {
  const params = useLocalSearchParams();
  const day = params.day ? parseInt(params.day as string) : 1;
  const lesson = params.lesson ? parseInt(params.lesson as string) : 1;

  const [step, setStep] = useState(1);
  const [isFlipping, setIsFlipping] = useState(false);
  const [showTails, setShowTails] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const flipAnimation = useRef(new Animated.Value(0)).current;
  const sliderPosition = useRef(new Animated.Value(0)).current;
  const sliderContainerRef = useRef<View>(null);
  const [sliderWidth, setSliderWidth] = useState(0);

  const sliderStartPosition = useRef(0);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      sliderStartPosition.current = (sliderPosition as any)._value || 0;
    },
    onPanResponderMove: (_, gestureState) => {
      if (sliderWidth === 0) return;

      const delta = gestureState.dx;
      const maxPosition = sliderWidth - 48;
      const newPosition = Math.max(0, Math.min(sliderStartPosition.current + delta, maxPosition));
      const percentage = (newPosition / maxPosition) * 100;

      sliderPosition.setValue(newPosition);
      setSliderValue(Math.round(percentage));
    },
    onPanResponderRelease: () => {},
  });

  const handleTap = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      setStep(4);
    } else if (step === 4) {
      setStep(5);
    } else if (step === 5) {
      setStep(6);
    } else if (step === 6) {
      setStep(7);
    } else if (step === 8) {
      setStep(9);
    }
  };

  const handleFlipCoin = () => {
    if (isFlipping) return;

    setIsFlipping(true);
    setShowTails(false);
    flipAnimation.setValue(0);

    Animated.sequence([
      Animated.timing(flipAnimation, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowTails(true);
      setTimeout(() => {
        setStep(4);
        setIsFlipping(false);
      }, 500);
    });
  };

  const renderProgressIndicator = () => {
    if (step === 1) {
      return (
        <View style={styles.progressBar}>
          <View style={styles.progressFill} />
        </View>
      );
    }
    if (step === 2) {
      return (
        <View style={styles.progressIndicator}>
          <View style={styles.progressSegmentFilled} />
          <View style={styles.progressSegmentCurrent} />
          <View style={styles.progressSegmentEmpty} />
        </View>
      );
    }
    if (step === 3) {
      return (
        <View style={styles.progressIndicator}>
          <View style={styles.progressSegmentFilled} />
          <View style={styles.progressSegmentFilled} />
          <View style={styles.progressSegmentCurrent} />
        </View>
      );
    }
    if (step === 4) {
      return (
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '60%' }]} />
        </View>
      );
    }
    if (step === 5) {
      return (
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '70%' }]} />
        </View>
      );
    }
    if (step === 6) {
      return (
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '85%' }]} />
        </View>
      );
    }
    if (step === 7) {
      return (
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '90%' }]} />
        </View>
      );
    }
    return (
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: '100%' }]} />
      </View>
    );
  };

  const renderContent = () => {
    if (day === 1 && lesson === 2 && step === 1) {
      return (
        <>
          <Text style={styles.mainTitle}>Buy, sell, or hold?</Text>

          <Text style={styles.description}>
            Every trader does it. It's always a choice: Buy, Sell, or Hold. In this lesson, you'll learn what to do - and why it matters.
          </Text>

          <View style={styles.icon2ImageContainer}>
            <Image
              source={{ uri: '/assets/d1-2-1.jpeg' }}
              style={styles.icon2Image}
              contentFit="contain"
            />
          </View>
        </>
      );
    }

    if (day === 1 && lesson === 2 && step === 2) {
      return (
        <>
          <Text style={styles.description}>
            It may sound obvious:{'\n'}
            - <Text style={styles.buyText}>Buy</Text> when you believe the price will rise,{'\n'}
            - <Text style={styles.sellText}>Sell</Text> to lock profit or limit loss,{'\n'}
            - <Text style={styles.holdText}>Hold</Text> if you're uncertain - or expect recovery.{'\n'}
            But in trading, timing defines the outcome.
          </Text>

          <View style={styles.icon2ImageContainer}>
            <Image
              source={{ uri: '/assets/d1-2-2.jpeg' }}
              style={styles.icon2Image}
              contentFit="contain"
            />
          </View>
        </>
      );
    }

    if (day === 1 && lesson === 2 && step === 3) {
      return (
        <>
          <Text style={styles.description}>
            So, when do you act? Prices move constantly. To make a decision, traders use analysis, which can be either technical or fundamental. But today, you'll skip the theory and jump right into practice - with me.
          </Text>

          <View style={styles.icon2ImageContainer}>
            <Image
              source={{ uri: '/assets/d1-2-3.jpeg' }}
              style={styles.icon2Image}
              contentFit="contain"
            />
          </View>
        </>
      );
    }

    if (day === 1 && lesson === 2 && step === 4) {
      return (
        <>
          <View style={styles.gameTimeHeader}>
            <Text style={styles.gameTimeIcon}>🎲</Text>
            <Text style={styles.gameTimeText}>GAME TIME</Text>
          </View>

          <Text style={styles.firstTradeTitle}>Your first trade</Text>

          <Text style={styles.description}>
            Coca-Cola is trading at $60. Analysts predict a move to $72. Do you take the setup?
          </Text>

          <View style={styles.chartContainer}>
            <Image
              source={{ uri: '/assets/d1-2-4.svg' }}
              style={styles.chartImage}
              contentFit="contain"
            />
          </View>

          <TouchableOpacity style={styles.buyButton}>
            <Text style={styles.buyButtonText}>BUY</Text>
          </TouchableOpacity>
        </>
      );
    }

    if (day === 1 && lesson === 2 && step === 5) {
      return (
        <>
          <View style={styles.chartContainer}>
            <Image
              source={{ uri: '/assets/d1-2-5.jpeg' }}
              style={styles.volatileChartImage}
              contentFit="contain"
            />
          </View>
        </>
      );
    }

    if (day === 1 && lesson === 2 && step === 6) {
      return (
        <>
          <View style={styles.gameTimeHeader}>
            <Gamepad2 size={20} color="#5b5fff" strokeWidth={2} />
            <Text style={styles.gameTimeText}>GAME TIME</Text>
          </View>

          <Text style={styles.whatNowTitle}>What now?</Text>

          <Text style={styles.description}>
            The stock dipped, then bounced. You're up $2 per share. Many traders exit here. But will you stick to the plan?
          </Text>

          <View style={styles.traderDecisionContainer}>
            <Image
              source={{ uri: '/assets/d1-2-6.jpeg' }}
              style={styles.traderDecisionImage}
              contentFit="contain"
            />
          </View>

          <TouchableOpacity style={styles.holdButton}>
            <Text style={styles.holdButtonText}>HOLD</Text>
          </TouchableOpacity>
        </>
      );
    }

    if (day === 1 && lesson === 2 && step === 7) {
      return (
        <>
          <View style={styles.finalChartContainer}>
            <Image
              source={{ uri: '/assets/d1-2-7.jpeg' }}
              style={styles.finalChartImage}
              contentFit="contain"
            />
          </View>
        </>
      );
    }

    if (day === 1 && lesson === 2 && step === 8) {
      return (
        <>
          <Text style={styles.description}>
            Great job! You made a $12 profit in under 3 minutes. If only trading were always that simple. But what matters is what you just practiced:
          </Text>

          <View style={styles.tradingActionsContainer}>
            <View style={styles.tradingActionRow}>
              <Text style={styles.actionLabel}>-</Text>
              <Text style={styles.actionText}>
                <Text style={styles.buyText}>Buy</Text> = you expect upside
              </Text>
            </View>

            <View style={styles.tradingActionRow}>
              <Text style={styles.actionLabel}>-</Text>
              <Text style={styles.actionText}>
                <Text style={styles.sellText}>Sell</Text> = you lock the result
              </Text>
            </View>

            <View style={styles.tradingActionRow}>
              <Text style={styles.actionLabel}>-</Text>
              <Text style={styles.actionText}>
                <Text style={styles.holdText}>Hold</Text> = you stay exposed
              </Text>
            </View>
          </View>

          <View style={styles.tradingIconsContainer}>
            <Image
              source={{ uri: '/assets/d1-2-8.jpeg' }}
              style={styles.tradingIconsImage}
              contentFit="contain"
            />
          </View>
        </>
      );
    }

    if (day === 1 && lesson === 2 && step === 9) {
      return (
        <>
          <View style={styles.selectMatchHeader}>
            <Sparkles size={20} color="#5b5fff" strokeWidth={2} />
            <Text style={styles.selectMatchText}>SELECT THE MATCH</Text>
          </View>

          <Text style={styles.step9Title}>Practice time!</Text>

          <Text style={styles.description}>
            Match each trading action with what it actually does.
          </Text>

          <View style={styles.matchingGameContainer}>
            <Image
              source={{ uri: '/assets/d1-2-9.jpeg' }}
              style={styles.matchingGameImage}
              contentFit="contain"
            />
          </View>

          <View style={styles.hintContainer}>
            <Lightbulb size={16} color="#5b5fff" strokeWidth={2} />
            <Text style={styles.hintText}>
              Stuck? <Text style={styles.hintLink}>Use a hint</Text>
            </Text>
          </View>
        </>
      );
    }

    if (day === 1 && lesson === 2 && step === 10) {
      return (
        <>
          <Text style={styles.description}>
            Today, you made your first trade decision. You saw a setup, handled the dip, and learned why profits aren't real until they're booked. Next up: the difference between trading and investing.
          </Text>

          <TouchableOpacity style={styles.finishLessonButton}>
            <Text style={styles.finishLessonButtonText}>FINISH LESSON</Text>
          </TouchableOpacity>
        </>
      );
    }

    if (step === 1) {
      return (
        <>
          <Text style={styles.mainTitle}>Hey, future trader!</Text>

          <Text style={styles.description}>
            I'm Ben. Over the next 28 days, I'll guide you through the trading challenge. You'll learn how to think like a trader - one decision at a time.
          </Text>

          <View style={styles.avatarContainer}>
            <Image
              source="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
              style={styles.avatar}
              contentFit="cover"
              transition={200}
            />
          </View>
        </>
      );
    }

    if (step === 2) {
      return (
        <>
          <Text style={styles.mainTitle}>But first, the big question - what is trading?</Text>

          <Text style={styles.description}>
            Trading is the <Text style={styles.bold}>buying</Text> and <Text style={styles.bold}>selling</Text> of assets like stocks, currencies, or crypto. But really, it's about one thing: using price movement to make a profit.
          </Text>

          <View style={styles.illustrationContainer}>
            <View style={styles.iconRow}>
              <View style={styles.casinoIcon}>
                <View style={styles.casinoCircle}>
                  <View style={styles.chip} />
                </View>
                <View style={styles.casinoWindow}>
                  <View style={styles.chartLine} />
                </View>
                <View style={styles.prohibitLine} />
              </View>

              <View style={styles.bookIcon}>
                <View style={styles.book}>
                  <View style={styles.bookCover}>
                    <Text style={styles.dollarSign}>$</Text>
                  </View>
                </View>
                <View style={styles.sparkle1} />
                <View style={styles.sparkle2} />
              </View>
            </View>

            <View style={styles.avatarContainer}>
              <Image
                source="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
                style={styles.avatar}
                contentFit="cover"
                transition={200}
              />
            </View>
          </View>
        </>
      );
    }

    if (step === 3) {
      const rotateY = flipAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '1080deg'],
      });

      return (
        <>
          <View style={styles.gameHeader}>
            <Gamepad2 size={24} color="#5b5fff" strokeWidth={2} />
            <Text style={styles.gameTitle}>GAME TIME</Text>
          </View>

          <Text style={styles.taskTitle}>Your first task</Text>

          <Text style={styles.taskDescription}>
            Flip a coin: if it lands on Tails, you win; Heads, you lose.
          </Text>

          <View style={styles.coinContainer}>
            <Animated.View
              style={[
                styles.coinOuter,
                {
                  transform: [{ rotateY }],
                },
              ]}
            >
              <View style={styles.coinInner}>
                <Text style={styles.coinSymbol}>{showTails ? 'T' : '$'}</Text>
              </View>
            </Animated.View>
          </View>
        </>
      );
    }

    if (step === 4) {
      return (
        <>
          <Text style={styles.resultDescription}>
            Nice, you won this time! Now imagine the coin lands on Heads 60% of the time. That gives you just a 40% chance to win. Would you still play?
          </Text>

          <View style={styles.thinkingAvatarContainer}>
            <Image
              source="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg"
              style={styles.thinkingAvatar}
              contentFit="cover"
              transition={200}
            />
          </View>
        </>
      );
    }

    if (step === 5) {
      return (
        <>
          <Text style={styles.resultDescription}>
            Exactly! Most traders who fail never take the time to learn properly. Trading isn't gambling - it's a skill you can develop with the right approach.
          </Text>

          <View style={styles.thinkingAvatarContainer}>
            <Image
              source="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
              style={styles.thinkingAvatar}
              contentFit="cover"
              transition={200}
            />
          </View>
        </>
      );
    }

    if (step === 6) {
      return (
        <>
          <Text style={styles.step5Title}>
            Over the next 28 days, you'll learn how to:
          </Text>
          <Text style={styles.step5List}>
            - Read charts{'\n'}
            - Spot setups{'\n'}
            - Build your strategy
          </Text>

          <View style={styles.calendarContainer}>
            <View style={styles.calendarHeader}>
              <View style={styles.calendarTab} />
              <View style={styles.calendarTab} />
              <View style={styles.calendarTab} />
            </View>
            <View style={styles.calendarCard}>
              <View style={styles.calendarTopRow}>
                <View style={styles.dayBoxEmpty} />
                <View style={styles.dayBoxEmpty} />
                <View style={styles.dayBoxEmpty} />
                <View style={styles.dayBoxEmpty} />
                <View style={styles.dayBoxEmpty} />
                <View style={styles.dayBoxEmpty} />
                <View style={styles.dayBoxEmpty} />
              </View>

              <View style={styles.calendarRow}>
                <View style={styles.dayBoxHighlighted}>
                  <View style={styles.arrowContainer}>
                    <View style={styles.arrowHead} />
                    <View style={styles.arrowLine} />
                  </View>
                  <Text style={styles.dayNumber}>1</Text>
                </View>
                <View style={styles.dayBoxGreen} />
                <View style={styles.dayBoxGreen} />
                <View style={styles.dayBoxGreen} />
                <View style={styles.dayBoxGreen} />
                <View style={styles.dayBoxGreen} />
                <View style={styles.dayBoxGreen} />
              </View>

              <View style={styles.calendarRow}>
                <View style={styles.dayBoxGreen} />
                <View style={styles.dayBoxGreen} />
                <View style={styles.dayBoxGreen} />
                <View style={styles.dayBoxGreen} />
                <View style={styles.dayBoxGreen} />
                <View style={styles.dayBoxGreen} />
                <View style={styles.dayBoxGreen} />
              </View>

              <View style={styles.calendarRow}>
                <View style={styles.dayBoxGreen} />
                <View style={styles.dayBoxGreen} />
                <View style={styles.dayBoxGreen} />
                <View style={styles.dayBoxGreen} />
                <View style={styles.dayBoxGreen} />
                <View style={styles.dayBoxGreen} />
                <View style={styles.dayBoxGreen} />
              </View>

              <View style={styles.calendarRow}>
                <View style={styles.dayBoxGreen} />
                <View style={styles.dayBoxGreen} />
                <View style={styles.dayBoxGreen} />
                <View style={styles.dayBoxGreen} />
                <View style={styles.dayBoxGreen} />
                <View style={styles.dayBoxGreen} />
                <View style={styles.dayBoxGreen} />
              </View>

              <View style={styles.calendarBottomRow}>
                <View style={styles.dayBox28}>
                  <Text style={styles.dayNumber28}>28</Text>
                </View>
                <View style={styles.dayBoxLight} />
                <View style={styles.dayBoxLight} />
                <View style={styles.dayBoxLight} />
              </View>
            </View>
          </View>
        </>
      );
    }

    if (step === 7) {
      return (
        <>
        <View style={styles.step7Header}>
          <Sparkles size={20} color="#5b5fff" strokeWidth={2} />
          <Text style={styles.step7HeaderText}>SET THE VALUE</Text>
        </View>

        <Text style={styles.step7Title}>Quick check</Text>

        <Text style={styles.step7Description}>
          Most traders start by losing money before they learn. How much do you think you need to start trading?
        </Text>

        <View
          style={styles.sliderContainer}
          ref={sliderContainerRef}
          onLayout={(event) => {
            const { width } = event.nativeEvent.layout;
            setSliderWidth(width);
          }}
        >
          <View style={styles.sliderLabels}>
            <Text style={[styles.sliderLabel, sliderValue >= 0 && styles.sliderLabelActive]}>$0</Text>
            <Text style={[styles.sliderLabel, sliderValue >= 33 && styles.sliderLabelActive]}>$100</Text>
            <Text style={[styles.sliderLabel, sliderValue >= 66 && styles.sliderLabelActive]}>$500</Text>
            <Text style={[styles.sliderLabel, sliderValue >= 99 && styles.sliderLabelActive]}>$1,000</Text>
          </View>

          <View style={styles.sliderTrack}>
            <Animated.View
              style={[
                styles.sliderFilled,
                {
                  width: sliderPosition.interpolate({
                    inputRange: [0, Math.max(1, sliderWidth - 48)],
                    outputRange: ['0%', '100%'],
                    extrapolate: 'clamp',
                  })
                }
              ]}
            />
            <Animated.View
              {...panResponder.panHandlers}
              style={[
                styles.sliderThumbContainer,
                {
                  transform: [{ translateX: sliderPosition }],
                }
              ]}
            >
              <View style={styles.sliderThumb}>
                <View style={styles.sliderThumbInner} />
              </View>
            </Animated.View>
          </View>
        </View>

        <View style={styles.step7Footer}>
          <View style={styles.hintBox}>
            <Lightbulb size={20} color="#5b5fff" strokeWidth={2} />
            <Text style={styles.hintText}>Stuck? <Text style={styles.hintLink}>Use a hint</Text></Text>
          </View>

          <View style={styles.step7Buttons}>
            <TouchableOpacity style={styles.backButton} onPress={() => setStep(6)}>
              <ChevronLeft size={24} color="#1f2937" strokeWidth={2} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.checkButton, sliderValue > 0 && styles.checkButtonActive]}
              disabled={sliderValue === 0}
              onPress={() => setStep(8)}
            >
              <Text style={[styles.checkButtonText, sliderValue > 0 && styles.checkButtonTextActive]}>Check</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
      );
    }

    if (step === 8) {
      return (
        <>
          <Text style={styles.step8Text}>
            You don't need real money to learn how to trade. You can earn 1,000 coins (they're not real) by completing each lesson - and more if you keep up your streak. Use these coins in our simulator. It runs on real market data, and updates live as prices change.
          </Text>

          <View style={styles.step8ImageContainer}>
            <Image
              source="https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg"
              style={styles.step8Image}
              contentFit="contain"
            />
          </View>
        </>
      );
    }

    if (step === 9) {
      return (
        <>
          <Text style={styles.step9Title}>That's it for Lesson 1! Let's recap:</Text>

          <View style={styles.step9List}>
            <Text style={styles.step9ListItem}>- Trading is NOT <Text style={styles.step9Bold}>gambling</Text>,</Text>
            <Text style={styles.step9ListItem}>- Trading is about stacking <Text style={styles.step9Bold}>probabilities</Text>,</Text>
            <Text style={styles.step9ListItem}>- You don't need to risk real money to learn - use the <Text style={styles.step9Bold}>simulator</Text>.</Text>
          </View>

          <Text style={styles.step9NextText}>
            Next up: the 3 core trading decisions every trader makes daily. See you there!
          </Text>

          <View style={styles.step9ButtonContainer}>
            <TouchableOpacity
              style={styles.finishButton}
              onPress={() => router.push('/qchat')}
            >
              <Text style={styles.finishButtonText}>FINISH LESSON</Text>
            </TouchableOpacity>
          </View>
        </>
      );
    }

    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <X size={28} color="#1f2937" strokeWidth={2} />
        </TouchableOpacity>

        <View style={styles.headerRight}>
          {(step === 2 || step === 3) && renderProgressIndicator()}
          <TouchableOpacity style={styles.iconButton}>
            <AlignJustify size={24} color="#fff" strokeWidth={2} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Headphones size={24} color="#1f2937" strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity activeOpacity={1} onPress={handleTap} style={styles.tappableArea} disabled={(day === 1 && lesson === 1 && step === 3) || step === 7}>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false} scrollEnabled={step === 7}>
          {step === 1 && renderProgressIndicator()}
          {step === 4 && renderProgressIndicator()}
          {step === 5 && renderProgressIndicator()}
          {step === 6 && renderProgressIndicator()}
          {step === 7 && renderProgressIndicator()}
          {renderContent()}

          {day === 1 && lesson === 1 && step === 3 && (
            <TouchableOpacity style={styles.flipButton} onPress={handleFlipCoin} disabled={isFlipping}>
              <Text style={styles.flipButtonText}>FLIP COIN</Text>
            </TouchableOpacity>
          )}

          {step !== 3 && step !== 4 && step !== 5 && step !== 6 && step !== 7 && step !== 9 && (
            <View style={styles.bottomNav}>
              <TouchableOpacity style={styles.navButton}>
                <View style={styles.navButtonInner} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.navButton}>
                <View style={styles.navButtonInner} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.navButton}>
                <View style={styles.playButtonOuter}>
                  <View style={styles.playButton} />
                </View>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#f3f4f6',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressIndicator: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  progressSegmentFilled: {
    width: 24,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22c55e',
  },
  progressSegmentCurrent: {
    width: 24,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#84cc16',
  },
  progressSegmentEmpty: {
    width: 24,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e5e7eb',
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#5b5fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tappableArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e5e7eb',
    borderRadius: 2,
    marginBottom: 40,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    width: '30%',
    backgroundColor: '#22c55e',
    borderRadius: 2,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 20,
    lineHeight: 36,
  },
  description: {
    fontSize: 18,
    lineHeight: 28,
    color: '#1f2937',
    marginBottom: 40,
  },
  bold: {
    fontWeight: '700',
  },
  illustrationContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 40,
    marginBottom: -60,
    zIndex: 10,
  },
  casinoIcon: {
    width: 100,
    height: 100,
    position: 'relative',
  },
  casinoCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f97316',
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#fff',
  },
  chip: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#f97316',
  },
  casinoWindow: {
    width: 60,
    height: 40,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 20,
    right: 0,
    borderRadius: 4,
    borderWidth: 3,
    borderColor: '#e5e7eb',
    overflow: 'hidden',
  },
  chartLine: {
    width: 40,
    height: 20,
    backgroundColor: '#10b981',
    position: 'absolute',
    bottom: 5,
    left: 10,
    transform: [{ skewX: '-20deg' }],
  },
  prohibitLine: {
    width: 120,
    height: 6,
    backgroundColor: '#ef4444',
    position: 'absolute',
    top: 45,
    left: -10,
    transform: [{ rotate: '-45deg' }],
    borderRadius: 3,
  },
  bookIcon: {
    width: 100,
    height: 100,
    position: 'relative',
  },
  book: {
    width: 80,
    height: 80,
    position: 'absolute',
    top: 10,
    right: 0,
  },
  bookCover: {
    width: 80,
    height: 80,
    backgroundColor: '#a78bfa',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#c4b5fd',
  },
  dollarSign: {
    fontSize: 36,
    fontWeight: '700',
    color: '#fff',
  },
  sparkle1: {
    width: 20,
    height: 20,
    backgroundColor: '#fbbf24',
    position: 'absolute',
    top: 0,
    right: -10,
    transform: [{ rotate: '45deg' }],
  },
  sparkle2: {
    width: 16,
    height: 16,
    backgroundColor: '#fbbf24',
    position: 'absolute',
    bottom: 0,
    right: 70,
    transform: [{ rotate: '45deg' }],
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  avatar: {
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: '#5b5fff',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
    paddingVertical: 40,
  },
  navButton: {
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButtonInner: {
    width: 32,
    height: 32,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#9ca3af',
  },
  playButtonOuter: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#5b5fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#7c7cff',
  },
  playButton: {
    width: 0,
    height: 0,
    borderLeftWidth: 12,
    borderTopWidth: 8,
    borderBottomWidth: 8,
    borderLeftColor: '#fff',
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    marginLeft: 4,
  },
  gameHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  gameTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#5b5fff',
    letterSpacing: 1,
  },
  taskTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 16,
  },
  taskDescription: {
    fontSize: 18,
    lineHeight: 28,
    color: '#1f2937',
    marginBottom: 60,
  },
  coinContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginBottom: 80,
  },
  coinOuter: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#fbbf24',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  coinInner: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#f59e0b',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#fbbf24',
  },
  coinSymbol: {
    fontSize: 72,
    fontWeight: '700',
    color: '#fbbf24',
  },
  flipButton: {
    backgroundColor: '#5b5fff',
    paddingVertical: 18,
    paddingHorizontal: 48,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 40,
  },
  flipButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1,
  },
  resultDescription: {
    fontSize: 18,
    lineHeight: 28,
    color: '#1f2937',
    marginBottom: 40,
  },
  thinkingAvatarContainer: {
    alignItems: 'center',
    marginBottom: 60,
    marginTop: 40,
  },
  thinkingAvatar: {
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: '#5b5fff',
  },
  mindsetDescription: {
    fontSize: 18,
    lineHeight: 28,
    color: '#1f2937',
    marginBottom: 60,
  },
  probabilityContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 80,
  },
  chartContainer: {
    width: 320,
    height: 280,
    position: 'relative',
  },
  yAxis: {
    position: 'absolute',
    left: 20,
    top: 20,
    width: 2,
    height: 200,
    backgroundColor: '#6b7280',
  },
  xAxis: {
    position: 'absolute',
    left: 20,
    bottom: 40,
    width: 280,
    height: 2,
    backgroundColor: '#6b7280',
  },
  curveLeft: {
    position: 'absolute',
    left: 30,
    bottom: 42,
    width: 120,
    height: 180,
    borderWidth: 2,
    borderColor: '#9ca3af',
    borderRadius: 60,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    transform: [{ scaleX: 1.2 }],
  },
  questionMarkContainer: {
    position: 'absolute',
    left: 120,
    top: 60,
    width: 50,
    height: 50,
    backgroundColor: '#e0e7ff',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionMark: {
    fontSize: 36,
    fontWeight: '700',
    color: '#5b5fff',
  },
  dividerLine: {
    position: 'absolute',
    left: 165,
    bottom: 40,
    width: 3,
    height: 180,
    backgroundColor: '#fb923c',
    borderRadius: 2,
  },
  curveRight: {
    position: 'absolute',
    right: 20,
    bottom: 42,
    width: 120,
    height: 180,
    backgroundColor: 'rgba(34, 197, 94, 0.5)',
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    transform: [{ scaleX: 1.2 }],
  },
  percentageLabel: {
    position: 'absolute',
    bottom: 10,
    right: 60,
  },
  percentageText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fb923c',
  },
  step5Title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 24,
    lineHeight: 32,
  },
  step5List: {
    fontSize: 18,
    lineHeight: 32,
    color: '#1f2937',
    marginBottom: 60,
  },
  calendarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 60,
  },
  calendarHeader: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: -8,
    zIndex: 10,
  },
  calendarTab: {
    width: 40,
    height: 24,
    backgroundColor: '#8b8bff',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  calendarCard: {
    width: 340,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  calendarTopRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  calendarRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  calendarBottomRow: {
    flexDirection: 'row',
    gap: 8,
  },
  dayBoxEmpty: {
    width: 38,
    height: 38,
    backgroundColor: '#f3f4f6',
    borderRadius: 6,
  },
  dayBoxGreen: {
    width: 38,
    height: 38,
    backgroundColor: '#86c446',
    borderRadius: 6,
  },
  dayBoxLight: {
    width: 38,
    height: 38,
    backgroundColor: '#f3f4f6',
    borderRadius: 6,
  },
  dayBoxHighlighted: {
    width: 38,
    height: 38,
    backgroundColor: '#86c446',
    borderRadius: 6,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowContainer: {
    position: 'absolute',
    top: -20,
    left: 8,
  },
  arrowHead: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#ff6b35',
    marginLeft: 6,
  },
  arrowLine: {
    width: 3,
    height: 12,
    backgroundColor: '#ff6b35',
    marginLeft: 9,
    marginTop: -1,
  },
  dayNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  dayBox28: {
    width: 38,
    height: 38,
    backgroundColor: '#fde047',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayNumber28: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
  },
  step7Header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  step7HeaderText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#5b5fff',
    letterSpacing: 1,
  },
  step7Title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 16,
  },
  step7Description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#1f2937',
    marginBottom: 60,
  },
  sliderContainer: {
    marginBottom: 100,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  sliderLabel: {
    fontSize: 14,
    color: '#9ca3af',
    fontWeight: '500',
  },
  sliderLabelActive: {
    color: '#5b5fff',
    fontWeight: '700',
  },
  sliderTrack: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    position: 'relative',
    marginHorizontal: 4,
  },
  sliderFilled: {
    height: '100%',
    backgroundColor: '#5b5fff',
    borderRadius: 4,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  sliderThumbContainer: {
    position: 'absolute',
    left: 4,
    top: -16,
  },
  sliderThumb: {
    width: 40,
    height: 40,
    backgroundColor: '#5b5fff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  sliderThumbInner: {
    width: 24,
    height: 24,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  step7Footer: {
    marginTop: 40,
    marginBottom: 20,
  },
  hintBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#ede9fe',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  hintText: {
    fontSize: 15,
    color: '#1f2937',
  },
  hintLink: {
    color: '#5b5fff',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  step7Buttons: {
    flexDirection: 'row',
    gap: 12,
  },
  backButton: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkButton: {
    flex: 1,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#d1d5db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkButtonActive: {
    backgroundColor: '#5b5fff',
  },
  checkButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  checkButtonTextActive: {
    color: '#fff',
  },
  step8Text: {
    fontSize: 18,
    lineHeight: 28,
    color: '#1f2937',
    marginBottom: 40,
  },
  step8ImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  step8Image: {
    width: '100%',
    height: 500,
  },
  icon2ImageContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 40,
  },
  icon2Image: {
    width: '100%',
    height: 600,
    borderRadius: 12,
  },
  buyText: {
    color: '#22c55e',
    fontWeight: '700',
  },
  sellText: {
    color: '#ef4444',
    fontWeight: '700',
  },
  holdText: {
    color: '#3b82f6',
    fontWeight: '700',
  },
  gameTimeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  gameTimeIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  gameTimeText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#5b5fff',
  },
  firstTradeTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 16,
  },
  chartContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 32,
  },
  chartImage: {
    width: 200,
    height: 200,
  },
  volatileChartImage: {
    width: 280,
    height: 280,
  },
  buyButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#5b5fff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  buyButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  whatNowTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 16,
  },
  traderDecisionContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 24,
  },
  traderDecisionImage: {
    width: 240,
    height: 240,
  },
  holdButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#5b5fff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  holdButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  finalChartContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 40,
  },
  finalChartImage: {
    width: 300,
    height: 300,
  },
  tradingActionsContainer: {
    marginVertical: 24,
    paddingLeft: 8,
  },
  tradingActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionLabel: {
    fontSize: 16,
    color: '#1f2937',
    marginRight: 8,
  },
  actionText: {
    fontSize: 16,
    color: '#1f2937',
  },
  buyText: {
    color: '#10b981',
    fontWeight: '700',
  },
  sellText: {
    color: '#ef4444',
    fontWeight: '700',
  },
  holdText: {
    color: '#5b5fff',
    fontWeight: '700',
  },
  tradingIconsContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 24,
  },
  tradingIconsImage: {
    width: 280,
    height: 280,
  },
  selectMatchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  selectMatchText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#5b5fff',
    letterSpacing: 1,
  },
  step9Title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 24,
  },
  matchingGameContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 24,
  },
  matchingGameImage: {
    width: '100%',
    height: 600,
  },
  hintContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 16,
    backgroundColor: '#ede9fe',
    borderRadius: 12,
    marginTop: 16,
  },
  hintText: {
    fontSize: 14,
    color: '#1f2937',
  },
  hintLink: {
    color: '#5b5fff',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  finishLessonButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#5b5fff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
  finishLessonButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.5,
  },
  step9List: {
    marginBottom: 24,
  },
  step9ListItem: {
    fontSize: 18,
    lineHeight: 32,
    color: '#1f2937',
    marginBottom: 8,
  },
  step9Bold: {
    fontWeight: '700',
    color: '#000',
  },
  step9NextText: {
    fontSize: 18,
    lineHeight: 28,
    color: '#1f2937',
    marginBottom: 40,
  },
  step9ButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 40,
  },
  finishButton: {
    backgroundColor: '#5b5fff',
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  finishButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.5,
  },
});
