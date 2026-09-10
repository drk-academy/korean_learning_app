/**
 * Grammar Fill-in-the-Blank Game Engine
 * Implements FR-3.1 to FR-3.5:
 * - Korean sentence with missing grammar blank
 * - Strict exact-match checking
 * - Per-question timer driving FR-1.5 speed bonus
 * - Integrated virtual Korean keypad helper for learners without Korean IME
 * - Question-by-question progression and final score recording
 */

import { getRandomGrammarQuestions } from '../data/grammar-data.js';
import { ScoreEngine, sound } from '../services/score-engine.js';

export class GrammarGame {
  constructor(containerEl, options = {}) {
    this.container = containerEl;
    this.level = options.level || 'beginner';
    this.onComplete = options.onComplete || (() => {});
    this.questionsPerRound = 5;
    this.questionTimeLimit = 20; // 20s per question
    
    this.questions = [];
    this.currentIndex = 0;
    this.score = 0;
    this.correctCount = 0;
    this.questionTimer = null;
    this.remainingSeconds = this.questionTimeLimit;
    this.isAnswering = false;
    this.resultsLog = [];
  }

  start() {
    this.questions = getRandomGrammarQuestions(this.level, this.questionsPerRound);
    this.currentIndex = 0;
    this.score = 0;
    this.correctCount = 0;
    this.resultsLog = [];
    this._loadQuestion();
  }

  _loadQuestion() {
    if (this.currentIndex >= this.questions.length) {
      this._endGame();
      return;
    }

    const currentQ = this.questions[this.currentIndex];
    this.remainingSeconds = this.questionTimeLimit;
    this.isAnswering = true;

    this._renderQuestionView(currentQ);
    this._startQuestionTimer();

    // Auto-focus input
    setTimeout(() => {
      const inputEl = this.container.querySelector('.grammar-type-input');
      if (inputEl) inputEl.focus();
    }, 100);
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
        this._submitAnswer(true); // timed out
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

  _renderQuestionView(q) {
    // Break sentence around blank
    const parts = q.sentenceWithBlank.split('___');
    const partBefore = parts[0] || '';
    const partAfter = parts[1] || '';

    // Quick keys suited for current level
    const quickKeys = this._getQuickKeys();

    this.container.innerHTML = `
      <div class="game-arena-wrapper grammar-arena">
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
            <span class="hud-value">${this.currentIndex + 1} / ${this.questions.length}</span>
          </div>
        </div>

        <!-- Main Question Card -->
        <div class="grammar-card">
          <div class="grammar-header-badge">
            <span>🎯 Grammar Challenge</span>
            <span class="grammar-point-tag">${q.grammarPoint}</span>
          </div>

          <div class="grammar-sentence-box">
            <span class="sentence-part hangul-text">${partBefore}</span>
            <span class="blank-slot">
              <span class="blank-indicator">?</span>
            </span>
            <span class="sentence-part hangul-text">${partAfter}</span>
          </div>

          <div class="grammar-translation-box">
            <span class="trans-label">Meaning:</span>
            <span class="trans-text">"${q.englishTranslation}"</span>
          </div>

          <!-- Type-in Form -->
          <form class="grammar-input-form" id="grammar-form">
            <div class="input-wrapper">
              <input 
                type="text" 
                class="grammar-type-input hangul-text" 
                placeholder="Type Korean grammar element..."
                autocomplete="off"
                autocorrect="off"
                spellcheck="false"
                required
              />
              <button type="submit" class="submit-answer-btn">Submit ↵</button>
            </div>
            <div class="hint-bar">
              <span class="hint-icon">💡</span>
              <span class="hint-text">${q.hint}</span>
            </div>
          </form>

          <!-- On-screen Hangul Quick Keys Helper -->
          <div class="hangul-helper-drawer">
            <div class="helper-header">
              <span class="helper-title">⌨️ Hangul Quick Keys:</span>
              <span class="helper-subtitle">(Click to append if no Korean keyboard is active)</span>
            </div>
            <div class="helper-keys-grid">
              ${quickKeys.map(k => `
                <button type="button" class="hangul-key-btn" data-char="${k}">${k}</button>
              `).join('')}
            </div>
          </div>

          <!-- Answer Feedback Overlay (hidden initially) -->
          <div class="answer-feedback-card hidden" id="feedback-card">
            <!-- Populated on submit -->
          </div>
        </div>
      </div>
    `;

    // Bind form submit
    const form = this.container.querySelector('#grammar-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!this.isAnswering) return;
      this._submitAnswer(false);
    });

    // Bind virtual keys
    const keyBtns = this.container.querySelectorAll('.hangul-key-btn');
    const inputEl = this.container.querySelector('.grammar-type-input');
    keyBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (!this.isAnswering || !inputEl) return;
        const char = btn.dataset.char;
        inputEl.value += char;
        inputEl.focus();
      });
    });
  }

  _getQuickKeys() {
    if (this.level === 'beginner') {
      return ['는', '은', '가', '이', '을', '를', '에', '에서', '요', '들', '의', '도'];
    } else if (this.level === 'intermediate') {
      return ['고', '지만', '러', '수', '났', '할', '아서', '어서', '지', '면서', '는데', '기'];
    } else {
      return ['뿐만', '기', '으로', '어', '니라', '지', '한편', '관하여', '비추어', '조차', '마저'];
    }
  }

  _submitAnswer(isTimeout = false) {
    if (!this.isAnswering) return;
    this.isAnswering = false;
    clearInterval(this.questionTimer);

    const inputEl = this.container.querySelector('.grammar-type-input');
    const typedAnswer = (inputEl ? inputEl.value : '').trim();
    const currentQ = this.questions[this.currentIndex];

    // FR-3.2: Exact match only
    const isCorrect = !isTimeout && (typedAnswer === currentQ.blankTarget.trim());

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
      question: currentQ,
      typedAnswer: isTimeout ? '(Timed out)' : typedAnswer,
      isCorrect,
      points: itemScore.total,
      speedBonus: itemScore.speedBonus
    });

    this._showFeedback(isCorrect, isTimeout, currentQ, typedAnswer, itemScore);
  }

  _showFeedback(isCorrect, isTimeout, q, typedAnswer, itemScore) {
    const feedbackCard = this.container.querySelector('#feedback-card');
    const form = this.container.querySelector('#grammar-form');
    if (!feedbackCard) return;

    if (form) form.classList.add('disabled-form');

    feedbackCard.className = `answer-feedback-card ${isCorrect ? 'correct' : 'incorrect'}`;
    feedbackCard.innerHTML = `
      <div class="feedback-banner">
        <div class="feedback-status">
          ${isCorrect ? '🎉 Correct! 정확합니다!' : (isTimeout ? '⏰ Time Expired!' : '❌ Incorrect (오답)')}
        </div>
        <div class="feedback-points">
          ${isCorrect ? `+${itemScore.total} pts (${itemScore.base} base + ${itemScore.speedBonus} speed)` : '+0 pts'}
        </div>
      </div>

      <div class="feedback-details">
        <div class="feedback-row">
          <span class="f-label">Your Answer:</span>
          <span class="f-val ${isCorrect ? 'text-success' : 'text-danger'} hangul-text">${typedAnswer || '(Empty)'}</span>
        </div>
        <div class="feedback-row">
          <span class="f-label">Expected Target:</span>
          <span class="f-val highlight-expected hangul-text">${q.blankTarget}</span>
        </div>
        <div class="feedback-row full-sentence-preview">
          <span class="f-label">Full Sentence:</span>
          <span class="f-val hangul-text">${q.fullSentence}</span>
        </div>
      </div>

      <button type="button" class="next-question-btn" id="next-q-btn">
        ${this.currentIndex + 1 >= this.questions.length ? 'See Results 🏆' : 'Next Question ➔'}
      </button>
    `;

    feedbackCard.classList.remove('hidden');

    const nextBtn = feedbackCard.querySelector('#next-q-btn');
    nextBtn.addEventListener('click', () => {
      this.currentIndex += 1;
      this._loadQuestion();
    });
    nextBtn.focus();
  }

  _endGame() {
    this.onComplete({
      mode: 'grammar',
      level: this.level,
      score: this.score,
      correctCount: this.correctCount,
      totalQuestions: this.questions.length,
      resultsLog: this.resultsLog
    });
  }

  destroy() {
    clearInterval(this.questionTimer);
    this.container.innerHTML = '';
  }
}
