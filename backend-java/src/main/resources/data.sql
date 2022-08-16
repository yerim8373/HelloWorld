insert into
    authority
    value
    ('ROLE_USER'), ('ROLE_ADMIN'), ('ROLE_VIP');
insert into
    country
values
    (0, now(), 'KR'), (0, now(), 'US'), (0,now(),'AU'),(0, now(), 'JP'), (0, now(), 'FR'), (0, now(), 'CN');
insert into
    language
values
    (0, now(), 'KOR'),(0, now(), 'ENG'), (0,now(), 'JPN'), (0, now(), 'CHN');

insert into
    user (id, activated, age, avatar_src, black_expire_date, black_listny, email, gender, mobile_number, name, nickname, pw, reg_date, country_id)
    value
    (0, true, 1000, null, null, false, 'admin', 'MALE', 'admin', 'admin','admin', '$2a$10$bCE.fZaerqsxjhyWfG6ctOKz6uQz1ZWed9q6Rdx5zCsv4z.Q8gD5e', now(), 1);
insert into
    user_auth
    value
    (1,'ROLE_ADMIN'), (1,'ROLE_USER'), (1,'ROLE_VIP');
insert into
    user (id, activated, age, avatar_src, black_expire_date, black_listny, email, gender, mobile_number, name, nickname, pw, reg_date, country_id)
    value
    (0, true, 31, null, null, false, 'test@test.com', 'MALE', '01000000000', '박유저','초딩입니다', '$2a$10$EsBStUmjvWJz5eYbSLQ5LeM8PuV51b9EVnZbh17EX5z0qC8DHkD9G', now(), 1);
insert into
    tip
values
    (0, now(), '초면이라 무슨 대화를 할지 모르겠다구요??\nHelloWorld의 "키워드" 기능을 사용해보세요!', 1),
    (0, now(), 'VIP는 더욱 더 많은 혜택을 누릴 수 있답니다\n지금 바로 VIP로 가입해보세요!', 1),
    (0, now(), '상대방과 더 오래 대화를 하고 싶다면\n하트를 소모하여 시간을 연장할 수 있어요!', 1),
    (0, now(), 'HelloWorld는 다양한 언어를 지원합니다\n언어별 우선순위를 설정해보세요!', 1),
    (0, now(), '대화 종료 후 리뷰를 작성하면\n하트를 받을 수 있어요!', 1),
    (0, now(), '하루에 5번 마음에 드는 대화상대에게\n하트를 보낼 수 있어요!', 1),
    (0, now(), '대화 상대가 부적절한 행동이나 말을 한다면\n신고버튼을 눌러 바로 신고하세요!', 1),
    (0, now(), '설정 페이지에서 자신의\n하트 사용 내역을 볼 수 있어요!', 1),
    (0, now(), '채팅 메세지 옆 "번역" 버튼을 클릭하면\n번역된 채팅 메세지를 볼 수 있어요!', 1);

insert into
    post
    values
    (0, now(), '안녕하세요, HelloWorld 입니다.\n\nHelloWorld에서는 건전한 온라인 화상 채팅 문화를 만들기 위해 지속적으로 불량 이용자들에 대해 제재를 진행하고 있습니다.\n2022-07-10부터 2022-08-10까지 진행된 불량이용자 제재 내역을 안내해 드립니다.\n\n[불량이용자 제재 명단 안내]\n- abcd2fg\n- hoivuyhjd\n- dnbvo\n\n\n안내해드리는 제재 명단은 사용자 여러분께서 신고를 통해 제보해주신 불량 이용자 조치 내역들입니다.\n\n사용자 여러분의 적극적인 제보에 감사드리며, 더욱 쾌적한 환경을 조성할 수 있도록 최선을 다하겠습니다.',
     now(), '[공지사항] 불량 이용자 조치내역 안내', 1),
    (0, now(), '# 눈을 보고 말하기\n미국은 대화를 할 때 눈을 마주치지 않고 이야기를 하면 대화에 관심이 없거나 숨기는 것이 있다고 생각한답니다. 꾸중을 들을 때도 눈을 마주치며 대화해야 해요!\n\n# Bless You\n미드나 영화를 보면 간혹 들을 수 있는 단어 “Bless you”\n미국에서는 재채기를 한 사람에게 “Bless you”라고 합니다. 이는 “하느님의 축복이 있길”이란 의미입니다.\n17세기 중반 사람들은 재채기를 하면 그 사람의 영혼이 몸 밖으로 빠져 나온다고 믿어 재빨리 “Bless you”라는 말로 축복을 빌어준다고 합니다!\n\n# 팁(Tip)\n미국에는 종업원들의 서비스에 대해 음식값의 15~20% 정도의 팁을 주는 문화가 있습니다. 현금뿐만 아니라 카드로도 낼 수 있어요!\nTake-out하는 경우에는 팁을 주지 않아도 된답니다.\n\n# 실내에서도 신발 신기\n미국은 가정집 실내에서도 신발을 신고 돌아다닙니다. 문 앞 도어 매트에 신발에 묻은 먼지나 흙들을 깨끗이 닦고 들어가면 된답니다.',
     now(), '[나라별 문화] 미국 문화', 1),
    (0, now(), '# 한국식 나이\n한국은 생일 기준으로 나이를 세는 것이 아니라 태어난 연도로 나이를 계산합니다. 태어난 순간 ‘1살’로 시작해, 매년 ‘해’가 바뀔 때마다 한 살 씩 더해지는 한국식 나이는 공식 문서나 법 등에서는 사용하지 않지만, 일상적인 상황에서 관습적으로 사용합니다!\n\n# 배달\n한국의 배달은 24시간이라는 점과 신속한 배달 속도가 장점입니다. 두부 한 모부터 한 끼 식사까지…\n배달 서비스가 활성화 되어있는 곳의 예시로써 서울의 여의도 한강공원이 있습니다. 이곳에서 배달음식을 시키면 지정된 배달존에서 배달음식을 수령할 수 있습니다.\n\n# 환승\n한국은 같은 종류의 대중교통 뿐만이 아니라 버스에서 지하철을 타도 환승 제도가 적용됩니다. 10km이내라면 기본요금으로 다양한 대중교통을 추가 요금없이 이용할 수 있습니다!',
     now(), '[나라별 문화] 한국 문화', 1),
    (0, now(), '# 아이즈치 문화\n\n    아이즈치는 상대방이 말하고 있다는 것을 잘 경청하고 있다는 표시입니다. 대화를 하고 있다면 고개를 끄덕여주는 우나즈키(うなずき)는 물론이고, 응응(うんうん), 그렇구나(そうだね), 그렇지(なるほど)와 같은 표현을 계속 해주어야 합니다.\n\n    그렇지 않으면 일본인 입장에서는 내 이야기에 흥미가 없거나 제대로 듣지 않고 있다고 오해할 수 있습니다.\n\n# 경어\n일본에는 경어에 존경어, 겸양어, 미화어 등 다양한 용법과 종류가 있습니다. 만약 여러번 얼굴을 본 상대라면, 계속 경어를 사용하는 것이 결례가 될 수도 있다고합니다!\n# 면 종류 음식을 소리내며 먹기\n일본에서는 독특하게도 소리를 내면서 먹어야 맛있게 먹고 있다는 것을 뜻합니다. 그러니까 호로록 소리를 내면서 먹어야 예의를 갖추는 것이라고 합니다!',
     now(), '[나라별 문화] 일본 문화', 1),
    (0, now(), '안녕하세요. HelloWorld 입니다.\n\n8월 11일 (목) 화상 채팅 서비스의 임시 점검이 진행될 예정입니다.\n자세한 사항은 아래 안내드리는 내용을 확인해 주시기 바랍니다.\n\n[점검 시간]\n2022-08-11(목) 00:00 ~ 2022-08-11(목) 01:00 (1시간)\n\n[점검 내용]\n- 화상 채팅 매칭 중, 같은 사용자가 반복해서 매칭되는 현상 수정\n\n[주의사항]\n점검이 진행되는 동안 화상 채팅 서비스를 이용하실 수 없으며, 점검은 조기 종료될 수 있습니다.\n\n\n점검이 완료되면 공지사항을 통해 안내해 드리도록 하겠습니다.\n서비스 이용에 불편을 드려 대단히 죄송합니다.',
     now(), '[공지사항] 8월 11일 (목) HelloWorld 임시 점검 안내', 1);


insert into question values (0, now(), '당신은 어디서 자랐습니까?', 1),
                            (0, now(), '당신은 형제(자매)가 있습니까?', 1),
                            (0, now(), '지난 주말에 뭐했습니까?', 1),
                            (0, now(), '이번 주말에 당신의 계획은 무엇입니까?', 1),
                            (0, now(), '당신은 여가 시간에 무엇을 하는 것을 좋아합니까?', 1),
                            (0, now(), '당신이 깨어났을 때 처음으로 하는 일이 무엇입니까?', 1),
                            (0, now(), '마지막으로 산 것은 무엇인가요?', 1),
                            (0, now(), '당신이 주중 좋아하는 요일은 언제인가요?', 1),
                            (0, now(), '당신은 어떤 악기를 연주할 수 있나요?', 1),
                            (0, now(), '당신이 좋아하는 책은 무엇인가요?', 1),
                            (0, now(), '무슨 일을 하시나요?', 1),
                            (0, now(), '당신은 얼마나 자주 운동하나요?', 1),
                            (0, now(), '좋아하는 연예인이 있나요?', 1);

insert into question values (0, now(), 'Where did you grow up?', 2),
                            (0, now(), 'Do you have any siblings?', 2),
                            (0, now(), 'What did you do this past weekend?', 2),
                            (0, now(), 'What are your plans for this weekend?', 2),
                            (0, now(), 'What do you like to do in your spare time?', 2),
                            (0, now(), 'What is the first thing you do when you wake up?', 2),
                            (0, now(), 'What was the last thing you purchased?', 2),
                            (0, now(), 'What is your favorite day of the week?', 2),
                            (0, now(), 'Can you play any instruments?', 2),
                            (0, now(), 'What was your favorite book?', 2),
                            (0, now(), 'What do you do for a living?', 2),
                            (0, now(), 'How often do you exercise?', 2),
                            (0, now(), 'Do you have a favorite celebrity?', 2);

insert into question values (0, now(), 'あなたはどこで育ちましたか？', 3),
                            (0, now(), 'あなたには兄弟がいますか？', 3),
                            (0, now(), '先週末は何をしましたか？', 3),
                            (0, now(), '今週末の予定は？', 3),
                            (0, now(), 'あなたは暇なときにをしますか。', 3),
                            (0, now(), '起きて最初にすることは何ですか？', 3),
                            (0, now(), '最後に購入したものは何ですか？', 3),
                            (0, now(), 'あなたの好きな曜日はいつですか？', 3),
                            (0, now(), 'あなたは何か楽器を演奏できますか？', 3),
                            (0, now(), '一番好きな本は何ですか？', 3),
                            (0, now(), '職業は何ですか？', 3),
                            (0, now(), 'どれくらいの頻度で運動しますか？', 3),
                            (0, now(), '好きな芸能人はいますか？', 3);

insert into question values (0, now(), '你在哪裏長大的？', 4),
                            (0, now(), '你有兄弟姐妹嗎？', 4),
                            (0, now(), '上週末你做了什麼？', 4),
                            (0, now(), '這個週末你有什麼安排？', 4),
                            (0, now(), '業餘時間你喜歡做什麼？', 4),
                            (0, now(), '你醒來後第一件事是什麼？', 4),
                            (0, now(), '你最後買的東西是什麼？', 4),
                            (0, now(), '你最喜歡星期幾？', 4),
                            (0, now(), '你會彈樂器嗎？', 4),
                            (0, now(), '你最喜歡的書是什麼？', 4),
                            (0, now(), '你是做什麼工作的？', 4),
                            (0, now(), '你多久運動一次？', 4),
                            (0, now(), '你有喜歡的名人嗎？', 4);

insert into tip values
                    (0, now(), '초면이라 무슨 대화를 할지 모르겠다구요??\nHelloWorld의 "키워드" 기능을 사용해보세요!', 1),
                    (0, now(), 'VIP는 더욱 더 많은 혜택을 누릴 수 있답니다\n지금 바로 VIP로 가입해보세요!', 1),
                    (0, now(), '상대방과 더 오래 대화를 하고 싶다면\n하트를 소모하여 시간을 연장할 수 있어요!', 1),
                    (0, now(), 'HelloWorld는 다양한 언어를 지원합니다\n언어별 우선순위를 설정해보세요!', 1),
                    (0, now(), '대화 종료 후 리뷰를 작성하면\n하트를 받을 수 있어요!', 1),
                    (0, now(), '하루에 5번 마음에 드는 대화상대에게\n하트를 보낼 수 있어요!', 1),
                    (0, now(), '대화 상대가 부적절한 행동이나 말을 한다면\n신고버튼을 눌러 바로 신고하세요!', 1),
                    (0, now(), '설정 페이지에서 자신의\n하트 사용 내역을 볼 수 있어요!', 1),
                    (0, now(), '채팅 메세지 옆 "번역" 버튼을 클릭하면\n번역된 채팅 메세지를 볼 수 있어요!', 1);

insert into tip values (0, now(), 'You don\'t know what we\'re going to talk about? Try “Keyword” button!', 2),
                       (0, now(), 'VIPs can enjoy more and more benefits! Sign up as a VIP right now!', 2),
                       (0, now(), 'We support various languages! Set your language priorities!', 2),
                       (0, now(), 'If you want to talk to the other person longer, You can use up hearts to extend the time!', 2),
                       (0, now(), 'If you write a review after the conversation, You can get hearts!', 2),
                       (0, now(), 'You can send hearts five times a day to someone you like!', 2),
                       (0, now(), 'If the other person does something inappropriate or says something, Press report button to report right away!', 2),
                       (0, now(), 'On the Settings page, You can see the history of hearts!', 2),
                       (0, now(), 'Click the "Translate" button next to the chat message, You can see the translated chat message!', 2);

insert into tip values (0, now(), '何の会話をするか分からないんですって？ 「キーワード」機能を使用してください！', 3),
                       (0, now(), 'VIPはより多くの特典を受けることができます。 今すぐVIPに加入してみてください!', 3),
                       (0, now(), '私たちは様々な言語に対応しています。 言語別の優先順位を設定してください！', 3),
                       (0, now(), '相手ともっと長く話し合いたいならハートを消耗して時間を延長できます！', 3),
                       (0, now(), '会話終了後レビューを作成すると、 ハートをもらえます！', 3),
                       (0, now(), '気に入った人に1日5回ハートを送ることができます！', 3),
                       (0, now(), '相手が不適切な行動や言葉を言うなら 申告ボタンを押してすぐ申告してください！', 3),
                       (0, now(), '設定ページからハートの使用内訳を見ることができます！', 3),
                       (0, now(), '「翻訳」ボタンをクリックすると、翻訳されたチャットメッセージを見ることができます!', 3);

insert into tip values (0, now(), '這是你第一次，你不知道該說什麼？試試 HelloWorld 的“關鍵字”功能！', 4),
                       (0, now(), 'VIP 可以享受更多優惠。立即加入成為 VIP！', 4),
                       (0, now(), 'HelloWorld 支持多種語言。為每種語言設置優先級！', 4),
                       (0, now(), '如果你想和對方進行更長時間的交談，你可以通過消耗心來延長時間！', 4),
                       (0, now(), '對話結束後，如果你寫評論，你可以得到心！', 4),
                       (0, now(), '每天5次給你喜歡的人你可以送心！', 4),
                       (0, now(), '當其他人的行為或說不恰當的行為時立即點擊舉報按鈕舉報！', 4),
                       (0, now(), '在設置頁面，你可以看到心的歷史！', 4),
                       (0, now(), '點擊聊天消息旁邊的“翻譯”按鈕您可以看到翻譯後的聊天消息！', 4);
