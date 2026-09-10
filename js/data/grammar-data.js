/**
 * Curated Grammar Fill-in-the-Blank Dataset
 * Strict exact-match checking per SRS requirements.
 * Tuned with clear, accessible beginner & intermediate levels.
 */

export const GRAMMAR_DATA = {
  beginner: [
    {
      id: 'gb_01',
      sentenceWithBlank: '나___ 학생이에요.',
      blankTarget: '는',
      hint: 'Topic particle after a vowel: 나 (I) + 는',
      fullSentence: '나는 학생이에요.',
      englishTranslation: 'I am a student.',
      grammarPoint: 'Topic particle 은/는'
    },
    {
      id: 'gb_02',
      sentenceWithBlank: '사과___ 맛있어요.',
      blankTarget: '가',
      hint: 'Subject particle after a vowel: 사과 (apple) + 가',
      fullSentence: '사과가 맛있어요.',
      englishTranslation: 'The apple is delicious.',
      grammarPoint: 'Subject particle 이/가'
    },
    {
      id: 'gb_03',
      sentenceWithBlank: '물___ 마셔요.',
      blankTarget: '을',
      hint: 'Object particle after a consonant: 물 (water) + 을',
      fullSentence: '물을 마셔요.',
      englishTranslation: 'I drink water.',
      grammarPoint: 'Object particle 을/를'
    },
    {
      id: 'gb_04',
      sentenceWithBlank: '학교___ 가요.',
      blankTarget: '에',
      hint: 'Location / direction particle (to school)',
      fullSentence: '학교에 가요.',
      englishTranslation: 'I go to school.',
      grammarPoint: 'Location particle 에 (to/at)'
    },
    {
      id: 'gb_05',
      sentenceWithBlank: '집___ 쉬어요.',
      blankTarget: '에서',
      hint: 'Action location particle (rest at home)',
      fullSentence: '집에서 쉬어요.',
      englishTranslation: 'I rest at home.',
      grammarPoint: 'Action location 에서 (at/in)'
    },
    {
      id: 'gb_06',
      sentenceWithBlank: '밥을 맛있게 먹어___.',
      blankTarget: '요',
      hint: 'Polite friendly sentence ending (해요 style)',
      fullSentence: '밥을 맛있게 먹어요.',
      englishTranslation: 'I eat a meal deliciously.',
      grammarPoint: 'Polite sentence ending -요'
    },
    {
      id: 'gb_07',
      sentenceWithBlank: '이것은 한국어 책___에요.',
      blankTarget: '이',
      hint: 'Noun copula after consonant: 책 + 이에요 (it is a book)',
      fullSentence: '이것은 한국어 책이에요.',
      englishTranslation: 'This is a Korean book.',
      grammarPoint: 'Noun + 이에요/예요'
    },
    {
      id: 'gb_08',
      sentenceWithBlank: '친구___과 함께 놀아요.',
      blankTarget: '들',
      hint: 'Plural suffix for people: 친구 (friend) + 들 (friends)',
      fullSentence: '친구들과 함께 놀아요.',
      englishTranslation: 'I play together with friends.',
      grammarPoint: 'Plural suffix -들'
    }
  ],
  intermediate: [
    {
      id: 'gi_01',
      sentenceWithBlank: '밥을 먹___ 영화를 봤어요.',
      blankTarget: '고',
      hint: 'And / sequential action connective: 먹다 + -고',
      fullSentence: '밥을 먹고 영화를 봤어요.',
      englishTranslation: 'I ate a meal and watched a movie.',
      grammarPoint: '-고 (and / then)'
    },
    {
      id: 'gi_02',
      sentenceWithBlank: '비가 오___ 기분이 좋아요.',
      blankTarget: '지만',
      hint: 'Contrast connective (but / although): 오다 + -지만',
      fullSentence: '비가 오지만 기분이 좋아요.',
      englishTranslation: 'Although it is raining, I feel good.',
      grammarPoint: '-지만 (but / although)'
    },
    {
      id: 'gi_03',
      sentenceWithBlank: '책을 사___ 서점에 갔어요.',
      blankTarget: '러',
      hint: 'Purpose particle (-(으)러 가다): 사다 + -러',
      fullSentence: '책을 사러 서점에 갔어요.',
      englishTranslation: 'I went to the bookstore in order to buy a book.',
      grammarPoint: '-(으)러 가다 (go in order to)'
    },
    {
      id: 'gi_04',
      sentenceWithBlank: '한국어를 할 ___ 있어요.',
      blankTarget: '수',
      hint: 'Ability grammar pattern: -(으)ㄹ 수 있다 (can do)',
      fullSentence: '한국어를 할 수 있어요.',
      englishTranslation: 'I can speak Korean.',
      grammarPoint: '-(으)ㄹ 수 있다 (can do)'
    },
    {
      id: 'gi_05',
      sentenceWithBlank: '어제 친구를 만___어요.',
      blankTarget: '났',
      hint: 'Past tense of 만나다: 만나 + 았어요 = 만났어요',
      fullSentence: '어제 친구를 만났어요.',
      englishTranslation: 'I met a friend yesterday.',
      grammarPoint: 'Past tense -았/었어요'
    },
    {
      id: 'gi_06',
      sentenceWithBlank: '내일 공원에서 운동을 ___ 거예요.',
      blankTarget: '할',
      hint: 'Future tense of 하다: 하 + -ㄹ 거예요 = 할 거예요',
      fullSentence: '내일 공원에서 운동을 할 거예요.',
      englishTranslation: 'I will exercise at the park tomorrow.',
      grammarPoint: 'Future tense -(으)ㄹ 거예요'
    },
    {
      id: 'gi_07',
      sentenceWithBlank: '날씨가 좋___ 산책을 했어요.',
      blankTarget: '아서',
      hint: 'Reason/cause connective: 좋다 + -아서',
      fullSentence: '날씨가 좋아서 산책을 했어요.',
      englishTranslation: 'Because the weather was good, I took a walk.',
      grammarPoint: '-아/어서 (because / since)'
    },
    {
      id: 'gi_08',
      sentenceWithBlank: '오늘은 춥___ 않아요.',
      blankTarget: '지',
      hint: 'Standard negation pattern: 춥다 + -지 않다',
      fullSentence: '오늘은 춥지 않아요.',
      englishTranslation: 'Today is not cold.',
      grammarPoint: '-지 않다 (not / negation)'
    }
  ],
  advanced: [
    {
      id: 'ga_01',
      sentenceWithBlank: '그는 능력이 뛰어날 ___ 아니라 성품도 바르다.',
      blankTarget: '뿐만',
      hint: 'Addition pattern: Not only... but also (-(으)ㄹ 뿐만 아니라)',
      fullSentence: '그는 능력이 뛰어날 뿐만 아니라 성품도 바르다.',
      englishTranslation: 'Not only is he extraordinarily capable, but his character is also upright.',
      grammarPoint: '-(으)ㄹ 뿐만 아니라'
    },
    {
      id: 'ga_02',
      sentenceWithBlank: '경제 위기를 극복하___ 위한 대책이 시급하다.',
      blankTarget: '기',
      hint: 'Nominalizer for purpose expression (-기 위해/위하여)',
      fullSentence: '경제 위기를 극복하기 위한 대책이 시급하다.',
      englishTranslation: 'Countermeasures to overcome the economic crisis are urgently required.',
      grammarPoint: '-기 위해(서)'
    },
    {
      id: 'ga_03',
      sentenceWithBlank: '여러 정황___ 미루어 보아 그의 주장이 사실일 가능성이 높다.',
      blankTarget: '으로',
      hint: 'Inference particle from evidence (-(으)로 미루어 보아)',
      fullSentence: '여러 정황으로 미루어 보아 그의 주장이 사실일 가능성이 높다.',
      englishTranslation: 'Judging by various circumstances, it is highly likely that his claim is true.',
      grammarPoint: '-(으)로 미루어 보아 (judging by)'
    },
    {
      id: 'ga_04',
      sentenceWithBlank: '현대 사회는 기술 발전에 발맞추___ 끊임없이 변화하고 있다.',
      blankTarget: '어',
      hint: 'Idiomatic connective meaning keeping pace with (발맞추어)',
      fullSentence: '현대 사회는 기술 발전에 발맞추어 끊임없이 변화하고 있다.',
      englishTranslation: 'Modern society is constantly changing in step with technological advancement.',
      grammarPoint: '-에 발맞추어 (in step with)'
    },
    {
      id: 'ga_05',
      sentenceWithBlank: '성공은 결코 우연히 얻어지는 것이 아___ 끊임없는 노력의 결실이다.',
      blankTarget: '니라',
      hint: 'Not A but B negative contrastive structure (-이/가 아니라)',
      fullSentence: '성공은 결코 우연히 얻어지는 것이 아니라 끊임없는 노력의 결실이다.',
      englishTranslation: 'Success is never achieved by coincidence, but is rather the fruit of relentless effort.',
      grammarPoint: '-이/가 아니라 (not A but B)'
    },
    {
      id: 'ga_06',
      sentenceWithBlank: '기후 변화 문제에 대해 정부가 적극적으로 대응하___ 못하면 큰 재난이 올 것이다.',
      blankTarget: '지',
      hint: 'Long form negation (-지 못하다)',
      fullSentence: '기후 변화 문제에 대해 정부가 적극적으로 대응하지 못하면 큰 재난이 올 것이다.',
      englishTranslation: 'If the government cannot respond proactively to climate change, a major catastrophe will follow.',
      grammarPoint: '-지 못하다 (unable to)'
    }
  ]
};

/**
 * Returns a randomized subset of grammar questions for the selected level
 * @param {'beginner' | 'intermediate' | 'advanced'} level 
 * @param {number} count Number of questions (default 5)
 */
export function getRandomGrammarQuestions(level = 'beginner', count = 5) {
  const pool = GRAMMAR_DATA[level] || GRAMMAR_DATA.beginner;
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
