/**
 * Vocabulary Matching Game Engine
 * Implements FR-2.1 to FR-2.4:
 * - 8 pairs (16 tiles: 8 Korean, 8 English)
 * - Per-round timer driving the FR-1.5 speed bonus
 * - Selection matching logic, streak tracking, visual/audio feedback
 * - Round completion and high score reporting
 */

import { getRandomVocabPairs } from '../data/vocab-data.js';
import { ScoreEngine, sound } from '../services/score-engine.js';

export class VocabGame {
  constructor(containerEl, options = {}) {
    this.container = containerEl;
    this.level = options.level || 'beginner';
    this.onComplete = options.onComplete || (() => {});
    this.totalPairs = 8;
    this.totalTimeSeconds = 60; // 60s per round
    this.timerInterval = null;
    this.remainingSeconds = this.totalTimeSeconds;
    this.startTime = 0;

    this.pairs = [];
    this.tiles = [];
    this.selectedTile = null;
    this.matchedCount = 0;
    this.score = 0;
    this.streak = 0;
    this.isProcessing = false;
    this.isGameOver = false;
  }

  start() {
    this.pairs = getRandomVocabPairs(this.level, this.totalPairs);
    this.matchedCount = 0;
    this.score = 0;
    this.streak = 0;
    this.isGameOver = false;
    this.selectedTile = null;
    this.remainingSeconds = this.totalTimeSeconds;

    // Create 16 tiles (8 Korean, 8 English)
    const tilesData = [];
    this.pairs.forEach(pair => {
      tilesData.push({
        id: pair.id,
        type: 'korean',
        text: pair.korean,
        subtext: pair.category || 'Vocab',
        matchId: pair.id
      });
      tilesData.push({
        id: pair.id,
        type: 'english',
        text: pair.english,
        subtext: 'Meaning',
        matchId: pair.id
      });
    });

    // Shuffle tiles
    this.tiles = tilesData.sort(() => Math.random() - 0.5);

    this._render();
    this._startTimer();
  }

  _startTimer() {
    this.startTime = Date.now();
    clearInterval(this.timerInterval);

    this.timerInterval = setInterval(() => {
      if (this.isGameOver) {
        clearInterval(this.timerInterval);
        return;
      }

      this.remainingSeconds -= 0.1;
      this._updateTimerDisplay();

      if (this.remainingSeconds <= 0) {
        this.remainingSeconds = 0;
        this._updateTimerDisplay();
        clearInterval(this.timerInterval);
        this._endGame(false);
      }
    }, 100);
  }

  _updateTimerDisplay() {
    const timerBar = this.container.querySelector('.game-timer-progress');
    const timerText = this.container.querySelector('.game-timer-val');
    if (timerBar && timerText) {
      const percentage = Math.max(0, (this.remainingSeconds / this.totalTimeSeconds) * 100);
      timerBar.style.width = `${percentage}%`;
      timerText.textContent = `${Math.ceil(this.remainingSeconds)}s`;
      
      if (percentage < 25) {
        timerBar.classList.add('danger');
      } else {
        timerBar.classList.remove('danger');
      }
    }
  }

  _render() {
    this.container.innerHTML = `
      <div class="game-arena-wrapper vocab-arena">
        <!-- Game HUD -->
        <div class="game-hud">
          <div class="hud-item">
            <span class="hud-label">Score</span>
            <span class="hud-value score-counter">${ScoreEngine.formatScore(this.score)}</span>
          </div>
          <div class="hud-item hud-timer-box">
            <div class="timer-meta">
              <span class="hud-label">Time Remaining</span>
              <span class="game-timer-val hud-value">${Math.ceil(this.remainingSeconds)}s</span>
            </div>
            <div class="game-timer-track">
              <div class="game-timer-progress" style="width: 100%"></div>
            </div>
          </div>
          <div class="hud-item">
            <span class="hud-label">Pairs Matched</span>
            <span class="hud-value matched-counter">${this.matchedCount} / ${this.totalPairs}</span>
          </div>
        </div>

        <!-- Matching Board Grid -->
        <div class="vocab-grid-container">
          <div class="vocab-tiles-grid">
            ${this.tiles.map((tile, idx) => `
              <button 
                class="vocab-tile ${tile.type}" 
                data-index="${idx}"
                data-type="${tile.type}"
                data-match-id="${tile.matchId}"
                aria-label="Vocabulary tile ${tile.text}"
              >
                <div class="tile-tag">${tile.subtext}</div>
                <div class="tile-main-text ${tile.type === 'korean' ? 'hangul-text' : ''}">${tile.text}</div>
                <div class="tile-check-icon">✓</div>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Quick Help Bar -->
        <div class="game-status-bar">
          <span class="tip-text">💡 Tap a Korean word and match it with its English translation!</span>
          <div class="streak-badge ${this.streak >= 2 ? 'visible' : ''}">
            🔥 Streak: <span class="streak-num">${this.streak}</span>
          </div>
        </div>
      </div>
    `;

    // Attach click listeners to tiles
    const tileButtons = this.container.querySelectorAll('.vocab-tile');
    tileButtons.forEach(btn => {
      btn.addEventListener('click', (e) => this._onTileClick(e.currentTarget));
    });
  }

  _onTileClick(tileEl) {
    if (this.isProcessing || this.isGameOver) return;
    if (tileEl.classList.contains('matched') || tileEl.classList.contains('selected')) return;

    // First tile selection
    if (!this.selectedTile) {
      this.selectedTile = tileEl;
      tileEl.classList.add('selected');
      return;
    }

    // User clicked the exact same tile again - deselect
    if (this.selectedTile === tileEl) {
      this.selectedTile.classList.remove('selected');
      this.selectedTile = null;
      return;
    }

    // If user clicked two tiles of the exact same language type (e.g. Korean and Korean),
    // switch active selection to the newly clicked tile
    const firstType = this.selectedTile.dataset.type;
    const secondType = tileEl.dataset.type;

    if (firstType === secondType) {
      this.selectedTile.classList.remove('selected');
      this.selectedTile = tileEl;
      tileEl.classList.add('selected');
      return;
    }

    // We have a pair selection! Compare matchIds
    this.isProcessing = true;
    tileEl.classList.add('selected');

    const firstMatchId = this.selectedTile.dataset.matchId;
    const secondMatchId = tileEl.dataset.matchId;
    const firstTile = this.selectedTile;
    const secondTile = tileEl;

    if (firstMatchId === secondMatchId) {
      // MATCH SUCCESS!
      this.streak += 1;
      this.matchedCount += 1;

      // Calculate score with speed bonus per FR-1.5
      const itemScore = ScoreEngine.calculateItemScore(
        true,
        this.remainingSeconds * 1000,
        this.totalTimeSeconds * 1000,
        100, // base points
        50   // speed bonus
      );

      // Add streak bonus
      const totalAward = itemScore.total + ((this.streak - 1) * 15);
      this.score += totalAward;

      if (this.streak >= 2) {
        sound.playCombo(this.streak);
      } else {
        sound.playSuccess();
      }

      firstTile.classList.remove('selected');
      secondTile.classList.remove('selected');
      firstTile.classList.add('matched');
      secondTile.classList.add('matched');

      this._updateHUD();

      this.selectedTile = null;
      this.isProcessing = false;

      // Check for round victory
      if (this.matchedCount === this.totalPairs) {
        clearInterval(this.timerInterval);
        setTimeout(() => this._endGame(true), 600);
      }
    } else {
      // MISMATCH
      this.streak = 0;
      sound.playError();

      firstTile.classList.add('mismatch-shake');
      secondTile.classList.add('mismatch-shake');

      setTimeout(() => {
        firstTile.classList.remove('selected', 'mismatch-shake');
        secondTile.classList.remove('selected', 'mismatch-shake');
        this.selectedTile = null;
        this.isProcessing = false;
        this._updateHUD();
      }, 650);
    }
  }

  _updateHUD() {
    const scoreEl = this.container.querySelector('.score-counter');
    const matchedEl = this.container.querySelector('.matched-counter');
    const streakBadge = this.container.querySelector('.streak-badge');
    const streakNum = this.container.querySelector('.streak-num');

    if (scoreEl) scoreEl.textContent = ScoreEngine.formatScore(this.score);
    if (matchedEl) matchedEl.textContent = `${this.matchedCount} / ${this.totalPairs}`;
    
    if (streakBadge && streakNum) {
      streakNum.textContent = this.streak;
      if (this.streak >= 2) {
        streakBadge.classList.add('visible');
      } else {
        streakBadge.classList.remove('visible');
      }
    }
  }

  _endGame(isWon) {
    this.isGameOver = true;
    clearInterval(this.timerInterval);

    // Calculate final time bonus if completed early
    let earlyBonus = 0;
    if (isWon && this.remainingSeconds > 0) {
      earlyBonus = Math.floor(this.remainingSeconds * 10);
      this.score += earlyBonus;
    }

    this.onComplete({
      mode: 'vocab',
      level: this.level,
      score: this.score,
      isWon: isWon,
      matchedCount: this.matchedCount,
      totalPairs: this.totalPairs,
      timeRemaining: Math.max(0, Math.ceil(this.remainingSeconds)),
      details: {
        baseScore: this.matchedCount * 100,
        speedAndStreakBonus: this.score - (this.matchedCount * 100)
      }
    });
  }

  destroy() {
    clearInterval(this.timerInterval);
    this.container.innerHTML = '';
  }
}
