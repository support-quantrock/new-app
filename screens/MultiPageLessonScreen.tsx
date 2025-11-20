import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { challengeService } from '../services/challengeService';
import { useAuth } from '../context/AuthContext';
import { Lesson, LessonPage } from '../types/challenge';

interface Props {
  route: {
    params: {
      lessonId: string;
      programId: string;
    };
  };
  navigation: any;
}

export const MultiPageLessonScreen: React.FC<Props> = ({ route, navigation }) => {
  const { lessonId, programId } = route.params;
  const { user } = useAuth();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    loadLesson();
  }, []);

  const loadLesson = async () => {
    try {
      setLoading(true);
      const data = await challengeService.getLesson(lessonId);
      setLesson(data);

      // Set navigation title
      navigation.setOptions({ title: data.title });
    } catch (error) {
      console.error('Error loading lesson:', error);
    } finally {
      setLoading(false);
    }
  };

  const currentPage = lesson?.pages?.[currentPageIndex];
  const totalPages = lesson?.pages?.length || 0;

  const goToNextPage = () => {
    if (currentPageIndex < totalPages - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  const updateProgress = async () => {
    if (!user) return;

    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    const progressPercentage = Math.floor(((currentPageIndex + 1) / totalPages) * 100);
    const isCompleted = currentPageIndex === totalPages - 1;

    try {
      await challengeService.updateLessonProgress({
        user_id: user.id,
        lesson_id: lessonId,
        program_id: programId,
        is_completed: isCompleted,
        progress_percentage: progressPercentage,
        time_spent_seconds: timeSpent,
      });
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  useEffect(() => {
    if (currentPage) {
      updateProgress();
    }
  }, [currentPageIndex]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4f46e5" />
        <Text style={styles.loadingText}>Loading lesson...</Text>
      </View>
    );
  }

  if (!lesson || !currentPage) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Lesson not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Page Indicator */}
      <View style={styles.pageIndicator}>
        <Text style={styles.pageNumber}>
          Page {currentPageIndex + 1} of {totalPages}
        </Text>
        {currentPage.title && (
          <Text style={styles.pageTitle}>{currentPage.title}</Text>
        )}
      </View>

      {/* Content */}
      <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={false}>
        {/* Page Video */}
        {currentPage.video_url && (
          <Video
            source={{ uri: currentPage.video_url }}
            style={styles.video}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            shouldPlay={false}
          />
        )}

        {/* Page Content */}
        <View style={styles.content}>
          <Text style={styles.contentText}>{currentPage.content}</Text>
        </View>

        {/* Page Images */}
        {currentPage.images && currentPage.images.length > 0 && (
          <View style={styles.imagesContainer}>
            {currentPage.images.map((image, index) => (
              <View key={index} style={styles.imageWrapper}>
                <Image
                  source={{ uri: image.url }}
                  style={styles.image}
                  resizeMode="contain"
                />
                {image.caption && (
                  <Text style={styles.imageCaption}>{image.caption}</Text>
                )}
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Navigation Buttons */}
      <View style={styles.navigation}>
        <TouchableOpacity
          onPress={goToPreviousPage}
          disabled={currentPageIndex === 0}
          style={[
            styles.navButton,
            currentPageIndex === 0 && styles.navButtonDisabled,
          ]}
        >
          <Text style={styles.navButtonText}>← Previous</Text>
        </TouchableOpacity>

        <View style={styles.pageDotsContainer}>
          {Array.from({ length: totalPages }).map((_, index) => (
            <View
              key={index}
              style={[
                styles.pageDot,
                index === currentPageIndex && styles.pageDotActive,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity
          onPress={goToNextPage}
          disabled={currentPageIndex === totalPages - 1}
          style={[
            styles.navButton,
            styles.navButtonNext,
            currentPageIndex === totalPages - 1 && styles.navButtonDisabled,
          ]}
        >
          <Text style={styles.navButtonText}>
            {currentPageIndex === totalPages - 1 ? 'Complete ✓' : 'Next →'}
          </Text>
        </TouchableOpacity>
      </View>
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
  },
  pageIndicator: {
    padding: 16,
    backgroundColor: '#141b2d',
    borderBottomWidth: 1,
    borderBottomColor: '#1a2235',
  },
  pageNumber: {
    color: '#9ca3af',
    fontSize: 12,
  },
  pageTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
  },
  contentScroll: {
    flex: 1,
  },
  video: {
    width: '100%',
    height: 250,
    backgroundColor: '#000',
  },
  content: {
    padding: 16,
  },
  contentText: {
    color: '#e5e7eb',
    fontSize: 16,
    lineHeight: 24,
  },
  imagesContainer: {
    padding: 16,
    paddingTop: 0,
  },
  imageWrapper: {
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    backgroundColor: '#1a2235',
  },
  imageCaption: {
    color: '#9ca3af',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  navigation: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    backgroundColor: '#141b2d',
    borderTopWidth: 1,
    borderTopColor: '#1a2235',
    alignItems: 'center',
  },
  navButton: {
    flex: 1,
    padding: 16,
    backgroundColor: '#4f46e5',
    borderRadius: 8,
    alignItems: 'center',
  },
  navButtonNext: {
    backgroundColor: '#10b981',
  },
  navButtonDisabled: {
    backgroundColor: '#374151',
    opacity: 0.5,
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pageDotsContainer: {
    flexDirection: 'row',
    gap: 6,
  },
  pageDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#374151',
  },
  pageDotActive: {
    backgroundColor: '#4f46e5',
    width: 24,
  },
});
