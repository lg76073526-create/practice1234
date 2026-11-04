const ALBA = {
  groups: [
    { id: "food", name: "요식업" },
    { id: "wear", name: "의류" },
    { id: "etc", name: "기타" }
  ],
  jobs: [
    {
      id: "cafe",
      group: "food",
      name: "카페",
      examples: "빽다방, 메가커피 등",
      summary: "핫과 아이스, 사이즈, 매장과 포장을 한 번에 확인합니다.",
      lessons: [
        {
          id: "greet",
          title: "주문 받기",
          situation: "손님이 카운터에 서면, 메뉴를 고르기 전에 먼저 말을 겁니다.",
          phrases: [
            { en: "Hi, what can I get for you?", ko: "안녕하세요, 뭐 드릴까요?" },
            { en: "Are you ready to order?", ko: "주문하시겠어요?" },
            { en: "Sure. Anything else?", ko: "네. 더 있으세요?" }
          ],
          talk: [
            { role: "staff", en: "Hi, what can I get for you?", ko: "안녕하세요, 뭐 드릴까요?" },
            { role: "guest", en: "Can I get an iced americano?", ko: "아이스 아메리카노 하나요." },
            { role: "staff", en: "Sure. Anything else?", ko: "네. 더 있으세요?" }
          ],
          fix: {
            instead: "What you want?",
            say: "What can I get for you?",
            why: "Want 앞에 do가 없으면 손님 입장에서 명령처럼 들립니다."
          }
        },
        {
          id: "temp",
          title: "핫 / 아이스, 사이즈",
          situation: "음료는 온도와 크기가 빠지면 제작이 멈춥니다.",
          phrases: [
            { en: "Hot or iced?", ko: "따뜻하게 드릴까요, 차갑게 드릴까요?" },
            { en: "What size would you like? Regular or large?", ko: "사이즈는 레귤러랑 라지 중에 뭐로 할까요?" },
            { en: "Large iced americano. Anything else?", ko: "라지 아이스 아메리카노요. 더 있으세요?" }
          ],
          talk: [
            { role: "guest", en: "An americano, please.", ko: "아메리카노 하나요." },
            { role: "staff", en: "Hot or iced?", ko: "따뜻하게 드릴까요, 차갑게 드릴까요?" },
            { role: "guest", en: "Iced. Large.", ko: "아이스로, 라지요." }
          ],
          fix: {
            instead: "Ice? Big?",
            say: "Hot or iced? Regular or large?",
            why: "한 단어만 던지면 손님이 되묻습니다. 선택지를 같이 말하세요."
          },
          practice: "latte"
        },
        {
          id: "custom",
          title: "당도, 우유, 샷",
          situation: "커스텀은 들은 그대로 반복해 주면 실수가 줄어듭니다.",
          phrases: [
            { en: "Would you like it less sweet?", ko: "덜 달게 해 드릴까요?" },
            { en: "Oat milk or regular milk?", ko: "오트 밀크로 할까요, 일반 우유로 할까요?" },
            { en: "So that's a large iced latte with oat milk.", ko: "그럼 라지 아이스 라떼에 오트 밀크입니다." }
          ],
          talk: [
            { role: "guest", en: "Can I get oat milk?", ko: "오트 밀크로 되나요?" },
            { role: "staff", en: "Yes. Oat milk or regular milk — I'll do oat milk.", ko: "네. 오트 밀크로 준비하겠습니다." },
            { role: "staff", en: "Would you like it less sweet?", ko: "덜 달게 해 드릴까요?" }
          ],
          fix: {
            instead: "Sweet down?",
            say: "Would you like it less sweet?",
            why: "Sweet down은 메뉴 용어가 아닙니다. less sweet가 바로 통합니다."
          }
        },
        {
          id: "here",
          title: "매장, 포장, 이름",
          situation: "음료를 불러 줄 이름이 없으면 픽업이 꼬입니다.",
          phrases: [
            { en: "For here or to go?", ko: "매장이세요, 포장이세요?" },
            { en: "Can I get a name for the order?", ko: "주문 성함 여쭤봐도 될까요?" },
            { en: "We'll call your name when it's ready.", ko: "나오시면 성함으로 불러 드릴게요." }
          ],
          talk: [
            { role: "staff", en: "For here or to go?", ko: "매장이세요, 포장이세요?" },
            { role: "guest", en: "For here.", ko: "매장이요." },
            { role: "staff", en: "Can I get a name for the order?", ko: "성함이 어떻게 되세요?" }
          ],
          fix: {
            instead: "Here? Go?",
            say: "For here or to go?",
            why: "Here, go만 말하면 질문이 끝나지 않습니다. for here or to go가 매장 표준 문장입니다."
          }
        },
        {
          id: "pay",
          title: "계산",
          situation: "금액은 숫자만 읽지 말고 thousand won까지 말합니다.",
          phrases: [
            { en: "That'll be 4,500 won.", ko: "4,500원입니다." },
            { en: "Cash or card?", ko: "현금이세요, 카드세요?" },
            { en: "Here's your receipt. Thank you.", ko: "영수증 여기 있습니다. 감사합니다." }
          ],
          talk: [
            { role: "staff", en: "That'll be 4,500 won. Cash or card?", ko: "4,500원입니다. 현금이세요, 카드세요?" },
            { role: "guest", en: "Card.", ko: "카드요." },
            { role: "staff", en: "Here's your receipt. We'll call you when it's ready.", ko: "영수증이요. 나오시면 불러 드릴게요." }
          ],
          fix: {
            instead: "Four five zero zero.",
            say: "That'll be 4,500 won.",
            why: "자릿수를 하나씩 읽으면 금액이 안 들립니다. four thousand five hundred won이라고 말하세요."
          }
        }
      ],
      practices: [
        {
          id: "latte",
          title: "라떼 한 잔 주문",
          goal: "온도, 사이즈, 매장을 빠뜨리지 않고 주문을 끝냅니다.",
          turns: [
            {
              say: { en: "Hi, can I get a latte?", ko: "라떼 하나요." },
              prompt: "따뜻하게 할지 차갑게 할지 물어보세요.",
              good: [["hot", "iced"], ["hot", "ice"]],
              awkward: [
                { any: ["ice?"], note: "Ice? 한 마디는 선택지가 아닙니다." }
              ],
              better: "Sure. Hot or iced?",
              goodNote: "Hot or iced?면 손님이 바로 고릅니다."
            },
            {
              say: { en: "Iced, please.", ko: "아이스로요." },
              prompt: "사이즈를 물어보세요.",
              good: [["size"], ["regular", "large"]],
              better: "What size would you like? Regular or large?",
              goodNote: "사이즈 선택지를 같이 말하면 되묻지 않아도 됩니다."
            },
            {
              say: { en: "Large. For here.", ko: "라지, 그리고 매장이요." },
              prompt: "주문을 확인하고 이름을 물어보세요.",
              good: [["name"]],
              better: "Large iced latte for here. Can I get a name?",
              goodNote: "들은 주문을 한 번 반복하면 제작 실수가 줄어듭니다."
            }
          ]
        }
      ]
    },
    {
      id: "bakery",
      group: "food",
      name: "빵집",
      examples: "파리바게뜨, 뚜레쥬르 등",
      summary: "진열된 빵을 집어 주고, 자르기와 데우기를 확인합니다.",
      lessons: [
        {
          id: "pick",
          title: "빵 집어 주기",
          situation: "손님은 진열대를 가리키는 일이 많습니다. 어떤 빵인지 확인하고 집으세요.",
          phrases: [
            { en: "Which one would you like?", ko: "어떤 걸로 드릴까요?" },
            { en: "This one, the cheese pastry?", ko: "이 치즈 패스트리요?" },
            { en: "How many would you like?", ko: "몇 개 드릴까요?" }
          ],
          talk: [
            { role: "guest", en: "Can I get that one?", ko: "저거 하나요." },
            { role: "staff", en: "This one, the cheese pastry?", ko: "이 치즈 패스트리 맞으세요?" },
            { role: "guest", en: "Yes. Two, please.", ko: "네, 두 개요." }
          ],
          fix: {
            instead: "This?",
            say: "This one, the cheese pastry?",
            why: "This?만 말하면 어느 빵인지 불명확합니다. 이름을 붙여 확인하세요."
          }
        },
        {
          id: "slice",
          title: "자르기, 데우기",
          situation: "식빵과 샌드위치는 칼질과 데우기 여부를 먼저 묻습니다.",
          phrases: [
            { en: "Would you like this sliced?", ko: "잘라 드릴까요?" },
            { en: "Would you like me to warm it up?", ko: "데워드릴까요?" },
            { en: "I'll slice it into eight pieces.", ko: "여덟 조각으로 자를게요." }
          ],
          talk: [
            { role: "staff", en: "Would you like this sliced?", ko: "잘라 드릴까요?" },
            { role: "guest", en: "Yes, please. And can you warm the pastry?", ko: "네. 패스트리는 데워 주실래요?" },
            { role: "staff", en: "Sure. I'll warm it up.", ko: "네, 데워드릴게요." }
          ],
          fix: {
            instead: "Cut? Hot?",
            say: "Would you like this sliced? And would you like me to warm it up?",
            why: "Cut, hot은 동작이 안 보입니다. sliced와 warm it up이 매장에서 쓰는 말입니다."
          },
          practice: "pastry"
        },
        {
          id: "recommend",
          title: "추천",
          situation: "고민하는 손님에게는 단맛인지 짠맛인지만 나눠 줘도 충분합니다.",
          phrases: [
            { en: "This one is sweet. It has red bean inside.", ko: "이 빵은 달콤하고, 안에 팥이 들었어요." },
            { en: "If you want something savory, I'd get the cheese pastry.", ko: "짠 걸 원하시면 치즈 패스트리를 권해요." },
            { en: "This is our most popular one today.", ko: "오늘은 이 빵이 제일 많이 나가요." }
          ],
          talk: [
            { role: "guest", en: "What's good here?", ko: "뭐가 맛있어요?" },
            { role: "staff", en: "If you want something sweet, the red-bean bun. If you want savory, the cheese pastry.", ko: "달콤한 건 팥빵, 짭짤한 건 치즈 패스트리예요." }
          ],
          fix: {
            instead: "All delicious.",
            say: "If you want something sweet, try this one.",
            why: "전부 맛있다는 말은 선택이 안 됩니다. sweet인지 savory인지를 나눠 주세요."
          }
        },
        {
          id: "pay",
          title: "포장과 계산",
          situation: "빵이 여러 개면 봉투를 같이 묻습니다.",
          phrases: [
            { en: "Together or in separate bags?", ko: "한 봉투에 넣을까요, 나눠 드릴까요?" },
            { en: "That'll be 8,700 won.", ko: "8,700원입니다." },
            { en: "Cash or card?", ko: "현금이세요, 카드세요?" }
          ],
          talk: [
            { role: "staff", en: "Together or in separate bags?", ko: "같이 넣을까요, 나눠 드릴까요?" },
            { role: "guest", en: "Together is fine.", ko: "같이 넣어 주세요." },
            { role: "staff", en: "That'll be 8,700 won. Cash or card?", ko: "8,700원입니다. 현금이세요, 카드세요?" }
          ],
          fix: {
            instead: "One bag okay?",
            say: "Together or in separate bags?",
            why: "가방이 아니라 포장 봉투입니다. together or separate가 정확합니다."
          }
        }
      ],
      practices: [
        {
          id: "pastry",
          title: "패스트리 두 개",
          goal: "어떤 빵인지 확인하고, 데운 뒤 계산까지 말합니다.",
          turns: [
            {
              say: { en: "Can I get two of those?", ko: "저거 두 개 주세요." },
              prompt: "어떤 빵인지 확인하세요.",
              good: [["this one"], ["cheese"], ["pastry"], ["which"]],
              better: "These ones, the cheese pastries?",
              goodNote: "가리킨 빵 이름을 말해 확인하면 다른 빵을 집지 않습니다."
            },
            {
              say: { en: "Yes, the cheese ones.", ko: "네, 치즈 있는 거요." },
              prompt: "데워드릴지 물어보세요.",
              good: [["warm"]],
              awkward: [{ any: ["hot?"], note: "Hot?만으로는 데우라는 말인지 뜨거운 빵인지 헷갈립니다." }],
              better: "Would you like me to warm them up?",
              goodNote: "warm it up이 데워드리다는 뜻입니다."
            },
            {
              say: { en: "Yes, please.", ko: "네, 데워 주세요." },
              prompt: "금액을 말하고 결제 방법을 물어보세요.",
              good: [["won"], ["cash", "card"]],
              better: "That'll be 6,000 won. Cash or card?",
              goodNote: "금액 뒤에는 won, 그다음 cash or card입니다."
            }
          ]
        }
      ]
    },
    {
      id: "chicken",
      group: "food",
      name: "치킨집",
      examples: "BHC, 교촌 등",
      recommend: true,
      summary: "뼈와 순살, 맵기, 포장, 계산. 외국인 주문이 가장 자주 막히는 곳입니다.",
      lessons: [
        {
          id: "greet",
          title: "손님 맞이",
          situation: "전화든 카운터든, 첫 문장에서 주문을 열어야 합니다.",
          phrases: [
            { en: "Hi, thanks for calling. What can I get for you?", ko: "전화 감사합니다. 뭐 드릴까요?" },
            { en: "Welcome in. Are you ordering for here?", ko: "어서 오세요. 매장에서 드실 건가요?" },
            { en: "Sure, I can take that order.", ko: "네, 주문 받을게요." }
          ],
          talk: [
            { role: "guest", en: "Hi, I'd like to order chicken.", ko: "치킨 주문하고 싶어요." },
            { role: "staff", en: "Hi. What can I get for you?", ko: "네, 뭐 드릴까요?" }
          ],
          fix: {
            instead: "Say menu.",
            say: "What can I get for you?",
            why: "메뉴를 말하라는 명령 대신, 주문을 받는 질문으로 시작하세요."
          }
        },
        {
          id: "bone",
          title: "순살인지 뼈인지",
          situation: "치킨 주문에서 가장 먼저 갈리는 질문입니다. 두 선택지를 같이 말하세요.",
          phrases: [
            { en: "Would you like that boneless or bone-in?", ko: "순살로 드릴까요, 뼈 있는 걸로 드릴까요?" },
            { en: "Boneless has no bones. Bone-in comes with the bone.", ko: "순살은 뼈가 없고, 뼈 치킨은 뼈가 있습니다." },
            { en: "The boneless is all white meat.", ko: "순살은 살만 들어 있어요." }
          ],
          talk: [
            { role: "guest", en: "Can I get the honey chicken?", ko: "허니치킨 하나요." },
            { role: "staff", en: "Sure. Would you like that boneless or bone-in?", ko: "네. 순살이랑 뼈 중에 뭐로 드릴까요?" },
            { role: "guest", en: "Boneless, please.", ko: "순살이요." }
          ],
          fix: {
            instead: "No bone?",
            say: "Would you like that boneless or bone-in?",
            why: "No bone?은 뜻이 대강 통해도 메뉴 선택이 안 끝납니다. boneless와 bone-in을 같이 물어야 손님이 한 번에 고릅니다."
          },
          practice: "order"
        },
        {
          id: "flavor",
          title: "맛과 맵기",
          situation: "양념, 후라이드, 반반, 맵기를 짧게 설명합니다.",
          phrases: [
            { en: "Yangnyeom is the sweet soy-garlic flavor.", ko: "양념은 달콤한 간장소스 맛이에요." },
            { en: "We can do half and half, two flavors in one box.", ko: "반반도 됩니다. 한 상자에 두 가지 맛이에요." },
            { en: "How spicy would you like it? Mild, medium, or hot?", ko: "맵기는 순한 맛, 보통, 매운 맛 중에 뭐로 할까요?" }
          ],
          talk: [
            { role: "guest", en: "What's the sauce like? Is it spicy?", ko: "소스가 어때요? 매워요?" },
            { role: "staff", en: "The yangnyeom is sweet, not very spicy. We also have a hot one.", ko: "양념은 달콤하고 많이 맵지 않아요. 매운맛도 있습니다." },
            { role: "staff", en: "How spicy would you like it? Mild, medium, or hot?", ko: "맵기는 어느 정도로 할까요?" }
          ],
          fix: {
            instead: "Spicy?",
            say: "How spicy would you like it? Mild, medium, or hot?",
            why: "Spicy?는 예, 아니오로 끝납니다. 단계를 같이 말해야 주방이 알 수 있습니다."
          }
        },
        {
          id: "here",
          title: "매장, 포장, 대기",
          situation: "치킨은 바로 나오지 않습니다. 기다리는 시간을 먼저 말하세요.",
          phrases: [
            { en: "For here or to go?", ko: "매장이세요, 포장이세요?" },
            { en: "It takes about 15 to 20 minutes.", ko: "15분에서 20분 정도 걸려요." },
            { en: "Can I get a name or a phone number for the order?", ko: "주문 확인용으로 성함이나 전화번호 여쭤봐도 될까요?" }
          ],
          talk: [
            { role: "staff", en: "For here or to go?", ko: "매장이세요, 포장이세요?" },
            { role: "guest", en: "To go.", ko: "포장이요." },
            { role: "staff", en: "It takes about 15 to 20 minutes. Can I get a name?", ko: "15분에서 20분쯤 걸려요. 성함 여쭤봐도 될까요?" }
          ],
          fix: {
            instead: "Wait twenty.",
            say: "It takes about 15 to 20 minutes.",
            why: "Wait twenty은 문장이 아닙니다. it takes about ... minutes가 대기 시간을 알리는 말입니다."
          }
        },
        {
          id: "side",
          title: "소스, 음료, 추가",
          situation: "무, 소스, 콜라처럼 같이 나가는 것을 마지막에 확인합니다.",
          phrases: [
            { en: "Would you like a drink with that?", ko: "음료도 드릴까요?" },
            { en: "Would you like extra sauce?", ko: "소스 더 드릴까요?" },
            { en: "It comes with pickled radish.", ko: "무가 같이 나갑니다." }
          ],
          talk: [
            { role: "staff", en: "Would you like a drink with that?", ko: "음료 추가하실까요?" },
            { role: "guest", en: "A cola, please. And extra sauce.", ko: "콜라요. 소스도 더 주세요." },
            { role: "staff", en: "Sure. A cola and extra sauce.", ko: "네, 콜라랑 소스 추가입니다." }
          ],
          fix: {
            instead: "Cola yes?",
            say: "Would you like a drink with that?",
            why: "콜라부터 단정하지 말고, 음료가 필요한지 먼저 여쭤 보세요."
          }
        },
        {
          id: "pay",
          title: "계산",
          situation: "금액은 예시입니다. 실제 금액으로 바꿔 말하고, won을 붙이세요.",
          phrases: [
            { en: "Your total is 23,000 won.", ko: "총 23,000원입니다." },
            { en: "Cash or card?", ko: "현금이세요, 카드세요?" },
            { en: "Please insert your card. Here's your receipt.", ko: "카드를 넣어 주세요. 영수증입니다." }
          ],
          talk: [
            { role: "staff", en: "Your total is 23,000 won. Cash or card?", ko: "23,000원입니다. 현금이세요, 카드세요?" },
            { role: "guest", en: "Card.", ko: "카드요." },
            { role: "staff", en: "Please insert your card. It'll be ready in about 15 minutes.", ko: "카드 넣어 주세요. 15분쯤 후에 나옵니다." }
          ],
          fix: {
            instead: "Two three thousand.",
            say: "Your total is 23,000 won.",
            why: "23,000은 twenty-three thousand won입니다. 숫자를 끊어서 읽지 마세요."
          },
          practice: "order"
        }
      ],
      practices: [
        {
          id: "order",
          title: "허니치킨 주문",
          goal: "순살인지 묻고, 매장인지 확인한 뒤, 금액까지 말합니다.",
          turns: [
            {
              say: { en: "Hi, can I get the honey chicken?", ko: "허니치킨 하나요." },
              prompt: "순살인지 뼈인지 물어보세요.",
              good: [["boneless", "bone in"], ["boneless", "with bone"], ["boneless", "bones"]],
              awkward: [
                { any: ["no bone", "no bones", "bone no", "without bone", "without bones", "non bone"], note: "No bone?은 뜻이 대충 보여도, 뼈와 순살 중 무엇을 고르라는 말인지 약합니다." }
              ],
              better: "Would you like that boneless or bone-in?",
              goodNote: "boneless or bone-in이면 현장에서 그대로 쓸 수 있습니다."
            },
            {
              say: { en: "Boneless, please. Not too spicy.", ko: "순살이요. 너무 맵진 않았으면 해요." },
              prompt: "맵기 선택지를 말해 주세요.",
              good: [["mild"], ["medium"], ["not too spicy"], ["not spicy"]],
              awkward: [{ any: ["no spicy", "spicy no"], note: "No spicy보다 not spicy, 또는 mild가 자연스럽습니다." }],
              better: "The honey chicken is sweet. Would you like it mild or medium?",
              goodNote: "맵기를 mild, medium, hot으로 나누면 주방이 바로 이해합니다."
            },
            {
              say: { en: "Mild, please.", ko: "순한 맛으로요." },
              prompt: "매장인지 포장인지 물어보세요.",
              good: [["for here", "to go"], ["here", "to go"]],
              awkward: [{ any: ["here go", "here or go"], note: "Here or go만 말하면 조금 짧습니다. for here or to go가 더 분명합니다." }],
              better: "Mild boneless. For here or to go?",
              goodNote: "for here or to go가 매장, 포장의 기본 문장입니다."
            },
            {
              say: { en: "For here. And a cola.", ko: "매장이요. 콜라도 주세요." },
              prompt: "금액을 말하고 결제 방법을 물어보세요. 금액은 23,000원으로 하세요.",
              good: [["23000", "won"], ["23 000", "won"], ["twenty three thousand"]],
              better: "That's 23,000 won. Cash or card?",
              goodNote: "twenty-three thousand won, 그리고 cash or card입니다."
            }
          ]
        }
      ]
    },
    {
      id: "bar",
      group: "food",
      name: "술집",
      examples: "호프, 포차 등",
      summary: "자리, 잔 추가, 마지막 주문, 계산을 짧게 처리합니다.",
      lessons: [
        {
          id: "seat",
          title: "자리 안내",
          situation: "몇 명인지 먼저 듣고 자리로 안내합니다.",
          phrases: [
            { en: "Hi, how many people?", ko: "안녕하세요, 몇 분이세요?" },
            { en: "Table for two. Right this way.", ko: "두 분이시면 이쪽으로 오세요." },
            { en: "Is this table okay?", ko: "이 자리 괜찮으세요?" }
          ],
          talk: [
            { role: "staff", en: "Hi, how many people?", ko: "몇 분이세요?" },
            { role: "guest", en: "Two.", ko: "두 명이요." },
            { role: "staff", en: "Table for two. Right this way.", ko: "이쪽으로 안내할게요." }
          ],
          fix: {
            instead: "How many?",
            say: "How many people?",
            why: "How many만 말하면 잔 수인지 인원인지 헷갈립니다."
          }
        },
        {
          id: "drink",
          title: "주문 받기",
          situation: "술과 안주를 나눠 물어 보면 주문이 덜 빠집니다.",
          phrases: [
            { en: "What can I get you to drink?", ko: "음료는 뭐 드릴까요?" },
            { en: "We have beer, soju, and soft drinks.", ko: "맥주, 소주, 음료수 있습니다." },
            { en: "Would you like any food with that?", ko: "안주도 주문하시겠어요?" }
          ],
          talk: [
            { role: "staff", en: "What can I get you to drink?", ko: "뭐 마실까요?" },
            { role: "guest", en: "Two beers, please.", ko: "맥주 둘이요." },
            { role: "staff", en: "Two beers. Would you like any food with that?", ko: "맥주 둘이요. 안주도 하시겠어요?" }
          ],
          fix: {
            instead: "Drink? Food?",
            say: "What can I get you to drink?",
            why: "명사만 나열하지 말고 질문 문장으로 말하세요."
          },
          practice: "round"
        },
        {
          id: "again",
          title: "잔 추가",
          situation: "잔이 비었을 때 한 번만 짧게 여쭤 봅니다.",
          phrases: [
            { en: "Would you like another round?", ko: "한 잔 더 드릴까요?" },
            { en: "The same again?", ko: "같은 걸로 더 드릴까요?" },
            { en: "I'll bring two more beers.", ko: "맥주 두 잔 더 가져올게요." }
          ],
          talk: [
            { role: "staff", en: "Would you like another round?", ko: "더 드릴까요?" },
            { role: "guest", en: "Yes, the same again.", ko: "같은 걸로 더 주세요." },
            { role: "staff", en: "Sure. Two more beers.", ko: "네, 맥주 두 잔 더요." }
          ],
          fix: {
            instead: "More?",
            say: "Would you like another round?",
            why: "More?는 너무 짧아서 잔을 치우는 말로 들릴 수 있습니다."
          }
        },
        {
          id: "bill",
          title: "마감과 계산",
          situation: "마지막 주문 시간을 알리고, 같이 낼지 나눠 낼지 확인합니다.",
          phrases: [
            { en: "Last call. We're closing in 15 minutes.", ko: "마지막 주문입니다. 15분 뒤에 마감해요." },
            { en: "Together or separate?", ko: "같이 계산하실까요, 따로 하실까요?" },
            { en: "Your total is 36,000 won.", ko: "총 36,000원입니다." }
          ],
          talk: [
            { role: "guest", en: "Can we get the bill?", ko: "계산서 주세요." },
            { role: "staff", en: "Together or separate?", ko: "같이 내실까요, 따로 내실까요?" },
            { role: "guest", en: "Together.", ko: "같이요." }
          ],
          fix: {
            instead: "We close.",
            say: "Last call. We're closing in 15 minutes.",
            why: "마감만 말하면 주문이 가능한지 모릅니다. 남은 시간을 같이 말하세요."
          }
        }
      ],
      practices: [
        {
          id: "round",
          title: "맥주 두 잔",
          goal: "인원, 주문, 같이 계산할지까지 이어 말합니다.",
          turns: [
            {
              say: { en: "Hi, table for two?", ko: "두 명이요." },
              prompt: "자리로 안내하세요.",
              good: [["this way"], ["table"]],
              better: "Yes. Table for two. Right this way.",
              goodNote: "인원을 반복하고 안내하면 충분합니다."
            },
            {
              say: { en: "Two beers, please.", ko: "맥주 둘이요." },
              prompt: "안주도 필요한지 물어보세요.",
              good: [["food"], ["eat"], ["side"], ["chicken"], ["snack"]],
              better: "Two beers. Would you like any food with that?",
              goodNote: "술과 안주를 나눠 물으면 주문이 덜 빠집니다."
            },
            {
              say: { en: "That's all. Can we pay together?", ko: "그게 다예요. 같이 계산할게요." },
              prompt: "같이 계산하는 금액을 말하세요. 12,000원으로 하세요.",
              good: [["12000", "won"], ["twelve thousand"]],
              better: "Together. Your total is 12,000 won.",
              goodNote: "together를 먼저 확인하고 총액을 말하세요."
            }
          ]
        }
      ]
    },
    {
      id: "restaurant",
      group: "food",
      name: "식당",
      examples: "고깃집, 분식집 등",
      summary: "자리, 주문, 맵기, 중간 확인, 계산 순서대로 말합니다.",
      lessons: [
        {
          id: "seat",
          title: "자리 안내",
          situation: "몇 명인지 듣고 자리 종류가 있으면 고르게 합니다.",
          phrases: [
            { en: "How many in your party?", ko: "몇 분이세요?" },
            { en: "Booth or table?", ko: "칸막이 자리로 할까요, 일반 테이블로 할까요?" },
            { en: "This way, please.", ko: "이쪽으로 오세요." }
          ],
          talk: [
            { role: "staff", en: "How many in your party?", ko: "몇 분이세요?" },
            { role: "guest", en: "Four.", ko: "네 명이요." },
            { role: "staff", en: "Table for four. This way, please.", ko: "네 분이시면 이쪽으로 오세요." }
          ],
          fix: {
            instead: "Person?",
            say: "How many in your party?",
            why: "인원을 물을 때는 how many people, 또는 how many in your party를 씁니다."
          }
        },
        {
          id: "order",
          title: "주문",
          situation: "메뉴를 더 보는지, 주문할 준비가 됐는지 구분합니다.",
          phrases: [
            { en: "Are you ready to order?", ko: "주문하시겠어요?" },
            { en: "I can give you a minute.", ko: "조금 더 보고 계셔도 됩니다." },
            { en: "What would you like for your main?", ko: "메인은 뭐로 하시겠어요?" }
          ],
          talk: [
            { role: "staff", en: "Are you ready to order?", ko: "주문하시겠어요?" },
            { role: "guest", en: "Yes. Two bulgogi and one stew.", ko: "불고기 둘이랑 찌개 하나요." },
            { role: "staff", en: "Two bulgogi and one stew. Anything else?", ko: "불고기 둘, 찌개 하나. 더 있으세요?" }
          ],
          fix: {
            instead: "Order now?",
            say: "Are you ready to order?",
            why: "Order now는 재촉으로 들립니다. ready to order가 서빙의 기본 질문입니다."
          },
          practice: "table"
        },
        {
          id: "spicy",
          title: "맵기와 알레르기",
          situation: "찌개나 라면처럼 맵기를 조절할 수 있으면 먼저 말합니다.",
          phrases: [
            { en: "This stew is spicy. Would you like it mild?", ko: "이 찌개는 매워요. 순하게 해 드릴까요?" },
            { en: "Does anyone have any food allergies?", ko: "알레르기 있으신 분 계세요?" },
            { en: "I can ask the kitchen to make it less spicy.", ko: "주방에 덜 맵게 해 달라고 하겠습니다." }
          ],
          talk: [
            { role: "staff", en: "This stew is spicy. Would you like it mild?", ko: "찌개는 매운 편이에요. 순하게 할까요?" },
            { role: "guest", en: "Mild, please. I'm allergic to peanuts.", ko: "순한 맛으로요. 땅콩 알레르기가 있어요." },
            { role: "staff", en: "I'll tell the kitchen. No peanuts, and mild.", ko: "주방에 땅콩 없이, 순하게 전달하겠습니다." }
          ],
          fix: {
            instead: "Spicy okay?",
            say: "This is spicy. Would you like it mild?",
            why: "괜찮은지만 묻지 말고, 조절할 수 있다는 선택지를 주세요."
          }
        },
        {
          id: "check",
          title: "식사 중간 확인",
          situation: "음식이 나간 뒤 한 번만 짧게 확인합니다.",
          phrases: [
            { en: "How is everything?", ko: "음식은 괜찮으세요?" },
            { en: "Can I get you anything else?", ko: "더 필요하신 거 있으세요?" },
            { en: "I'll bring extra napkins.", ko: "냅킨 더 가져올게요." }
          ],
          talk: [
            { role: "staff", en: "How is everything?", ko: "음식은 괜찮으세요?" },
            { role: "guest", en: "Good. Can we get water?", ko: "네. 물 더 주세요." },
            { role: "staff", en: "Sure. I'll bring water.", ko: "물 가져올게요." }
          ],
          fix: {
            instead: "Delicious?",
            say: "How is everything?",
            why: "맛있냐고 유도하지 말고, 더 필요한 것이 있는지 확인할 때 how is everything을 씁니다."
          }
        },
        {
          id: "bill",
          title: "계산",
          situation: "계산서를 달라는 말과, 나눠 낼지를 구분해 듣습니다.",
          phrases: [
            { en: "Would you like the bill?", ko: "계산서 가져다 드릴까요?" },
            { en: "Together or separate?", ko: "같이 계산하실까요, 따로 하실까요?" },
            { en: "I can split it by item.", ko: "메뉴별로 나눠 계산할 수 있어요." }
          ],
          talk: [
            { role: "guest", en: "Check, please.", ko: "계산할게요." },
            { role: "staff", en: "Together or separate?", ko: "같이 하실까요, 따로 하실까요?" },
            { role: "guest", en: "Separate, please.", ko: "따로요." }
          ],
          fix: {
            instead: "Money now?",
            say: "Would you like the bill?",
            why: "계산은 bill 또는 check입니다. money now는 쓰지 않습니다."
          }
        }
      ],
      practices: [
        {
          id: "table",
          title: "네 명 테이블",
          goal: "인원을 안내하고, 맵기를 확인한 뒤 계산 방식을 묻습니다.",
          turns: [
            {
              say: { en: "Hi, four people.", ko: "네 명이요." },
              prompt: "자리로 안내하세요.",
              good: [["this way"], ["table"]],
              better: "Table for four. This way, please.",
              goodNote: "인원을 반복해 주면 손님도 자리를 확인하기 쉽습니다."
            },
            {
              say: { en: "Is the stew spicy?", ko: "찌개 매워요?" },
              prompt: "맵다고 말하고, 순하게 할지 물어보세요.",
              good: [["spicy", "mild"], ["less spicy"]],
              better: "Yes, it's spicy. Would you like it mild?",
              goodNote: "맵다는 사실과 순하게 조절할 수 있다는 말을 같이 하세요."
            },
            {
              say: { en: "Mild, please. And the bill later, separate.", ko: "순하게요. 계산은 나중에 따로 할게요." },
              prompt: "따로 계산한다고 확인해 주세요.",
              good: [["separate"]],
              better: "Mild stew. And I'll split the bill at the end.",
              goodNote: "separate 또는 split the bill이라고 확인하면 됩니다."
            }
          ]
        }
      ]
    },
    {
      id: "clothes",
      group: "wear",
      name: "옷 가게",
      examples: "아디다스, 보세 옷가게 등",
      summary: "부담 없이 사이즈를 확인하고 피팅룸까지 안내합니다.",
      lessons: [
        {
          id: "greet",
          title: "맞이",
          situation: "보는 중인 손님을 쫓지 말고, 도움이 필요할 때 부르라고 말합니다.",
          phrases: [
            { en: "Hi. Let me know if you need a size.", ko: "안녕하세요. 사이즈 필요하시면 말씀해 주세요." },
            { en: "Are you looking for something specific?", ko: "찾으시는 옷이 있으세요?" },
            { en: "Take your time. I'm right here.", ko: "천천히 보세요. 저 여기 있을게요." }
          ],
          talk: [
            { role: "staff", en: "Hi. Let me know if you need a size.", ko: "사이즈 필요하시면 말씀해 주세요." },
            { role: "guest", en: "I'm just looking, thanks.", ko: "그냥 보는 중이에요." },
            { role: "staff", en: "Sure. Take your time.", ko: "네, 천천히 보세요." }
          ],
          fix: {
            instead: "Buy something?",
            say: "Let me know if you need a size.",
            why: "구매를 재촉하지 않는 말이 옷 가게의 첫 문장으로 더 자연스럽습니다."
          }
        },
        {
          id: "size",
          title: "사이즈",
          situation: "작아 보이는 옷은 한 치수 위를 권합니다.",
          phrases: [
            { en: "What size do you usually wear?", ko: "보통 사이즈가 어떻게 되세요?" },
            { en: "This runs small. I'd try a size up.", ko: "이 옷은 작게 나와요. 한 사이즈 크게 입어 보세요." },
            { en: "We have it in small, medium, and large.", ko: "스몰, 미디움, 라지 있습니다." }
          ],
          talk: [
            { role: "guest", en: "Do you have this in medium?", ko: "이거 미디움 있어요?" },
            { role: "staff", en: "This runs small. I'd try a large if you want a relaxed fit.", ko: "이 옷은 작게 나와서, 편하게 입으려면 라지를 권해요." }
          ],
          fix: {
            instead: "Size small mean big.",
            say: "This runs small. I'd try a size up.",
            why: "runs small이 실측보다 작게 나온다는 매장 표현입니다."
          },
          practice: "fit"
        },
        {
          id: "fitting",
          title: "피팅룸",
          situation: "거울 앞에서 맞음새를 물을 때 어깨, 기장, 품을 나눠 말합니다.",
          phrases: [
            { en: "The fitting room is right over there.", ko: "피팅룸은 저쪽입니다." },
            { en: "How does it fit?", ko: "입어 보니 어때요?" },
            { en: "I can bring a size up.", ko: "한 사이즈 큰 걸로 가져올게요." }
          ],
          talk: [
            { role: "guest", en: "It's tight in the shoulders.", ko: "어깨가 껴요." },
            { role: "staff", en: "I can bring a size up.", ko: "한 사이즈 위로 가져올게요." },
            { role: "guest", en: "Yes, please.", ko: "네." }
          ],
          fix: {
            instead: "Fit okay?",
            say: "How does it fit?",
            why: "Okay로 유도하지 말고 how does it fit으로 맞음새를 여쭤 보세요."
          }
        },
        {
          id: "pay",
          title: "색상, 계산, 교환",
          situation: "재고와 교환 조건을 정확하게 말합니다.",
          phrases: [
            { en: "We have it in black and beige.", ko: "블랙이랑 베이지 있습니다." },
            { en: "That'll be 59,000 won.", ko: "59,000원입니다." },
            { en: "You can exchange it within 7 days with the receipt.", ko: "영수증 있으시면 7일 안에 교환됩니다." }
          ],
          talk: [
            { role: "guest", en: "Can I return this if it doesn't fit?", ko: "안 맞으면 환불되나요?" },
            { role: "staff", en: "You can exchange it within 7 days with the receipt.", ko: "영수증 있으면 7일 안에 교환돼요." }
          ],
          fix: {
            instead: "No return. Sorry.",
            say: "You can exchange it within 7 days with the receipt.",
            why: "안 된다고만 말하지 말고, 교환이 되는 조건을 같이 말하세요. 매장 정책에 맞게 날짜만 바꾸면 됩니다."
          }
        }
      ],
      practices: [
        {
          id: "fit",
          title: "후드티 사이즈",
          goal: "사이즈가 작게 나온다고 말하고 피팅룸을 안내합니다.",
          turns: [
            {
              say: { en: "Excuse me, do you have this hoodie in medium?", ko: "이 후드 미디움 있어요?" },
              prompt: "작게 나온다고 말하고 한 사이즈 위를 권하세요.",
              good: [["runs small"], ["size up"], ["large"]],
              better: "This runs small. I'd try a large.",
              goodNote: "runs small과 size up을 같이 말하면 설득이 됩니다."
            },
            {
              say: { en: "Okay, I'll try the large.", ko: "그럼 라지로 입어 볼게요." },
              prompt: "피팅룸 위치를 알려 주세요.",
              good: [["fitting room"], ["fitting"], ["over there"], ["this way"]],
              better: "The fitting room is right over there.",
              goodNote: "fitting room이 탈의실입니다."
            },
            {
              say: { en: "The large fits. I'll take it.", ko: "라지가 맞네요. 이걸로 살게요." },
              prompt: "금액은 59,000원입니다. 계산 문장을 말하세요.",
              good: [["59000", "won"], ["fifty nine thousand"]],
              better: "That'll be 59,000 won. Cash or card?",
              goodNote: "금액과 결제 방법을 한 번에 말하세요."
            }
          ]
        }
      ]
    },
    {
      id: "shoes",
      group: "wear",
      name: "신발",
      examples: "ABC마트, 크록스 등",
      summary: "한국 매장은 밀리미터 사이즈로 말합니다. 250, 260을 바로 꺼낼 수 있어야 합니다.",
      lessons: [
        {
          id: "size",
          title: "사이즈 확인",
          situation: "외국인 손님은 US 사이즈만 아는 경우가 많습니다. mm를 같이 설명합니다.",
          phrases: [
            { en: "What size do you wear?", ko: "사이즈가 어떻게 되세요?" },
            { en: "In Korea we use millimeters, like 250 or 260.", ko: "한국은 250, 260처럼 밀리미터로 말해요." },
            { en: "I'll bring a 260.", ko: "260으로 가져올게요." }
          ],
          talk: [
            { role: "guest", en: "I'm a women's 8 in the US.", ko: "미국 여자 8 사이즈예요." },
            { role: "staff", en: "That's about a 250. I'll bring a 250 and a 255.", ko: "250 정도예요. 250이랑 255 둘 다 가져올게요." }
          ],
          fix: {
            instead: "Size?",
            say: "What size do you wear? We use millimeters, like 250 or 260.",
            why: "Size?만 물으면 어느 나라 사이즈인지 서로 모릅니다."
          },
          practice: "try"
        },
        {
          id: "try",
          title: "신어 보기",
          situation: "앉아서만 보지 말고 몇 걸음 걸어 보라고 말합니다.",
          phrases: [
            { en: "Have a seat. I'll bring that size.", ko: "앉으세요. 그 사이즈로 가져올게요." },
            { en: "Walk around a little and see how it feels.", ko: "조금 걸어 보시고 발에 맞는지 보세요." },
            { en: "Is the toe box tight?", ko: "앞코가 끼나요?" }
          ],
          talk: [
            { role: "staff", en: "Walk around a little and see how it feels.", ko: "조금 걸어 보세요." },
            { role: "guest", en: "My toe hits the front.", ko: "발가락이 앞에 닿아요." },
            { role: "staff", en: "I'll bring the next size up.", ko: "한 사이즈 위로 가져올게요." }
          ],
          fix: {
            instead: "Good?",
            say: "Is the toe box tight?",
            why: "좋은지만 묻지 말고, 앞코가 끼는지처럼 확인할 곳을 말해 주세요."
          }
        },
        {
          id: "recommend",
          title: "용도 추천",
          situation: "편한 신발인지, 비 오는 날 신는 신발인지만 구분해도 됩니다.",
          phrases: [
            { en: "These are for walking. The sole is soft.", ko: "이 신발은 걷기에 좋고, 밑창이 부드러워요." },
            { en: "If you want something waterproof, this pair is better.", ko: "물에 강한 걸 찾으시면 이 신발이 더 낫습니다." },
            { en: "These run big. You may want a size down.", ko: "이 신발은 크게 나와요. 한 사이즈 작게 보셔도 됩니다." }
          ],
          talk: [
            { role: "guest", en: "I need shoes for walking all day.", ko: "하루 종일 걸을 신발이 필요해요." },
            { role: "staff", en: "These are for walking. The sole is soft.", ko: "이 신발은 걷기용이고 밑창이 부드러워요." }
          ],
          fix: {
            instead: "This popular.",
            say: "These are for walking. The sole is soft.",
            why: "인기만 말하지 말고, 어디에 신는 신발인지 용도를 말하세요."
          }
        },
        {
          id: "pay",
          title: "계산",
          situation: "박스와 영수증을 같이 안내합니다.",
          phrases: [
            { en: "That'll be 89,000 won.", ko: "89,000원입니다." },
            { en: "Would you like the box as well?", ko: "신발 박스도 가져가시겠어요?" },
            { en: "Keep the receipt if you need an exchange.", ko: "교환하실 수 있으니 영수증을 보관하세요." }
          ],
          talk: [
            { role: "staff", en: "That'll be 89,000 won. Would you like the box as well?", ko: "89,000원입니다. 박스도 드릴까요?" },
            { role: "guest", en: "Yes, and I'll pay by card.", ko: "네, 카드로 할게요." }
          ],
          fix: {
            instead: "Box yes no?",
            say: "Would you like the box as well?",
            why: "yes no를 붙이지 말고 would you like로 물어 보세요."
          }
        }
      ],
      practices: [
        {
          id: "try",
          title: "260 신어 보기",
          goal: "밀리미터 사이즈로 바꾸고, 걸어 보라고 말한 뒤 계산합니다.",
          turns: [
            {
              say: { en: "Hi, what sizes do you use here?", ko: "여기 사이즈는 어떻게 봐요?" },
              prompt: "밀리미터 사이즈라고 설명하세요.",
              good: [["250"], ["260"], ["millimeter"]],
              better: "We use millimeters, like 250 or 260.",
              goodNote: "250, 260처럼 예시 숫자를 같이 말하세요."
            },
            {
              say: { en: "I usually wear a 260.", ko: "보통 260 신어요." },
              prompt: "신발을 가져오고, 걸어 보라고 하세요.",
              good: [["walk"]],
              better: "I'll bring a 260. Walk around a little and see how it feels.",
              goodNote: "가져오겠다는 말과 걸어 보라는 말을 같이 하세요."
            },
            {
              say: { en: "These feel good. I'll take them.", ko: "이거 편해요. 이걸로 살게요." },
              prompt: "89,000원이라고 말하고 박스를 원하는지 물어보세요.",
              good: [["89000"], ["box"]],
              better: "That'll be 89,000 won. Would you like the box as well?",
              goodNote: "금액과 박스 여부를 한 번에 확인합니다."
            }
          ]
        }
      ]
    },
    {
      id: "cvs",
      group: "etc",
      name: "편의점",
      examples: "동네 편의점",
      summary: "위치 안내, 데우기, 봉투, 계산을 카운터에서 바로 처리합니다.",
      lessons: [
        {
          id: "find",
          title: "물건 위치",
          situation: "통로 번호나 냉장고 방향으로 짧게 안내합니다.",
          phrases: [
            { en: "The ramen is on aisle 2.", ko: "라면은 2번 통로에 있어요." },
            { en: "It's in the fridge, on your left.", ko: "왼쪽 냉장고에 있어요." },
            { en: "I can show you.", ko: "제가 안내해 드릴게요." }
          ],
          talk: [
            { role: "guest", en: "Where is the water?", ko: "물 어디 있어요?" },
            { role: "staff", en: "It's in the fridge, on your left.", ko: "왼쪽 냉장고에 있어요." }
          ],
          fix: {
            instead: "There.",
            say: "It's in the fridge, on your left.",
            why: "손가락만 가리키기보다 left, right, fridge, aisle을 말해야 알아듣습니다."
          },
          practice: "counter"
        },
        {
          id: "heat",
          title: "데우기와 봉투",
          situation: "도시락을 데워 주는 말과 유료 봉투를 구분합니다.",
          phrases: [
            { en: "Would you like me to heat this up?", ko: "데워드릴까요?" },
            { en: "It'll take about two minutes.", ko: "2분 정도 걸려요." },
            { en: "Do you need a bag? It's 100 won.", ko: "봉투 필요하세요? 100원입니다." }
          ],
          talk: [
            { role: "staff", en: "Would you like me to heat this up?", ko: "도시락 데워드릴까요?" },
            { role: "guest", en: "Yes, please. And a bag.", ko: "네. 봉투도요." },
            { role: "staff", en: "Sure. The bag is 100 won.", ko: "봉투는 100원이에요." }
          ],
          fix: {
            instead: "Hot? Bag money.",
            say: "Would you like me to heat this up? A bag is 100 won.",
            why: "데우기와 봉투 값을 각각 문장으로 말하세요."
          }
        },
        {
          id: "pay",
          title: "계산과 멤버십",
          situation: "총액을 먼저 말하고, 포인트는 그다음에 묻습니다.",
          phrases: [
            { en: "Your total is 6,400 won.", ko: "총 6,400원입니다." },
            { en: "Cash or card?", ko: "현금이세요, 카드세요?" },
            { en: "Do you have a membership card?", ko: "멤버십 카드 있으세요?" }
          ],
          talk: [
            { role: "staff", en: "Your total is 6,400 won. Cash or card?", ko: "6,400원입니다. 현금이세요, 카드세요?" },
            { role: "guest", en: "Card.", ko: "카드요." },
            { role: "staff", en: "Do you have a membership card?", ko: "포인트 카드 있으세요?" }
          ],
          fix: {
            instead: "Point card?",
            say: "Do you have a membership card?",
            why: "Point card보다 membership card가 더 널리 통합니다."
          }
        },
        {
          id: "id",
          title: "나이 확인",
          situation: "주류나 담배를 계산할 때는 나이를 확인하는 문장이 필요합니다.",
          phrases: [
            { en: "Can I see your ID for this?", ko: "이 상품은 신분증을 확인해야 합니다." },
            { en: "I can't sell this without an ID.", ko: "신분증이 없으면 판매할 수 없습니다." },
            { en: "Thank you. You're all set.", ko: "확인했습니다. 결제 도와드리겠습니다." }
          ],
          talk: [
            { role: "staff", en: "Can I see your ID for the beer?", ko: "맥주는 신분증 확인이 필요해요." },
            { role: "guest", en: "Sure. Here it is.", ko: "여기요." },
            { role: "staff", en: "Thank you. You're all set.", ko: "확인했어요. 결제하겠습니다." }
          ],
          fix: {
            instead: "How old?",
            say: "Can I see your ID for this?",
            why: "나이를 말로만 묻지 말고, 신분증 확인이라고 정확히 말하세요."
          }
        }
      ],
      practices: [
        {
          id: "counter",
          title: "도시락 계산",
          goal: "위치를 안내했던 손님이 계산할 때 데우기, 봉투, 금액 순서로 말합니다.",
          turns: [
            {
              say: { en: "Where can I heat this lunch box?", ko: "이 도시락 어디서 데워요?" },
              prompt: "직원이 데워드린다고 말하고, 시간을 알려 주세요.",
              good: [["heat"]],
              better: "I can heat it up for you. It'll take about two minutes.",
              goodNote: "heat it up과 걸리는 시간을 같이 말하세요."
            },
            {
              say: { en: "Yes, please.", ko: "네, 부탁해요." },
              prompt: "봉투가 100원이라고 물어보세요.",
              good: [["bag", "100"], ["bag", "won"]],
              better: "Do you need a bag? It's 100 won.",
              goodNote: "봉투는 bag입니다. 가격을 같이 말하세요."
            },
            {
              say: { en: "No bag. I'll pay by card.", ko: "봉투는 괜찮아요. 카드로 할게요." },
              prompt: "총액 6,400원을 말해 주세요.",
              good: [["6400", "won"], ["6 400", "won"], ["six thousand"]],
              better: "Your total is 6,400 won. You can insert your card.",
              goodNote: "봉투를 뺐다면 총액만 분명히 말합니다."
            }
          ]
        }
      ]
    },
    {
      id: "mart",
      group: "etc",
      name: "마트",
      examples: "동네 마트",
      summary: "매장 안내는 통로 번호로, 계산은 봉투와 총액으로 끝냅니다.",
      lessons: [
        {
          id: "direct",
          title: "매장 안내",
          situation: "큰 구역을 먼저 말하고, 필요하면 동행하겠다고 말합니다.",
          phrases: [
            { en: "The produce section is in the back.", ko: "채소와 과일은 매장 안쪽에 있어요." },
            { en: "Carts are right here.", ko: "카트는 여기 있습니다." },
            { en: "I can walk you there.", ko: "제가 그쪽으로 같이 가 드릴게요." }
          ],
          talk: [
            { role: "guest", en: "Where are the apples?", ko: "사과 어디 있어요?" },
            { role: "staff", en: "The produce section is in the back. I can walk you there.", ko: "안쪽 신선 코너예요. 같이 가 드릴까요?" }
          ],
          fix: {
            instead: "Back side.",
            say: "The produce section is in the back.",
            why: "구역 이름 produce, dairy, frozen을 알아야 안내가 짧아집니다."
          },
          practice: "aisle"
        },
        {
          id: "price",
          title: "가격과 위치",
          situation: "가격표를 같이 보거나, 통로와 선반 높이를 말합니다.",
          phrases: [
            { en: "I can check the price for you.", ko: "가격 확인해 드릴게요." },
            { en: "That's on aisle 7, middle shelf.", ko: "7번 통로 가운데 칸에 있어요." },
            { en: "It's 4,200 won.", ko: "4,200원입니다." }
          ],
          talk: [
            { role: "guest", en: "How much is this?", ko: "이거 얼마예요?" },
            { role: "staff", en: "I can check the price for you. It's 4,200 won.", ko: "확인해 드릴게요. 4,200원이에요." }
          ],
          fix: {
            instead: "Cheap.",
            say: "It's 4,200 won.",
            why: "싸다, 비싸다 대신 금액을 말해야 안내가 끝납니다."
          }
        },
        {
          id: "bag",
          title: "계산과 봉투",
          situation: "봉투가 유료이면 담기 전에 말합니다.",
          phrases: [
            { en: "Do you need a bag?", ko: "봉투 필요하세요?" },
            { en: "Paper or reusable?", ko: "종이봉투로 할까요, 장바구니에 담을까요?" },
            { en: "Your total is 32,800 won.", ko: "총 32,800원입니다." }
          ],
          talk: [
            { role: "staff", en: "Do you need a bag?", ko: "봉투 필요하세요?" },
            { role: "guest", en: "Yes, paper please.", ko: "종이봉투로 주세요." },
            { role: "staff", en: "Your total is 32,800 won.", ko: "총 32,800원입니다." }
          ],
          fix: {
            instead: "Vinyl?",
            say: "Do you need a bag?",
            why: "비닐은 vinyl보다 bag으로 묻는 편이 바로 통합니다."
          }
        },
        {
          id: "help",
          title: "짐 안내",
          situation: "무거운 짐은 카운터 밖으로 옮겨 주겠다고 말할 수 있습니다.",
          phrases: [
            { en: "Would you like help taking this to the exit?", ko: "출구까지 옮겨 드릴까요?" },
            { en: "The taxi stand is outside, on the left.", ko: "택시 타는 곳은 밖 왼쪽입니다." },
            { en: "You're all set. Have a good day.", ko: "결제 끝났습니다. 좋은 하루 보내세요." }
          ],
          talk: [
            { role: "staff", en: "Would you like help taking this to the exit?", ko: "출구까지 도와드릴까요?" },
            { role: "guest", en: "I'm okay, thank you.", ko: "괜찮아요." },
            { role: "staff", en: "You're all set. Have a good day.", ko: "네, 좋은 하루 보내세요." }
          ],
          fix: {
            instead: "Go now.",
            say: "You're all set. Have a good day.",
            why: "계산이 끝나면 all set과 짧은 인사가 자연스럽습니다."
          }
        }
      ],
      practices: [
        {
          id: "aisle",
          title: "우유 위치와 계산",
          goal: "통로로 안내하고, 계산대에서 봉투와 총액을 말합니다.",
          turns: [
            {
              say: { en: "Excuse me, where is the milk?", ko: "우유 어디 있어요?" },
              prompt: "유제품 코너가 7번 통로라고 안내하세요.",
              good: [["aisle 7"], ["aisle", "7"], ["dairy"]],
              better: "The milk is on aisle 7, in the dairy section.",
              goodNote: "aisle 번호와 dairy section을 같이 말하세요."
            },
            {
              say: { en: "Thanks. I'll take two.", ko: "고마워요. 두 개 살게요." },
              prompt: "계산대라고 생각하고, 봉투가 필요한지 물어보세요.",
              good: [["bag"]],
              better: "Do you need a bag?",
              goodNote: "봉투는 bag입니다."
            },
            {
              say: { en: "No bag. Card, please.", ko: "봉투는 괜찮아요. 카드로 할게요." },
              prompt: "총액 3,600원을 말하세요.",
              good: [["3600", "won"], ["3 600"], ["three thousand"]],
              better: "Your total is 3,600 won. Please insert your card.",
              goodNote: "카드 결제는 insert your card로 안내할 수 있습니다."
            }
          ]
        }
      ]
    }
  ]
};
