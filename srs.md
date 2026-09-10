# Software Requirements Specification (SRS)
## Korean Learning App (MVP)

**Version:** 1.0
**Date:** August 18, 2026
**Status:** Draft

---

## 1. Introduction

### 1.1 Purpose
This document specifies the requirements for a browser-based Korean language learning application. The app helps learners of all levels build vocabulary, grammar, and reading comprehension skills through three gamified practice modes, each with its own score-tracking system.

### 1.2 Scope
The MVP consists of exactly four features:
1. Score tracker (per game mode, with high scores)
2. Vocabulary matching game
3. Grammar fill-in-the-blank (type-in)
4. Reading comprehension using Korean fables

No stretch goals are included in this version. Anything not explicitly listed below is out of scope for the MVP.

### 1.3 Target Users
Learners across all proficiency levels (Beginner / Intermediate / Advanced), self-selecting their level rather than being placed by the app. Each user has a persistent account so progress and scores follow them across devices.

### 1.4 Platform
Web application (browser-based), responsive enough for desktop use. Mobile-native apps are out of scope.

---

## 2. Overall Description

### 2.1 User Roles
| Role | Description |
|---|---|
| Guest (unauthenticated) | Can view landing/login page only. Cannot play or save scores. |
| Registered User | Full access to all three game modes, personal high scores, and level selection. |

Only one role is needed for MVP — there is no admin/content-management role, since content is pulled from external sources rather than authored in-app.

### 2.2 Authentication
- Email + password registration and login.
- Standard session handling (e.g., Firebase Auth or equivalent).
- Password reset flow (minimum: "forgot password" email link).
- No OAuth/social login in MVP.

### 2.3 Levels
- Three fixed levels: **Beginner**, **Intermediate**, **Advanced**.
- User manually selects their level from a menu before starting any game mode; the app does not auto-assess or adapt.
- Level selection determines which content pool (vocab, grammar, fables) is served in a given session.
- A user can switch levels freely at any time.

---

## 3. Functional Requirements

### 3.1 Score Tracker (cross-cutting)
- **FR-1.1**: The system shall maintain a separate high score per user, per game mode (Vocab Matching, Grammar Fill-in-the-Blank, Reading Comprehension).
- **FR-1.2**: High scores shall persist across sessions and devices, tied to the user's account.
- **FR-1.3**: At the end of each game session, the system shall display the session score and, if it beats the stored high score, indicate a new high score and update it.
- **FR-1.4**: The system shall display the user's current high score for a mode before they start playing it.
- **FR-1.5**: Scoring formula (applies to all three modes): **points per correct answer + a speed bonus** based on how quickly the answer was submitted within a per-question time limit. Incorrect or timed-out answers earn 0 points and no bonus.
- **FR-1.6**: No global/cross-user leaderboard in MVP — high scores are personal only.

### 3.2 Vocabulary Matching
- **FR-2.1**: The system shall present a matching game where the user pairs Korean words with their English meanings (e.g., grid or drag-and-match format), drawn from the vocab pool for the selected level.
- **FR-2.2**: Each round shall pull a set of vocab pairs (exact set size TBD in design phase, e.g., 8–10 pairs) from the level-appropriate content pool.
- **FR-2.3**: Each correct match scores points per FR-1.5; a visible per-question or per-round timer drives the speed bonus.
- **FR-2.4**: On round completion, show total round score and update high score per FR-1.3.

### 3.3 Grammar Fill-in-the-Blank
- **FR-3.1**: The system shall present a Korean sentence with a blank and a text input field for the user to type the missing grammar element (particle, verb ending, etc.).
- **FR-3.2**: Answer checking is **exact match only** — the typed answer must match the expected string exactly (including spacing/spelling) to be marked correct. No partial credit or fuzzy matching in MVP.
- **FR-3.3**: Each question is scored per FR-1.5 (correct + speed bonus).
- **FR-3.4**: Content (sentences + correct answers) is drawn from the grammar pool for the selected level.
- **FR-3.5**: On session completion, show total score and update high score per FR-1.3.

### 3.4 Reading Comprehension
- **FR-4.1**: The system shall present a short Korean fable (sourced from free, publicly available Korean fable content) appropriate to the selected level.
- **FR-4.2**: After reading, the system shall present multiple-choice comprehension questions about the fable.
- **FR-4.3**: Each correctly answered question is scored per FR-1.5.
- **FR-4.4**: On completion, show total score and update high score per FR-1.3.
- **FR-4.5**: Fables and their associated MCQs must be pre-paired — i.e., each fable in the content pool has a fixed set of comprehension questions and correct answers associated with it (curated or generated ahead of time, not dynamically at runtime).

---

## 4. Content & Data Sources

Since content is pulled from external/public sources rather than hand-authored:

| Content type | Candidate source(s) | Notes |
|---|---|---|
| Vocabulary (word + meaning, leveled) | KRDict — National Institute of Korean Language's basic dictionary (public API); TOPIK-leveled word lists compiled from NIKL/TOPIK public releases (available in several open GitHub datasets as CSV/TSV/JSON) | Needs mapping to Beginner/Intermediate/Advanced buckets (can reuse TOPIK I–VI level tags) |
| Grammar sentences + blanks | Needs to be curated — no single clean free API for fill-in-the-blank grammar exists; likely requires assembling from an open grammar-pattern list (e.g., TOPIK grammar pattern lists) and manually defining the blank + correct answer for each | Treat as a small curated seed set for MVP; exact-match answers need to be unambiguous |
| Korean fables | No single free API; will need to be sourced as public-domain/free-to-use Korean folktale text (e.g., public domain fable collections) and manually paired with MCQs | Since this is "found," not authored from scratch, treat as a **content-sourcing task**, not a live API integration |

**Design implication:** vocabulary can realistically be fetched/synced from an external source; grammar and reading content will likely need to be pre-processed into your own database (seeded once, not fetched live), since no clean structured API exists for those two.

---

## 5. Non-Functional Requirements

- **NFR-1 (Performance)**: Game screens (vocab matching, fill-in-blank, reading) should load in under 2 seconds on a standard connection.
- **NFR-2 (Persistence)**: All user data (account, level preference, high scores) must persist reliably across sessions and devices.
- **NFR-3 (Browser support)**: Latest versions of Chrome, Firefox, Safari, Edge.
- **NFR-4 (Korean text rendering)**: UI must correctly render Hangul across supported browsers/fonts, including in text input fields for the fill-in-the-blank mode.
- **NFR-5 (Security)**: Passwords stored using standard hashing (handled by auth provider, e.g., Firebase Auth); no plaintext storage.

---

## 6. Proposed Tech Stack

- **Frontend**: React
- **Backend/Auth/DB**: Firebase (Firebase Auth for email/password login; Firestore for user profiles, high scores, and cached content)
- **Hosting**: Firebase Hosting (or equivalent static host)

This is a simple, low-ops stack suited to an MVP scope — no custom backend server required.

---

## 7. Data Model (draft)

**User**
- `id`, `email`, `passwordHash` (managed by auth provider), `currentLevel` (enum: Beginner/Intermediate/Advanced), `createdAt`

**HighScore**
- `userId`, `gameMode` (enum: vocab/grammar/reading), `score`, `updatedAt`

**VocabItem**
- `id`, `korean`, `english`, `level` (enum), `source`

**GrammarItem**
- `id`, `sentenceWithBlank`, `correctAnswer`, `level` (enum)

**Fable**
- `id`, `title`, `bodyText`, `level` (enum), `questions: [ { question, options[4], correctOptionIndex } ]`

---

## 8. Assumptions & Constraints

- Content curation (grammar sentences, fables + MCQs) is a manual/semi-manual sourcing task and will need to happen before or alongside development — it is not a live third-party API integration.
- No adaptive difficulty engine — level selection is entirely user-driven.
- No social/multiplayer features, no global leaderboard, no admin CMS in MVP.
- Speed-bonus timing thresholds and exact point values are implementation details to be finalized during design (not specified numerically here).

## 9. Out of Scope (MVP)

- Mobile native apps
- OAuth/social login
- Global leaderboards
- Adaptive/AI-driven difficulty
- Admin content-management panel
- Fuzzy/partial-credit answer checking
- Audio/pronunciation features
