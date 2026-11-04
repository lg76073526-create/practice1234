var SPEAK_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10h3l5-4v12l-5-4H4z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M16.5 9.2a3.8 3.8 0 0 1 0 5.6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>';

var STORE_KEY = "alba-english";
var session = null;

function esc(value) {
  return String(value).replace(/[&<>"']/g, function (ch) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
  });
}

function words(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function hasPhrase(text, phrase) {
  var source = words(text);
  var target = words(phrase);
  if (!target) return false;
  if ((" " + source + " ").indexOf(" " + target + " ") !== -1) return true;

  var phraseDigits = (String(phrase).match(/\d/g) || []).join("");
  if (phraseDigits.length >= 3) {
    var textDigits = (String(text).match(/\d/g) || []).join("");
    var rest = target.replace(/\d+/g, " ").replace(/\s+/g, " ").trim();
    if (textDigits.indexOf(phraseDigits) !== -1 && (!rest || hasPhrase(text, rest))) return true;
  }

  if (target.indexOf(" ") === -1) {
    var parts = source.split(" ").filter(Boolean);
    for (var i = 0; i < parts.length; i += 1) {
      var word = parts[i];
      if (word === target) return true;
      if (target.length >= 3 && (word === target + "s" || word === target + "es" || word === target + "ed" || word === target + "ing")) return true;
    }
  }
  return false;
}

function gradeTurn(turn, raw) {
  var text = String(raw || "").trim();
  if (!text) return { kind: "empty" };
  if (/[가-힣]/.test(text)) {
    return {
      kind: "korean",
      better: turn.better,
      note: "뜻은 한국어로 떠올랐을 수 있습니다. 카운터에서는 영어 문장으로 말해 보세요."
    };
  }

  var awkward = (turn.awkward || []).find(function (item) {
    return item.any.some(function (phrase) { return hasPhrase(text, phrase); });
  });
  var good = (turn.good || []).some(function (group) {
    return group.every(function (phrase) { return hasPhrase(text, phrase); });
  }) || hasPhrase(text, turn.better);

  if (good && !awkward) {
    return { kind: "good", better: turn.better, note: turn.goodNote || "그 문장, 카운터에서 그대로 쓰면 됩니다." };
  }
  if (awkward) {
    return {
      kind: "awkward",
      better: turn.better,
      note: awkward.note || "뜻은 보이지만, 아래 문장이 더 분명합니다."
    };
  }
  return {
    kind: "miss",
    better: turn.better,
    note: "아래 문장이 선택지를 더 분명히 전달합니다."
  };
}

function loadStore() {
  try {
    var data = JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
    if (!Array.isArray(data.done)) data.done = [];
    if (data.theme !== "night") data.theme = "day";
    if (!data.account || typeof data.account !== "object" || !data.account.id) data.account = null;
    return data;
  } catch (err) {
    return { done: [], theme: "day", lastJob: "", account: null };
  }
}

function saveStore(data) {
  localStorage.setItem(STORE_KEY, JSON.stringify(data));
}

function isDone(key) {
  return loadStore().done.indexOf(key) !== -1;
}

function markDone(key) {
  var data = loadStore();
  if (data.done.indexOf(key) === -1) data.done.push(key);
  saveStore(data);
}

function toggleDone(key) {
  var data = loadStore();
  var index = data.done.indexOf(key);
  if (index === -1) data.done.push(key);
  else data.done.splice(index, 1);
  saveStore(data);
}

function findJob(id) {
  return ALBA.jobs.find(function (job) { return job.id === id; }) || null;
}

function findLesson(job, id) {
  return job.lessons.find(function (lesson) { return lesson.id === id; }) || null;
}

function findPractice(job, id) {
  return job.practices.find(function (practice) { return practice.id === id; }) || null;
}

function phraseCount(job) {
  return job.lessons.reduce(function (sum, lesson) { return sum + lesson.phrases.length; }, 0);
}

function lessonDoneCount(job) {
  return job.lessons.filter(function (lesson) {
    return isDone("lesson:" + job.id + ":" + lesson.id);
  }).length;
}

function parseRoute() {
  var hash = (location.hash || "#/").replace(/^#/, "");
  var parts = hash.split("/").filter(Boolean);
  if (!parts.length) return { name: "home" };
  if (parts[0] === "jobs") return { name: "jobs" };
  if (parts[0] === "job" && parts[1]) return { name: "job", jobId: parts[1] };
  if (parts[0] === "lesson" && parts[1] && parts[2]) return { name: "lesson", jobId: parts[1], lessonId: parts[2] };
  if (parts[0] === "practice" && parts[1] && parts[2]) return { name: "practice", jobId: parts[1], practiceId: parts[2] };
  if (parts[0] === "live" && parts[1] && parts[2]) return { name: "live", jobId: parts[1], practiceId: parts[2] };
  if (parts[0] === "sheet" && parts[1]) return { name: "sheet", jobId: parts[1] };
  if (parts[0] === "menu") return { name: "menu" };
  if (parts[0] === "login") return { name: "login" };
  if (parts[0] === "join") return { name: "join" };
  if (parts[0] === "account") return { name: "account" };
  if (parts[0] === "about") return { name: "about" };
  return { name: "missing" };
}

function parentHref(route) {
  if (route.name === "jobs") return "#/";
  if (route.name === "job") return "#/jobs";
  if (route.name === "lesson" || route.name === "practice" || route.name === "sheet" || route.name === "live") return "#/job/" + route.jobId;
  if (route.name === "login" || route.name === "join" || route.name === "account" || route.name === "about") return "#/menu";
  return "#/";
}

var voiceGen = 0;

function pickEnglishVoice() {
  if (!("speechSynthesis" in window)) return null;
  var voices = window.speechSynthesis.getVoices();
  return voices.find(function (item) { return item.lang === "en-US"; }) || voices.find(function (item) { return item.lang && item.lang.indexOf("en") === 0; }) || null;
}

function speak(text) {
  voiceGen += 1;
  if (!("speechSynthesis" in window) || !text) return;
  var utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.93;
  var voice = pickEnglishVoice();
  if (voice) utterance.voice = voice;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

function speakLine(text, done) {
  voiceGen += 1;
  var gen = voiceGen;
  if (!("speechSynthesis" in window) || !text) {
    if (done) done();
    return;
  }
  var utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.9;
  var voice = pickEnglishVoice();
  if (voice) utterance.voice = voice;
  utterance.onend = function () {
    if (gen === voiceGen && done) done();
  };
  utterance.onerror = function () {
    if (gen === voiceGen && done) done();
  };
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

function speakButton(text, label) {
  return '<button type="button" class="speak" data-speak="' + esc(text) + '" aria-label="' + esc(label || "영어로 듣기") + '">' + SPEAK_ICON + "</button>";
}

var MARK = {
  cafe: "카",
  bakery: "빵",
  chicken: "치",
  bar: "술",
  restaurant: "식",
  clothes: "옷",
  shoes: "신",
  cvs: "편",
  mart: "마"
};

function shiftLabel() {
  var hour = new Date().getHours();
  if (hour < 11) return "출근 전";
  if (hour < 17) return "근무 중";
  if (hour < 22) return "마감 전";
  return "마감 후";
}

function renderHome(store) {
  var phrase = findLesson(findJob("chicken"), "bone").phrases[0];
  var last = findJob(store.lastJob);
  var done = last ? lessonDoneCount(last) : 0;
  var total = last ? last.lessons.length : 0;
  var percent = total ? Math.round((done / total) * 100) : 0;
  var lessonHref = last ? "#/job/" + last.id : "#/jobs";
  var liveHref = last ? "#/live/" + last.id + "/" + last.practices[0].id : "#/jobs";
  var sheetHref = last ? "#/sheet/" + last.id : "#/jobs";
  var hint = last ? "" : "업종 선택 후";

  var mine = last
    ? '<a class="mine-card" href="#/job/' + last.id + '">' +
        '<span class="kicker">이어서 하기</span>' +
        "<strong>" + esc(last.name) + "</strong>" +
        '<span class="meta">' + done + " / " + total + " 상황 · " + esc(last.examples) + "</span>" +
        '<span class="meter" aria-hidden="true"><span style="--p:' + percent + '%"></span></span>' +
      "</a>"
    : '<p class="mine-empty">아직 고른 업종이 없습니다. 업종 선택에서 카운터를 정하면 이어서 하기가 여기에 남습니다.</p>';

  var who = store.account && store.account.signedIn ? esc(store.account.name) + " · " : "";
  return (
    '<section class="home-hero">' +
      '<p class="home-greet">' + who + shiftLabel() + " · 알바영어</p>" +
      "<h1>오늘 바로 쓸 한 문장</h1>" +
      '<article class="line-card">' +
        '<p class="en">' + esc(phrase.en) + "</p>" +
        '<p class="ko">' + esc(phrase.ko) + "</p>" +
        '<div class="line-card-row">' +
          speakButton(phrase.en, "오늘 문장 듣기") +
          '<span class="shift-pill">ON SHIFT</span>' +
        "</div>" +
      "</article>" +
    "</section>" +
    '<a class="pick-job" href="#/jobs">' +
      "<span><strong>업종 선택</strong><em>카페, 치킨집, 옷 가게, 편의점. 내 알바를 고르면 그 문장만 열립니다.</em></span>" +
      '<span class="pick-arrow" aria-hidden="true">→</span>' +
    "</a>" +
    mine +
    '<div class="home-tiles">' +
      '<a class="home-tile" href="' + lessonHref + '"><strong>상황 문장</strong><span>' + (hint || "주문, 계산, 안내") + "</span></a>" +
      '<a class="home-tile" href="' + liveHref + '"><strong>소리 내어 대화</strong><span>' + (hint || "손님이 말로 옵니다") + "</span></a>" +
      '<a class="home-tile" href="' + sheetHref + '"><strong>출근 카드</strong><span>' + (hint || "카운터에 두고") + "</span></a>" +
    "</div>" +
    '<p class="home-why">No bone? 대신 Boneless or bone-in? 시험 영어가 아니라, 외국인 손님 앞에서 주문이 멈추지 않게 하려는 연습입니다.</p>' +
    '<p class="small">영어영문학과 이채영 · 대학가 알바, 외국인 손님이 많은 매장</p>'
  );
}

function renderJobs() {
  var html = '<p class="kicker">업종 선택</p><h1>어디서 일하세요?</h1><p class="lede">고른 업종의 카운터 문장만 남습니다.</p>';
  ALBA.groups.forEach(function (group) {
    var jobs = ALBA.jobs.filter(function (job) { return job.group === group.id; });
    html += '<section class="place-group ' + group.id + '"><h2>' + esc(group.name) + '<span>' + jobs.length + "</span></h2><div class=\"branches\">";
    jobs.forEach(function (job) {
      var done = lessonDoneCount(job);
      var progress = done ? done + "/" + job.lessons.length : phraseCount(job) + "문장";
      html += '<a class="place ' + group.id + '" href="#/job/' + job.id + '">' +
        '<span class="mark">' + esc(MARK[job.id] || "알") + "</span>" +
        "<span><strong>" + esc(job.name) + (job.recommend ? '<i class="tag">시작</i>' : "") + "</strong><em>" + esc(job.examples) + "</em></span>" +
        '<span class="go">' + progress + "</span></a>";
    });
    html += "</div></section>";
  });
  return html;
}

function renderJob(job) {
  var done = lessonDoneCount(job);
  var total = job.lessons.length;
  var percent = total ? Math.round((done / total) * 100) : 0;
  var html = '<div class="head-row"><div><p class="kicker">' + esc(ALBA.groups.find(function (group) { return group.id === job.group; }).name) + "</p>" +
    "<h1>" + esc(job.name) + "</h1>" +
    '<p class="meta">' + esc(job.examples) + "</p>" +
    "<p>" + esc(job.summary) + "</p></div>" +
    '<a class="btn-secondary no-print" href="#/sheet/' + job.id + '">출근용 문장 카드</a></div>' +
    '<div class="meter" aria-label="익힌 상황"><span style="--p:' + percent + '%"></span></div>' +
    '<p class="small">' + done + " / " + total + " 상황을 익힘 · 문장 " + phraseCount(job) + "개</p>";

  job.practices.forEach(function (practice) {
    html += '<article class="panel live-panel"><p class="kicker">가상 손님</p><h2>' + esc(practice.title) + "</h2><p>" + esc(practice.goal) + '</p><div class="actions"><a class="btn" href="#/live/' + job.id + "/" + practice.id + '">소리 내어 대화</a><a class="btn-secondary" href="#/practice/' + job.id + "/" + practice.id + '">글로 연습</a></div></article>';
  });

  html += '<p class="section-label">상황별 문장</p>';
  job.lessons.forEach(function (lesson, index) {
    var key = "lesson:" + job.id + ":" + lesson.id;
    html += '<a class="lesson-link" href="#/lesson/' + job.id + "/" + lesson.id + '">' +
      '<span class="check' + (isDone(key) ? " on" : "") + '">' + (isDone(key) ? "✓" : index + 1) + "</span>" +
      "<span><strong>" + esc(lesson.title) + "</strong><em>" + esc(lesson.situation) + "</em></span>" +
      '<span class="meta">' + lesson.phrases.length + "문장</span></a>";
  });
  return html;
}

function renderLesson(job, lesson) {
  var key = "lesson:" + job.id + ":" + lesson.id;
  var done = isDone(key);
  var html = '<p class="kicker">' + esc(job.name) + "</p><h1>" + esc(lesson.title) + '</h1><p class="lede">' + esc(lesson.situation) + "</p>";
  html += '<p class="section-label">이렇게 말해요</p><ul class="phrase-list">';
  lesson.phrases.forEach(function (phrase) {
    html += "<li class=\"phrase\"><p class=\"en\">" + esc(phrase.en) + "</p>" + speakButton(phrase.en) + '<p class="ko">' + esc(phrase.ko) + "</p></li>";
  });
  html += "</ul>";

  html += '<p class="section-label">이렇게 오가면</p><div class="talk">';
  lesson.talk.forEach(function (line) {
    var who = line.role === "guest" ? "손님" : "나";
    html += '<article class="bubble ' + line.role + '"><div class="bubble-top"><span><span class="who">' + who + '</span><span class="en">' + esc(line.en) + "</span></span>" + speakButton(line.en) + '</div><p class="ko">' + esc(line.ko) + "</p></article>";
  });
  html += "</div>";

  html += '<article class="fix"><p class="kicker">카운터에서 이렇게 바꿉니다</p>' +
    '<p class="instead">' + esc(lesson.fix.instead) + "</p>" +
    '<p class="en">' + esc(lesson.fix.say) + "</p>" +
    "<p>" + esc(lesson.fix.why) + "</p>" +
    speakButton(lesson.fix.say, "고친 문장 듣기") +
    "</article>";

  html += '<div class="actions" style="margin-top:18px">' +
    '<button type="button" class="btn" data-done="' + esc(key) + '">' + (done ? "익힘 취소" : "이 상황 익혔어요") + "</button>";
  if (lesson.practice) {
    html += '<a class="btn" href="#/live/' + job.id + "/" + lesson.practice + '">소리 내어 대화</a>';
    html += '<a class="btn-secondary" href="#/practice/' + job.id + "/" + lesson.practice + '">글로 연습</a>';
  }
  html += "</div>";
  return html;
}

function createSession(route) {
  var job = findJob(route.jobId);
  var practice = job && findPractice(job, route.practiceId);
  if (!practice) return null;
  return {
    jobId: job.id,
    practiceId: practice.id,
    step: 0,
    phase: "answer",
    reveal: false,
    draft: "",
    error: "",
    results: [],
    feedback: null,
    log: [{ role: "guest", en: practice.turns[0].say.en, ko: practice.turns[0].say.ko }]
  };
}

function renderPractice(job, practice) {
  if (!session) return renderMissing();
  var turn = practice.turns[session.step];
  var html = '<p class="kicker">' + esc(job.name) + " · 손님 연습</p><h1>" + esc(practice.title) + "</h1><p class=\"lede\">" + esc(practice.goal) + "</p>";
  html += '<div class="log">';
  session.log.forEach(function (line) {
    var who = line.role === "guest" ? "손님" : "나";
    html += '<article class="bubble ' + line.role + '"><div class="bubble-top"><span><span class="who">' + who + '</span><span class="en">' + esc(line.en) + "</span></span>" + speakButton(line.en) + "</div>" +
      (line.ko ? '<p class="ko">' + esc(line.ko) + "</p>" : "") + "</article>";
  });
  html += "</div>";

  if (session.phase === "done") {
    var goodCount = session.results.filter(function (kind) { return kind === "good"; }).length;
    html += '<section class="done-card" style="margin-top:16px"><p class="kicker">연습 끝</p><h2>이 상황, 끝까지 말했습니다.</h2>' +
      "<p>" + goodCount + " / " + practice.turns.length + " 차례를 자연스럽게 말했어요. 나머지는 아래 문장으로 바꾸면 됩니다.</p><ul class=\"done-list\">";
    practice.turns.forEach(function (item) {
      html += "<li><span><span class=\"en\">" + esc(item.better) + "</span><br><span class=\"small\">" + esc(item.say.ko) + '</span></span>' + speakButton(item.better) + "</li>";
    });
    html += '</ul><div class="actions" style="margin-top:12px"><a class="btn" href="#/sheet/' + job.id + '">출근용 문장 카드</a><a class="btn-secondary" href="#/job/' + job.id + '">다른 상황</a></div></section>';
    return html;
  }

  if (session.phase === "feedback" && session.feedback) {
    var feedback = session.feedback;
    var labels = { good: "그대로 써도 됩니다", awkward: "뜻은 보이지만 이렇게가 더 분명합니다", miss: "이 문장을 써 보세요", korean: "영어로 말해 보세요" };
    var same = words(session.log[session.log.length - 1].en) === words(feedback.better);
    html += '<div class="feedback ' + feedback.kind + '" role="status"><p class="kicker">' + labels[feedback.kind] + "</p><p>" + esc(feedback.note) + "</p>";
    if (!(feedback.kind === "good" && same)) {
      html += '<p class="en">' + esc(feedback.better) + "</p>" + speakButton(feedback.better, "고친 문장 듣기");
    }
    var last = session.step >= practice.turns.length - 1;
    html += '<div class="actions" style="margin-top:12px"><button type="button" class="btn" id="next-turn" data-next>' + (last ? "결과 보기" : "손님 대답 듣기") + "</button></div></div>";
    return html;
  }

  html += '<div class="composer"><form id="reply-form"><label for="reply">' + esc(turn.prompt) + " · " + (session.step + 1) + " / " + practice.turns.length + '</label>' +
    '<textarea id="reply" name="reply" placeholder="영어로 한 문장을 적어 보세요">' + esc(session.draft || "") + "</textarea>" +
    '<div class="actions" style="margin-top:10px"><button class="btn" type="submit">말해 보기</button><button class="btn-secondary" type="button" data-reveal>' + (session.reveal ? "힌트 닫기" : "문장 힌트") + "</button></div>" +
    (session.reveal ? '<p class="hint"><span class="en">' + esc(turn.better) + "</span></p>" : "") +
    (session.error ? '<p class="error">' + esc(session.error) + "</p>" : "") +
    "</form></div>";
  return html;
}

var live = null;
var recognizer = null;

function canHear() {
  return !!((window.SpeechRecognition || window.webkitSpeechRecognition) && window.isSecureContext);
}

function currentLivePractice() {
  var job = live && findJob(live.jobId);
  return job && findPractice(job, live.practiceId);
}

function currentLiveTurn() {
  var practice = currentLivePractice();
  return practice && practice.turns[live.step];
}

function haltLive() {
  voiceGen += 1;
  stopHearing();
  if (window.speechSynthesis) window.speechSynthesis.cancel();
  live = null;
}

function stopHearing() {
  if (live) live.stopRequested = true;
  if (!recognizer) return;
  var rec = recognizer;
  recognizer = null;
  rec.onend = null;
  rec.onresult = null;
  rec.onerror = null;
  try { rec.stop(); } catch (err) {}
}

function ding() {
  var AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return;
  var ctx = new AudioCtx();
  var osc = ctx.createOscillator();
  var gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.value = 880;
  gain.gain.setValueAtTime(0.0001, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.4);
}

function startHearing() {
  if (!live || !canHear()) return;
  stopHearing();
  live.stopRequested = false;
  live.hearing = true;
  live.heard = "";
  live.micError = "";
  var Ctor = window.SpeechRecognition || window.webkitSpeechRecognition;
  var rec = new Ctor();
  recognizer = rec;
  rec.lang = "en-US";
  rec.interimResults = true;
  rec.continuous = false;
  rec.onresult = function (event) {
    if (!live) return;
    var text = "";
    var i;
    for (i = 0; i < event.results.length; i += 1) text += event.results[i][0].transcript;
    live.heard = text.trim();
    var line = document.getElementById("heard-line");
    if (line) line.textContent = live.heard || "듣고 있어요. 영어로 한 문장 말해 보세요.";
  };
  rec.onerror = function (event) {
    if (!live || live.stopRequested) return;
    live.hearing = false;
    if (event.error === "not-allowed") live.micError = "마이크 허용을 눌러야 입으로 대답할 수 있습니다.";
    else if (event.error === "no-speech") live.micError = "목소리가 잘리지 않게, 버튼을 누르고 한 문장을 끝까지 말해 보세요.";
    else live.micError = "마이크를 다시 눌러 주세요.";
    render(parseRoute());
  };
  rec.onend = function () {
    if (!live || live.stopRequested || recognizer !== rec) return;
    live.hearing = false;
    recognizer = null;
    var said = (live.heard || "").trim();
    if (!said) {
      live.micError = "한 문장이 안 들렸어요. 마이크를 다시 누르고 말해 보세요.";
      render(parseRoute());
      return;
    }
    finishUtterance(said);
  };
  render(parseRoute());
  try {
    rec.start();
  } catch (err) {
    live.hearing = false;
    live.micError = "마이크 버튼을 다시 눌러 주세요.";
    render(parseRoute());
  }
}

function finishUtterance(said) {
  var turn = currentLiveTurn();
  if (!turn) return;
  var result = gradeTurn(turn, said);
  live.said = said;
  live.feedback = result;
  live.results[live.step] = result.kind;
  live.hearing = false;
  if (result.kind === "good") {
    live.phase = "good";
    render(parseRoute());
    window.setTimeout(function () {
      if (live && live.phase === "good") advanceLive();
    }, 700);
    return;
  }
  live.phase = "coach";
  render(parseRoute());
  speakLine("Try saying: " + result.better);
}

function advanceLive() {
  var practice = currentLivePractice();
  if (!practice || !live) return;
  if (live.step >= practice.turns.length - 1) {
    live.phase = "done";
    markDone("live:" + live.jobId + ":" + live.practiceId);
    var data = loadStore();
    data.lastJob = live.jobId;
    saveStore(data);
    render(parseRoute());
    speakLine("Thanks. Have a good one.");
    return;
  }
  live.step += 1;
  live.phase = "guest";
  live.spokenStep = -1;
  live.heard = "";
  live.said = "";
  live.feedback = null;
  live.micError = "";
  render(parseRoute());
}

function cueLive() {
  if (!live || live.phase !== "guest") return;
  if (live.spokenStep === live.step) return;
  live.spokenStep = live.step;
  var turn = currentLiveTurn();
  if (!turn) return;
  var step = live.step;
  var opened = false;
  function openMic() {
    if (opened || !live || live.step !== step || live.phase !== "guest") return;
    if (parseRoute().name !== "live") return;
    opened = true;
    live.phase = "listen";
    live.heard = "";
    live.micError = "";
    render(parseRoute());
    if (canHear()) startHearing();
  }
  speakLine(turn.say.en, openMic);
  window.setTimeout(openMic, Math.max(2800, turn.say.en.length * 80));
}

function renderLive(job, practice) {
  if (!live) return renderMissing();
  var turn = practice.turns[live.step];
  var inside = live.phase !== "enter";
  var bubble = "손님이 곧 들어옵니다.";
  var sub = "문을 연 뒤, 손님 말을 듣고 영어로 소리 내어 대답하세요.";
  if (live.phase === "arrive") {
    bubble = "손님이 카운터로 오고 있습니다.";
    sub = "";
  } else if (turn && (live.phase === "guest" || live.phase === "listen" || live.phase === "good" || live.phase === "coach" || live.phase === "done")) {
    bubble = live.phase === "done" ? "Thanks. Have a good one." : turn.say.en;
    sub = live.phase === "done" ? "대화가 끝났습니다." : turn.say.ko;
  }

  var html = '<section class="stage">' +
    '<div class="stage-top"><p class="kicker">가상 손님 · ' + esc(job.name) + '</p><p class="stage-step">' + (live.phase === "done" ? "끝" : (live.step + 1) + " / " + practice.turns.length) + "</p></div>" +
    '<div class="floor">' +
      '<div class="door" aria-hidden="true"><span></span></div>' +
      '<div class="guest' + (inside ? " is-in" : "") + '" aria-hidden="true"><span class="guest-head"></span><span class="guest-body"></span></div>' +
      '<div class="live-bubble"><p class="en">' + esc(bubble) + '</p>' + (sub ? '<p class="ko">' + esc(sub) + "</p>" : "") + "</div>" +
    "</div>" +
    '<div class="counter">';

  if (live.phase === "enter") {
    html += '<p class="counter-copy">' + esc(practice.title) + ". 매장 안으로 손님이 들어옵니다. 마이크를 허용한 뒤 입으로 대답하세요.</p>";
    html += '<button type="button" class="btn" data-live-start>손님 맞이하기</button>';
    if (!canHear()) html += '<p class="small">이 브라우저에서는 목소리 인식이 꺼져 있습니다. 크롬으로 http 주소에서 열면 마이크가 동작합니다.</p>';
  } else if (live.phase === "guest" || live.phase === "arrive") {
    html += '<p class="counter-copy">손님이 말하는 중입니다. 끝까지 듣고 대답하세요.</p>';
  } else if (live.phase === "listen") {
    html += '<p class="counter-copy">' + esc(turn.prompt) + "</p>";
    html += '<p id="heard-line" class="heard">' + esc(live.heard || (live.hearing ? "듣고 있어요. 영어로 말해 보세요." : "버튼을 누르고 한 문장을 말하세요.")) + "</p>";
    if (live.micError) html += '<p class="error">' + esc(live.micError) + "</p>";
    html += '<button type="button" class="mic' + (live.hearing ? " is-hot" : "") + '" data-mic>' + (live.hearing ? "듣는 중" : "말하기") + "</button>";
    if (!canHear()) {
      html += '<form id="live-type" class="live-type"><input name="reply" placeholder="마이크가 없으면 영어로 적기" autocomplete="off"><button class="btn-secondary" type="submit">보내기</button></form>';
    }
  } else if (live.phase === "good") {
    html += '<p class="counter-copy">그 말, 카운터에서 통합니다.</p><p class="heard">' + esc(live.said || "") + "</p>";
  } else if (live.phase === "coach") {
    html += '<p class="counter-copy">손님에게는 이렇게 다시 말해 보세요.</p>';
    html += '<p class="heard">내가 한 말 · ' + esc(live.said || "") + "</p>";
    html += '<p class="en coach-line">' + esc(live.feedback.better) + "</p>";
    html += '<p class="small">' + esc(live.feedback.note) + "</p>";
    html += '<div class="actions"><button type="button" class="btn" data-retry>다시 말하기</button><button type="button" class="btn-secondary" data-skip>이 문장으로 넘기기</button></div>';
  } else if (live.phase === "done") {
    var goodCount = live.results.filter(function (kind) { return kind === "good"; }).length;
    html += '<p class="counter-copy">' + goodCount + " / " + practice.turns.length + " 차례를 자연스럽게 말했습니다.</p>";
    html += '<div class="actions"><button type="button" class="btn" data-replay>한 번 더</button><a class="btn-secondary" href="#/job/' + job.id + '">업종으로</a></div>';
  }

  html += "</div></section>";
  return html;
}

function renderSheet(job) {
  var html = '<p class="kicker">출근용 문장 카드</p><h1>' + esc(job.name) + '</h1><p class="lede">카운터 옆에 두고 문장을 눌러 들어 보세요. 금액은 예시이니 실제 가격으로 바꿔 말하면 됩니다.</p>';
  job.lessons.forEach(function (lesson) {
    html += '<section class="sheet-block"><h2>' + esc(lesson.title) + "</h2><ul class=\"phrase-list\">";
    lesson.phrases.forEach(function (phrase) {
      html += '<li class="phrase"><p class="en">' + esc(phrase.en) + "</p>" + speakButton(phrase.en) + '<p class="ko">' + esc(phrase.ko) + "</p></li>";
    });
    html += "</ul></section>";
  });
  html += '<p class="no-print"><button type="button" class="btn-secondary" data-print>인쇄</button></p>';
  return html;
}

var authUi = { error: "", confirmDelete: false, draft: {} };

function hashPass(text) {
  var hash = 5381;
  var source = "alba-english:" + String(text);
  var i;
  for (i = 0; i < source.length; i += 1) hash = ((hash << 5) + hash + source.charCodeAt(i)) >>> 0;
  return hash.toString(16);
}

function signedAccount(store) {
  var account = store && store.account;
  if (!account || !account.signedIn || !account.id) return null;
  return account;
}

function jobOptions(selected) {
  var html = '<option value="">업종을 고르세요</option>';
  ALBA.groups.forEach(function (group) {
    html += '<optgroup label="' + esc(group.name) + '">';
    ALBA.jobs.forEach(function (job) {
      if (job.group !== group.id) return;
      html += '<option value="' + esc(job.id) + '"' + (job.id === selected ? " selected" : "") + ">" + esc(job.name) + "</option>";
    });
    html += "</optgroup>";
  });
  return html;
}

function lessonDoneTotal() {
  return ALBA.jobs.reduce(function (sum, job) { return sum + lessonDoneCount(job); }, 0);
}

function accountPlace(account) {
  var job = account && findJob(account.jobId);
  var shop = account && account.shop ? account.shop : "";
  if (job && shop) return job.name + " · " + shop;
  if (job) return job.name;
  if (shop) return shop;
  return "근무지를 아직 안 적었습니다";
}

function renderMenu(store) {
  var account = signedAccount(store);
  var lessons = lessonDoneTotal();
  var card = account
    ? '<a class="account-card" href="#/account"><span class="avatar" aria-hidden="true">' + esc(account.name.slice(0, 1)) + "</span><span><strong>" + esc(account.name) + "</strong><span>" + esc(accountPlace(account)) + "</span></span></a>"
    : '<a class="account-card" href="' + (store.account ? "#/login" : "#/join") + '"><span class="avatar" aria-hidden="true">?</span><span><strong>로그인 전</strong><span>이름과 근무지를 이 기기에 남기면, 내 알바가 계정에 붙습니다.</span></span></a>';
  var themeLabel = store.theme === "night" ? "야간" : "주간";
  return '<p class="kicker">메뉴</p><h1>계정과 설정</h1><p class="lede">로그인, 계정 정보, 학습 기록, 화면, 앱 정보. 어플로 쓰려면 있어야 할 자리를 여기에 모아 두었습니다.</p>' +
    card +
    '<div class="menu-list">' +
      '<a class="menu-row" href="' + (account ? "#/account" : (store.account ? "#/login" : "#/join")) + '"><span><strong>' + (account ? "계정 정보" : "로그인") + '</strong><span>' + (account ? "이름, 업종, 매장" : "이 기기의 계정으로 들어옵니다") + '</span></span><em>' + (account ? "보기" : "열기") + "</em></a>" +
      '<a class="menu-row" href="' + (store.lastJob ? "#/job/" + store.lastJob : "#/jobs") + '"><span><strong>학습 기록</strong><span>익힌 상황 ' + lessons + "개. 이 브라우저에 남습니다.</span></span><em>열기</em></a>" +
      '<button type="button" class="menu-row" data-theme-toggle><span><strong>화면</strong><span>카운터 조명처럼, 주간과 야간을 바꿉니다.</span></span><em>' + themeLabel + "</em></button>" +
      '<a class="menu-row" href="#/about"><span><strong>앱 정보</strong><span>알바영어가 무엇을 위한 앱인지.</span></span><em>보기</em></a>' +
    "</div>" +
    '<p class="small">계정과 기록은 서버로 보내지 않고, 이 브라우저에만 저장됩니다.</p>';
}

function renderLogin(store) {
  var draft = authUi.draft || {};
  var html = '<p class="kicker">로그인</p><h1>다시 출근하기</h1><p class="lede">아이디와 비밀번호는 이 기기에 만든 계정과 맞는지 확인합니다.</p>';
  if (!store.account) {
    html += '<p class="lede">아직 계정이 없습니다. 먼저 이름과 근무지를 적어 두세요.</p><a class="btn" href="#/join">계정 만들기</a>';
    return html;
  }
  html += '<form class="auth-form" id="login-form">' +
    '<label class="field"><span>아이디</span><input name="userId" autocomplete="username" value="' + esc(draft.userId || "") + '" required></label>' +
    '<label class="field"><span>비밀번호</span><input name="password" type="password" autocomplete="current-password" required></label>' +
    (authUi.error ? '<p class="form-error">' + esc(authUi.error) + "</p>" : "") +
    '<button class="btn" type="submit">로그인</button></form>' +
    '<p class="switch-link"><a href="#/join">계정이 기억나지 않으면 새로 만들기</a></p>';
  return html;
}

function renderJoin(store) {
  var draft = authUi.draft || {};
  var html = '<p class="kicker">계정 만들기</p><h1>누구의 알바인가요</h1><p class="lede">이름, 아이디, 근무 업종. 다음에 이 브라우저를 열면 로그인으로 이어집니다.</p>';
  if (store.account) {
    html += '<p class="lede">이 기기에는 이미 ' + esc(store.account.name) + " 계정이 있습니다. 로그인하거나, 계정 정보에서 지운 뒤 새로 만들 수 있습니다.</p>" +
      '<div class="actions"><a class="btn" href="#/login">로그인</a><a class="btn-secondary" href="#/account">계정 정보</a></div>';
    return html;
  }
  html += '<form class="auth-form" id="join-form">' +
    '<label class="field"><span>이름</span><input name="name" maxlength="20" autocomplete="name" value="' + esc(draft.name || "") + '" required></label>' +
    '<label class="field"><span>아이디</span><input name="userId" maxlength="30" autocomplete="username" value="' + esc(draft.userId || "") + '" required></label>' +
    '<label class="field"><span>비밀번호</span><input name="password" type="password" autocomplete="new-password" required></label>' +
    '<label class="field"><span>비밀번호 확인</span><input name="password2" type="password" autocomplete="new-password" required></label>' +
    '<label class="field"><span>업종</span><select name="jobId">' + jobOptions(draft.jobId || "") + "</select></label>" +
    '<label class="field"><span>매장 이름</span><input name="shop" maxlength="30" placeholder="예: 교촌 전북대점" value="' + esc(draft.shop || "") + '"></label>' +
    (authUi.error ? '<p class="form-error">' + esc(authUi.error) + "</p>" : "") +
    '<button class="btn" type="submit">계정 만들기</button></form>' +
    '<p class="switch-link">이미 만들었다면 <a href="#/login">로그인</a></p>';
  return html;
}

function renderAccount(store) {
  var account = store.account;
  if (!account || !account.signedIn) {
    return '<p class="kicker">계정 정보</p><h1>로그인이 필요합니다</h1><p class="lede">이름, 업종, 매장은 로그인한 뒤에 고칠 수 있습니다.</p><a class="btn" href="' + (account ? "#/login" : "#/join") + '">' + (account ? "로그인" : "계정 만들기") + "</a>";
  }
  var draft = authUi.draft || {};
  var html = '<p class="kicker">계정 정보</p><h1>' + esc(account.name) + '</h1><p class="lede">아이디는 ' + esc(account.id) + ". 이름과 근무지만 여기서 바꿉니다.</p>";
  html += '<form class="auth-form" id="account-form">' +
    '<label class="field"><span>이름</span><input name="name" maxlength="20" value="' + esc(draft.name != null ? draft.name : account.name) + '" required></label>' +
    '<label class="field"><span>업종</span><select name="jobId">' + jobOptions(draft.jobId != null ? draft.jobId : account.jobId) + "</select></label>" +
    '<label class="field"><span>매장 이름</span><input name="shop" maxlength="30" value="' + esc(draft.shop != null ? draft.shop : (account.shop || "")) + '"></label>' +
    '<label class="field"><span>새 비밀번호</span><input name="password" type="password" autocomplete="new-password" placeholder="바꾸지 않으려면 비워 두세요"></label>' +
    (authUi.error ? '<p class="form-error">' + esc(authUi.error) + "</p>" : "") +
    '<button class="btn" type="submit">저장</button></form>';
  html += '<div class="actions account-actions"><button type="button" class="btn-secondary" data-logout>로그아웃</button>';
  if (authUi.confirmDelete) html += '<button type="button" class="btn-secondary" data-delete-yes>이 기기에서 계정 지우기</button>';
  else html += '<button type="button" class="btn-secondary" data-delete-ask>계정 지우기</button>';
  html += "</div>";
  if (authUi.confirmDelete) html += '<p class="small">학습 기록은 남고, 이름과 아이디만 지워집니다.</p>';
  return html;
}

function renderAbout() {
  return '<p class="kicker">앱 정보</p><h1>알바영어</h1><p class="lede">외국인 손님이 카운터에 섰을 때, 시험 영어 대신 바로 입으로 말할 수 있게 연습하는 앱입니다.</p>' +
    '<section class="about-block"><h2>들어 있는 것</h2><ul>' +
      "<li>업종별 카운터 문장</li>" +
      "<li>글로 받아 적는 손님 연습</li>" +
      "<li>손님이 들어와 소리 내어 주고받는 대화</li>" +
      "<li>이 기기에 남는 계정과 학습 기록</li>" +
    "</ul></section>" +
    '<section class="about-block"><h2>저장</h2><p>로그인 정보와 익힌 상황은 이 브라우저 안에만 있습니다. 다른 폰이나 서버로는 아직 넘어가지 않습니다.</p></section>' +
    '<p class="small">영어영문학과 이채영 · 대학가 알바, 외국인 손님이 많은 매장</p>';
}

function readAuth(form) {
  var data = new FormData(form);
  return {
    name: String(data.get("name") || "").trim(),
    userId: String(data.get("userId") || "").trim(),
    password: String(data.get("password") || ""),
    password2: String(data.get("password2") || ""),
    jobId: String(data.get("jobId") || ""),
    shop: String(data.get("shop") || "").trim()
  };
}

function validId(value) {
  return /^[A-Za-z0-9._-]{3,30}$/.test(value);
}

function renderMissing() {
  return '<h1>페이지를 찾지 못했습니다.</h1><p class="lede">업종 목록에서 다시 고르면 됩니다.</p><a class="btn" href="#/jobs">업종 고르기</a>';
}

function render(route, options) {
  options = options || {};
  var store = loadStore();
  var app = document.getElementById("app");
  var back = document.getElementById("back");
  var crumb = document.getElementById("crumb");
  var theme = document.getElementById("theme");
  var job = null;
  var lesson = null;
  var practice = null;
  var html = "";
  var title = "알바영어";

  document.documentElement.setAttribute("data-theme", store.theme === "night" ? "night" : "day");
  theme.setAttribute("aria-pressed", store.theme === "night" ? "true" : "false");
  theme.textContent = store.theme === "night" ? "주간" : "야간";

  back.hidden = route.name === "home";
  back.setAttribute("href", parentHref(route));
  crumb.textContent = "";

  var mineLink = document.getElementById("dock-mine");
  var savedJob = findJob(store.lastJob);
  mineLink.setAttribute("href", savedJob ? "#/job/" + savedJob.id : "#/jobs");
  var dockKey = "mine";
  if (route.name === "home") dockKey = "home";
  else if (route.name === "jobs") dockKey = "jobs";
  else if (route.name === "menu" || route.name === "login" || route.name === "join" || route.name === "account" || route.name === "about") dockKey = "menu";
  document.querySelectorAll("[data-dock]").forEach(function (item) {
    var on = item.getAttribute("data-dock") === dockKey;
    item.classList.toggle("is-on", on);
    if (on) item.setAttribute("aria-current", "page");
    else item.removeAttribute("aria-current");
  });

  if (route.name === "home") html = renderHome(store);
  else if (route.name === "jobs") {
    title = "업종 고르기 · 알바영어";
    html = renderJobs();
  } else if (route.name === "job") {
    job = findJob(route.jobId);
    if (!job) html = renderMissing();
    else {
      title = job.name + " · 알바영어";
      crumb.textContent = job.name;
      store.lastJob = job.id;
      saveStore(store);
      html = renderJob(job);
    }
  } else if (route.name === "lesson") {
    job = findJob(route.jobId);
    lesson = job && findLesson(job, route.lessonId);
    if (!lesson) html = renderMissing();
    else {
      title = lesson.title + " · " + job.name;
      crumb.textContent = job.name + " / " + lesson.title;
      html = renderLesson(job, lesson);
    }
  } else if (route.name === "practice") {
    job = findJob(route.jobId);
    practice = job && findPractice(job, route.practiceId);
    if (!practice) html = renderMissing();
    else {
      title = practice.title + " · 손님 연습";
      crumb.textContent = job.name + " / " + practice.title;
      html = renderPractice(job, practice);
    }
  } else if (route.name === "live") {
    job = findJob(route.jobId);
    practice = job && findPractice(job, route.practiceId);
    if (!practice) html = renderMissing();
    else {
      title = practice.title + " · 소리 내어 대화";
      crumb.textContent = job.name + " / 가상 손님";
      html = renderLive(job, practice);
    }
  } else if (route.name === "sheet") {
    job = findJob(route.jobId);
    if (!job) html = renderMissing();
    else {
      title = job.name + " 문장 카드";
      crumb.textContent = job.name + " / 문장 카드";
      html = renderSheet(job);
    }
  } else if (route.name === "menu") {
    title = "메뉴 · 알바영어";
    crumb.textContent = "메뉴";
    html = renderMenu(store);
  } else if (route.name === "login") {
    title = "로그인 · 알바영어";
    crumb.textContent = "로그인";
    html = renderLogin(store);
  } else if (route.name === "join") {
    title = "계정 만들기 · 알바영어";
    crumb.textContent = "계정 만들기";
    html = renderJoin(store);
  } else if (route.name === "account") {
    title = "계정 정보 · 알바영어";
    crumb.textContent = "계정 정보";
    html = renderAccount(store);
  } else if (route.name === "about") {
    title = "앱 정보 · 알바영어";
    crumb.textContent = "앱 정보";
    html = renderAbout();
  } else html = renderMissing();

  document.title = title;
  app.innerHTML = '<div class="wrap' + (route.name === "live" ? " wrap-live" : "") + '">' + html + "</div>";

  if (options.scroll) {
    window.scrollTo(0, 0);
    if (app.scrollTo) app.scrollTo(0, 0);
  }
  if (options.focus) {
    var target = document.querySelector(options.focus);
    if (target) target.focus();
  }
  if (route.name === "live") cueLive();
}

function onRoute() {
  authUi.error = "";
  authUi.confirmDelete = false;
  authUi.draft = {};
  var route = parseRoute();
  if (route.name !== "practice") session = null;
  else if (!session || session.jobId !== route.jobId || session.practiceId !== route.practiceId) session = createSession(route);
  if (route.name !== "live") haltLive();
  else if (!live || live.jobId !== route.jobId || live.practiceId !== route.practiceId) {
    haltLive();
    live = {
      jobId: route.jobId,
      practiceId: route.practiceId,
      step: 0,
      phase: "enter",
      heard: "",
      said: "",
      results: [],
      hearing: false,
      spokenStep: -1,
      micError: "",
      feedback: null,
      stopRequested: false
    };
  }
  render(route, { scroll: true });
}

function currentPractice() {
  var route = parseRoute();
  var job = findJob(route.jobId);
  return job && findPractice(job, route.practiceId);
}

function bindEvents() {
  document.addEventListener("click", function (event) {
  if (event.target.closest("[data-print]")) {
    window.print();
    return;
  }

  if (event.target.closest("[data-theme-toggle]")) {
    var themeData = loadStore();
    themeData.theme = themeData.theme === "night" ? "day" : "night";
    saveStore(themeData);
    render(parseRoute());
    return;
  }

  if (event.target.closest("[data-logout]")) {
    var logged = loadStore();
    if (logged.account) logged.account.signedIn = false;
    saveStore(logged);
    location.hash = "#/menu";
    return;
  }

  if (event.target.closest("[data-delete-ask]")) {
    authUi.confirmDelete = true;
    render(parseRoute());
    return;
  }

  if (event.target.closest("[data-delete-yes]")) {
    var wiped = loadStore();
    wiped.account = null;
    saveStore(wiped);
    location.hash = "#/menu";
    return;
  }

  if (event.target.closest("[data-live-start]") && live) {
    ding();
    live.phase = "arrive";
    render(parseRoute());
    window.setTimeout(function () {
      if (!live || live.phase !== "arrive") return;
      live.phase = "guest";
      render(parseRoute());
    }, 800);
    return;
  }

  if (event.target.closest("[data-mic]") && live) {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    voiceGen += 1;
    startHearing();
    return;
  }

  if (event.target.closest("[data-retry]") && live) {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    voiceGen += 1;
    live.phase = "listen";
    live.heard = "";
    live.micError = "";
    live.feedback = null;
    if (canHear()) startHearing();
    else render(parseRoute());
    return;
  }

  if (event.target.closest("[data-skip]") && live) {
    advanceLive();
    return;
  }

  if (event.target.closest("[data-replay]") && live) {
    voiceGen += 1;
    stopHearing();
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    live.step = 0;
    live.phase = "enter";
    live.heard = "";
    live.said = "";
    live.results = [];
    live.hearing = false;
    live.spokenStep = -1;
    live.micError = "";
    live.feedback = null;
    render(parseRoute());
    return;
  }

  var speakTarget = event.target.closest("[data-speak]");
  if (speakTarget) {
    speak(speakTarget.getAttribute("data-speak"));
    return;
  }

  var doneTarget = event.target.closest("[data-done]");
  if (doneTarget) {
    toggleDone(doneTarget.getAttribute("data-done"));
    render(parseRoute());
    return;
  }

  if (event.target.closest("[data-reveal]") && session) {
    var field = document.getElementById("reply");
    session.draft = field ? field.value : session.draft;
    session.reveal = !session.reveal;
    session.error = "";
    render(parseRoute(), { focus: "#reply" });
    return;
  }

  if (event.target.closest("[data-next]") && session) {
    var practice = currentPractice();
    if (session.step >= practice.turns.length - 1) {
      session.phase = "done";
      markDone("practice:" + session.jobId + ":" + session.practiceId);
      var data = loadStore();
      data.lastJob = session.jobId;
      saveStore(data);
      render(parseRoute(), { scroll: true });
      return;
    }
    session.step += 1;
    var say = practice.turns[session.step].say;
    session.log.push({ role: "guest", en: say.en, ko: say.ko });
    session.phase = "answer";
    session.feedback = null;
    session.reveal = false;
    session.error = "";
    render(parseRoute(), { focus: "#reply" });
  }
});

document.addEventListener("submit", function (event) {
  if (event.target.closest("#join-form")) {
    event.preventDefault();
    var joined = readAuth(event.target);
    authUi.draft = joined;
    if (!joined.name || joined.name.length > 20) authUi.error = "이름을 20자 안으로 적어 주세요.";
    else if (!validId(joined.userId)) authUi.error = "아이디는 영문, 숫자, . _ - 로 3자 이상이어야 합니다.";
    else if (joined.password.length < 4) authUi.error = "비밀번호는 4자 이상으로 정해 주세요.";
    else if (joined.password !== joined.password2) authUi.error = "비밀번호 확인이 같지 않습니다.";
    else if (!findJob(joined.jobId)) authUi.error = "업종을 하나 고르세요.";
    else {
      var made = loadStore();
      if (made.account) {
        authUi.error = "이 기기에는 이미 계정이 있습니다.";
      } else {
        made.account = {
          name: joined.name,
          id: joined.userId,
          shop: joined.shop,
          jobId: joined.jobId,
          pass: hashPass(joined.password),
          signedIn: true
        };
        made.lastJob = made.lastJob || joined.jobId;
        saveStore(made);
        authUi.error = "";
        authUi.draft = {};
        location.hash = "#/account";
        return;
      }
    }
    render(parseRoute(), { scroll: true });
    return;
  }

  if (event.target.closest("#login-form")) {
    event.preventDefault();
    var entered = readAuth(event.target);
    authUi.draft = { userId: entered.userId };
    var stored = loadStore();
    var account = stored.account;
    if (!account) authUi.error = "먼저 계정을 만들어 주세요.";
    else if (account.id.toLowerCase() !== entered.userId.toLowerCase() || account.pass !== hashPass(entered.password)) authUi.error = "아이디 또는 비밀번호가 맞지 않습니다.";
    else {
      account.signedIn = true;
      saveStore(stored);
      authUi.error = "";
      authUi.draft = {};
      location.hash = "#/menu";
      return;
    }
    render(parseRoute(), { scroll: true });
    return;
  }

  if (event.target.closest("#account-form")) {
    event.preventDefault();
    var edited = readAuth(event.target);
    authUi.draft = edited;
    var current = loadStore();
    if (!current.account || !current.account.signedIn) return;
    if (!edited.name || edited.name.length > 20) authUi.error = "이름을 20자 안으로 적어 주세요.";
    else if (!findJob(edited.jobId)) authUi.error = "업종을 하나 고르세요.";
    else if (edited.password && edited.password.length < 4) authUi.error = "새 비밀번호는 4자 이상으로 정해 주세요.";
    else {
      current.account.name = edited.name;
      current.account.jobId = edited.jobId;
      current.account.shop = edited.shop;
      if (edited.password) current.account.pass = hashPass(edited.password);
      current.lastJob = edited.jobId;
      saveStore(current);
      authUi.error = "";
      authUi.draft = {};
      location.hash = "#/menu";
      return;
    }
    render(parseRoute(), { scroll: true });
    return;
  }

  if (event.target.closest("#live-type") && live) {
    event.preventDefault();
    var typed = new FormData(event.target).get("reply") || "";
    if (!String(typed).trim()) return;
    finishUtterance(String(typed).trim());
    return;
  }
  if (!event.target.closest("#reply-form") || !session) return;
  event.preventDefault();
  var practice = currentPractice();
  var turn = practice.turns[session.step];
  var value = new FormData(event.target).get("reply") || "";
  var result = gradeTurn(turn, value);
  if (result.kind === "empty") {
    session.error = "영어 문장을 한 줄 이상 적어 보세요.";
    session.draft = "";
    render(parseRoute(), { focus: "#reply" });
    return;
  }
  session.error = "";
  session.draft = "";
  session.reveal = false;
  session.feedback = result;
  session.results[session.step] = result.kind;
  session.log.push({ role: "me", en: String(value).trim() });
  session.phase = "feedback";
  render(parseRoute(), { focus: "#next-turn" });
  });
}

function boot() {
  bindEvents();
  document.getElementById("theme").addEventListener("click", function () {
    var field = document.getElementById("reply");
    if (session && field) session.draft = field.value;
    var data = loadStore();
    data.theme = data.theme === "night" ? "day" : "night";
    saveStore(data);
    render(parseRoute());
  });

  window.addEventListener("hashchange", onRoute);
  if (!location.hash) location.hash = "#/";
  else onRoute();
}

if (typeof document !== "undefined") boot();
