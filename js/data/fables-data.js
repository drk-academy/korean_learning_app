/**
 * Curated Korean Stories & Reading Comprehension Questions
 * - Beginner: Simple everyday short stories with basic sentence structures.
 * - Intermediate: Accessible, streamlined classic Korean folktales.
 * - Advanced: Rich traditional folklore with deeper cultural expressions.
 */

export const FABLES_DATA = {
  beginner: [
    {
      id: 'fb_01',
      title: "Sua's Walk in the Park",
      koreanTitle: '수아의 공원 산책',
      level: 'beginner',
      difficultyBadge: 'Beginner (초급)',
      estimatedReadTime: '1 min',
      summary: 'A short and simple story about Sua enjoying a sunny day at the park with a friendly puppy.',
      bodyParagraphs: [
        '수아는 오늘 공원에 갔습니다. 날씨가 아주 맑고 따뜻했습니다.',
        '공원에는 예쁜 꽃들이 많이 있었습니다. 수아는 벤치에 앉아서 달콤한 사과를 먹었습니다.',
        '하얀 강아지 한 마리가 수아에게 다가왔습니다. 강아지가 꼬리를 흔들며 인사했습니다.',
        '수아는 강아지와 공원에서 즐겁게 놀았습니다. 수아는 정말 행복한 하루를 보냈습니다.'
      ],
      vocabularyNotes: [
        { word: '공원', meaning: 'Park' },
        { word: '꽃', meaning: 'Flower' },
        { word: '강아지', meaning: 'Puppy' },
        { word: '따뜻하다', meaning: 'To be warm' }
      ],
      moral: '자연과 동물과 함께하는 시간은 마음을 행복하게 해 줍니다. (Spending time in nature brings happiness.)',
      questions: [
        {
          id: 'q_fb_01_1',
          question: '수아는 오늘 어디에 갔습니까?',
          options: [
            '공원',
            '병원',
            '도서관',
            '수영장'
          ],
          correctIndex: 0,
          explanation: '첫 문장에 "수아는 오늘 공원에 갔습니다."라고 나와 있습니다.'
        },
        {
          id: 'q_fb_01_2',
          question: '수아가 벤치에서 먹은 과일은 무엇입니까?',
          options: [
            '바나나',
            '사과',
            '딸기',
            '수박'
          ],
          correctIndex: 1,
          explanation: '수아는 벤치에 앉아서 달콤한 사과를 먹었습니다.'
        },
        {
          id: 'q_fb_01_3',
          question: '수아에게 다가와서 함께 놀았던 동물은 무엇입니까?',
          options: [
            '아기 고양이',
            '하얀 강아지',
            '작은 새',
            '다람쥐'
          ],
          correctIndex: 1,
          explanation: '하얀 강아지가 다가와 꼬리를 흔들며 수아와 함께 놀았습니다.'
        }
      ]
    },
    {
      id: 'fb_02',
      title: "Minho's Morning Cafe",
      koreanTitle: '민호의 아침 카페',
      level: 'beginner',
      difficultyBadge: 'Beginner (초급)',
      estimatedReadTime: '1 min',
      summary: 'Minho spends a quiet morning reading at a cozy neighborhood cafe.',
      bodyParagraphs: [
        '민호는 아침 9시에 카페에 갔습니다. 카페 안은 조용하고 편안했습니다.',
        '민호는 따뜻한 우유와 맛있는 빵을 주문했습니다.',
        '창문 옆 자리에 앉아서 재미있는 한국어 책을 읽었습니다.',
        '잠시 후 친구가 카페로 와서 민호와 반갑게 인사했습니다.'
      ],
      vocabularyNotes: [
        { word: '카페', meaning: 'Cafe' },
        { word: '우유', meaning: 'Milk' },
        { word: '빵', meaning: 'Bread' },
        { word: '창문', meaning: 'Window' }
      ],
      moral: '좋은 책과 친구는 아침을 더 즐겁게 만듭니다. (Good books and friends brighten the morning.)',
      questions: [
        {
          id: 'q_fb_02_1',
          question: '민호가 카페에서 주문한 음료는 무엇입니까?',
          options: [
            '차가운 주스',
            '따뜻한 우유',
            '녹차',
            '아이스티'
          ],
          correctIndex: 1,
          explanation: '민호는 따뜻한 우유와 맛있는 빵을 주문했습니다.'
        },
        {
          id: 'q_fb_02_2',
          question: '민호는 창가 자리에 앉아서 무엇을 했습니까?',
          options: [
            '한국어 책을 읽었다',
            '낮잠을 잤다',
            '음악을 들었다',
            '숙제를 했다'
          ],
          correctIndex: 0,
          explanation: '민호는 창문 옆 자리에 앉아서 재미있는 한국어 책을 읽었습니다.'
        },
        {
          id: 'q_fb_02_3',
          question: '카페로 찾아와 민호와 인사한 사람은 누구입니까?',
          options: [
            '선생님',
            '친구',
            '어머니',
            '동생'
          ],
          correctIndex: 1,
          explanation: '친구가 카페로 와서 민호와 반갑게 인사했습니다.'
        }
      ]
    }
  ],
  intermediate: [
    {
      id: 'fi_01',
      title: 'The Gold Axe and Silver Axe',
      koreanTitle: '금도끼 은도끼',
      level: 'intermediate',
      difficultyBadge: 'Intermediate (중급)',
      estimatedReadTime: '2 min',
      summary: 'A simple moral fable about an honest woodcutter who receives unexpected rewards from the mountain spirit.',
      bodyParagraphs: [
        '옛날 어느 마을에 착하고 성실한 나무꾼이 살고 있었습니다. 나무꾼은 매일 산에 가서 나무를 베어 팔았습니다.',
        '어느 날 나무꾼은 연못 옆에서 일하다가 실수로 도끼를 깊은 물속에 빠뜨렸습니다. 나무꾼은 도끼가 없어서 슬퍼하며 울었습니다.',
        '그때 연못에서 산신령이 나타나 번쩍이는 금도끼를 보여주며 물었습니다. "이 금도끼가 네 것이냐?" 나무꾼은 "아닙니다. 제 도끼가 아닙니다."라고 정직하게 말했습니다.',
        '산신령은 이번에는 은도끼를 꺼냈지만, 나무꾼은 또 "제 도끼는 낡은 쇠도끼입니다."라고 대답했습니다.',
        '산신령은 나무꾼의 정직한 마음에 감동하여 금도끼와 은도끼를 모두 선물로 주었습니다.'
      ],
      vocabularyNotes: [
        { word: '나무꾼', meaning: 'Woodcutter' },
        { word: '정직하다', meaning: 'To be honest' },
        { word: '산신령', meaning: 'Mountain spirit' },
        { word: '쇠도끼', meaning: 'Iron axe' }
      ],
      moral: '거짓말을 하지 않고 정직하게 살면 큰 복을 받습니다. (Honesty always brings fortune.)',
      questions: [
        {
          id: 'q_fi_01_1',
          question: '나무꾼이 원래 잃어버린 진짜 도끼는 어떤 도끼였습니까?',
          options: [
            '금도끼',
            '은도끼',
            '낡은 쇠도끼',
            '동도끼'
          ],
          correctIndex: 2,
          explanation: '나무꾼의 원래 도끼는 낡은 쇠도끼였습니다.'
        },
        {
          id: 'q_fi_01_2',
          question: '산신령이 나무꾼에게 모든 도끼를 선물로 준 까닭은 무엇입니까?',
          options: [
            '나무꾼이 돈이 없어서 불쌍해서',
            '나무꾼이 거짓말을 하지 않고 정직해서',
            '산신령이 도끼가 너무 많아서',
            '나무꾼이 산신령을 도와주어서'
          ],
          correctIndex: 1,
          explanation: '나무꾼이 거짓말을 하지 않고 정직하게 말했기 때문입니다.'
        },
        {
          id: 'q_fi_01_3',
          question: '이 이야기의 가장 핵심적인 교훈은 무엇입니까?',
          options: [
            '물가 근처에 가지 말자',
            '항상 정직하게 행동하자',
            '나무를 많이 베자',
            '매일 산에 올라가자'
          ],
          correctIndex: 1,
          explanation: '정직함이 가장 소중한 가치라는 교훈을 줍니다.'
        }
      ]
    },
    {
      id: 'fi_02',
      title: 'The Sun and the Moon',
      koreanTitle: '해와 달이 된 오누이',
      level: 'intermediate',
      difficultyBadge: 'Intermediate (중급)',
      estimatedReadTime: '2 min',
      summary: 'Two brave siblings outsmart a tiger with the help of a divine rope and become the sun and moon.',
      bodyParagraphs: [
        '옛날 어느 산골에 착한 오누이가 어머니와 함께 살고 있었습니다. 어느 날 어머니가 장에 다녀오는 길에 호랑이를 만났습니다.',
        '호랑이는 어머니의 옷을 입고 집으로 와서 문을 열어달라고 소리쳤습니다. 그러나 영리한 오누이는 호랑이의 거친 목소리를 듣고 뒷마당 큰 나무 위로 피했습니다.',
        '호랑이가 나무 위로 쫓아오자, 오누이는 하늘을 향해 간절히 기도했습니다. "하늘님, 저희를 살려주시려면 튼튼한 동아줄을 내려주세요."',
        '하늘에서 동아줄이 내려와 오누이는 하늘로 올라가 해와 달이 되었고, 호랑이는 썩은 동아줄을 잡아 땅으로 떨어졌습니다.'
      ],
      vocabularyNotes: [
        { word: '오누이', meaning: 'Brother and sister' },
        { word: '동아줄', meaning: 'Thick rope' },
        { word: '호랑이', meaning: 'Tiger' },
        { word: '영리하다', meaning: 'To be clever / smart' }
      ],
      moral: '위험한 순간에도 침착하게 지혜를 발휘하면 어려움을 이겨낼 수 있습니다. (Wisdom and calm thinking overcome danger.)',
      questions: [
        {
          id: 'q_fi_02_1',
          question: '오누이는 집에 온 호랑이를 피해 어디로 숨었습니까?',
          options: [
            '방 안 벽장',
            '마당 큰 나무 위',
            '지하실',
            '이웃집'
          ],
          correctIndex: 1,
          explanation: '오누이는 뒷마당의 큰 나무 위로 올라가 피했습니다.'
        },
        {
          id: 'q_fi_02_2',
          question: '오누이가 위기에서 벗어나기 위해 하늘에 요청한 것은 무엇입니까?',
          options: [
            '비와 천둥',
            '튼튼한 동아줄',
            '날개',
            '사냥꾼'
          ],
          correctIndex: 1,
          explanation: '오누이는 살려주시려면 튼튼한 동아줄을 내려달라고 기도했습니다.'
        },
        {
          id: 'q_fi_02_3',
          question: '하늘로 올라간 오누이는 무엇이 되었습니까?',
          options: [
            '해와 달',
            '별과 구름',
            '바람과 비',
            '나무와 꽃'
          ],
          correctIndex: 0,
          explanation: '오누이는 하늘로 올라가 따뜻한 해와 밝은 달이 되었습니다.'
        }
      ]
    }
  ],
  advanced: [
    {
      id: 'fa_01',
      title: 'The Tale of Heungbu and Nolbu',
      koreanTitle: '흥부와 놀부',
      level: 'advanced',
      difficultyBadge: 'Advanced (고급)',
      estimatedReadTime: '4 min',
      summary: 'A classic tale illustrating karmic retribution through two contrasting brothers: greedy Nolbu and compassionate Heungbu.',
      bodyParagraphs: [
        '조선 시대 어느 고을에 형 놀부와 아우 흥부 형제가 살고 있었습니다. 심술궂고 탐욕스러운 형 놀부는 부모의 막대한 유산을 독차지한 뒤, 착하고 온순한 흥부 가족을 빈손으로 매정하게 내쫓았습니다.',
        '가난 속에서도 흥부는 처자식과 함께 우애와 인정을 잃지 않고 성실하게 살아갔습니다. 어느 봄날, 흥부는 처마 밑에 둥지를 튼 제비의 다리가 뱀의 공격으로 부러진 것을 발견하였습니다. 흥부는 지극정성으로 약을 바르고 명주실로 동여매어 다리를 치료해 주었습니다.',
        '이듬해 봄, 완쾌된 제비는 강남에서 박씨 하나를 물고 와 흥부의 마당에 떨어뜨렸습니다. 흥부가 정성껏 심은 박씨는 가을이 되자 지붕을 뒤덮을 만큼 커다란 박으로 자라났습니다.',
        '흥부 내외가 톱으로 박을 켜자, 박 속에서 금은보화와 비단, 그리고 대궐 같은 기와집을 지어줄 목수들이 쏟아져 나와 흥부는 순식간에 큰 부자가 되었습니다.',
        '이 소식을 들은 욕심 많은 놀부는 일부러 제비 다리를 부러뜨려 박씨를 얻었습니다. 그러나 그 박에서는 도깨비와 채권자들이 쏟아져 나와 놀부의 전 재산을 탕진하게 만들었습니다. 뉘우친 놀부를 흥부가 너그럽게 품어주며 두 형제는 화목하게 살게 되었습니다.'
      ],
      vocabularyNotes: [
        { word: '탐욕스럽다', meaning: 'Greedy / rapacious' },
        { word: '지극정성', meaning: 'Devoted utmost sincerity' },
        { word: '금은보화', meaning: 'Treasures of gold and silver' },
        { word: '인과응보', meaning: 'Karmic retribution (Cause and effect)' }
      ],
      moral: '권선징악과 인과응보의 섭리는 결코 변하지 않습니다. (Virtue is rewarded and greed faces retribution.)',
      questions: [
        {
          id: 'q_fa_01_1',
          question: '흥부가 큰 부자가 될 수 있었던 근본적인 원인은 무엇입니까?',
          options: [
            '놀부에게서 유산을 되찾아서',
            '다친 제비를 긍휼히 여겨 지극정성으로 치료해 준 보답으로',
            '장사를 잘해서',
            '산신령의 시험을 통과해서'
          ],
          correctIndex: 1,
          explanation: '부러진 제비 다리를 정성껏 치료해 준 선행의 보답으로 박씨를 얻어 부자가 되었습니다.'
        },
        {
          id: 'q_fa_01_2',
          question: '놀부가 재산을 모두 잃고 몰락하게 된 이유는 무엇입니까?',
          options: [
            '흥부가 복수했기 때문',
            '탐욕에 눈이 멀어 고의로 제비 다리를 부러뜨리고 요행을 바랐기 때문',
            '자연재해로 집이 무너져서',
            '도둑이 들어서'
          ],
          correctIndex: 1,
          explanation: '놀부는 욕심 때문에 인위적으로 제비 다리를 해쳤고, 그 결과 화를 입었습니다.'
        },
        {
          id: 'q_fa_01_3',
          question: '이 고전 소설을 관통하는 한국 전통 사상과 가장 부합하는 사자성어는 무엇입니까?',
          options: [
            '동문서답 (東問西答)',
            '권선징악 (勸善懲惡)',
            '탁상공론 (卓上空論)',
            '주마간산 (走馬看山)'
          ],
          correctIndex: 1,
          explanation: '선을 권하고 악을 징벌한다는 "권선징악"이 이 이야기의 핵심 주제입니다.'
        }
      ]
    }
  ]
};

/**
 * Returns fables/stories for the specified level
 * @param {'beginner' | 'intermediate' | 'advanced'} level 
 */
export function getFablesForLevel(level = 'beginner') {
  return FABLES_DATA[level] || FABLES_DATA.beginner;
}
