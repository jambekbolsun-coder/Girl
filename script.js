/* ====================================================
   ROMANTIC DATE INVITATION — script.js
   ==================================================== */

// ── TELEGRAM USERNAME (change here) ──────────────────
const TELEGRAM_USERNAME = '@RG1010101';
const WHATSAPP_NUMBER   = '996508148962';

// ── STATE ────────────────────────────────────────────
const state = {
  selectedDate:     null,
  selectedTime:     null,
  selectedOutfit:   null,
  selectedPlace:    null,
  selectedActivity: null,
  selectedMood:     null,
  selectedMusic:    null,
  selectedEssentials: [],
  wishes:           '',
};

let currentScreen = 0;
let cdInterval    = null;

// ── DATA ─────────────────────────────────────────────

const OUTFITS = [
  { icon: '👗', label: 'Элегантное платье' },
  { icon: '👚', label: 'Casual-шик' },
  { icon: '🧥', label: 'Деловой стиль' },
  { icon: '💃', label: 'Коктейльное платье' },
  { icon: '🩱', label: 'Летний образ' },
  { icon: '🧣', label: 'Уютный лук' },
  { icon: '👠', label: 'Классика с каблуком' },
  { icon: '👟', label: 'Спортивный шик' },
  { icon: '🌸', label: 'Нежный флорал' },
  { icon: '🖤', label: 'Всё чёрное' },
  { icon: '🤍', label: 'Белый минимализм' },
  { icon: '🌈', label: 'Яркий принт' },
  { icon: '🧤', label: 'Элегантно + перчатки' },
  { icon: '💎', label: 'С украшениями' },
  { icon: '🪷', label: 'Романтический бежевый' },
  { icon: '🦋', label: 'Стиль бабочки' },
  { icon: '🌙', label: 'Вечернее' },
  { icon: '☁️', label: 'Нежно-серый' },
  { icon: '🌊', label: 'Синяя палитра' },
  { icon: '🍷', label: 'Бордо-бархат' },
  { icon: '🫧', label: 'Жемчужный шик' },
  { icon: '✨', label: 'С блёстками' },
];

const PLACES = [
  { icon: '🌿', label: 'Парк Ататюрка' },
  { icon: '⛲', label: 'Дубовый парк' },
  { icon: '🎡', label: 'Парк Победы' },
  { icon: '🏛️', label: 'Площадь Ала-Тоо' },
  { icon: '☕', label: 'Уютное кафе в центре' },
  { icon: '🍷', label: 'Ресторан с видом' },
  { icon: '🛍️', label: 'Бишкек-Парк' },
  { icon: '🎭', label: 'Театр Чингиза Айтматова' },
  { icon: '🎬', label: 'Кинотеатр' },
  { icon: '🏔️', label: 'Смотровая Ала-Тоо' },
  { icon: '🌅', label: 'Набережная Востока' },
  { icon: '🎨', label: 'Исторический музей' },
  { icon: '🍕', label: 'Пиццерия на Советской' },
  { icon: '🌸', label: 'Ботанический сад' },
  { icon: '🎳', label: 'Боулинг-клуб' },
  { icon: '🎮', label: 'Игровой клуб' },
  { icon: '🧋', label: 'Bubble Tea лаундж' },
  { icon: '🎸', label: 'Живая музыка-бар' },
  { icon: '🌌', label: 'Планетарий' },
  { icon: '🚂', label: 'Ночной Бишкек-тур' },
  { icon: '🏖️', label: 'Зона отдыха «Берег»' },
  { icon: '🎪', label: 'Цирк Бишкека' },
];

const ACTIVITIES = [
  { icon: '🚶‍♀️', label: 'Прогулка под звёздами' },
  { icon: '🎬', label: 'Смотреть фильм' },
  { icon: '🍦', label: 'Есть мороженое' },
  { icon: '📸', label: 'Фотосессия' },
  { icon: '🎳', label: 'Боулинг' },
  { icon: '🎨', label: 'Рисовать вместе' },
  { icon: '🎮', label: 'Видеоигры' },
  { icon: '🧁', label: 'Готовить вместе' },
  { icon: '🃏', label: 'Настольные игры' },
  { icon: '📚', label: 'Читать вслух' },
  { icon: '🎠', label: 'Карусель и аттракционы' },
  { icon: '🌠', label: 'Смотреть на звёзды' },
  { icon: '💆‍♀️', label: 'Спа-вечер' },
  { icon: '🧩', label: 'Пазл 1000 деталей' },
  { icon: '🎤', label: 'Петь в кара-оке' },
  { icon: '🛶', label: 'Лодка на пруду' },
  { icon: '🧸', label: 'Сделать что-то своими руками' },
  { icon: '🌺', label: 'Выбрать цветы вместе' },
  { icon: '🎡', label: 'Колесо обозрения' },
  { icon: '🪩', label: 'Танцевать' },
  { icon: '🌮', label: 'Гастротур по кафе' },
  { icon: '🛁', label: 'Домашний кинотеатр' },
];

const MOODS = [
  { emoji: '🌹', name: 'Романтика',   desc: 'Нежно и страстно' },
  { emoji: '🌙', name: 'Таинственно', desc: 'Загадочный вечер' },
  { emoji: '😂', name: 'Весело',      desc: 'Смеяться до слёз' },
  { emoji: '🕯️', name: 'Уютно',      desc: 'Тепло и близко' },
  { emoji: '🌟', name: 'Волшебно',    desc: 'Как в сказке' },
  { emoji: '🎭', name: 'Приключение', desc: 'Что-то новое' },
  { emoji: '🍷', name: 'Изысканно',   desc: 'Элегантный вечер' },
  { emoji: '🌸', name: 'Нежно',       desc: 'Тихо и спокойно' },
  { emoji: '⚡', name: 'Ярко',        desc: 'Не забыть никогда' },
  { emoji: '☁️', name: 'Мечтательно', desc: 'В облаках' },
];

const MUSIC = [
  { icon: '🎵', name: 'Спокойная' },
  { icon: '🎤', name: 'Поп' },
  { icon: '💕', name: 'Романтическая' },
  { icon: '🎧', name: 'Lo-fi' },
  { icon: '🎷', name: 'Jazz' },
  { icon: '🎁', name: 'Сюрприз' },
];

const ESSENTIALS = [
  { icon: '💐', label: 'Цветы' },
  { icon: '🍫', label: 'Шоколад' },
  { icon: '📸', label: 'Фотоаппарат' },
  { icon: '🎁', label: 'Маленький подарок' },
  { icon: '🧣', label: 'Плед' },
  { icon: '🍾', label: 'Шампанское' },
  { icon: '🕯️', label: 'Свечи' },
  { icon: '💌', label: 'Открытка' },
  { icon: '🎵', label: 'Плейлист' },
  { icon: '🌂', label: 'Зонтик' },
  { icon: '🧦', label: 'Тёплые носки' },
  { icon: '💊', label: 'Таблетки от смеха' },
  { icon: '🌹', label: 'Одна роза' },
  { icon: '🎀', label: 'Лента-сюрприз' },
  { icon: '🧁', label: 'Домашний кекс' },
  { icon: '📖', label: 'Книга стихов' },
];

const ROMANTIC_PHRASES = [
  'Ты — мой любимый роман без конца ❤️',
  'Рядом с тобой время останавливается ✨',
  'Твоя улыбка — моя любимая мелодия 🎵',
  'Я бы перечитывал тебя снова и снова 📖',
  'Ты делаешь обычный день особенным 🌸',
  'Моё сердце знает только один адрес — ты 💌',
  'С тобой даже дождь кажется романтикой ☔',
  'Ты — моя лучшая история 🌟',
  'Каждый день с тобой — новая глава 📚',
  'Ты — причина, почему я улыбаюсь без повода 😊',
  'В твоих глазах я нахожу весь мир 🌍',
  'Ты вдохновляешь меня быть лучше каждый день 💫',
  'Моя любовь к тебе — это тихая и вечная музыка 🎶',
  'Я бы снова выбрал тебя из миллиона 💖',
  'Ты — мой любимый человек на планете 🌏',
  'С тобой даже молчание говорит о многом 🌙',
  'Твой смех — самый красивый звук 🎵',
  'Ты — моё лучшее приключение 🗺️',
  'Рядом с тобой я дома, где бы мы ни были 🏡',
  'Я влюблён в тебя снова каждое утро 🌅',
  'Ты — тот человек, ради которого стоит просыпаться ☀️',
  'Твои руки — моё самое безопасное место 🤍',
  'Ты меняешь мир просто тем, что в нём есть 🌹',
  'Мне нравится думать о тебе даже когда ты рядом 💭',
  'Ты — сто процентов лучшего в моей жизни 💯',
  'Я хочу смеяться с тобой до старости 😂',
  'Быть с тобой — это мой любимый выбор ✅',
  'Ты — то, о чём я мечтал, не зная слов 🌌',
  'С тобой каждый закат немного красивее 🌇',
  'Ты — мой тихий маленький рай 🕊️',
  'Я люблю тебя больше, чем умею выразить словами 💞',
  'Твоё присутствие — лучший подарок 🎁',
  'Мне достаточно просто быть рядом с тобой 🫂',
  'Ты делаешь жизнь настоящей 🌿',
  'Каждый момент с тобой — сокровище 💎',
  'Ты моя любимая привычка 🔁',
  'С тобой невозможно скучать ✨',
  'Ты — мой любимый человек до конца жизни 🥂',
  'Просто быть рядом с тобой — уже счастье 🌻',
  'Мне нравится, каким ты меня делаешь 🪞',
  'Ты лучшее, что со мной случилось 💫',
  'Я благодарен каждому дню рядом с тобой 🙏',
  'Ты — весна в любое время года 🌷',
  'Твои мысли мне интересны больше любой книги 📕',
  'Я мог бы слушать тебя вечно 🎧',
  'Ты — мой любимый способ провести время ⏳',
  'С тобой я хочу всё: и тишину, и приключения 🗻',
  'Ты — мой идеальный беспорядок 🌀',
  'Быть твоим парнем — это честь 👑',
  'Ты создаёшь воспоминания, которые я буду хранить вечно 🗝️',
];

const AI_MESSAGES = [
  'Ого... кто-то очень старался ❤️',
  'Не каждый парень делает такие сайты 😌',
  'Кажется, тебя действительно любят',
  'Я бы на твоём месте точно посмотрела всё до конца',
  'Мне кажется, вас ждёт классный вечер ✨',
  'А ты уже решила, что наденешь?',
  'Интересно, какое место ты выберешь?',
  'Этот сайт выглядит так, будто его делали с душой ❤️',
  'Хороший выбор, ты точно не пожалеешь 😊',
  'Так, это серьёзно... он реально постарался 🥺',
  'Уже интересно, каким будет ваш вечер ✨',
  'Такие парни — редкость 💎',
];

const FEEDBACK_MSGS = [
  'Хороший выбор ❤️',
  'Мне нравится этот вариант',
  'Звучит интересно',
  'Кажется, вечер будет уютным',
  'Отличный выбор ✨',
  'Прекрасно!',
  'Так и должно быть 🌸',
  'Замечательно!',
];

// ── UTILS ────────────────────────────────────────────

function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2200);
}

function saveState() {
  try { localStorage.setItem('dateState', JSON.stringify(state)); } catch(e) {}
}

function loadState() {
  try {
    const s = localStorage.getItem('dateState');
    if (s) Object.assign(state, JSON.parse(s));
  } catch(e) {}
}

// ── AI FRIEND ────────────────────────────────────────

let aiTimer = null;
let aiMsgIdx = 0;

function showAI(msg) {
  const friend = document.getElementById('aiFriend');
  const bubble = document.getElementById('aiBubble');
  friend.classList.add('visible');
  bubble.style.display = 'block';
  bubble.textContent = msg;
  clearTimeout(aiTimer);
  aiTimer = setTimeout(() => {
    bubble.style.display = 'none';
  }, 5000);
}

function scheduleAI() {
  const delay = 6000 + Math.random() * 8000;
  setTimeout(() => {
    if (currentScreen > 0) {
      showAI(AI_MESSAGES[aiMsgIdx % AI_MESSAGES.length]);
      aiMsgIdx++;
      scheduleAI();
    }
  }, delay);
}

// ── PARTICLES ────────────────────────────────────────

function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  const ctx    = canvas.getContext('2d');
  let W, H, particles;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createParticles() {
    particles = [];
    const count = Math.min(80, Math.floor(W * H / 12000));
    for (let i = 0; i < count; i++) {
      particles.push({
        x:  Math.random() * W,
        y:  Math.random() * H,
        r:  Math.random() * 2 + 0.5,
        dx: (Math.random() - 0.5) * 0.3,
        dy: -Math.random() * 0.5 - 0.1,
        opacity: Math.random() * 0.6 + 0.2,
        hue: Math.random() > 0.5 ? '232,86,122' : '212,169,85',
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.hue},${p.opacity})`;
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;
      if (p.y < -5) { p.y = H + 5; p.x = Math.random() * W; }
      if (p.x < -5) p.x = W + 5;
      if (p.x > W + 5) p.x = -5;
    });
    requestAnimationFrame(draw);
  }

  resize();
  createParticles();
  draw();
  window.addEventListener('resize', () => { resize(); createParticles(); });
}

// ── PETALS ───────────────────────────────────────────

function initPetals() {
  const c = document.getElementById('petals-container');
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    const size  = 6 + Math.random() * 8;
    p.style.cssText = `
      left:${Math.random() * 100}%;
      width:${size}px;
      height:${size}px;
      animation-duration:${8 + Math.random() * 8}s;
      animation-delay:${-Math.random() * 12}s;
      opacity:${0.4 + Math.random() * 0.4};
      background: radial-gradient(circle, #${Math.random()>0.5?'f9b8c8':'ffccd5'}, #e8567a);
    `;
    c.appendChild(p);
  }
}

// ── LANTERNS ─────────────────────────────────────────

function initLanterns() {
  const c = document.getElementById('lanterns-container');
  for (let i = 0; i < 6; i++) {
    const l = document.createElement('div');
    l.className = 'lantern';
    const size = 14 + Math.random() * 10;
    l.style.cssText = `
      left:${10 + Math.random() * 80}%;
      width:${size}px;
      height:${size * 1.3}px;
      animation-duration:${12 + Math.random() * 8}s;
      animation-delay:${-Math.random() * 12}s;
    `;
    c.appendChild(l);
  }
}

// ── CALENDAR ─────────────────────────────────────────

let calYear, calMonth;

function initCalendar() {
  const now = new Date();
  calYear  = now.getFullYear();
  calMonth = now.getMonth();
  renderCalendar();

  document.getElementById('calPrev').onclick = () => {
    calMonth--;
    if (calMonth < 0) { calMonth = 11; calYear--; }
    renderCalendar();
  };
  document.getElementById('calNext').onclick = () => {
    calMonth++;
    if (calMonth > 11) { calMonth = 0; calYear++; }
    renderCalendar();
  };
}

function renderCalendar() {
  const MONTHS = ['Январь','Февраль','Март','Апрель','Май','Июнь',
                  'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
  document.getElementById('calMonthYear').textContent = `${MONTHS[calMonth]} ${calYear}`;

  const daysEl = document.getElementById('calDays');
  daysEl.innerHTML = '';

  const today     = new Date();
  const firstDay  = new Date(calYear, calMonth, 1);
  let   startDow  = firstDay.getDay(); // 0=Sun
  startDow = startDow === 0 ? 6 : startDow - 1; // Mon-first

  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();

  for (let e = 0; e < startDow; e++) {
    const blank = document.createElement('span');
    blank.className = 'cal-day empty';
    daysEl.appendChild(blank);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const btn  = document.createElement('button');
    btn.className = 'cal-day';
    btn.textContent = d;

    const thisDate = new Date(calYear, calMonth, d);
    const isPast   = thisDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if (isPast) btn.classList.add('past');

    const isToday = (d === today.getDate() && calMonth === today.getMonth() && calYear === today.getFullYear());
    if (isToday) btn.classList.add('today');

    if (state.selectedDate) {
      const sd = new Date(state.selectedDate);
      if (sd.getDate() === d && sd.getMonth() === calMonth && sd.getFullYear() === calYear) {
        btn.classList.add('selected');
      }
    }

    btn.onclick = () => {
      if (isPast) return;
      state.selectedDate = new Date(calYear, calMonth, d).toISOString();
      saveState();
      renderCalendar();
      document.getElementById('step1Next').disabled = false;
      startCountdown();
      showFeedback();
    };

    daysEl.appendChild(btn);
  }
}

// ── COUNTDOWN ────────────────────────────────────────

function startCountdown() {
  if (!state.selectedDate) return;
  const block = document.getElementById('countdownBlock');
  block.style.display = 'block';

  if (cdInterval) clearInterval(cdInterval);

  function update() {
    const target = new Date(state.selectedDate);
    const now    = new Date();
    const diff   = target - now;

    if (diff <= 0) {
      document.getElementById('cdDays').textContent  = '00';
      document.getElementById('cdHours').textContent = '00';
      document.getElementById('cdMins').textContent  = '00';
      document.getElementById('cdSecs').textContent  = '00';
      return;
    }

    const days  = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins  = Math.floor((diff % 3600000)  / 60000);
    const secs  = Math.floor((diff % 60000)    / 1000);

    document.getElementById('cdDays').textContent  = String(days).padStart(2,'0');
    document.getElementById('cdHours').textContent = String(hours).padStart(2,'0');
    document.getElementById('cdMins').textContent  = String(mins).padStart(2,'0');
    document.getElementById('cdSecs').textContent  = String(secs).padStart(2,'0');
  }

  update();
  cdInterval = setInterval(update, 1000);
}

// ── GRID BUILDERS ────────────────────────────────────

function buildTimeGrid() {
  const times = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00',
                 '16:00','17:00','18:00','19:00','20:00','21:00','22:00'];
  const g = document.getElementById('timeGrid');
  g.innerHTML = '';
  times.forEach(t => {
    const chip = document.createElement('button');
    chip.className = 'time-chip' + (state.selectedTime === t ? ' selected' : '');
    chip.textContent = t;
    chip.onclick = () => {
      state.selectedTime = t;
      saveState();
      g.querySelectorAll('.time-chip').forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
      document.getElementById('step2Next').disabled = false;
      showFeedback();
    };
    g.appendChild(chip);
  });
}

function buildChoiceGrid(containerId, items, stateKey, nextBtnId, multi = false) {
  const g = document.getElementById(containerId);
  g.innerHTML = '';
  items.forEach(item => {
    const chip = document.createElement('button');
    chip.className = 'choice-chip';

    const isSelected = multi
      ? (state[stateKey] || []).includes(item.label)
      : state[stateKey] === item.label;

    if (isSelected) chip.classList.add('selected');

    chip.innerHTML = `<span class="chip-icon">${item.icon}</span>${item.label}`;
    chip.onclick   = () => {
      if (multi) {
        const arr = state[stateKey] || [];
        const idx = arr.indexOf(item.label);
        if (idx >= 0) { arr.splice(idx, 1); chip.classList.remove('selected'); }
        else          { arr.push(item.label); chip.classList.add('selected'); }
        state[stateKey] = arr;
        if (nextBtnId) document.getElementById(nextBtnId).disabled = arr.length === 0;
      } else {
        state[stateKey] = item.label;
        g.querySelectorAll('.choice-chip').forEach(c => c.classList.remove('selected'));
        chip.classList.add('selected');
        if (nextBtnId) document.getElementById(nextBtnId).disabled = false;
      }
      saveState();
      showFeedback();
    };
    g.appendChild(chip);
  });
}

function buildMoodGrid() {
  const g = document.getElementById('moodGrid');
  g.innerHTML = '';
  MOODS.forEach(m => {
    const card = document.createElement('button');
    card.className = 'mood-card' + (state.selectedMood === m.name ? ' selected' : '');
    card.innerHTML = `<span class="mood-emoji">${m.emoji}</span><span class="mood-name">${m.name}</span><span class="mood-desc">${m.desc}</span>`;
    card.onclick = () => {
      state.selectedMood = m.name;
      saveState();
      g.querySelectorAll('.mood-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      document.getElementById('step6Next').disabled = false;
      showFeedback();
    };
    g.appendChild(card);
  });
}

function buildMusicGrid() {
  const g = document.getElementById('musicGrid');
  g.innerHTML = '';
  MUSIC.forEach(m => {
    const card = document.createElement('button');
    card.className = 'music-card' + (state.selectedMusic === m.name ? ' selected' : '');
    card.innerHTML = `<span class="music-icon">${m.icon}</span><span class="music-name">${m.name}</span>`;
    card.onclick = () => {
      state.selectedMusic = m.name;
      saveState();
      g.querySelectorAll('.music-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      document.getElementById('step7Next').disabled = false;
      showFeedback();
    };
    g.appendChild(card);
  });
}

// ── FEEDBACK TOAST ───────────────────────────────────

function showFeedback() {
  showToast(rand(FEEDBACK_MSGS));
  if (Math.random() < 0.4) {
    setTimeout(() => showAI(rand(AI_MESSAGES)), 600);
  }
}

// ── PROGRESS ─────────────────────────────────────────

const TOTAL_STEPS = 9;

function updateProgress(step) {
  const pct = Math.round((step / TOTAL_STEPS) * 100);
  document.getElementById('progressFill').style.width = pct + '%';
  document.getElementById('progressLabel').textContent = pct + '%';

  document.querySelectorAll('.ps').forEach(ps => {
    const s = parseInt(ps.dataset.step);
    ps.classList.toggle('done', s < step);
  });
}

// ── SCREEN NAV ───────────────────────────────────────

function goTo(n) {
  const screens = document.querySelectorAll('.screen');
  const prev    = screens[currentScreen];
  const next    = screens[n];

  prev.classList.remove('active');
  next.classList.add('active');
  currentScreen = n;

  if (n > 0) {
    document.getElementById('progressWrapper').classList.add('visible');
    updateProgress(n - 1);
    document.getElementById('aiFriend').classList.add('visible');
  }

  window.scrollTo(0, 0);
}

window.goNext = function(step) {
  if (step === 9) {
    buildSummary();
    goTo(10);
    updateProgress(9);
    showAI('Вы создали идеальный вечер! 🥂✨');
  } else {
    goTo(step + 1);
  }
};

window.goBack = function(step) {
  if (step === 1) { goTo(0); document.getElementById('progressWrapper').classList.remove('visible'); }
  else goTo(step - 1);
};

window.restartSite = function() {
  Object.assign(state, {
    selectedDate: null, selectedTime: null, selectedOutfit: null,
    selectedPlace: null, selectedActivity: null, selectedMood: null,
    selectedMusic: null, selectedEssentials: [], wishes: '',
  });
  saveState();
  location.reload();
};

// ── ENVELOPE ─────────────────────────────────────────

function initEnvelope() {
  const env = document.getElementById('envelope');
  let opened = false;

  env.addEventListener('click', () => {
    if (opened) return;
    opened = true;
    env.classList.add('open');

    setTimeout(() => {
      // Create backdrop
      const bd = document.createElement('div');
      bd.className = 'letter-backdrop';
      document.body.appendChild(bd);

      env.classList.add('letter-out');

      const btn = document.getElementById('startJourneyBtn');
      btn.style.display = 'block';
    }, 800);
  });

  document.getElementById('startJourneyBtn').onclick = (e) => {
    e.stopPropagation();
    const bd = document.querySelector('.letter-backdrop');
    if (bd) bd.remove();
    env.classList.remove('letter-out');
    goTo(1);
    scheduleAI();
    setTimeout(() => showAI(AI_MESSAGES[0]), 1500);
  };
}

// ── WISHES ───────────────────────────────────────────

function initWishes() {
  const ta = document.getElementById('wishesInput');
  ta.value = state.wishes || '';
  document.getElementById('charCount').textContent = ta.value.length;

  ta.addEventListener('input', () => {
    state.wishes = ta.value;
    document.getElementById('charCount').textContent = ta.value.length;
    saveState();
  });
}

// ── SURPRISE ─────────────────────────────────────────

function initSurprise() {
  document.getElementById('surpriseBtn').onclick = () => {
    const msg = document.getElementById('surpriseMsg');
    msg.textContent = rand(ROMANTIC_PHRASES);
    msg.style.animation = 'none';
    requestAnimationFrame(() => msg.style.animation = '');
  };
}

// ── SUMMARY ──────────────────────────────────────────

function buildSummary() {
  const card = document.getElementById('summaryCard');
  const date = state.selectedDate
    ? new Date(state.selectedDate).toLocaleDateString('ru-RU', { day:'numeric', month:'long', year:'numeric' })
    : '—';

  const rows = [
    { icon: '📅', label: 'Дата',         value: date },
    { icon: '🕐', label: 'Время',        value: state.selectedTime || '—' },
    { icon: '📍', label: 'Место',        value: state.selectedPlace || '—' },
    { icon: '👗', label: 'Образ',        value: state.selectedOutfit || '—' },
    { icon: '🎭', label: 'Занятие',      value: state.selectedActivity || '—' },
    { icon: '🌙', label: 'Настроение',   value: state.selectedMood || '—' },
    { icon: '🎵', label: 'Музыка',       value: state.selectedMusic || '—' },
    { icon: '🎒', label: 'С собой',      value: (state.selectedEssentials || []).join(', ') || '—' },
    { icon: '💌', label: 'Пожелания',    value: state.wishes || '—' },
  ];

  card.innerHTML = rows.map(r => `
    <div class="summary-row">
      <span class="summary-icon">${r.icon}</span>
      <div>
        <div class="summary-label">${r.label}</div>
        <div class="summary-value">${r.value}</div>
      </div>
    </div>
  `).join('');
}

// ── MESSAGE TEXT ─────────────────────────────────────

function buildMessage() {
  const date = state.selectedDate
    ? new Date(state.selectedDate).toLocaleDateString('ru-RU', { day:'numeric', month:'long', year:'numeric' })
    : '—';

  return `💌 Я подтверждаю наше свидание!\n\n` +
    `📅 Дата: ${date}\n` +
    `🕐 Время: ${state.selectedTime || '—'}\n` +
    `📍 Место: ${state.selectedPlace || '—'}\n` +
    `👗 Образ: ${state.selectedOutfit || '—'}\n` +
    `🎭 Занятие: ${state.selectedActivity || '—'}\n` +
    `🌙 Настроение: ${state.selectedMood || '—'}\n` +
    `🎵 Музыка: ${state.selectedMusic || '—'}\n` +
    `🎒 Возьмём: ${(state.selectedEssentials || []).join(', ') || '—'}\n` +
    `💌 Пожелания: ${state.wishes || '—'}\n\n` +
    `Жду тебя! ❤️`;
}

function initSendButtons() {
  document.getElementById('waBtn').onclick = () => {
    const msg = encodeURIComponent(buildMessage());
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  };

  document.getElementById('tgBtn').onclick = () => {
    const msg = encodeURIComponent(buildMessage());
    const user = TELEGRAM_USERNAME.replace('@', '');
    window.open(`https://t.me/${user}?text=${msg}`, '_blank');
  };
}

// ── RESTORE FROM STORAGE ─────────────────────────────

function restoreSelections() {
  // Time
  if (state.selectedTime) {
    document.getElementById('step2Next').disabled = false;
  }
  // Outfit
  if (state.selectedOutfit) document.getElementById('step3Next').disabled = false;
  // Place
  if (state.selectedPlace)  document.getElementById('step4Next').disabled = false;
  // Activity
  if (state.selectedActivity) document.getElementById('step5Next').disabled = false;
  // Mood
  if (state.selectedMood) document.getElementById('step6Next').disabled = false;
  // Music
  if (state.selectedMusic) document.getElementById('step7Next').disabled = false;
  // Essentials
  if ((state.selectedEssentials || []).length > 0) document.getElementById('step8Next').disabled = false;

  // countdown
  if (state.selectedDate) {
    document.getElementById('step1Next').disabled = false;
    startCountdown();
  }
}

// ── FLOWER SILHOUETTES ───────────────────────────────

function addFlowerSilhouettes() {
  const positions = [
    { top: '5%',  left: '-2%',  emoji: '🌹', fontSize: '100px' },
    { top: '60%', right: '-2%', emoji: '🌺', fontSize: '80px'  },
    { bottom: '5%', left: '3%', emoji: '🌸', fontSize: '90px'  },
  ];
  positions.forEach(pos => {
    const el = document.createElement('div');
    el.className = 'flower-silhouette';
    el.textContent = pos.emoji;
    Object.assign(el.style, pos);
    document.body.appendChild(el);
  });
}

// ── INIT ─────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  loadState();

  initParticles();
  initPetals();
  initLanterns();
  addFlowerSilhouettes();
  initEnvelope();
  initCalendar();
  initWishes();
  initSurprise();
  initSendButtons();

  // Build all grids
  buildTimeGrid();
  buildChoiceGrid('outfitGrid',    OUTFITS,    'selectedOutfit',   'step3Next');
  buildChoiceGrid('placeGrid',     PLACES,     'selectedPlace',    'step4Next');
  buildChoiceGrid('activityGrid',  ACTIVITIES, 'selectedActivity', 'step5Next');
  buildMoodGrid();
  buildMusicGrid();
  buildChoiceGrid('essentialsGrid', ESSENTIALS, 'selectedEssentials', 'step8Next', true);

  restoreSelections();
});
