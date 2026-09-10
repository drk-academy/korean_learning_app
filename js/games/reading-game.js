/**
 * Reading Comprehension Game Engine (Korean Fables)
 * Implements FR-4.1 to FR-4.5:
 * - Authentic Korean fable reading interface
 * - Pre-paired 4-option multiple choice comprehension questions
 * - Per-question timer driving FR-1.5 speed bonus
 * - Final score accumulation and high score update
 */

import { getFablesForLevel } from '../data/fables-data.js';
import { ScoreEngine, sound } from '../services/score-engine.js';

export class ReadingGame {
  constructor(containerEl, options = {}) {
    this.container = containerEl;
    this.level = options.level || 'beginner';
    this.onComplete = options.onComplete || (() => {});
    
    this.fables = [];
    this.activeFable = null;
    this.phase = 'reading'; // 'reading' | 'quiz' | 'finished'
    
    this.currentQIndex = 0;
    this.score = 0;
    this.correctCount = 0;
    this.questionTimer = null;
    this.questionTimeLimit = 25; // 25s per question
    this.remainingSeconds = this.questionTimeLimit;
    this.isAnswering = false;
    this.resultsLog = [];
  }

  start() {
    this.fables = getFablesForLevel(this.level);
    // Pick a fable (random or first)
    const randomIndex = Math.floor(Math.random() * this.fables.length);
    this.activeFable = this.fables[randomIndex] || this.fables[0];
    
    this.phase = 'reading';
    this.currentQIndex = 0;
    this.score = 0;
    this.correctCount = 0;
    this.resultsLog = [];

    this._renderReadingPhase();
  }

  _renderReadingPhase() {
    const fable = this.activeFable;

    this.container.innerHTML = `
      <div class="game-arena-wrapper reading-arena">
        <div class="fable-reader-card">
          <!-- Story Header -->
          <div class="fable-header">
            <div class="fable-meta-top">
              <span class="fable-level-badge">${fable.difficultyBadge}</span>
              <span class="fable-time-badge">⏱️ ${fable.estimatedReadTime} read</span>
            </div>
            <h2 class="fable-title-korean hangul-text">${fable.koreanTitle}</h2>
            <h3 class="fable-title-english">${fable.title}</h3>
            <p class="fable-summary">${fable.summary}</p>
          </div>

          <!-- Story Body -->
          <div class="fable-content-body">
            ${fable.bodyParagraphs.map(p => `
              <p class="fable-paragraph hangul-text">${p}</p>
            `).join('')}
          </div>

          <!-- Vocabulary Aids Drawer -->
          ${fable.vocabularyNotes && fable.vocabularyNotes.length ? `
            <div class="fable-vocab-drawer">
              <div class="drawer-title">📖 Key Vocabulary in this Story:</div>
              <div class="drawer-tags-list">
                ${fable.vocabularyNotes.map(v => `
                  <div class="vocab-pill">
                    <span class="pill-kr hangul-text">${v.word}</span>
                    <span class="pill-en">${v.meaning}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Moral of the Story -->
          <div class="fable-moral-box">
            <span class="moral-icon">📜</span>
            <span class="moral-text">${fable.moral}</span>
          </div>

          <!-- Proceed to Quiz CTA -->
          <div class="fable-actions-footer">
            <p class="reading-hint">Finished reading? Test your understanding with the comprehension quiz!</p>
            <button type="button" class="start-quiz-btn" id="start-quiz-btn">
              Begin Comprehension Quiz (${fable.questions.length} Questions) ➔
            </button>
          </div>
        </div>
      </div>
    `;

    const startQuizBtn = this.container.querySelector('#start-quiz-btn');
    startQuizBtn.addEventListener('click', () => {
      this.phase = 'quiz';
      this._loadQuestion();
    });
  }

  _loadQuestion() {
    const questions = this.activeFable.questions;
    if (this.currentQIndex >= questions.length) {
      this._endGame();
      return;
    }

    const q = questions[this.currentQIndex];
    this.remainingSeconds = this.questionTimeLimit;
    this.isAnswering = true;

    this._renderQuizQuestion(q, questions.length);
    this._startQuestionTimer();
  }

  _startQuestionTimer() {
    clearInterval(this.questionTimer);
    this.questionTimer = setInterval(() => {
      this.remainingSeconds -= 0.1;
      this._updateTimerDisplay();

      if (this.remainingSeconds <= 0) {
        this.remainingSeconds = 0;
        this._updateTimerDisplay();
        clearInterval(this.questionTimer);
        this._submitOption(-1, true); // Timed out
      }
    }, 100);
  }

  _updateTimerDisplay() {
    const timerBar = this.container.querySelector('.game-timer-progress');
    const timerText = this.container.querySelector('.game-timer-val');
    if (timerBar && timerText) {
      const percentage = Math.max(0, (this.remainingSeconds / this.questionTimeLimit) * 100);
      timerBar.style.width = `${percentage}%`;
      timerText.textContent = `${Math.ceil(this.remainingSeconds)}s`;
      
      if (percentage < 25) {
        timerBar.classList.add('danger');
      } else {
        timerBar.classList.remove('danger');
      }
    }
  }

  _renderQuizQuestion(q, totalQ) {
    this.container.innerHTML = `
      <div class="game-arena-wrapper reading-arena">
        <!-- Game HUD -->
        <div class="game-hud">
          <div class="hud-item">
            <span class="hud-label">Score</span>
            <span class="hud-value score-counter">${ScoreEngine.formatScore(this.score)}</span>
          </div>
          <div class="hud-item hud-timer-box">
            <div class="timer-meta">
              <span class="hud-label">Question Timer</span>
              <span class="game-timer-val hud-value">${Math.ceil(this.remainingSeconds)}s</span>
            </div>
            <div class="game-timer-track">
              <div class="game-timer-progress" style="width: 100%"></div>
            </div>
          </div>
          <div class="hud-item">
            <span class="hud-label">Question</span>
            <span class="hud-value">${this.currentQIndex + 1} / ${totalQ}</span>
          </div>
        </div>

        <div class="quiz-container-card">
          <div class="quiz-fable-ref">
            <span>📖 Story: <strong>${this.activeFable.koreanTitle}</strong> (${this.activeFable.title})</span>
          </div>

          <div class="quiz-question-header">
            <span class="q-badge">Q${this.currentQIndex + 1}</span>
            <h3 class="q-title hangul-text">${q.question}</h3>
          </div>

          <!-- 4 Multiple Choice Options -->
          <div class="mcq-options-list" id="mcq-options">
            ${q.options.map((opt, idx) => `
              <button 
                type="button" 
                class="mcq-option-btn" 
                data-index="${idx}"
              >
                <span class="opt-letter">${String.fromCharCode(65 + idx)}</span>
                <span class="opt-text hangul-text">${opt}</span>
              </button>
            `).join('')}
          </div>

          <!-- Feedback & Explanation Card -->
          <div class="quiz-feedback-card hidden" id="feedback-card"></div>
        </div>
      </div>
    `;

    const optionBtns = this.container.querySelectorAll('.mcq-option-btn');
    optionBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (!this.isAnswering) return;
        const selectedIdx = parseInt(btn.dataset.index, 10);
        this._submitOption(selectedIdx, false);
      });
    });
  }

  _submitOption(selectedIdx, isTimeout = false) {
    if (!this.isAnswering) return;
    this.isAnswering = false;
    clearInterval(this.questionTimer);

    const q = this.activeFable.questions[this.currentQIndex];
    const isCorrect = !isTimeout && (selectedIdx === q.correctIndex);

    // Calculate score per FR-1.5
    const itemScore = ScoreEngine.calculateItemScore(
      isCorrect,
      this.remainingSeconds * 1000,
      this.questionTimeLimit * 1000,
      100, // base points
      50   // max speed bonus
    );

    if (isCorrect) {
      this.score += itemScore.total;
      this.correctCount += 1;
      sound.playSuccess();
    } else {
      sound.playError();
    }

    this.resultsLog.push({
      question: q.question,
      selectedOption: isTimeout ? '(Timed out)' : q.options[selectedIdx],
      correctOption: q.options[q.correctIndex],
      isCorrect,
      points: itemScore.total,
      explanation: q.explanation
    });

    this._showFeedback(isCorrect, isTimeout, selectedIdx, q, itemScore);
  }

  _showFeedback(isCorrect, isTimeout, selectedIdx, q, itemScore) {
    const feedbackCard = this.container.querySelector('#feedback-card');
    const optionBtns = this.container.querySelectorAll('.mcq-option-btn');

    // Highlight correct & selected options
    optionBtns.forEach(btn => {
      const idx = parseInt(btn.dataset.index, 10);
      btn.disabled = true;
      if (idx === q.correctIndex) {
        btn.classList.add('correct-choice');
      } else if (idx === selectedIdx && !isCorrect) {
        btn.classList.add('incorrect-choice');
      }
    });

    if (!feedbackCard) return;

    feedbackCard.className = `quiz-feedback-card ${isCorrect ? 'correct' : 'incorrect'}`;
    feedbackCard.innerHTML = `
      <div class="feedback-banner">
        <div class="feedback-status">
          ${isCorrect ? '🎉 Correct Answer!' : (isTimeout ? '⏰ Time Ran Out!' : '❌ Incorrect Choice')}
        </div>
        <div class="feedback-points">
          ${isCorrect ? `+${itemScore.total} pts (${itemScore.base} base + ${itemScore.speedBonus} speed)` : '+0 pts'}
        </div>
      </div>

      <div class="explanation-box">
        <span class="exp-title">💡 Explanation:</span>
        <span class="exp-body hangul-text">${q.explanation}</span>
      </div>

      <button type="button" class="next-question-btn" id="next-q-btn">
        ${this.currentQIndex + 1 >= this.activeFable.questions.length ? 'View Final Results 🏆' : 'Next Question ➔'}
      </button>
    `;

    feedbackCard.classList.remove('hidden');

    const nextBtn = feedbackCard.querySelector('#next-q-btn');
    nextBtn.addEventListener('click', () => {
      this.currentQIndex += 1;
      this._loadQuestion();
    });
    nextBtn.focus();
  }

  _endGame() {
    this.phase = 'finished';
    this.onComplete({
      mode: 'reading',
      level: this.level,
      score: this.score,
      fableTitle: this.activeFable.title,
      koreanTitle: this.activeFable.koreanTitle,
      correctCount: this.correctCount,
      totalQuestions: this.activeFable.questions.length,
      resultsLog: this.resultsLog
    });
  }

  destroy() {
    clearInterval(this.questionTimer);
    this.container.innerHTML = '';
  }
}
