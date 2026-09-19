/**
 * Curated Grammar Fill-in-the-Blank Dataset
 * Includes Units 1-4 Grammar Sentences plus core foundational grammar exercises.
 * Strict exact-match checking per SRS requirements.
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
    },
    {
      id: 'gb_09',
      sentenceWithBlank: '할아버지께서 뉴저지에 사___.',
      blankTarget: '세요',
      hint: 'Honorific ending after a verb',
      fullSentence: '할아버지께서 뉴저지에 사세요.',
      englishTranslation: 'Grandfather lives in New Jersey.',
      grammarPoint: '-세요/으세요 (honorific)'
    },
    {
      id: 'gb_10',
      sentenceWithBlank: '할머니는 한국 요리를 잘 하___.',
      blankTarget: '세요',
      hint: 'Honorific ending after 하다',
      fullSentence: '할머니는 한국 요리를 잘 하세요.',
      englishTranslation: 'Grandmother is good at Korean cooking.',
      grammarPoint: '-세요/으세요 (honorific)'
    },
    {
      id: 'gb_11',
      sentenceWithBlank: '아버지께서 책을 읽___.',
      blankTarget: '으세요',
      hint: 'Honorific ending after a consonant-ending verb',
      fullSentence: '아버지께서 책을 읽으세요.',
      englishTranslation: 'Father reads a book.',
      grammarPoint: '-세요/으세요 (honorific)'
    },
    {
      id: 'gb_12',
      sentenceWithBlank: '할아버지는 재미있으시___ 골프를 잘 치세요.',
      blankTarget: '고',
      hint: 'Connect two descriptions',
      fullSentence: '할아버지는 재미있으시고 골프를 잘 치세요.',
      englishTranslation: 'Grandfather is fun and plays golf well.',
      grammarPoint: '-고 (listing)'
    },
    {
      id: 'gb_13',
      sentenceWithBlank: '할머니는 친절하시___ 한국 요리를 잘 하세요.',
      blankTarget: '고',
      hint: 'Connect two descriptions',
      fullSentence: '할머니는 친절하시고 한국 요리를 잘 하세요.',
      englishTranslation: 'Grandmother is kind and cooks Korean food well.',
      grammarPoint: '-고 (listing)'
    },
    {
      id: 'gb_14',
      sentenceWithBlank: '오빠는 키가 크___ 똑똑해요.',
      blankTarget: '고',
      hint: 'Connect two descriptions',
      fullSentence: '오빠는 키가 크고 똑똑해요.',
      englishTranslation: 'My older brother is tall and smart.',
      grammarPoint: '-고 (listing)'
    },
    {
      id: 'gb_15',
      sentenceWithBlank: '동생은 재미있___ 귀여워요.',
      blankTarget: '고',
      hint: 'Connect two descriptions',
      fullSentence: '동생은 재미있고 귀여워요.',
      englishTranslation: 'My younger sibling is fun and cute.',
      grammarPoint: '-고 (listing)'
    },
    {
      id: 'gb_16',
      sentenceWithBlank: '누나는 피아노를 치___ 노래를 불러요.',
      blankTarget: '고',
      hint: 'Connect two actions',
      fullSentence: '누나는 피아노를 치고 노래를 불러요.',
      englishTranslation: 'My older sister plays the piano and sings.',
      grammarPoint: '-고 (listing)'
    },
    {
      id: 'gb_17',
      sentenceWithBlank: '언니는 춤을 추___ 그림을 그려요.',
      blankTarget: '고',
      hint: 'Connect two actions',
      fullSentence: '언니는 춤을 추고 그림을 그려요.',
      englishTranslation: 'My older sister dances and draws.',
      grammarPoint: '-고 (listing)'
    },
    {
      id: 'gb_18',
      sentenceWithBlank: '우리 동네에는 공원이 있___.',
      blankTarget: '습니다',
      hint: 'Formal polite ending',
      fullSentence: '우리 동네에는 공원이 있습니다.',
      englishTranslation: 'There is a park in our neighborhood.',
      grammarPoint: '-ㅂ니다/습니다'
    },
    {
      id: 'gb_19',
      sentenceWithBlank: '공원이 아주 크___.',
      blankTarget: 'ㅂ니다',
      hint: 'Formal ending after a vowel-ending adjective',
      fullSentence: '공원이 아주 큽니다.',
      englishTranslation: 'The park is very big.',
      grammarPoint: '-ㅂ니다/습니다'
    },
    {
      id: 'gb_20',
      sentenceWithBlank: '공원에 꽃하고 나무가 많___.',
      blankTarget: '습니다',
      hint: 'Formal ending after a consonant-ending adjective',
      fullSentence: '공원에 꽃하고 나무가 많습니다.',
      englishTranslation: 'There are many flowers and trees in the park.',
      grammarPoint: '-ㅂ니다/습니다'
    },
    {
      id: 'gb_21',
      sentenceWithBlank: '공원 안에는 테니스장과 놀이터가 있___.',
      blankTarget: '습니다',
      hint: 'Formal polite ending',
      fullSentence: '공원 안에는 테니스장과 놀이터가 있습니다.',
      englishTranslation: 'There is a tennis court and a playground in the park.',
      grammarPoint: '-ㅂ니다/습니다'
    },
    {
      id: 'gb_22',
      sentenceWithBlank: '우리 동네에 도서관이 있___?',
      blankTarget: '습니까',
      hint: 'Formal question ending',
      fullSentence: '우리 동네에 도서관이 있습니까?',
      englishTranslation: 'Is there a library in our neighborhood?',
      grammarPoint: '-ㅂ니까?/습니까?'
    },
    {
      id: 'gb_23',
      sentenceWithBlank: '오늘 어디에 갑___?',
      blankTarget: '니까',
      hint: 'Formal question ending after 가다',
      fullSentence: '오늘 어디에 갑니까?',
      englishTranslation: 'Where are you going today?',
      grammarPoint: '-ㅂ니까?/습니까?'
    },
    {
      id: 'gb_24',
      sentenceWithBlank: '누구하고 같이 밥을 먹___?',
      blankTarget: '습니까',
      hint: 'Formal question ending',
      fullSentence: '누구하고 같이 밥을 먹습니까?',
      englishTranslation: 'Who do you eat with?',
      grammarPoint: '-ㅂ니까?/습니까?'
    },
    {
      id: 'gb_25',
      sentenceWithBlank: '저는 밥을 먹___ 텔레비전을 봐요.',
      blankTarget: '고',
      hint: 'Sequence two actions',
      fullSentence: '저는 밥을 먹고 텔레비전을 봐요.',
      englishTranslation: 'I eat and then watch television.',
      grammarPoint: '-고 (sequence)'
    },
    {
      id: 'gb_26',
      sentenceWithBlank: '아침에 이를 닦___ 세수해요.',
      blankTarget: '고',
      hint: 'Sequence two actions',
      fullSentence: '아침에 이를 닦고 세수해요.',
      englishTranslation: 'In the morning, I brush my teeth and wash my face.',
      grammarPoint: '-고 (sequence)'
    },
    {
      id: 'gb_27',
      sentenceWithBlank: '숙제를 하___ 텔레비전을 볼 거예요.',
      blankTarget: '고',
      hint: 'Sequence two actions',
      fullSentence: '숙제를 하고 텔레비전을 볼 거예요.',
      englishTranslation: 'I will do my homework and then watch television.',
      grammarPoint: '-고 (sequence)'
    },
    {
      id: 'gb_28',
      sentenceWithBlank: '수업이 끝나___ 공원에 가요.',
      blankTarget: '고',
      hint: 'Sequence two actions',
      fullSentence: '수업이 끝나고 공원에 가요.',
      englishTranslation: 'After class ends, I go to the park.',
      grammarPoint: '-고 (sequence)'
    },
    {
      id: 'gb_29',
      sentenceWithBlank: '배가 아파___ 학교에 못 갔어요.',
      blankTarget: '서',
      hint: 'Reason after 아프다 → 아파서',
      fullSentence: '배가 아파서 학교에 못 갔어요.',
      englishTranslation: 'I couldn\'t go to school because my stomach hurt.',
      grammarPoint: '-아서/어서 (reason)'
    },
    {
      id: 'gb_30',
      sentenceWithBlank: '비가 와___ 놀이터에 못 가요.',
      blankTarget: '서',
      hint: 'Reason after 오다 → 와서',
      fullSentence: '비가 와서 놀이터에 못 가요.',
      englishTranslation: 'I can\'t go to the playground because it is raining.',
      grammarPoint: '-아서/어서 (reason)'
    },
    {
      id: 'gb_31',
      sentenceWithBlank: '숙제가 많아___ 게임을 못 해요.',
      blankTarget: '서',
      hint: 'Reason after 많다 → 많아서',
      fullSentence: '숙제가 많아서 게임을 못 해요.',
      englishTranslation: 'I can\'t play games because I have a lot of homework.',
      grammarPoint: '-아서/어서 (reason)'
    },
    {
      id: 'gb_32',
      sentenceWithBlank: '늦게 일어나___ 아침을 못 먹었어요.',
      blankTarget: '서',
      hint: 'Reason after 일어나다',
      fullSentence: '늦게 일어나서 아침을 못 먹었어요.',
      englishTranslation: 'I couldn\'t eat breakfast because I woke up late.',
      grammarPoint: '-아서/어서 (reason)'
    },
    {
      id: 'gb_33',
      sentenceWithBlank: '버스를 잘못 타___ 늦었어요.',
      blankTarget: '서',
      hint: 'Reason after 타다 → 타서',
      fullSentence: '버스를 잘못 타서 늦었어요.',
      englishTranslation: 'I was late because I took the wrong bus.',
      grammarPoint: '-아서/어서 (reason)'
    },
    {
      id: 'gb_34',
      sentenceWithBlank: '저는 오늘 수영을 ___ 해요.',
      blankTarget: '못',
      hint: 'Put before the verb to express inability',
      fullSentence: '저는 오늘 수영을 못 해요.',
      englishTranslation: 'I can\'t swim today.',
      grammarPoint: '못 (cannot)'
    },
    {
      id: 'gb_35',
      sentenceWithBlank: '저는 매운 음식을 ___ 먹어요.',
      blankTarget: '못',
      hint: 'Put before the verb',
      fullSentence: '저는 매운 음식을 못 먹어요.',
      englishTranslation: 'I can\'t eat spicy food.',
      grammarPoint: '못 (cannot)'
    },
    {
      id: 'gb_36',
      sentenceWithBlank: '오늘 친구를 ___ 만나요.',
      blankTarget: '못',
      hint: 'Put before the verb',
      fullSentence: '오늘 친구를 못 만나요.',
      englishTranslation: 'I can\'t meet my friend today.',
      grammarPoint: '못 (cannot)'
    },
    {
      id: 'gb_37',
      sentenceWithBlank: '약속을 못 지켜___ 미안해.',
      blankTarget: '서',
      hint: 'Give a reason for apologizing',
      fullSentence: '약속을 못 지켜서 미안해.',
      englishTranslation: 'I\'m sorry because I couldn\'t keep my promise.',
      grammarPoint: '-아서/어서 (reason)'
    },
    {
      id: 'gb_38',
      sentenceWithBlank: '책을 읽___ 도서관에 가요.',
      blankTarget: '으러',
      hint: 'Purpose after consonant-ending verb',
      fullSentence: '책을 읽으러 도서관에 가요.',
      englishTranslation: 'I go to the library to read a book.',
      grammarPoint: '-러/으러 가다'
    },
    {
      id: 'gb_39',
      sentenceWithBlank: '약을 사___ 약국에 가요.',
      blankTarget: '러',
      hint: 'Purpose after vowel-ending verb',
      fullSentence: '약을 사러 약국에 가요.',
      englishTranslation: 'I go to the pharmacy to buy medicine.',
      grammarPoint: '-러/으러 가다'
    },
    {
      id: 'gb_40',
      sentenceWithBlank: '밥을 먹___ 식당에 가요.',
      blankTarget: '으러',
      hint: 'Purpose after consonant-ending verb',
      fullSentence: '밥을 먹으러 식당에 가요.',
      englishTranslation: 'I go to a restaurant to eat.',
      grammarPoint: '-러/으러 가다'
    },
    {
      id: 'gb_41',
      sentenceWithBlank: '영화를 보___ 영화관에 가요.',
      blankTarget: '러',
      hint: 'Purpose after vowel-ending verb',
      fullSentence: '영화를 보러 영화관에 가요.',
      englishTranslation: 'I go to the movie theater to watch a movie.',
      grammarPoint: '-러/으러 가다'
    },
    {
      id: 'gb_42',
      sentenceWithBlank: '친구를 만나___ 카페에 가요.',
      blankTarget: '러',
      hint: 'Purpose after vowel-ending verb',
      fullSentence: '친구를 만나러 카페에 가요.',
      englishTranslation: 'I go to a cafe to meet a friend.',
      grammarPoint: '-러/으러 가다'
    },
    {
      id: 'gb_43',
      sentenceWithBlank: '숙제를 할 ___ 음악을 들어요.',
      blankTarget: '때',
      hint: 'Means \'when\'',
      fullSentence: '숙제를 할 때 음악을 들어요.',
      englishTranslation: 'I listen to music when I do homework.',
      grammarPoint: '-ㄹ/을 때 (when)'
    },
    {
      id: 'gb_44',
      sentenceWithBlank: '학교에 갈 ___ 친구를 만나요.',
      blankTarget: '때',
      hint: 'Means \'when\'',
      fullSentence: '학교에 갈 때 친구를 만나요.',
      englishTranslation: 'I meet my friend when I go to school.',
      grammarPoint: '-ㄹ/을 때 (when)'
    },
    {
      id: 'gb_45',
      sentenceWithBlank: '심심할 ___ 책을 읽어요.',
      blankTarget: '때',
      hint: 'Means \'when\'',
      fullSentence: '심심할 때 책을 읽어요.',
      englishTranslation: 'I read a book when I am bored.',
      grammarPoint: '-ㄹ/을 때 (when)'
    },
    {
      id: 'gb_46',
      sentenceWithBlank: '배가 고플 ___ 밥을 먹어요.',
      blankTarget: '때',
      hint: 'Means \'when\'',
      fullSentence: '배가 고플 때 밥을 먹어요.',
      englishTranslation: 'I eat when I am hungry.',
      grammarPoint: '-ㄹ/을 때 (when)'
    },
    {
      id: 'gb_47',
      sentenceWithBlank: '아플 ___ 약을 먹어요.',
      blankTarget: '때',
      hint: 'Means \'when\'',
      fullSentence: '아플 때 약을 먹어요.',
      englishTranslation: 'I take medicine when I am sick.',
      grammarPoint: '-ㄹ/을 때 (when)'
    },
    {
      id: 'gb_48',
      sentenceWithBlank: '선물을 받을 ___ 행복해요.',
      blankTarget: '때',
      hint: 'Means \'when\'',
      fullSentence: '선물을 받을 때 행복해요.',
      englishTranslation: 'I am happy when I receive a gift.',
      grammarPoint: '-ㄹ/을 때 (when)'
    },
    {
      id: 'gb_49',
      sentenceWithBlank: '무서운 영화를 볼 ___ 무서워요.',
      blankTarget: '때',
      hint: 'Means \'when\'',
      fullSentence: '무서운 영화를 볼 때 무서워요.',
      englishTranslation: 'I feel scared when I watch a scary movie.',
      grammarPoint: '-ㄹ/을 때 (when)'
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
    },
    {
      id: 'gi_09',
      sentenceWithBlank: '다은이는 카일의 상황을 이해해___ 괜찮다고 했어요.',
      blankTarget: '서',
      hint: 'Connect a reason to the result',
      fullSentence: '다은이는 카일의 상황을 이해해서 괜찮다고 했어요.',
      englishTranslation: 'Da-eun understood Kyle\'s situation, so she said it was okay.',
      grammarPoint: '-아서/어서 (reason)'
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
