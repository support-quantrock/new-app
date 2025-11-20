import { challengeAPI } from '../api/challengeClient';
import type {
  Program,
  Lesson,
  LessonPage,
  Test,
  UserProgress,
  LessonProgress,
  TestAttempt,
  ApiResponse,
} from '../types/challenge';

export const challengeService = {
  // ==================== PROGRAMS ====================

  /**
   * Get all challenge programs
   * @param type - Optional filter by program type
   */
  async getPrograms(type?: string): Promise<Program[]> {
    try {
      const params = type ? { type } : {};
      const response = await challengeAPI.get<ApiResponse<Program[]>>('/programs', { params });
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching programs:', error);
      throw error;
    }
  },

  /**
   * Get program details with all days, lessons, and tests
   * @param programId - Program UUID
   */
  async getProgram(programId: string) {
    try {
      const response = await challengeAPI.get<ApiResponse<any>>(`/programs/${programId}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching program:', error);
      throw error;
    }
  },

  /**
   * Create a new program
   */
  async createProgram(data: Partial<Program>) {
    try {
      const response = await challengeAPI.post<ApiResponse<Program>>('/programs', data);
      return response.data.data;
    } catch (error) {
      console.error('Error creating program:', error);
      throw error;
    }
  },

  // ==================== LESSONS ====================

  /**
   * Get lesson details including all pages and images
   * @param lessonId - Lesson UUID
   */
  async getLesson(lessonId: string): Promise<Lesson> {
    try {
      const response = await challengeAPI.get<ApiResponse<Lesson>>('/lessons', {
        params: { id: lessonId }
      });
      return response.data.data!;
    } catch (error) {
      console.error('Error fetching lesson:', error);
      throw error;
    }
  },

  /**
   * Get all lessons for a specific day
   * @param dayId - Day UUID
   */
  async getLessonsByDay(dayId: string): Promise<Lesson[]> {
    try {
      const response = await challengeAPI.get<ApiResponse<Lesson[]>>('/lessons', {
        params: { day_id: dayId }
      });
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching lessons:', error);
      throw error;
    }
  },

  /**
   * Create a new lesson
   */
  async createLesson(data: Partial<Lesson>) {
    try {
      const response = await challengeAPI.post<ApiResponse<Lesson>>('/lessons', data);
      return response.data.data;
    } catch (error) {
      console.error('Error creating lesson:', error);
      throw error;
    }
  },

  /**
   * Update a lesson
   */
  async updateLesson(id: string, data: Partial<Lesson>) {
    try {
      const response = await challengeAPI.put<ApiResponse<Lesson>>('/lessons', { id, ...data });
      return response.data.data;
    } catch (error) {
      console.error('Error updating lesson:', error);
      throw error;
    }
  },

  /**
   * Delete a lesson
   */
  async deleteLesson(id: string) {
    try {
      const response = await challengeAPI.delete<ApiResponse<void>>('/lessons', {
        params: { id }
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting lesson:', error);
      throw error;
    }
  },

  // ==================== LESSON PAGES ====================

  /**
   * Get all pages for a lesson
   * @param lessonId - Lesson UUID
   */
  async getLessonPages(lessonId: string): Promise<LessonPage[]> {
    try {
      const response = await challengeAPI.get<ApiResponse<LessonPage[]>>('/lesson-pages', {
        params: { lesson_id: lessonId }
      });
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching lesson pages:', error);
      throw error;
    }
  },

  /**
   * Create a new lesson page
   */
  async createLessonPage(data: Partial<LessonPage>) {
    try {
      const response = await challengeAPI.post<ApiResponse<LessonPage>>('/lesson-pages', data);
      return response.data.data;
    } catch (error) {
      console.error('Error creating lesson page:', error);
      throw error;
    }
  },

  /**
   * Update a lesson page
   */
  async updateLessonPage(id: string, data: Partial<LessonPage>) {
    try {
      const response = await challengeAPI.put<ApiResponse<LessonPage>>('/lesson-pages', {
        id,
        ...data
      });
      return response.data.data;
    } catch (error) {
      console.error('Error updating lesson page:', error);
      throw error;
    }
  },

  /**
   * Delete a lesson page
   */
  async deleteLessonPage(id: string) {
    try {
      const response = await challengeAPI.delete<ApiResponse<void>>('/lesson-pages', {
        params: { id }
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting lesson page:', error);
      throw error;
    }
  },

  // ==================== TESTS ====================

  /**
   * Get test with all questions
   * @param testId - Test UUID
   */
  async getTest(testId: string): Promise<Test> {
    try {
      const response = await challengeAPI.get<ApiResponse<Test>>('/tests', {
        params: { id: testId }
      });
      return response.data.data!;
    } catch (error) {
      console.error('Error fetching test:', error);
      throw error;
    }
  },

  /**
   * Create a new test
   */
  async createTest(data: Partial<Test>) {
    try {
      const response = await challengeAPI.post<ApiResponse<Test>>('/tests', data);
      return response.data.data;
    } catch (error) {
      console.error('Error creating test:', error);
      throw error;
    }
  },

  // ==================== PROGRESS ====================

  /**
   * Get user progress for a specific program
   * @param userId - User UUID
   * @param programId - Program UUID
   */
  async getUserProgress(userId: string, programId: string): Promise<UserProgress | null> {
    try {
      const response = await challengeAPI.get<ApiResponse<UserProgress>>('/progress', {
        params: { user_id: userId, program_id: programId }
      });
      return response.data.data || null;
    } catch (error) {
      console.error('Error fetching progress:', error);
      throw error;
    }
  },

  /**
   * Get all programs progress for a user
   * @param userId - User UUID
   */
  async getAllUserProgress(userId: string): Promise<UserProgress[]> {
    try {
      const response = await challengeAPI.get<ApiResponse<UserProgress[]>>('/progress', {
        params: { user_id: userId }
      });
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching all progress:', error);
      throw error;
    }
  },

  /**
   * Update overall program progress
   */
  async updateProgress(data: {
    user_id: string;
    program_id: string;
    current_day?: number;
    completed_lessons?: number;
    completed_tests?: number;
    total_score?: number;
  }) {
    try {
      const response = await challengeAPI.post<ApiResponse<UserProgress>>('/progress', data);
      return response.data;
    } catch (error) {
      console.error('Error updating progress:', error);
      throw error;
    }
  },

  /**
   * Update lesson progress
   */
  async updateLessonProgress(data: {
    user_id: string;
    lesson_id: string;
    program_id: string;
    is_completed: boolean;
    progress_percentage: number;
    time_spent_seconds: number;
    rating?: number;
  }) {
    try {
      const response = await challengeAPI.put<ApiResponse<LessonProgress>>('/progress', data);
      return response.data;
    } catch (error) {
      console.error('Error updating lesson progress:', error);
      throw error;
    }
  },

  // ==================== UTILITY ====================

  /**
   * Test API connection
   */
  async testConnection(): Promise<boolean> {
    try {
      await this.getPrograms();
      console.log('✅ API Connection successful!');
      return true;
    } catch (error) {
      console.error('❌ API Connection failed!');
      return false;
    }
  },
};
