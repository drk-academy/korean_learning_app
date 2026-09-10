/**
 * Main Application Controller
 * Coordinates Auth State, Level Switching, High Score Displays,
 * Game Arena Launchers, and Session Summary & Celebration Modals.
 */

import { authService } from './services/auth-service.js';
import { dbService } from './services/db-service.js';
import { ScoreEngine, sound } from './services/score-engine.js';
import { VocabGame } from './games/vocab-game.js';
import { GrammarGame } from './games/grammar-game.js';
import { ReadingGame } from './games/reading-game.js';

class App {
  constructor() {
    this.currentUser = null;
    this.currentLevel = 'beginner';
    this.activeGame = null;
    this.activeMode = null;

    this.dom = {};
  }

  init() {
    this._cacheDom();
    this._bindEvents();
    this._initAuthListener();
  }

  _cacheDom() {
    this.dom = {
      // Views
      guestHeroView: document.getElementById('guest-hero-view'),
      dashboardView: document.getElementById('dashboard-view'),
      gameView: document.getElementById('game-view'),
      
      // Nav & Header
      navAuthBtn: document.getElementById('nav-auth-btn'),
      navUserMenu: document.getElementById('nav-user-menu'),
      navUserEmail: document.getElementById('nav-user-email'),
      navUserLevelBadge: document.getElementById('nav-user-level-badge'),
      navLogoutBtn: document.getElementById('nav-logout-btn'),
      navSoundBtn: document.getElementById('nav-sound-btn'),

      // Level Selector
      levelButtons: document.querySelectorAll('.level-select-btn'),
      
      // Game Cards & High Score Displays
      vocabCard: document.getElementById('mode-card-vocab'),
      grammarCard: document.getElementById('mode-card-grammar'),
      readingCard: document.getElementById('mode-card-reading'),
      vocabHighScoreVal: document.getElementById('high-score-vocab'),
      grammarHighScoreVal: document.getElementById('high-score-grammar'),
      readingHighScoreVal: document.getElementById('high-score-reading'),

      // Game Arena Header & Container
      gameTitleText: document.getElementById('game-mode-title'),
      gameLevelBadge: document.getElementById('game-mode-level-badge'),
      gameExitBtn: document.getElementById('game-exit-btn'),
      gameContainer: document.getElementById('active-game-container'),

      // Auth Modal & Tabs
      authModal: document.getElementById('auth-modal'),
      authModalClose: document.getElementById('auth-modal-close'),
      tabLoginBtn: document.getElementById('tab-login-btn'),
      tabRegisterBtn: document.getElementById('tab-register-btn'),
      loginForm: document.getElementById('login-form'),
      registerForm: document.getElementById('register-form'),
      forgotPasswordLink: document.getElementById('forgot-password-link'),
      authErrorAlert: document.getElementById('auth-error-alert'),
      authSuccessAlert: document.getElementById('auth-success-alert'),

      // Forgot Password Modal
      forgotModal: document.getElementById('forgot-modal'),
      forgotModalClose: document.getElementById('forgot-modal-close'),
      forgotForm: document.getElementById('forgot-form'),

      // Results / Celebration Modal
      resultsModal: document.getElementById('results-modal'),
      resultsModalClose: document.getElementById('results-modal-close'),
      resultScoreVal: document.getElementById('result-score-val'),
      resultHighScoreBanner: document.getElementById('result-high-score-banner'),
      resultDetailsList: document.getElementById('result-details-list'),
      resultPlayAgainBtn: document.getElementById('result-play-again-btn'),
      resultBackHomeBtn: document.getElementById('result-back-home-btn')
    };
  }

  _bindEvents() {
    // Auth Modal Triggers
    if (this.dom.navAuthBtn) {
      this.dom.navAuthBtn.addEventListener('click', () => this.openAuthModal('login'));
    }
    const heroCtaBtn = document.getElementById('hero-cta-btn');
    if (heroCtaBtn) {
      heroCtaBtn.addEventListener('click', () => this.openAuthModal('register'));
    }
    const heroDemoBtn = document.getElementById('hero-demo-btn');
    if (heroDemoBtn) {
      heroDemoBtn.addEventListener('click', () => this._loginDemoUser());
    }

    if (this.dom.authModalClose) {
      this.dom.authModalClose.addEventListener('click', () => this.closeAuthModal());
    }
    if (this.dom.forgotModalClose) {
      this.dom.forgotModalClose.addEventListener('click', () => this.dom.forgotModal.classList.add('hidden'));
    }
    if (this.dom.resultsModalClose) {
      this.dom.resultsModalClose.addEventListener('click', () => this.closeResultsModal());
    }

    // Tab Switching
    if (this.dom.tabLoginBtn && this.dom.tabRegisterBtn) {
      this.dom.tabLoginBtn.addEventListener('click', () => this._switchAuthTab('login'));
      this.dom.tabRegisterBtn.addEventListener('click', () => this._switchAuthTab('register'));
    }

    // Forms
    if (this.dom.loginForm) {
      this.dom.loginForm.addEventListener('submit', (e) => this._handleLogin(e));
    }
    if (this.dom.registerForm) {
      this.dom.registerForm.addEventListener('submit', (e) => this._handleRegister(e));
    }
    if (this.dom.forgotPasswordLink) {
      this.dom.forgotPasswordLink.addEventListener('click', (e) => {
        e.preventDefault();
        this.closeAuthModal();
        this.dom.forgotModal.classList.remove('hidden');
      });
    }
    if (this.dom.forgotForm) {
      this.dom.forgotForm.addEventListener('submit', (e) => this._handleForgot(e));
    }

    // Logout
    if (this.dom.navLogoutBtn) {
      this.dom.navLogoutBtn.addEventListener('click', () => {
        authService.logout();
        this._showView('guest');
      });
    }

    // Sound Toggle
    if (this.dom.navSoundBtn) {
      this.dom.navSoundBtn.addEventListener('click', () => {
        const isMuted = sound.toggleMute();
        this.dom.navSoundBtn.textContent = isMuted ? '🔇 Muted' : '🔊 Sound On';
        this.dom.navSoundBtn.classList.toggle('muted', isMuted);
      });
    }

    // Level Switcher Buttons
    this.dom.levelButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const level = btn.dataset.level;
        this.setLevel(level);
      });
    });

    // Game Mode Launchers
    if (this.dom.vocabCard) {
      this.dom.vocabCard.querySelector('.play-mode-btn').addEventListener('click', () => {
        this.launchGame('vocab');
      });
    }
    if (this.dom.grammarCard) {
      this.dom.grammarCard.querySelector('.play-mode-btn').addEventListener('click', () => {
        this.launchGame('grammar');
      });
    }
    if (this.dom.readingCard) {
      this.dom.readingCard.querySelector('.play-mode-btn').addEventListener('click', () => {
        this.launchGame('reading');
      });
    }

    // Exit Game Arena
    if (this.dom.gameExitBtn) {
      this.dom.gameExitBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to exit? Your current session progress will not be saved.')) {
          this.exitGameToDashboard();
        }
      });
    }

    // Results Actions
    if (this.dom.resultPlayAgainBtn) {
      this.dom.resultPlayAgainBtn.addEventListener('click', () => {
        this.closeResultsModal();
        if (this.activeMode) {
          this.launchGame(this.activeMode);
        }
      });
    }
    if (this.dom.resultBackHomeBtn) {
      this.dom.resultBackHomeBtn.addEventListener('click', () => {
        this.closeResultsModal();
        this.exitGameToDashboard();
      });
    }
  }

  _initAuthListener() {
    authService.onAuthStateChanged((user) => {
      this.currentUser = user;
      if (user) {
        this.currentLevel = user.currentLevel || 'beginner';
        this._updateUserUI();
        this._refreshHighScores();
        this._showView('dashboard');
      } else {
        this._showView('guest');
      }
    });
  }

  _showView(viewName) {
    this.dom.guestHeroView.classList.add('hidden');
    this.dom.dashboardView.classList.add('hidden');
    this.dom.gameView.classList.add('hidden');

    if (viewName === 'guest') {
      this.dom.guestHeroView.classList.remove('hidden');
      if (this.dom.navAuthBtn) this.dom.navAuthBtn.classList.remove('hidden');
      if (this.dom.navUserMenu) this.dom.navUserMenu.classList.add('hidden');
    } else if (viewName === 'dashboard') {
      this.dom.dashboardView.classList.remove('hidden');
      if (this.dom.navAuthBtn) this.dom.navAuthBtn.classList.add('hidden');
      if (this.dom.navUserMenu) this.dom.navUserMenu.classList.remove('hidden');
      this._refreshHighScores();
    } else if (viewName === 'game') {
      this.dom.gameView.classList.remove('hidden');
      if (this.dom.navAuthBtn) this.dom.navAuthBtn.classList.add('hidden');
      if (this.dom.navUserMenu) this.dom.navUserMenu.classList.remove('hidden');
    }
  }

  _updateUserUI() {
    if (!this.currentUser) return;
    if (this.dom.navUserEmail) {
      this.dom.navUserEmail.textContent = this.currentUser.displayName || this.currentUser.email;
    }
    if (this.dom.navUserLevelBadge) {
      this.dom.navUserLevelBadge.textContent = this._capitalize(this.currentLevel);
      this.dom.navUserLevelBadge.className = `level-pill-tag badge-${this.currentLevel}`;
    }

    // Update active level buttons state
    this.dom.levelButtons.forEach(btn => {
      if (btn.dataset.level === this.currentLevel) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  setLevel(level) {
    this.currentLevel = level;
    authService.updateLevel(level);
    this._updateUserUI();
    this._refreshHighScores();
  }

  _refreshHighScores() {
    if (!this.currentUser) return;
    const uid = this.currentUser.uid;

    const vocabHigh = dbService.getHighScore(uid, 'vocab', this.currentLevel);
    const grammarHigh = dbService.getHighScore(uid, 'grammar', this.currentLevel);
    const readingHigh = dbService.getHighScore(uid, 'reading', this.currentLevel);

    if (this.dom.vocabHighScoreVal) {
      this.dom.vocabHighScoreVal.textContent = ScoreEngine.formatScore(vocabHigh);
    }
    if (this.dom.grammarHighScoreVal) {
      this.dom.grammarHighScoreVal.textContent = ScoreEngine.formatScore(grammarHigh);
    }
    if (this.dom.readingHighScoreVal) {
      this.dom.readingHighScoreVal.textContent = ScoreEngine.formatScore(readingHigh);
    }
  }

  launchGame(mode) {
    if (!this.currentUser) {
      this.openAuthModal('login');
      return;
    }

    this.activeMode = mode;
    this._showView('game');

    // Update game arena header
    const modeNames = {
      vocab: 'Vocabulary Matching',
      grammar: 'Grammar Fill-in-the-Blank',
      reading: 'Korean Fables Reading'
    };

    if (this.dom.gameTitleText) {
      this.dom.gameTitleText.textContent = modeNames[mode] || 'Game';
    }
    if (this.dom.gameLevelBadge) {
      this.dom.gameLevelBadge.textContent = this._capitalize(this.currentLevel);
      this.dom.gameLevelBadge.className = `level-pill-tag badge-${this.currentLevel}`;
    }

    // Clear previous game
    if (this.activeGame && typeof this.activeGame.destroy === 'function') {
      this.activeGame.destroy();
    }

    const container = this.dom.gameContainer;
    container.innerHTML = '';

    const onCompleteCallback = (sessionResult) => this._onGameFinished(sessionResult);

    if (mode === 'vocab') {
      this.activeGame = new VocabGame(container, {
        level: this.currentLevel,
        onComplete: onCompleteCallback
      });
    } else if (mode === 'grammar') {
      this.activeGame = new GrammarGame(container, {
        level: this.currentLevel,
        onComplete: onCompleteCallback
      });
    } else if (mode === 'reading') {
      this.activeGame = new ReadingGame(container, {
        level: this.currentLevel,
        onComplete: onCompleteCallback
      });
    }

    this.activeGame.start();
  }

  _onGameFinished(result) {
    const uid = this.currentUser.uid;
    const sessionScore = result.score || 0;

    // Record score and check high score
    const scoreResult = dbService.recordScore(uid, result.mode, result.level, sessionScore);

    if (scoreResult.isNewHighScore && sessionScore > 0) {
      sound.playFanfare();
    }

    this._refreshHighScores();
    this._showResultsModal(result, scoreResult);
  }

  _showResultsModal(result, scoreResult) {
    const modal = this.dom.resultsModal;
    if (!modal) return;

    if (this.dom.resultScoreVal) {
      this.dom.resultScoreVal.textContent = ScoreEngine.formatScore(result.score);
    }

    // High score banner
    if (this.dom.resultHighScoreBanner) {
      if (scoreResult.isNewHighScore && result.score > 0) {
        this.dom.resultHighScoreBanner.classList.remove('hidden');
        this.dom.resultHighScoreBanner.innerHTML = `
          <div class="high-score-crown">👑 NEW PERSONAL HIGH SCORE! 👑</div>
          <p>You beat your previous best of ${ScoreEngine.formatScore(scoreResult.previousHigh)} pts!</p>
        `;
      } else {
        this.dom.resultHighScoreBanner.classList.add('hidden');
      }
    }

    // Detailed metrics list
    if (this.dom.resultDetailsList) {
      let itemsHtml = '';
      if (result.mode === 'vocab') {
        itemsHtml = `
          <div class="result-row">
            <span>Pairs Matched:</span>
            <strong>${result.matchedCount} / ${result.totalPairs}</strong>
          </div>
          <div class="result-row">
            <span>Time Left:</span>
            <strong>${result.timeRemaining}s</strong>
          </div>
        `;
      } else if (result.mode === 'grammar') {
        itemsHtml = `
          <div class="result-row">
            <span>Correct Answers:</span>
            <strong>${result.correctCount} / ${result.totalQuestions}</strong>
          </div>
          <div class="result-row">
            <span>Accuracy:</span>
            <strong>${Math.round((result.correctCount / result.totalQuestions) * 100)}%</strong>
          </div>
        `;
      } else if (result.mode === 'reading') {
        itemsHtml = `
          <div class="result-row">
            <span>Fable:</span>
            <strong class="hangul-text">${result.koreanTitle} (${result.fableTitle})</strong>
          </div>
          <div class="result-row">
            <span>Comprehension Score:</span>
            <strong>${result.correctCount} / ${result.totalQuestions}</strong>
          </div>
        `;
      }
      this.dom.resultDetailsList.innerHTML = itemsHtml;
    }

    modal.classList.remove('hidden');
  }

  closeResultsModal() {
    if (this.dom.resultsModal) {
      this.dom.resultsModal.classList.add('hidden');
    }
  }

  exitGameToDashboard() {
    if (this.activeGame && typeof this.activeGame.destroy === 'function') {
      this.activeGame.destroy();
      this.activeGame = null;
    }
    this._showView('dashboard');
  }

  // --- Auth Handlers ---

  openAuthModal(tab = 'login') {
    this._clearAuthAlerts();
    this._switchAuthTab(tab);
    if (this.dom.authModal) {
      this.dom.authModal.classList.remove('hidden');
    }
  }

  closeAuthModal() {
    if (this.dom.authModal) {
      this.dom.authModal.classList.add('hidden');
    }
    this._clearAuthAlerts();
  }

  _switchAuthTab(tab) {
    this._clearAuthAlerts();
    if (tab === 'login') {
      this.dom.tabLoginBtn.classList.add('active');
      this.dom.tabRegisterBtn.classList.remove('active');
      this.dom.loginForm.classList.remove('hidden');
      this.dom.registerForm.classList.add('hidden');
    } else {
      this.dom.tabRegisterBtn.classList.add('active');
      this.dom.tabLoginBtn.classList.remove('active');
      this.dom.registerForm.classList.remove('hidden');
      this.dom.loginForm.classList.add('hidden');
    }
  }

  async _handleLogin(e) {
    e.preventDefault();
    this._clearAuthAlerts();

    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-password').value;

    try {
      await authService.login(email, pass);
      this.closeAuthModal();
      this.dom.loginForm.reset();
    } catch (err) {
      this._showAuthError(err.message);
    }
  }

  async _handleRegister(e) {
    e.preventDefault();
    this._clearAuthAlerts();

    const email = document.getElementById('reg-email').value;
    const name = document.getElementById('reg-name').value;
    const pass = document.getElementById('reg-password').value;

    try {
      await authService.register(email, pass, name);
      this.closeAuthModal();
      this.dom.registerForm.reset();
    } catch (err) {
      this._showAuthError(err.message);
    }
  }

  async _handleForgot(e) {
    e.preventDefault();
    const email = document.getElementById('forgot-email').value;
    try {
      const res = await authService.resetPassword(email);
      alert(`✅ Success: ${res.message}`);
      this.dom.forgotModal.classList.add('hidden');
      this.dom.forgotForm.reset();
    } catch (err) {
      alert(`⚠️ Error: ${err.message}`);
    }
  }

  async _loginDemoUser() {
    try {
      // Create or log into a quick demo learner account
      const demoEmail = 'learner@koreanapp.io';
      const demoPass = 'learnkorean123';
      try {
        await authService.login(demoEmail, demoPass);
      } catch (e) {
        await authService.register(demoEmail, demoPass, 'Korean Learner');
      }
    } catch (err) {
      console.error('Demo login error', err);
    }
  }

  _showAuthError(msg) {
    if (this.dom.authErrorAlert) {
      this.dom.authErrorAlert.textContent = msg;
      this.dom.authErrorAlert.classList.remove('hidden');
    }
  }

  _clearAuthAlerts() {
    if (this.dom.authErrorAlert) {
      this.dom.authErrorAlert.textContent = '';
      this.dom.authErrorAlert.classList.add('hidden');
    }
    if (this.dom.authSuccessAlert) {
      this.dom.authSuccessAlert.textContent = '';
      this.dom.authSuccessAlert.classList.add('hidden');
    }
  }

  _capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

// Bootstrap on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
  window.__KOREAN_APP = app; // Expose for testing/debugging
});
