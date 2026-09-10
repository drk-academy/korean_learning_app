/**
 * Database & High Score Persistence Service
 * Manages personal high scores per user per game mode and level.
 * Persists data across browser sessions tied to user ID.
 */

const STORAGE_SCORES_KEY = 'kla_high_scores_v1';

class DbService {
  constructor() {
    this.scores = this._loadScores();
  }

  _loadScores() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_SCORES_KEY) || '{}');
    } catch (e) {
      return {};
    }
  }

  _saveScores() {
    try {
      localStorage.setItem(STORAGE_SCORES_KEY, JSON.stringify(this.scores));
    } catch (e) {
      console.error('Failed to save scores to localStorage', e);
    }
  }

  /**
   * Get the current personal high score for a specific user and game mode (optionally level)
   * @param {string} userId 
   * @param {'vocab' | 'grammar' | 'reading'} mode 
   * @param {'beginner' | 'intermediate' | 'advanced' | null} level 
   * @returns {number} High score value
   */
  getHighScore(userId, mode, level = null) {
    if (!userId || !mode) return 0;
    const userScores = this.scores[userId] || {};

    if (level) {
      const compositeKey = `${mode}_${level}`;
      if (userScores[compositeKey] !== undefined) {
        return userScores[compositeKey].score || 0;
      }
    }

    // Default mode high score
    return (userScores[mode] && userScores[mode].score) || 0;
  }

  /**
   * Get all high scores for a user across all 3 game modes and levels
   * @param {string} userId 
   */
  getAllHighScores(userId) {
    if (!userId) return { vocab: 0, grammar: 0, reading: 0 };
    const userScores = this.scores[userId] || {};
    return {
      vocab: (userScores['vocab'] && userScores['vocab'].score) || 0,
      grammar: (userScores['grammar'] && userScores['grammar'].score) || 0,
      reading: (userScores['reading'] && userScores['reading'].score) || 0,
      breakdown: userScores
    };
  }

  /**
   * Record a completed game session score.
   * Updates and persists if a new high score is achieved.
   * @param {string} userId 
   * @param {'vocab' | 'grammar' | 'reading'} mode 
   * @param {string} level 
   * @param {number} sessionScore 
   * @returns {{ isNewHighScore: boolean, previousHigh: number, currentHigh: number }}
   */
  recordScore(userId, mode, level, sessionScore) {
    if (!userId || !mode) {
      return { isNewHighScore: false, previousHigh: 0, currentHigh: sessionScore };
    }

    if (!this.scores[userId]) {
      this.scores[userId] = {};
    }

    const userScores = this.scores[userId];
    const compositeKey = `${mode}_${level}`;
    
    const previousModeHigh = (userScores[mode] && userScores[mode].score) || 0;
    const previousLevelHigh = (userScores[compositeKey] && userScores[compositeKey].score) || 0;

    let isNewHigh = false;

    // Check level-specific high score
    if (sessionScore > previousLevelHigh) {
      userScores[compositeKey] = {
        score: sessionScore,
        mode,
        level,
        updatedAt: new Date().toISOString()
      };
      isNewHigh = true;
    }

    // Check mode overall high score
    if (sessionScore > previousModeHigh) {
      userScores[mode] = {
        score: sessionScore,
        mode,
        level,
        updatedAt: new Date().toISOString()
      };
      isNewHigh = true;
    }

    if (isNewHigh) {
      this._saveScores();
    }

    const currentHigh = Math.max(previousModeHigh, sessionScore);

    return {
      isNewHighScore: isNewHigh,
      previousHigh: previousModeHigh,
      currentHigh: currentHigh
    };
  }
}

export const dbService = new DbService();
