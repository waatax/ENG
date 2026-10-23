// Original bilingual scenario practice; not official exam questions.
export const NEW_CONVERSATION_SCENARIOS = [
  {
    "id": "scenario:first-class",
    "stage": "featured",
    "level": "A1 入門",
    "title": "第一次上課：找教室與介紹自己",
    "scenario": "到新教室報到，練習姓名、座位與請求重述。",
    "topicTag": "新增情境 · 第一次上課",
    "isNew": true,
    "lines": [
      {
        "speaker": "Maya",
        "en": "Hi, is this the English class?",
        "zh": "嗨，這是英文課的教室嗎？",
        "note": "介紹自己用 I'm；聽不清楚可用 Could you say that again?"
      },
      {
        "speaker": "Ben",
        "en": "Yes, it is. I'm Ben. What's your name?",
        "zh": "對。我是 Ben，你叫什麼名字？",
        "note": "介紹自己用 I'm；聽不清楚可用 Could you say that again?"
      },
      {
        "speaker": "Maya",
        "en": "I'm Maya. Is this seat taken?",
        "zh": "我是 Maya，這個位子有人坐嗎？",
        "note": "介紹自己用 I'm；聽不清楚可用 Could you say that again?"
      },
      {
        "speaker": "Ben",
        "en": "No, go ahead. The teacher will be here soon.",
        "zh": "沒有，請坐。老師很快就來。",
        "note": "介紹自己用 I'm；聽不清楚可用 Could you say that again?"
      },
      {
        "speaker": "Maya",
        "en": "Sorry, could you say that again?",
        "zh": "不好意思，可以再說一次嗎？",
        "note": "介紹自己用 I'm；聽不清楚可用 Could you say that again?"
      },
      {
        "speaker": "Ben",
        "en": "Sure. The teacher will be here soon.",
        "zh": "可以，老師很快就來。",
        "note": "介紹自己用 I'm；聽不清楚可用 Could you say that again?"
      }
    ],
    "keyPatterns": [
      "Hi, is this the English class?（嗨，這是英文課的教室嗎？）",
      "Yes, it is. I'm Ben. What's your name?（對。我是 Ben，你叫什麼名字？）"
    ],
    "recallPrompt": "不看字幕，換成自己的資訊，說出這個情境的一問一答。",
    "recallAnswer": "Hi, is this the English class? Yes, it is. I'm Ben. What's your name?"
  },
  {
    "id": "scenario:lunch-table",
    "stage": "featured",
    "level": "A1 入門",
    "title": "午餐交朋友：詢問喜好與加入同桌",
    "scenario": "在學校餐廳詢問座位、食物與共同喜好。",
    "topicTag": "新增情境 · 午餐交朋友",
    "isNew": true,
    "lines": [
      {
        "speaker": "Maya",
        "en": "Can I sit here?",
        "zh": "我可以坐這裡嗎？",
        "note": "Do you like 詢問喜好；Can I sit here? 詢問能否入座。"
      },
      {
        "speaker": "Ben",
        "en": "Sure! Is that chicken and rice?",
        "zh": "當然！那是雞肉飯嗎？",
        "note": "Do you like 詢問喜好；Can I sit here? 詢問能否入座。"
      },
      {
        "speaker": "Maya",
        "en": "Yes. Do you like chicken?",
        "zh": "對，你喜歡雞肉嗎？",
        "note": "Do you like 詢問喜好；Can I sit here? 詢問能否入座。"
      },
      {
        "speaker": "Ben",
        "en": "I do, but I brought a sandwich today.",
        "zh": "喜歡，不過我今天帶三明治。",
        "note": "Do you like 詢問喜好；Can I sit here? 詢問能否入座。"
      },
      {
        "speaker": "Maya",
        "en": "Would you like some of my apple?",
        "zh": "要吃一點我的蘋果嗎？",
        "note": "Do you like 詢問喜好；Can I sit here? 詢問能否入座。"
      },
      {
        "speaker": "Ben",
        "en": "Thanks! Just a little, please.",
        "zh": "謝謝！一點點就好。",
        "note": "Do you like 詢問喜好；Can I sit here? 詢問能否入座。"
      }
    ],
    "keyPatterns": [
      "Can I sit here?（我可以坐這裡嗎？）",
      "Sure! Is that chicken and rice?（當然！那是雞肉飯嗎？）"
    ],
    "recallPrompt": "不看字幕，換成自己的資訊，說出這個情境的一問一答。",
    "recallAnswer": "Can I sit here? Sure! Is that chicken and rice?"
  },
  {
    "id": "scenario:lost-pencil",
    "stage": "featured",
    "level": "A1 入門",
    "title": "遺失文具：辨認物品與道謝",
    "scenario": "找不到鉛筆，描述顏色並辨認自己的物品。",
    "topicTag": "新增情境 · 遺失文具",
    "isNew": true,
    "lines": [
      {
        "speaker": "Maya",
        "en": "I can't find my pencil.",
        "zh": "我找不到鉛筆。",
        "note": "Is this your...? 用來確認物品；mine 代替 my 加名詞。"
      },
      {
        "speaker": "Ben",
        "en": "What color is it?",
        "zh": "它是什麼顏色？",
        "note": "Is this your...? 用來確認物品；mine 代替 my 加名詞。"
      },
      {
        "speaker": "Maya",
        "en": "It's blue, with a white star.",
        "zh": "藍色，上面有顆白色星星。",
        "note": "Is this your...? 用來確認物品；mine 代替 my 加名詞。"
      },
      {
        "speaker": "Ben",
        "en": "Is this one yours?",
        "zh": "這支是你的嗎？",
        "note": "Is this your...? 用來確認物品；mine 代替 my 加名詞。"
      },
      {
        "speaker": "Maya",
        "en": "Yes, that's mine. Thank you!",
        "zh": "對，那是我的。謝謝！",
        "note": "Is this your...? 用來確認物品；mine 代替 my 加名詞。"
      },
      {
        "speaker": "Ben",
        "en": "You're welcome. It was under your book.",
        "zh": "不客氣。剛才在你的書下面。",
        "note": "Is this your...? 用來確認物品；mine 代替 my 加名詞。"
      }
    ],
    "keyPatterns": [
      "I can't find my pencil.（我找不到鉛筆。）",
      "What color is it?（它是什麼顏色？）"
    ],
    "recallPrompt": "不看字幕，換成自己的資訊，說出這個情境的一問一答。",
    "recallAnswer": "I can't find my pencil. What color is it?"
  },
  {
    "id": "scenario:weekend-invite",
    "stage": "featured",
    "level": "A1 入門",
    "title": "週末邀約：公園見面與確認時間",
    "scenario": "邀請朋友去公園，問清楚時間與入口。",
    "topicTag": "新增情境 · 週末邀約",
    "isNew": true,
    "lines": [
      {
        "speaker": "Maya",
        "en": "Would you like to go to the park on Saturday?",
        "zh": "週六想去公園嗎？",
        "note": "Would you like to 邀約；at 配時間，by 配附近地標。"
      },
      {
        "speaker": "Ben",
        "en": "Sure. What time?",
        "zh": "好，幾點？",
        "note": "Would you like to 邀約；at 配時間，by 配附近地標。"
      },
      {
        "speaker": "Maya",
        "en": "How about ten in the morning?",
        "zh": "早上十點如何？",
        "note": "Would you like to 邀約；at 配時間，by 配附近地標。"
      },
      {
        "speaker": "Ben",
        "en": "That works. Where should we meet?",
        "zh": "可以，在哪裡碰面？",
        "note": "Would you like to 邀約；at 配時間，by 配附近地標。"
      },
      {
        "speaker": "Maya",
        "en": "By the big gate, next to the bus stop.",
        "zh": "大門旁、公車站旁邊。",
        "note": "Would you like to 邀約；at 配時間，by 配附近地標。"
      },
      {
        "speaker": "Ben",
        "en": "Great. See you there!",
        "zh": "好，到時見！",
        "note": "Would you like to 邀約；at 配時間，by 配附近地標。"
      }
    ],
    "keyPatterns": [
      "Would you like to go to the park on Saturday?（週六想去公園嗎？）",
      "Sure. What time?（好，幾點？）"
    ],
    "recallPrompt": "不看字幕，換成自己的資訊，說出這個情境的一問一答。",
    "recallAnswer": "Would you like to go to the park on Saturday? Sure. What time?"
  },
  {
    "id": "scenario:ask-repeat",
    "stage": "featured",
    "level": "A1 入門",
    "title": "聽不懂也能繼續：慢一點與拼名字",
    "scenario": "初次見面沒聽清楚姓名，禮貌請求重述和拼字。",
    "topicTag": "新增情境 · 聽不懂也能繼續",
    "isNew": true,
    "lines": [
      {
        "speaker": "Rachel",
        "en": "Hi, I'm Rachel. Nice to meet you.",
        "zh": "嗨，我是 Rachel，很高興認識你。",
        "note": "Could you speak a little more slowly? 可用於請對方稍微放慢。"
      },
      {
        "speaker": "Ben",
        "en": "Nice to meet you, too. Could you say your name again?",
        "zh": "我也是。可以再說一次名字嗎？",
        "note": "Could you speak a little more slowly? 可用於請對方稍微放慢。"
      },
      {
        "speaker": "Rachel",
        "en": "Rachel. It's spelled R, A, C, H, E, L.",
        "zh": "Rachel，拼法是 R、A、C、H、E、L。",
        "note": "Could you speak a little more slowly? 可用於請對方稍微放慢。"
      },
      {
        "speaker": "Ben",
        "en": "Thanks. I'm still learning English.",
        "zh": "謝謝，我還在學英文。",
        "note": "Could you speak a little more slowly? 可用於請對方稍微放慢。"
      },
      {
        "speaker": "Rachel",
        "en": "No problem. Would you like me to speak more slowly?",
        "zh": "沒問題，要我說慢一點嗎？",
        "note": "Could you speak a little more slowly? 可用於請對方稍微放慢。"
      },
      {
        "speaker": "Ben",
        "en": "Yes, please. That would help.",
        "zh": "好，謝謝，那會很有幫助。",
        "note": "Could you speak a little more slowly? 可用於請對方稍微放慢。"
      }
    ],
    "keyPatterns": [
      "Hi, I'm Rachel. Nice to meet you.（嗨，我是 Rachel，很高興認識你。）",
      "Nice to meet you, too. Could you say your name again?（我也是。可以再說一次名字嗎？）"
    ],
    "recallPrompt": "不看字幕，換成自己的資訊，說出這個情境的一問一答。",
    "recallAnswer": "Hi, I'm Rachel. Nice to meet you. Nice to meet you, too. Could you say your name again?"
  },
  {
    "id": "scenario:store-hours",
    "stage": "featured",
    "level": "A1 入門",
    "title": "商店營業時間：今天還有開嗎",
    "scenario": "詢問書店何時關門與週日是否營業。",
    "topicTag": "新增情境 · 商店營業時間",
    "isNew": true,
    "lines": [
      {
        "speaker": "Maya",
        "en": "Excuse me. What time do you close today?",
        "zh": "不好意思，今天幾點關門？",
        "note": "What time do you close? 問關門時間；open 可作形容詞。"
      },
      {
        "speaker": "Ben",
        "en": "We close at eight.",
        "zh": "我們八點關門。",
        "note": "What time do you close? 問關門時間；open 可作形容詞。"
      },
      {
        "speaker": "Maya",
        "en": "Are you open on Sunday, too?",
        "zh": "星期日也有開嗎？",
        "note": "What time do you close? 問關門時間；open 可作形容詞。"
      },
      {
        "speaker": "Ben",
        "en": "Yes, from ten to six.",
        "zh": "有，十點到六點。",
        "note": "What time do you close? 問關門時間；open 可作形容詞。"
      },
      {
        "speaker": "Maya",
        "en": "Great. I can come back tomorrow.",
        "zh": "太好了，我明天可以再來。",
        "note": "What time do you close? 問關門時間；open 可作形容詞。"
      },
      {
        "speaker": "Ben",
        "en": "Sounds good. Have a nice evening!",
        "zh": "好，祝你晚上愉快！",
        "note": "What time do you close? 問關門時間；open 可作形容詞。"
      }
    ],
    "keyPatterns": [
      "Excuse me. What time do you close today?（不好意思，今天幾點關門？）",
      "We close at eight.（我們八點關門。）"
    ],
    "recallPrompt": "不看字幕，換成自己的資訊，說出這個情境的一問一答。",
    "recallAnswer": "Excuse me. What time do you close today? We close at eight."
  },
  {
    "id": "scenario:wrong-order",
    "stage": "featured",
    "level": "A2 基礎",
    "title": "餐點送錯：說明問題與確認更換",
    "scenario": "收到熱飲但點的是冰飲，禮貌請服務人員確認。",
    "topicTag": "新增情境 · 餐點送錯",
    "isNew": true,
    "lines": [
      {
        "speaker": "Maya",
        "en": "Excuse me. I ordered an iced tea, but this one is hot.",
        "zh": "不好意思，我點冰茶，但這杯是熱的。",
        "note": "I ordered X, but this is Y 清楚描述差異；不需指責對方。"
      },
      {
        "speaker": "Ben",
        "en": "I'm sorry about that. Could I see your receipt?",
        "zh": "不好意思，可以看一下收據嗎？",
        "note": "I ordered X, but this is Y 清楚描述差異；不需指責對方。"
      },
      {
        "speaker": "Maya",
        "en": "Sure. It's the second item.",
        "zh": "可以，在第二項。",
        "note": "I ordered X, but this is Y 清楚描述差異；不需指責對方。"
      },
      {
        "speaker": "Ben",
        "en": "You're right. I'll have an iced tea made for you.",
        "zh": "你說得對，我請人幫你重做冰茶。",
        "note": "I ordered X, but this is Y 清楚描述差異；不需指責對方。"
      },
      {
        "speaker": "Maya",
        "en": "Thanks. Should I leave this one here?",
        "zh": "謝謝，這杯放在這裡嗎？",
        "note": "I ordered X, but this is Y 清楚描述差異；不需指責對方。"
      },
      {
        "speaker": "Ben",
        "en": "Yes, please. I'll take care of it.",
        "zh": "對，謝謝，我來處理。",
        "note": "I ordered X, but this is Y 清楚描述差異；不需指責對方。"
      }
    ],
    "keyPatterns": [
      "Excuse me. I ordered an iced tea, but this one is hot.（不好意思，我點冰茶，但這杯是熱的。）",
      "I'm sorry about that. Could I see your receipt?（不好意思，可以看一下收據嗎？）"
    ],
    "recallPrompt": "不看字幕，換成自己的資訊，說出這個情境的一問一答。",
    "recallAnswer": "Excuse me. I ordered an iced tea, but this one is hot. I'm sorry about that. Could I see your receipt?"
  },
  {
    "id": "scenario:return-jacket",
    "stage": "featured",
    "level": "A2 基礎",
    "title": "退換貨：尺寸不合與購買證明",
    "scenario": "帶外套回店裡詢問換尺寸，依本店庫存及條件處理。",
    "topicTag": "新增情境 · 退換貨",
    "isNew": true,
    "lines": [
      {
        "speaker": "Maya",
        "en": "Hi, I'd like to exchange this jacket. It's a little too small.",
        "zh": "你好，我想換這件外套，有點太小。",
        "note": "I'd like to exchange... 表想換貨；Do you have it in...? 詢問尺寸。"
      },
      {
        "speaker": "Ben",
        "en": "Do you have the receipt with you?",
        "zh": "有帶收據嗎？",
        "note": "I'd like to exchange... 表想換貨；Do you have it in...? 詢問尺寸。"
      },
      {
        "speaker": "Maya",
        "en": "Yes, here it is. Do you have it in a medium?",
        "zh": "有，在這裡。有中號嗎？",
        "note": "I'd like to exchange... 表想換貨；Do you have it in...? 詢問尺寸。"
      },
      {
        "speaker": "Ben",
        "en": "Let me check. We have a medium in blue, but not in black.",
        "zh": "我查一下。有藍色中號，黑色沒有。",
        "note": "I'd like to exchange... 表想換貨；Do you have it in...? 詢問尺寸。"
      },
      {
        "speaker": "Maya",
        "en": "Could I try the blue one on?",
        "zh": "可以試穿藍色的嗎？",
        "note": "I'd like to exchange... 表想換貨；Do you have it in...? 詢問尺寸。"
      },
      {
        "speaker": "Ben",
        "en": "Of course. The fitting rooms are over there.",
        "zh": "當然，試衣間在那邊。",
        "note": "I'd like to exchange... 表想換貨；Do you have it in...? 詢問尺寸。"
      }
    ],
    "keyPatterns": [
      "Hi, I'd like to exchange this jacket. It's a little too small.（你好，我想換這件外套，有點太小。）",
      "Do you have the receipt with you?（有帶收據嗎？）"
    ],
    "recallPrompt": "不看字幕，換成自己的資訊，說出這個情境的一問一答。",
    "recallAnswer": "Hi, I'd like to exchange this jacket. It's a little too small. Do you have the receipt with you?"
  },
  {
    "id": "scenario:missed-bus",
    "stage": "featured",
    "level": "A2 基礎",
    "title": "錯過公車：查下一班與替代路線",
    "scenario": "錯過原訂班次，詢問下一班及附近其他站點。",
    "topicTag": "新增情境 · 錯過公車",
    "isNew": true,
    "lines": [
      {
        "speaker": "Maya",
        "en": "Did the number twelve bus just leave?",
        "zh": "十二號公車剛走嗎？",
        "note": "When's the next bus? 問下一班；get off 表下車。"
      },
      {
        "speaker": "Ben",
        "en": "Yes, about two minutes ago.",
        "zh": "對，大概兩分鐘前。",
        "note": "When's the next bus? 問下一班；get off 表下車。"
      },
      {
        "speaker": "Maya",
        "en": "Do you know when the next one comes?",
        "zh": "知道下一班什麼時候來嗎？",
        "note": "When's the next bus? 問下一班；get off 表下車。"
      },
      {
        "speaker": "Ben",
        "en": "In twenty minutes. Where are you headed?",
        "zh": "二十分鐘後。你要去哪裡？",
        "note": "When's the next bus? 問下一班；get off 表下車。"
      },
      {
        "speaker": "Maya",
        "en": "The city library.",
        "zh": "市立圖書館。",
        "note": "When's the next bus? 問下一班；get off 表下車。"
      },
      {
        "speaker": "Ben",
        "en": "The number eight goes nearby, too. Get off at Pine Street.",
        "zh": "八號也到附近，在 Pine Street 下車。",
        "note": "When's the next bus? 問下一班；get off 表下車。"
      }
    ],
    "keyPatterns": [
      "Did the number twelve bus just leave?（十二號公車剛走嗎？）",
      "Yes, about two minutes ago.（對，大概兩分鐘前。）"
    ],
    "recallPrompt": "不看字幕，換成自己的資訊，說出這個情境的一問一答。",
    "recallAnswer": "Did the number twelve bus just leave? Yes, about two minutes ago."
  },
  {
    "id": "scenario:hotel-noise",
    "stage": "featured",
    "level": "A2 基礎",
    "title": "飯店房間有噪音：請求協助與換房",
    "scenario": "向櫃檯描述隔壁噪音，確認可行的處理方式。",
    "topicTag": "新增情境 · 飯店房間有噪音",
    "isNew": true,
    "lines": [
      {
        "speaker": "Maya",
        "en": "Hi, this is Room 312. There's loud music coming from next door.",
        "zh": "你好，這裡是三一二房，隔壁有很大聲的音樂。",
        "note": "Would it be possible to...? 委婉詢問可行性；先描述問題再提需求。"
      },
      {
        "speaker": "Ben",
        "en": "I'm sorry. We'll contact the guests and ask them to turn it down.",
        "zh": "不好意思，我們會聯絡房客，請他們小聲一點。",
        "note": "Would it be possible to...? 委婉詢問可行性；先描述問題再提需求。"
      },
      {
        "speaker": "Maya",
        "en": "Thank you. If it continues, would it be possible to change rooms?",
        "zh": "謝謝。如果持續這樣，有可能換房嗎？",
        "note": "Would it be possible to...? 委婉詢問可行性；先描述問題再提需求。"
      },
      {
        "speaker": "Ben",
        "en": "Let me check what we have available tonight.",
        "zh": "我看看今晚有哪些空房。",
        "note": "Would it be possible to...? 委婉詢問可行性；先描述問題再提需求。"
      },
      {
        "speaker": "Maya",
        "en": "I'd appreciate that. I need to get up early.",
        "zh": "謝謝幫忙，我明天需要早起。",
        "note": "Would it be possible to...? 委婉詢問可行性；先描述問題再提需求。"
      },
      {
        "speaker": "Ben",
        "en": "I understand. I'll call you back shortly.",
        "zh": "了解，我稍後打電話回覆。",
        "note": "Would it be possible to...? 委婉詢問可行性；先描述問題再提需求。"
      }
    ],
    "keyPatterns": [
      "Hi, this is Room 312. There's loud music coming from next door.（你好，這裡是三一二房，隔壁有很大聲的音樂。）",
      "I'm sorry. We'll contact the guests and ask them to turn it down.（不好意思，我們會聯絡房客，請他們小聲一點。）"
    ],
    "recallPrompt": "不看字幕，換成自己的資訊，說出這個情境的一問一答。",
    "recallAnswer": "Hi, this is Room 312. There's loud music coming from next door. I'm sorry. We'll contact the guests and ask them to turn it down."
  },
  {
    "id": "scenario:food-preference",
    "stage": "featured",
    "level": "A2 基礎",
    "title": "點餐說明飲食需求：確認成分與替代品",
    "scenario": "詢問是否含乳製品，確認店家能否提供替代飲品。",
    "topicTag": "新增情境 · 點餐說明飲食需求",
    "isNew": true,
    "lines": [
      {
        "speaker": "Maya",
        "en": "Does this smoothie contain milk or yogurt?",
        "zh": "這杯果昔含牛奶或優格嗎？",
        "note": "Does this contain...? 問成分；可否替換須由店家確認。"
      },
      {
        "speaker": "Ben",
        "en": "It usually has yogurt. Are you avoiding dairy?",
        "zh": "一般有優格。你需要避免乳製品嗎？",
        "note": "Does this contain...? 問成分；可否替換須由店家確認。"
      },
      {
        "speaker": "Maya",
        "en": "Yes. Could it be made without the yogurt?",
        "zh": "對，可以不加優格嗎？",
        "note": "Does this contain...? 問成分；可否替換須由店家確認。"
      },
      {
        "speaker": "Ben",
        "en": "I'll check with the kitchen about the ingredients and preparation.",
        "zh": "我向廚房確認成分和製作方式。",
        "note": "Does this contain...? 問成分；可否替換須由店家確認。"
      },
      {
        "speaker": "Maya",
        "en": "Thanks. Please let me know if it can't be made that way.",
        "zh": "謝謝。如果不能這樣做，請告訴我。",
        "note": "Does this contain...? 問成分；可否替換須由店家確認。"
      },
      {
        "speaker": "Ben",
        "en": "Of course. I'll check before we place the order.",
        "zh": "當然，我確認後再幫你下單。",
        "note": "Does this contain...? 問成分；可否替換須由店家確認。"
      }
    ],
    "keyPatterns": [
      "Does this smoothie contain milk or yogurt?（這杯果昔含牛奶或優格嗎？）",
      "It usually has yogurt. Are you avoiding dairy?（一般有優格。你需要避免乳製品嗎？）"
    ],
    "recallPrompt": "不看字幕，換成自己的資訊，說出這個情境的一問一答。",
    "recallAnswer": "Does this smoothie contain milk or yogurt? It usually has yogurt. Are you avoiding dairy?"
  },
  {
    "id": "scenario:phone-appointment",
    "stage": "featured",
    "level": "A2 基礎",
    "title": "電話改約：確認日期與新時段",
    "scenario": "因時間衝突改約剪髮，重述新日期及時段。",
    "topicTag": "新增情境 · 電話改約",
    "isNew": true,
    "lines": [
      {
        "speaker": "Maya",
        "en": "Hi, I have a haircut booked for Friday at two. Could I reschedule it?",
        "zh": "你好，我預約週五兩點剪髮，可以改時間嗎？",
        "note": "reschedule an appointment 表改約；重述日期避免誤聽。"
      },
      {
        "speaker": "Ben",
        "en": "Sure. What day would work better?",
        "zh": "可以，哪天比較方便？",
        "note": "reschedule an appointment 表改約；重述日期避免誤聽。"
      },
      {
        "speaker": "Maya",
        "en": "Do you have anything on Saturday morning?",
        "zh": "週六早上有空檔嗎？",
        "note": "reschedule an appointment 表改約；重述日期避免誤聽。"
      },
      {
        "speaker": "Ben",
        "en": "We have ten thirty with Alex.",
        "zh": "Alex 十點半有空。",
        "note": "reschedule an appointment 表改約；重述日期避免誤聽。"
      },
      {
        "speaker": "Maya",
        "en": "That works. So Saturday at ten thirty, with Alex?",
        "zh": "可以，所以週六十點半，找 Alex？",
        "note": "reschedule an appointment 表改約；重述日期避免誤聽。"
      },
      {
        "speaker": "Ben",
        "en": "That's right. I've updated your appointment.",
        "zh": "沒錯，已經幫你改好了。",
        "note": "reschedule an appointment 表改約；重述日期避免誤聽。"
      }
    ],
    "keyPatterns": [
      "Hi, I have a haircut booked for Friday at two. Could I reschedule it?（你好，我預約週五兩點剪髮，可以改時間嗎？）",
      "Sure. What day would work better?（可以，哪天比較方便？）"
    ],
    "recallPrompt": "不看字幕，換成自己的資訊，說出這個情境的一問一答。",
    "recallAnswer": "Hi, I have a haircut booked for Friday at two. Could I reschedule it? Sure. What day would work better?"
  },
  {
    "id": "scenario:airport-bag",
    "stage": "featured",
    "level": "B1 進階",
    "title": "行李未到：描述外觀與留下聯絡方式",
    "scenario": "轉機後行李未出現，向行李服務櫃檯報告並詢問後續。",
    "topicTag": "新增情境 · 行李未到",
    "isNew": true,
    "lines": [
      {
        "speaker": "Maya",
        "en": "My suitcase hasn't come out, and the carousel has stopped.",
        "zh": "我的行李還沒出來，轉盤已經停了。",
        "note": "My bag hasn't arrived 用完成式描述目前狀態；identify 表辨識。"
      },
      {
        "speaker": "Ben",
        "en": "I'm sorry. May I see your baggage claim tag?",
        "zh": "不好意思，可以看行李收據嗎？",
        "note": "My bag hasn't arrived 用完成式描述目前狀態；identify 表辨識。"
      },
      {
        "speaker": "Maya",
        "en": "Here it is. It's a navy suitcase with a yellow strap.",
        "zh": "在這裡。是深藍色行李箱，有條黃色束帶。",
        "note": "My bag hasn't arrived 用完成式描述目前狀態；identify 表辨識。"
      },
      {
        "speaker": "Ben",
        "en": "That will help us identify it. Where will you be staying?",
        "zh": "這能幫我們辨識，你會住哪裡？",
        "note": "My bag hasn't arrived 用完成式描述目前狀態；identify 表辨識。"
      },
      {
        "speaker": "Maya",
        "en": "At the Riverside Hotel. How can I check for updates?",
        "zh": "Riverside Hotel，我怎麼查進度？",
        "note": "My bag hasn't arrived 用完成式描述目前狀態；identify 表辨識。"
      },
      {
        "speaker": "Ben",
        "en": "We'll give you a reference number and explain the tracking process.",
        "zh": "我們會給你查詢編號，並說明追蹤方式。",
        "note": "My bag hasn't arrived 用完成式描述目前狀態；identify 表辨識。"
      }
    ],
    "keyPatterns": [
      "My suitcase hasn't come out, and the carousel has stopped.（我的行李還沒出來，轉盤已經停了。）",
      "I'm sorry. May I see your baggage claim tag?（不好意思，可以看行李收據嗎？）"
    ],
    "recallPrompt": "不看字幕，換成自己的資訊，說出這個情境的一問一答。",
    "recallAnswer": "My suitcase hasn't come out, and the carousel has stopped. I'm sorry. May I see your baggage claim tag?"
  },
  {
    "id": "scenario:roommate-chores",
    "stage": "featured",
    "level": "B1 進階",
    "title": "室友協調：家事分工與合理界線",
    "scenario": "針對洗碗與倒垃圾協調，不用責備語氣溝通。",
    "topicTag": "新增情境 · 室友協調",
    "isNew": true,
    "lines": [
      {
        "speaker": "Maya",
        "en": "Could we talk about the dishes for a minute?",
        "zh": "我們可以聊一下碗盤的事嗎？",
        "note": "Could we agree on...? 提議共識；I feel... 描述自己的感受。"
      },
      {
        "speaker": "Ben",
        "en": "Sure. I know I've left a few in the sink this week.",
        "zh": "可以，我知道這週水槽裡留了幾個沒洗。",
        "note": "Could we agree on...? 提議共識；I feel... 描述自己的感受。"
      },
      {
        "speaker": "Maya",
        "en": "I get stressed when I can't use the kitchen. Could we clean up after dinner?",
        "zh": "廚房不能用會讓我有壓力，可以晚餐後清乾淨嗎？",
        "note": "Could we agree on...? 提議共識；I feel... 描述自己的感受。"
      },
      {
        "speaker": "Ben",
        "en": "That's fair. I'll wash mine before bed from now on.",
        "zh": "合理。我以後睡前會洗好自己的。",
        "note": "Could we agree on...? 提議共識；I feel... 描述自己的感受。"
      },
      {
        "speaker": "Maya",
        "en": "Thanks. I'll take care of the recycling on weekends.",
        "zh": "謝謝，我週末會負責資源回收。",
        "note": "Could we agree on...? 提議共識；I feel... 描述自己的感受。"
      },
      {
        "speaker": "Ben",
        "en": "Sounds good. Let's check in next week and see how it's going.",
        "zh": "好，下週再看看實行得怎麼樣。",
        "note": "Could we agree on...? 提議共識；I feel... 描述自己的感受。"
      }
    ],
    "keyPatterns": [
      "Could we talk about the dishes for a minute?（我們可以聊一下碗盤的事嗎？）",
      "Sure. I know I've left a few in the sink this week.（可以，我知道這週水槽裡留了幾個沒洗。）"
    ],
    "recallPrompt": "不看字幕，換成自己的資訊，說出這個情境的一問一答。",
    "recallAnswer": "Could we talk about the dishes for a minute? Sure. I know I've left a few in the sink this week."
  },
  {
    "id": "scenario:community-volunteer",
    "stage": "featured",
    "level": "B1 進階",
    "title": "志工報到：任務說明與請求示範",
    "scenario": "參與社區食物募集，確認分類標準與不確定品項。",
    "topicTag": "新增情境 · 志工報到",
    "isNew": true,
    "lines": [
      {
        "speaker": "Maya",
        "en": "Hi, I'm here for the food drive. Where should I start?",
        "zh": "你好，我來參加食物募集，從哪裡開始？",
        "note": "Could you show me how...? 請求示範；set aside 表先另放。"
      },
      {
        "speaker": "Ben",
        "en": "Thanks for coming. Could you help sort the donated items?",
        "zh": "謝謝你來，可以幫忙分類捐贈物資嗎？",
        "note": "Could you show me how...? 請求示範；set aside 表先另放。"
      },
      {
        "speaker": "Maya",
        "en": "Sure. Could you show me how the categories work?",
        "zh": "可以，能示範分類方式嗎？",
        "note": "Could you show me how...? 請求示範；set aside 表先另放。"
      },
      {
        "speaker": "Ben",
        "en": "Canned foods go here, and dry goods go on that table.",
        "zh": "罐頭放這裡，乾貨放那張桌子。",
        "note": "Could you show me how...? 請求示範；set aside 表先另放。"
      },
      {
        "speaker": "Maya",
        "en": "What should I do if an item isn't labeled?",
        "zh": "沒有標示的物品怎麼辦？",
        "note": "Could you show me how...? 請求示範；set aside 表先另放。"
      },
      {
        "speaker": "Ben",
        "en": "Set it aside and ask the coordinator before sorting it.",
        "zh": "先另外放，分類前問協調人員。",
        "note": "Could you show me how...? 請求示範；set aside 表先另放。"
      }
    ],
    "keyPatterns": [
      "Hi, I'm here for the food drive. Where should I start?（你好，我來參加食物募集，從哪裡開始？）",
      "Thanks for coming. Could you help sort the donated items?（謝謝你來，可以幫忙分類捐贈物資嗎？）"
    ],
    "recallPrompt": "不看字幕，換成自己的資訊，說出這個情境的一問一答。",
    "recallAnswer": "Hi, I'm here for the food drive. Where should I start? Thanks for coming. Could you help sort the donated items?"
  },
  {
    "id": "scenario:job-interview",
    "stage": "featured",
    "level": "B1 進階",
    "title": "求職面試：具體舉例與承認待學技能",
    "scenario": "用真實任務、行動和結果介紹經驗，不誇大能力。",
    "topicTag": "新增情境 · 求職面試",
    "isNew": true,
    "lines": [
      {
        "speaker": "Maya",
        "en": "Tell me about a time you helped solve a problem at work.",
        "zh": "說說你曾幫忙解決工作問題的一次經驗。",
        "note": "具體描述自己做過的工作，I haven't... yet 可誠實表達待學技能。"
      },
      {
        "speaker": "Ben",
        "en": "Our team kept missing updates, so I created a shared checklist.",
        "zh": "團隊經常漏掉更新，所以我建立共用檢查表。",
        "note": "具體描述自己做過的工作，I haven't... yet 可誠實表達待學技能。"
      },
      {
        "speaker": "Maya",
        "en": "What changed after that?",
        "zh": "後來有什麼改變？",
        "note": "具體描述自己做過的工作，I haven't... yet 可誠實表達待學技能。"
      },
      {
        "speaker": "Ben",
        "en": "We caught missing tasks earlier and spent less time checking by email.",
        "zh": "我們更早發現遺漏，少花時間來回寄信確認。",
        "note": "具體描述自己做過的工作，I haven't... yet 可誠實表達待學技能。"
      },
      {
        "speaker": "Maya",
        "en": "Have you used our project management software?",
        "zh": "你用過我們的專案管理軟體嗎？",
        "note": "具體描述自己做過的工作，I haven't... yet 可誠實表達待學技能。"
      },
      {
        "speaker": "Ben",
        "en": "Not yet, but I've used similar tools and would be ready to learn.",
        "zh": "還沒有，不過我用過類似工具，也願意學習。",
        "note": "具體描述自己做過的工作，I haven't... yet 可誠實表達待學技能。"
      }
    ],
    "keyPatterns": [
      "Tell me about a time you helped solve a problem at work.（說說你曾幫忙解決工作問題的一次經驗。）",
      "Our team kept missing updates, so I created a shared checklist.（團隊經常漏掉更新，所以我建立共用檢查表。）"
    ],
    "recallPrompt": "不看字幕，換成自己的資訊，說出這個情境的一問一答。",
    "recallAnswer": "Tell me about a time you helped solve a problem at work. Our team kept missing updates, so I created a shared checklist."
  },
  {
    "id": "scenario:meeting-disagree",
    "stage": "featured",
    "level": "B2 進階",
    "title": "會議不同意見：先確認目標再提出替案",
    "scenario": "不同意縮短測試時間，以風險和可行替案推進討論。",
    "topicTag": "新增情境 · 會議不同意見",
    "isNew": true,
    "lines": [
      {
        "speaker": "Maya",
        "en": "Could we shorten testing so we can launch on Monday?",
        "zh": "可以縮短測試，週一上市嗎？",
        "note": "I see the benefit, but... 承接觀點；What if we...? 提出替案。"
      },
      {
        "speaker": "Ben",
        "en": "I see the benefit, but I'm concerned about the payment flow.",
        "zh": "我理解好處，但擔心付款流程。",
        "note": "I see the benefit, but... 承接觀點；What if we...? 提出替案。"
      },
      {
        "speaker": "Maya",
        "en": "What would you suggest instead?",
        "zh": "那你建議怎麼做？",
        "note": "I see the benefit, but... 承接觀點；What if we...? 提出替案。"
      },
      {
        "speaker": "Ben",
        "en": "What if we launch to a small group first and monitor the results?",
        "zh": "先對一小群人開放，監看結果如何？",
        "note": "I see the benefit, but... 承接觀點；What if we...? 提出替案。"
      },
      {
        "speaker": "Maya",
        "en": "Would that still give the sales team something to demonstrate?",
        "zh": "這樣業務團隊還有可以展示的內容嗎？",
        "note": "I see the benefit, but... 承接觀點；What if we...? 提出替案。"
      },
      {
        "speaker": "Ben",
        "en": "Yes. We'd have a working demo while limiting the initial rollout.",
        "zh": "有。能提供可運作的展示，也能限制初期開放範圍。",
        "note": "I see the benefit, but... 承接觀點；What if we...? 提出替案。"
      }
    ],
    "keyPatterns": [
      "Could we shorten testing so we can launch on Monday?（可以縮短測試，週一上市嗎？）",
      "I see the benefit, but I'm concerned about the payment flow.（我理解好處，但擔心付款流程。）"
    ],
    "recallPrompt": "不看字幕，換成自己的資訊，說出這個情境的一問一答。",
    "recallAnswer": "Could we shorten testing so we can launch on Monday? I see the benefit, but I'm concerned about the payment flow."
  },
  {
    "id": "scenario:project-delay",
    "stage": "featured",
    "level": "B1 進階",
    "title": "專案延誤：說明影響與重新排程",
    "scenario": "資料晚到時向同事報告，說清楚已完成及待完成事項。",
    "topicTag": "新增情境 · 專案延誤",
    "isNew": true,
    "lines": [
      {
        "speaker": "Maya",
        "en": "Are we still on track to send the report tomorrow?",
        "zh": "我們還能照計畫明天寄出報告嗎？",
        "note": "落實 status、impact、next step 三項資訊，避免只說有問題。"
      },
      {
        "speaker": "Ben",
        "en": "The draft is ready, but the supplier data hasn't arrived.",
        "zh": "草稿好了，但供應商資料還沒到。",
        "note": "落實 status、impact、next step 三項資訊，避免只說有問題。"
      },
      {
        "speaker": "Maya",
        "en": "How much of the report depends on that data?",
        "zh": "報告有多少部分要用那份資料？",
        "note": "落實 status、impact、next step 三項資訊，避免只說有問題。"
      },
      {
        "speaker": "Ben",
        "en": "Two charts and the final cost estimate. The other sections are complete.",
        "zh": "兩張圖和最後成本估算，其他都完成了。",
        "note": "落實 status、impact、next step 三項資訊，避免只說有問題。"
      },
      {
        "speaker": "Maya",
        "en": "Let's send the completed sections for review and flag what's missing.",
        "zh": "先把完成的部分送審，標出缺少的內容。",
        "note": "落實 status、impact、next step 三項資訊，避免只說有問題。"
      },
      {
        "speaker": "Ben",
        "en": "I'll do that now and ask the supplier for a firm delivery time.",
        "zh": "我現在處理，也會請供應商確認交付時間。",
        "note": "落實 status、impact、next step 三項資訊，避免只說有問題。"
      }
    ],
    "keyPatterns": [
      "Are we still on track to send the report tomorrow?（我們還能照計畫明天寄出報告嗎？）",
      "The draft is ready, but the supplier data hasn't arrived.（草稿好了，但供應商資料還沒到。）"
    ],
    "recallPrompt": "不看字幕，換成自己的資訊，說出這個情境的一問一答。",
    "recallAnswer": "Are we still on track to send the report tomorrow? The draft is ready, but the supplier data hasn't arrived."
  },
  {
    "id": "scenario:customer-refund",
    "stage": "featured",
    "level": "B1 進階",
    "title": "客服退款進度：核對資訊與確認下一步",
    "scenario": "向客服詢問退款，確認申請編號和後續聯絡方式。",
    "topicTag": "新增情境 · 客服退款進度",
    "isNew": true,
    "lines": [
      {
        "speaker": "Maya",
        "en": "I'm following up on a refund request I submitted last week.",
        "zh": "我想追蹤上週提出的退款申請。",
        "note": "follow up on 表追蹤；refund request 與退款完成是不同階段。"
      },
      {
        "speaker": "Ben",
        "en": "I can look into that. Do you have the request number?",
        "zh": "我幫你查，有申請編號嗎？",
        "note": "follow up on 表追蹤；refund request 與退款完成是不同階段。"
      },
      {
        "speaker": "Maya",
        "en": "Yes, it's R four eight two. I received a confirmation email.",
        "zh": "有，是 R 四八二。我收到確認信了。",
        "note": "follow up on 表追蹤；refund request 與退款完成是不同階段。"
      },
      {
        "speaker": "Ben",
        "en": "I see the request, but it hasn't been processed yet.",
        "zh": "我看到申請了，不過還沒處理完成。",
        "note": "follow up on 表追蹤；refund request 與退款完成是不同階段。"
      },
      {
        "speaker": "Maya",
        "en": "Could you tell me what happens next and how I'll be notified?",
        "zh": "可以說明下一步，以及會怎麼通知我嗎？",
        "note": "follow up on 表追蹤；refund request 與退款完成是不同階段。"
      },
      {
        "speaker": "Ben",
        "en": "I'll send an update to the team and confirm the next step by email.",
        "zh": "我會向團隊追蹤，再寄信確認下一步。",
        "note": "follow up on 表追蹤；refund request 與退款完成是不同階段。"
      }
    ],
    "keyPatterns": [
      "I'm following up on a refund request I submitted last week.（我想追蹤上週提出的退款申請。）",
      "I can look into that. Do you have the request number?（我幫你查，有申請編號嗎？）"
    ],
    "recallPrompt": "不看字幕，換成自己的資訊，說出這個情境的一問一答。",
    "recallAnswer": "I'm following up on a refund request I submitted last week. I can look into that. Do you have the request number?"
  },
  {
    "id": "scenario:lab-partner",
    "stage": "featured",
    "level": "B1 進階",
    "title": "實驗報告合作：分工、資料缺口與確認",
    "scenario": "共同完成實驗報告，核對缺漏資料並分配工作。",
    "topicTag": "新增情境 · 實驗報告合作",
    "isNew": true,
    "lines": [
      {
        "speaker": "Maya",
        "en": "I can draft the methods section. Could you organize the results?",
        "zh": "我可以寫方法，你整理結果好嗎？",
        "note": "不能為補齊報告編造數據；missing data 要如實標示。"
      },
      {
        "speaker": "Ben",
        "en": "Sure, but we're missing one temperature reading.",
        "zh": "可以，不過缺一筆溫度讀數。",
        "note": "不能為補齊報告編造數據；missing data 要如實標示。"
      },
      {
        "speaker": "Maya",
        "en": "Can we find it in the lab notebook?",
        "zh": "實驗筆記找得到嗎？",
        "note": "不能為補齊報告編造數據；missing data 要如實標示。"
      },
      {
        "speaker": "Ben",
        "en": "I'll check. If it's not there, we should mark it as missing.",
        "zh": "我查查。如果沒有，就標示缺漏。",
        "note": "不能為補齊報告編造數據；missing data 要如實標示。"
      },
      {
        "speaker": "Maya",
        "en": "Agreed. We shouldn't guess just to complete the table.",
        "zh": "同意，不能只為填滿表格就猜。",
        "note": "不能為補齊報告編造數據；missing data 要如實標示。"
      },
      {
        "speaker": "Ben",
        "en": "I'll ask our instructor how to handle it in the report.",
        "zh": "我會問老師報告裡該怎麼處理。",
        "note": "不能為補齊報告編造數據；missing data 要如實標示。"
      }
    ],
    "keyPatterns": [
      "I can draft the methods section. Could you organize the results?（我可以寫方法，你整理結果好嗎？）",
      "Sure, but we're missing one temperature reading.（可以，不過缺一筆溫度讀數。）"
    ],
    "recallPrompt": "不看字幕，換成自己的資訊，說出這個情境的一問一答。",
    "recallAnswer": "I can draft the methods section. Could you organize the results? Sure, but we're missing one temperature reading."
  },
  {
    "id": "scenario:source-check",
    "stage": "featured",
    "level": "B2 進階",
    "title": "網路資訊查核：標題、來源與原始資料",
    "scenario": "看到社群貼文時，練習查作者、日期與原始研究。",
    "topicTag": "新增情境 · 網路資訊查核",
    "isNew": true,
    "lines": [
      {
        "speaker": "Maya",
        "en": "This post says a new study proves homework doesn't help. Should we cite it?",
        "zh": "貼文說新研究證明作業沒幫助，我們要引用嗎？",
        "note": "來源可信度與主張證據需分開查，不因標題或轉貼次數就認定真實。"
      },
      {
        "speaker": "Ben",
        "en": "Let's find the original study before we use that claim.",
        "zh": "使用這說法前，先找原始研究。",
        "note": "來源可信度與主張證據需分開查，不因標題或轉貼次數就認定真實。"
      },
      {
        "speaker": "Maya",
        "en": "The post links to a news summary, not the paper itself.",
        "zh": "貼文連到新聞摘要，不是論文本身。",
        "note": "來源可信度與主張證據需分開查，不因標題或轉貼次數就認定真實。"
      },
      {
        "speaker": "Ben",
        "en": "Does it name the researchers or give a publication date?",
        "zh": "有研究者名字或發表日期嗎？",
        "note": "來源可信度與主張證據需分開查，不因標題或轉貼次數就認定真實。"
      },
      {
        "speaker": "Maya",
        "en": "Yes. I can search for those and check what the study actually measured.",
        "zh": "有，我可以用那些資訊查找，確認研究實際測量什麼。",
        "note": "來源可信度與主張證據需分開查，不因標題或轉貼次數就認定真實。"
      },
      {
        "speaker": "Ben",
        "en": "Good. The headline may be broader than the findings.",
        "zh": "好，標題可能比研究結果說得更廣。",
        "note": "來源可信度與主張證據需分開查，不因標題或轉貼次數就認定真實。"
      }
    ],
    "keyPatterns": [
      "This post says a new study proves homework doesn't help. Should we cite it?（貼文說新研究證明作業沒幫助，我們要引用嗎？）",
      "Let's find the original study before we use that claim.（使用這說法前，先找原始研究。）"
    ],
    "recallPrompt": "不看字幕，換成自己的資訊，說出這個情境的一問一答。",
    "recallAnswer": "This post says a new study proves homework doesn't help. Should we cite it? Let's find the original study before we use that claim."
  },
  {
    "id": "scenario:privacy-consent",
    "stage": "featured",
    "level": "B2 進階",
    "title": "數位隱私討論：收集資料前釐清用途",
    "scenario": "為校園調查設計資料欄位，討論必要性與知情同意。",
    "topicTag": "新增情境 · 數位隱私討論",
    "isNew": true,
    "lines": [
      {
        "speaker": "Maya",
        "en": "Do we really need students' full names for this survey?",
        "zh": "這份問卷真的需要學生全名嗎？",
        "note": "Do we really need...? 詢問必要性；explain how... 說明用途。"
      },
      {
        "speaker": "Ben",
        "en": "Probably not. We're only comparing study habits across year groups.",
        "zh": "大概不用，我們只是比較不同年級的學習習慣。",
        "note": "Do we really need...? 詢問必要性；explain how... 說明用途。"
      },
      {
        "speaker": "Maya",
        "en": "Then let's remove that field and explain how the responses will be used.",
        "zh": "那就移除那一欄，說明回答的用途。",
        "note": "Do we really need...? 詢問必要性；explain how... 說明用途。"
      },
      {
        "speaker": "Ben",
        "en": "We should also say whether participation is optional.",
        "zh": "也該說明是否自由參加。",
        "note": "Do we really need...? 詢問必要性；explain how... 說明用途。"
      },
      {
        "speaker": "Maya",
        "en": "And who will be able to see the responses?",
        "zh": "還有誰能看到回答？",
        "note": "Do we really need...? 詢問必要性；explain how... 說明用途。"
      },
      {
        "speaker": "Ben",
        "en": "Let's decide that before we send the survey out.",
        "zh": "寄出問卷前先決定好。",
        "note": "Do we really need...? 詢問必要性；explain how... 說明用途。"
      }
    ],
    "keyPatterns": [
      "Do we really need students' full names for this survey?（這份問卷真的需要學生全名嗎？）",
      "Probably not. We're only comparing study habits across year groups.（大概不用，我們只是比較不同年級的學習習慣。）"
    ],
    "recallPrompt": "不看字幕，換成自己的資訊，說出這個情境的一問一答。",
    "recallAnswer": "Do we really need students' full names for this survey? Probably not. We're only comparing study habits across year groups."
  },
  {
    "id": "scenario:workshop-clarify",
    "stage": "featured",
    "level": "B1 進階",
    "title": "設備交接：確認狀態與未完成事項",
    "scenario": "換班時清楚交代設備狀態、通報紀錄與權責。",
    "topicTag": "新增情境 · 設備交接",
    "isNew": true,
    "lines": [
      {
        "speaker": "Maya",
        "en": "Before you leave, can we go over the status of Line Two?",
        "zh": "你下班前，可以一起確認二號產線狀態嗎？",
        "note": "交接需區分已觀察事實、已完成動作與待確認項目。"
      },
      {
        "speaker": "Ben",
        "en": "It's stopped. I've reported the warning to maintenance.",
        "zh": "目前停機，我已把警示通報維修。",
        "note": "交接需區分已觀察事實、已完成動作與待確認項目。"
      },
      {
        "speaker": "Maya",
        "en": "Has anyone confirmed the cause yet?",
        "zh": "有人確認原因了嗎？",
        "note": "交接需區分已觀察事實、已完成動作與待確認項目。"
      },
      {
        "speaker": "Ben",
        "en": "Not yet. The technician is still reviewing the log.",
        "zh": "還沒，技術人員還在看紀錄。",
        "note": "交接需區分已觀察事實、已完成動作與待確認項目。"
      },
      {
        "speaker": "Maya",
        "en": "Who should I contact before any restart?",
        "zh": "重新啟動前要聯絡誰？",
        "note": "交接需區分已觀察事實、已完成動作與待確認項目。"
      },
      {
        "speaker": "Ben",
        "en": "The shift supervisor. I've listed the contact and the open issue in the handover notes.",
        "zh": "值班領班。交接紀錄有聯絡人和待處理事項。",
        "note": "交接需區分已觀察事實、已完成動作與待確認項目。"
      }
    ],
    "keyPatterns": [
      "Before you leave, can we go over the status of Line Two?（你下班前，可以一起確認二號產線狀態嗎？）",
      "It's stopped. I've reported the warning to maintenance.（目前停機，我已把警示通報維修。）"
    ],
    "recallPrompt": "不看字幕，換成自己的資訊，說出這個情境的一問一答。",
    "recallAnswer": "Before you leave, can we go over the status of Line Two? It's stopped. I've reported the warning to maintenance."
  },
  {
    "id": "scenario:academic-limits",
    "stage": "featured",
    "level": "B2 進階",
    "title": "學術討論：樣本限制與審慎結論",
    "scenario": "針對小樣本研究提問，練習不過度推論的發表方式。",
    "topicTag": "新增情境 · 學術討論",
    "isNew": true,
    "lines": [
      {
        "speaker": "Maya",
        "en": "Can we say the training method works for everyone?",
        "zh": "我們能說這種訓練方法對每個人都有效嗎？",
        "note": "suggests、may 限定結論強度；樣本與測量方式影響可推廣範圍。"
      },
      {
        "speaker": "Ben",
        "en": "I'd be careful. The study only included twenty volunteers.",
        "zh": "我會謹慎，研究只有二十名志願者。",
        "note": "suggests、may 限定結論強度；樣本與測量方式影響可推廣範圍。"
      },
      {
        "speaker": "Maya",
        "en": "But their scores improved after the training.",
        "zh": "不過他們訓練後分數進步了。",
        "note": "suggests、may 限定結論強度；樣本與測量方式影響可推廣範圍。"
      },
      {
        "speaker": "Ben",
        "en": "They did, but without a comparison group, other explanations are still possible.",
        "zh": "沒錯，但沒有比較組，仍可能有其他解釋。",
        "note": "suggests、may 限定結論強度；樣本與測量方式影響可推廣範圍。"
      },
      {
        "speaker": "Maya",
        "en": "So we could say the results suggest a possible benefit?",
        "zh": "所以可以說結果顯示可能有益？",
        "note": "suggests、may 限定結論強度；樣本與測量方式影響可推廣範圍。"
      },
      {
        "speaker": "Ben",
        "en": "Yes, and we should mention the sample size and the need for further research.",
        "zh": "可以，也該提樣本數，以及還需要更多研究。",
        "note": "suggests、may 限定結論強度；樣本與測量方式影響可推廣範圍。"
      }
    ],
    "keyPatterns": [
      "Can we say the training method works for everyone?（我們能說這種訓練方法對每個人都有效嗎？）",
      "I'd be careful. The study only included twenty volunteers.（我會謹慎，研究只有二十名志願者。）"
    ],
    "recallPrompt": "不看字幕，換成自己的資訊，說出這個情境的一問一答。",
    "recallAnswer": "Can we say the training method works for everyone? I'd be careful. The study only included twenty volunteers."
  }
];
