// ==================== PROGRAMS ====================

export interface Program {
  id: string;
  name: string;
  type: 'skill_assessment' | 'invest_challenge' | 'trading_challenge';
  description: string;
  duration_days: number;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  thumbnail_url?: string;
  is_active: boolean;
  requires_subscription: boolean;
  entry_fee: number;
  prize_pool?: number;
  total_lessons: number;
  total_tests: number;
  participant_count: number;
  completion_rate: number;
  created_at: string;
  updated_at: string;
  // From view
  total_days?: number;
  active_users?: number;
  avg_progress?: number;
}

// ==================== DAYS ====================

export interface Day {
  id: string;
  program_id: string;
  day_number: number;
  title: string;
  description?: string;
  is_locked: boolean;
  unlock_criteria?: any;
  display_order: number;
  created_at: string;
  updated_at: string;
  lessons?: Lesson[];
  tests?: Test[];
}

// ==================== LESSONS ====================

export interface LessonPage {
  id: string;
  lesson_id: string;
  page_number: number;
  title?: string;
  content: string;
  images?: LessonImage[];
  video_url?: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface LessonImage {
  url: string;
  caption?: string;
  order: number;
}

export interface Lesson {
  id: string;
  day_id: string;
  program_id: string;
  title: string;
  description?: string;
  content: string;
  lesson_type: 'video' | 'article' | 'interactive' | 'quiz';
  duration_minutes: number;
  video_url?: string;
  thumbnail_url?: string;
  resources?: {
    pdfs?: string[];
    links?: string[];
  };
  is_mandatory: boolean;
  display_order: number;
  view_count: number;
  completion_count: number;
  average_rating: number;
  created_at: string;
  updated_at: string;
  pages?: LessonPage[];
}

// ==================== TESTS ====================

export interface TestQuestion {
  id: string;
  test_id: string;
  question_text: string;
  question_type: 'multiple_choice' | 'true_false' | 'short_answer' | 'practical';
  options?: string[];
  correct_answer: string;
  explanation?: string;
  points: number;
  difficulty_level: 'easy' | 'medium' | 'hard';
  display_order: number;
  created_at: string;
}

export interface Test {
  id: string;
  day_id: string;
  program_id: string;
  title: string;
  description?: string;
  test_type: 'quiz' | 'practical' | 'assessment' | 'final_exam';
  duration_minutes: number;
  passing_score: number;
  max_attempts: number;
  is_mandatory: boolean;
  total_questions: number;
  display_order: number;
  attempt_count: number;
  average_score: number;
  created_at: string;
  updated_at: string;
  questions?: TestQuestion[];
}

// ==================== PROGRESS ====================

export interface UserProgress {
  id: string;
  user_id: string;
  program_id: string;
  current_day: number;
  total_score: number;
  completed_lessons: number;
  completed_tests: number;
  completion_percentage: number;
  status: 'active' | 'completed' | 'paused' | 'failed';
  started_at: string;
  completed_at?: string;
  last_activity_at: string;
  created_at: string;
  updated_at: string;
}

export interface LessonProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  program_id: string;
  is_completed: boolean;
  progress_percentage: number;
  time_spent_seconds: number;
  rating?: number;
  completed_at?: string;
  last_accessed_at: string;
  created_at: string;
}

export interface TestAttempt {
  id: string;
  user_id: string;
  test_id: string;
  program_id: string;
  attempt_number: number;
  score: number;
  passed: boolean;
  answers: any;
  time_spent_seconds: number;
  started_at: string;
  completed_at?: string;
  created_at: string;
}

// ==================== API RESPONSES ====================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
