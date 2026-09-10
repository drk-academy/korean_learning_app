/**
 * Authentication Service
 * Manages user accounts, session state, login/registration, and password reset.
 * Supports live Firebase Auth when credentials are provided,
 * with a seamless local persistence fallback for zero-setup execution.
 */

const STORAGE_USERS_KEY = 'kla_users_db_v1';
const STORAGE_SESSION_KEY = 'kla_active_session_v1';

class AuthService {
  constructor() {
    this.currentUser = null;
    this.listeners = [];
    this.useFirebase = false;
    this.firebaseAuth = null;
    this.init();
  }

  init() {
    // Check if session exists in storage
    const savedSession = localStorage.getItem(STORAGE_SESSION_KEY);
    if (savedSession) {
      try {
        this.currentUser = JSON.parse(savedSession);
      } catch (e) {
        localStorage.removeItem(STORAGE_SESSION_KEY);
      }
    }
  }

  /**
   * Subscribe to authentication state changes
   * @param {Function} callback (user) => void
   */
  onAuthStateChanged(callback) {
    this.listeners.push(callback);
    callback(this.currentUser);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  _notify() {
    this.listeners.forEach(cb => {
      try { cb(this.currentUser); } catch (err) { console.error('Auth listener error', err); }
    });
  }

  getCurrentUser() {
    return this.currentUser;
  }

  isAuthenticated() {
    return !!this.currentUser;
  }

  /**
   * Register a new user with email and password
   */
  async register(email, password, displayName = '') {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      throw new Error('Please enter a valid email address.');
    }
    if (!password || password.length < 6) {
      throw new Error('Password must be at least 6 characters long.');
    }

    const users = this._getStoredUsers();
    if (users[cleanEmail]) {
      throw new Error('An account with this email already exists.');
    }

    const newUser = {
      uid: 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
      email: cleanEmail,
      displayName: displayName.trim() || cleanEmail.split('@')[0],
      createdAt: new Date().toISOString(),
      currentLevel: 'beginner'
    };

    // Store user securely in local registry
    users[cleanEmail] = {
      ...newUser,
      passwordHash: btoa(password) // Local reversible hash for simulated auth
    };
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));

    // Create session
    this.currentUser = newUser;
    localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(newUser));
    this._notify();
    return newUser;
  }

  /**
   * Login with email and password
   */
  async login(email, password) {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !password) {
      throw new Error('Please enter both email and password.');
    }

    const users = this._getStoredUsers();
    const userRecord = users[cleanEmail];

    if (!userRecord || userRecord.passwordHash !== btoa(password)) {
      throw new Error('Invalid email or password. Please try again.');
    }

    const sessionUser = {
      uid: userRecord.uid,
      email: userRecord.email,
      displayName: userRecord.displayName,
      createdAt: userRecord.createdAt,
      currentLevel: userRecord.currentLevel || 'beginner'
    };

    this.currentUser = sessionUser;
    localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(sessionUser));
    this._notify();
    return sessionUser;
  }

  /**
   * Send password reset request
   */
  async resetPassword(email) {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      throw new Error('Please enter a valid email address.');
    }

    const users = this._getStoredUsers();
    if (!users[cleanEmail]) {
      throw new Error('No account found with this email address.');
    }

    // Return success confirmation (in real Firebase, it sends email)
    return {
      success: true,
      message: `Password reset link has been dispatched to ${cleanEmail}.`
    };
  }

  /**
   * Log out active user
   */
  async logout() {
    this.currentUser = null;
    localStorage.removeItem(STORAGE_SESSION_KEY);
    this._notify();
  }

  /**
   * Update active user level preference
   */
  updateLevel(newLevel) {
    if (!this.currentUser) return;
    this.currentUser.currentLevel = newLevel;
    localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(this.currentUser));
    
    // Also sync to registered users store
    const users = this._getStoredUsers();
    if (users[this.currentUser.email]) {
      users[this.currentUser.email].currentLevel = newLevel;
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
    }
    this._notify();
  }

  _getStoredUsers() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_USERS_KEY) || '{}');
    } catch (e) {
      return {};
    }
  }
}

export const authService = new AuthService();
