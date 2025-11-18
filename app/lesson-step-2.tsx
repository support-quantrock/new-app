import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { X, AlignJustify, Headphones } from 'lucide-react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';

export default function LessonStep2() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <X size={28} color="#1f2937" strokeWidth={2} />
        </TouchableOpacity>

        <View style={styles.headerRight}>
          <View style={styles.progressIndicator}>
            <View style={styles.progressSegmentFilled} />
            <View style={styles.progressSegmentCurrent} />
            <View style={styles.progressSegmentEmpty} />
          </View>
          <TouchableOpacity style={styles.iconButton}>
            <AlignJustify size={24} color="#fff" strokeWidth={2} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Headphones size={24} color="#1f2937" strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
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
      </ScrollView>
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
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
});
