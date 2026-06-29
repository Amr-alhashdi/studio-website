// ARKAN STUDIO - MAIN CLIENT JS

// 1. MOCK DATA INITIALIZATION
const DEFAULT_WORKS = [
  {
    id: "w1",
    title: "سحر الطبيعة في جنوب المملكة",
    type: "photo",
    category: "nature",
    cover: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=60",
    date: "2026-05-10",
    views: 1250,
    desc: "جلسة تصوير احترافية تركز على إبراز التباين الجغرافي والجمال الطبيعي للوديان والجبال في جنوب المملكة العربية السعودية باستخدام إضاءة العصر الذهبي.",
    media: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&auto=format&fit=crop&q=60"
    ]
  },
  {
    id: "w2",
    title: "إعلان سيارة لوسيد الكهربائية",
    type: "video",
    category: "ads",
    cover: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=600&auto=format&fit=crop&q=60",
    date: "2026-06-01",
    views: 3400,
    desc: "إنتاج فيديو إعلاني تجاري لسيارة Lucid Air الكهربائية، يركز على الفخامة، الانسيابية، والسرعة الفائقة في شوارع الرياض ليلاً.",
    media: "https://www.w3schools.com/html/mov_bbb.mp4", // placeholder video
    gallery: []
  },
  {
    id: "w3",
    title: "ألبوم همسات شرقية - عود منفرد",
    type: "audio",
    category: "audio",
    cover: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=600&auto=format&fit=crop&q=60",
    date: "2026-04-15",
    views: 890,
    desc: "تسجيل وهندسة صوتية لمعزوفة عود شرقية كلاسيكية بأعلى دقة ووضوح داخل استوديوهات أركان الموسيقية.",
    media: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // placeholder audio
    artist: "الفنان أحمد العتيبي",
    gallery: []
  },
  {
    id: "w4",
    title: "زفاف عائلي فاخر - جدة",
    type: "photo",
    category: "weddings",
    cover: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop&q=60",
    date: "2026-06-12",
    views: 1800,
    desc: "تغطية فوتوغرافية شاملة لزفاف ملكي في مدينة جدة، مع التركيز على التفاصيل الدقيقة، المشاعر العفوية، والديكور الذهبي الفاخر.",
    media: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&auto=format&fit=crop&q=60"
    ]
  },
  {
    id: "w5",
    title: "حفلة موسيقى المتاهة بالدرعية",
    type: "video",
    category: "events",
    cover: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=60",
    date: "2026-03-20",
    views: 2900,
    desc: "توثيق وتصوير سينمائي متعدد الكاميرات للحفل الموسيقي الحي في حي الطريف التاريخي بالدرعية.",
    media: "https://www.w3schools.com/html/movie.mp4", // placeholder video
    gallery: []
  },
  {
    id: "w6",
    title: "تصوير عطور براند نجد",
    type: "photo",
    category: "products",
    cover: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=600&auto=format&fit=crop&q=60",
    date: "2026-06-25",
    views: 920,
    desc: "جلسة تصوير تجارية لعطور نجد الفاخرة باستخدام تقنيات الإضاءة الدرامية وخلفيات داكنة تبرز هوية المنتج الفاخرة.",
    media: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=1200&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&auto=format&fit=crop&q=60"
    ]
  }
];

function initDatabase() {
  if (!localStorage.getItem("arkan_works")) {
    localStorage.setItem("arkan_works", JSON.stringify(DEFAULT_WORKS));
  }
  if (!localStorage.getItem("arkan_settings")) {
    localStorage.setItem("arkan_settings", JSON.stringify({
      name: "أركان استوديو",
      logo_text: "أركان",
      phone: "+966500000000",
      email: "info@arkan.sa",
      address: "الرياض، المملكة العربية السعودية",
      map_embed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.582845610668!2d46.6752957!3d24.7135517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890cf3cc03%3A0x2f52ff464b7ef60!2sRiyadh!5e0!3m2!1sen!2ssa!4v1625000000000!5m2!1sen!2ssa"
    }));
  }
}

initDatabase();

const ArkanData = {
  getWorks: () => JSON.parse(localStorage.getItem("arkan_works")),
  saveWorks: (works) => localStorage.setItem("arkan_works", JSON.stringify(works)),
  getSettings: () => JSON.parse(localStorage.getItem("arkan_settings")),
  saveSettings: (settings) => localStorage.setItem("arkan_settings", JSON.stringify(settings))
};

// 2. COMMON DOM ACTIONS & NAVIGATION ACTIVE STATUS
// Set theme immediately to avoid flashing
document.documentElement.setAttribute("data-theme", localStorage.getItem("arkan_theme") || "dark");

document.addEventListener("DOMContentLoaded", () => {
  // Setup Theme Toggle Button
  const headerActions = document.querySelector(".header__actions");
  if (headerActions) {
    const themeBtn = document.createElement("div");
    themeBtn.className = "icon-btn";
    themeBtn.id = "theme-toggle";
    themeBtn.title = "تغيير المظهر";
    themeBtn.innerHTML = `
      <svg viewBox="0 0 24 24" class="theme-icon-sun"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-12.37c-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06c.39-.38.39-1.02 0-1.41zm-12.37 12.37c-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06c.39-.38.39-1.02 0-1.41z" fill="currentColor"/></svg>
      <svg viewBox="0 0 24 24" class="theme-icon-moon"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-3.03 0-5.5-2.47-5.5-5.5 0-1.82.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z" fill="currentColor"/></svg>
    `;
    headerActions.insertBefore(themeBtn, headerActions.firstChild);

    themeBtn.addEventListener("click", () => {
      const activeTheme = document.documentElement.getAttribute("data-theme");
      const newTheme = activeTheme === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("arkan_theme", newTheme);
    });
  }



  // Highlight active bottom nav item based on current URL
  const path = window.location.pathname;
  const page = path.split("/").pop() || "index.html";
  const navItems = document.querySelectorAll(".bottom-nav__item");
  
  navItems.forEach(item => {
    const href = item.getAttribute("onclick")?.match(/'([^']+)'/)?.[1];
    if (href === page || (page === "index.html" && href === "index.html")) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  // Load site settings (Name, phone, etc.)
  const settings = ArkanData.getSettings();
  const logoTextEl = document.querySelector(".header__logo span");
  if (logoTextEl && settings.logo_text) {
    logoTextEl.textContent = settings.logo_text;
  }

  // Handle Search Input in Header
  const searchInput = document.querySelector(".header__search input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.trim().toLowerCase();
      // If we are on portfolio page, trigger search. Otherwise redirect to portfolio.html?search=query
      if (window.location.pathname.includes("portfolio.html")) {
        filterPortfolio(currentFilter, query);
      } else if (e.key === "Enter" || query.length > 2) {
        window.location.href = `portfolio.html?search=${encodeURIComponent(query)}`;
      }
    });
  }

  // Initialize specific page logics
  if (document.getElementById("stats-section")) initStatsCounter();
  if (document.getElementById("portfolio-grid")) initPortfolioPage();
  if (document.getElementById("audio-player-page")) initAudioPlayerPage();
  if (document.getElementById("contact-page")) initContactPage();
  
  // Setup global Fade In on scroll
  setupScrollAnimations();
});

// Navigation Helper
function navigateTo(url) {
  window.location.href = url;
}

// 3. STATS COUNTER ANIMATION
function initStatsCounter() {
  const statsSection = document.getElementById("stats-section");
  const counters = document.querySelectorAll(".stat-card__number");
  
  const startCounter = (el) => {
    const target = parseInt(el.getAttribute("data-target"), 10);
    let count = 0;
    const speed = target / 50; // speed of count
    
    const updateCount = () => {
      count += speed;
      if (count < target) {
        el.textContent = Math.floor(count);
        setTimeout(updateCount, 20);
      } else {
        el.textContent = target + (el.getAttribute("data-suffix") || "");
      }
    };
    updateCount();
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        counters.forEach(counter => startCounter(counter));
        observer.unobserve(statsSection);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(statsSection);
}

// 4. PORTFOLIO PAGE LOGIC
let currentFilter = "all";
function initPortfolioPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get("search") || "";
  
  const searchInput = document.querySelector(".header__search input");
  if (searchInput && searchQuery) {
    searchInput.value = searchQuery;
  }

  renderPortfolioGrid(ArkanData.getWorks(), searchQuery);

  // Setup filter buttons
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.getAttribute("data-filter");
      filterPortfolio(currentFilter, searchInput ? searchInput.value : "");
    });
  });
}

function filterPortfolio(type, query = "") {
  let works = ArkanData.getWorks();
  
  if (type !== "all") {
    // Check if type matches the work type or category
    works = works.filter(w => w.type === type || w.category === type);
  }
  
  if (query) {
    works = works.filter(w => w.title.toLowerCase().includes(query.toLowerCase()) || w.desc.toLowerCase().includes(query.toLowerCase()));
  }
  
  renderPortfolioGrid(works);
}

function renderPortfolioGrid(works, query = "") {
  const grid = document.getElementById("portfolio-grid");
  if (!grid) return;
  
  grid.innerHTML = "";
  
  let filtered = works;
  if (query) {
    filtered = works.filter(w => w.title.toLowerCase().includes(query.toLowerCase()) || w.desc.toLowerCase().includes(query.toLowerCase()));
  }

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--color-text-muted); padding: 40px 0;">لا توجد أعمال تطابق البحث أو التصنيف المختار.</div>`;
    return;
  }

  filtered.forEach(work => {
    const typeLabel = { photo: "صورة", video: "فيديو", audio: "صوتيات" }[work.type] || work.type;
    const card = document.createElement("div");
    card.className = "card fade-in";

    card.innerHTML = `
      <div class="card__media">
        <img src="${work.cover}" alt="${work.title}" loading="lazy">
        <span class="card__badge">${typeLabel}</span>
      </div>
      <div class="card__content">
        <h3 class="card__title">${work.title}</h3>
        <div class="card__meta">
          <span class="card__meta-item">
            <svg viewBox="0 0 24 24"><path d="M12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0-7c-7 0-11 7-11 7s4 7 11 7 11-7 11-7-4-7-11-7zm0 11.5c-2.48 0-4.5-2.02-4.5-4.5s2.02-4.5 4.5-4.5 4.5 2.02 4.5 4.5-2.02 4.5-4.5 4.5z"/></svg>
            ${work.views} مشاهدة
          </span>
          <span>${work.date}</span>
        </div>
        <div class="card__footer">
          <button class="card__btn" onclick="openLightbox('${work.id}')">
            عرض العمل
            <svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
          </button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
  
  // Trigger animation
  setTimeout(() => {
    const cards = grid.querySelectorAll(".card");
    cards.forEach(c => c.classList.add("visible"));
  }, 50);
}

// 5. LIGHTBOX / MODAL DETAILS
let activeMediaEl = null;

function openLightbox(id) {
  const works = ArkanData.getWorks();
  const work = works.find(w => w.id === id);
  if (!work) return;

  // Increment views
  work.views = (work.views || 0) + 1;
  ArkanData.saveWorks(works);
  // Re-render if on portfolio page to update view count
  if (window.location.pathname.includes("portfolio.html")) {
    const searchInput = document.querySelector(".header__search input");
    filterPortfolio(currentFilter, searchInput ? searchInput.value : "");
  }

  const modal = document.getElementById("work-modal");
  if (!modal) return;

  const mediaContainer = modal.querySelector(".modal__media");
  const titleEl = modal.querySelector(".modal__title");
  const descEl = modal.querySelector(".modal__desc");
  const metaDate = modal.querySelector("#meta-date");
  const metaType = modal.querySelector("#meta-type");

  titleEl.textContent = work.title;
  descEl.textContent = work.desc;
  metaDate.textContent = work.date;
  metaType.textContent = { photo: "فوتوغرافي", video: "مرئي / فيديو", audio: "صوتي / إنتاج" }[work.type] || work.type;

  // Clean previous media
  mediaContainer.innerHTML = "";

  if (work.type === "photo") {
    mediaContainer.innerHTML = `<img src="${work.media}" alt="${work.title}">`;
  } else if (work.type === "video") {
    mediaContainer.innerHTML = `
      <video controls autoplay playsinline style="width:100%; height:100%;">
        <source src="${work.media}" type="video/mp4">
        متصفحك لا يدعم تشغيل الفيديو.
      </video>
    `;
    activeMediaEl = mediaContainer.querySelector("video");
  } else if (work.type === "audio") {
    mediaContainer.innerHTML = `
      <div style="display:flex; flex-direction:column; justify-content:center; align-items:center; width:100%; height:100%; padding:20px; background:#111;">
        <img src="${work.cover}" style="width:120px; height:120px; border-radius:10px; margin-bottom:15px; border: 1px solid var(--color-border);">
        <audio controls autoplay style="width:100%; max-width:400px;">
          <source src="${work.media}" type="audio/mp3">
          متصفحك لا يدعم تشغيل الصوت.
        </audio>
      </div>
    `;
    activeMediaEl = mediaContainer.querySelector("audio");
  }

  modal.classList.add("modal--active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const modal = document.getElementById("work-modal");
  if (!modal) return;

  // Stop any active playing media
  if (activeMediaEl) {
    activeMediaEl.pause();
    activeMediaEl = null;
  }

  modal.classList.remove("modal--active");
  document.body.style.overflow = "";
}

// 6. AUDIO PLAYER PAGE LOGIC
let currentAudio = new Audio();
let audioPlaylist = [];
let currentTrackIndex = 0;
let isPlaying = false;

function initAudioPlayerPage() {
  const works = ArkanData.getWorks();
  audioPlaylist = works.filter(w => w.type === "audio");
  
  const playlistContainer = document.getElementById("audio-playlist");
  if (!playlistContainer) return;

  playlistContainer.innerHTML = "";
  
  if (audioPlaylist.length === 0) {
    playlistContainer.innerHTML = `<p style="padding:20px; text-align:center; color:var(--color-text-muted);">لا توجد ملفات صوتية مضافة حالياً.</p>`;
    return;
  }

  audioPlaylist.forEach((track, index) => {
    const item = document.createElement("div");
    item.className = `playlist-item ${index === 0 ? "active" : ""}`;
    item.setAttribute("onclick", `selectTrack(${index})`);
    item.innerHTML = `
      <img class="playlist-item__cover" src="${track.cover}" alt="${track.title}" loading="lazy">
      <div class="playlist-item__info">
        <div class="playlist-item__title">${track.title}</div>
        <div class="playlist-item__artist">${track.artist || "أركان استوديو"}</div>
      </div>
      <div class="playlist-item__duration">..:..</div>
    `;
    playlistContainer.appendChild(item);
  });

  loadTrack(0);

  // Set up progress bar click
  const progressContainer = document.querySelector(".progress-bar-container");
  if (progressContainer) {
    progressContainer.addEventListener("click", (e) => {
      const width = progressContainer.clientWidth;
      const clickX = width - (e.clientX - progressContainer.getBoundingClientRect().left); // RTL calculation
      const duration = currentAudio.duration;
      if (duration) {
        currentAudio.currentTime = (clickX / width) * duration;
      }
    });
  }

  // Set up volume slider click
  const volumeSlider = document.querySelector(".volume-slider");
  if (volumeSlider) {
    volumeSlider.addEventListener("click", (e) => {
      const width = volumeSlider.clientWidth;
      const clickX = width - (e.clientX - volumeSlider.getBoundingClientRect().left); // RTL
      let volume = clickX / width;
      if (volume < 0) volume = 0;
      if (volume > 1) volume = 1;
      currentAudio.volume = volume;
      document.querySelector(".volume-bar").style.width = `${volume * 100}%`;
    });
  }

  // Audio events
  currentAudio.addEventListener("timeupdate", updateAudioProgress);
  currentAudio.addEventListener("ended", nextTrack);
}

function loadTrack(index) {
  if (index < 0 || index >= audioPlaylist.length) return;
  
  currentTrackIndex = index;
  const track = audioPlaylist[index];

  // Update Active Class in Playlist
  const items = document.querySelectorAll(".playlist-item");
  items.forEach((item, idx) => {
    if (idx === index) item.classList.add("active");
    else item.classList.remove("active");
  });

  // Update Player UI
  document.getElementById("player-cover-img").src = track.cover;
  document.getElementById("player-track-title").textContent = track.title;
  document.getElementById("player-track-artist").textContent = track.artist || "أركان استوديو";
  
  currentAudio.src = track.media;
  document.querySelector(".progress-bar").style.width = "0%";
  document.getElementById("curr-time").textContent = "0:00";
  document.getElementById("total-time").textContent = "0:00";

  // Meta data loaded
  currentAudio.addEventListener("loadedmetadata", () => {
    document.getElementById("total-time").textContent = formatTime(currentAudio.duration);
  });

  if (isPlaying) {
    currentAudio.play().catch(err => console.log("Auto-play blocked or error: ", err));
  }
}

function togglePlay() {
  const playBtn = document.getElementById("play-btn");
  if (!playBtn) return;

  if (isPlaying) {
    currentAudio.pause();
    isPlaying = false;
    playBtn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`;
  } else {
    currentAudio.play().then(() => {
      isPlaying = true;
      playBtn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
    }).catch(err => console.log("Play failed: ", err));
  }
}

function selectTrack(index) {
  isPlaying = true;
  const playBtn = document.getElementById("play-btn");
  if (playBtn) {
    playBtn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
  }
  loadTrack(index);
}

function nextTrack() {
  let nextIdx = currentTrackIndex + 1;
  if (nextIdx >= audioPlaylist.length) nextIdx = 0;
  loadTrack(nextIdx);
}

function prevTrack() {
  let prevIdx = currentTrackIndex - 1;
  if (prevIdx < 0) prevIdx = audioPlaylist.length - 1;
  loadTrack(prevIdx);
}

function seekAudio(seconds) {
  currentAudio.currentTime += seconds;
}

function updateAudioProgress() {
  const duration = currentAudio.duration;
  const currentTime = currentAudio.currentTime;
  if (!duration) return;

  const progressPercent = (currentTime / duration) * 100;
  document.querySelector(".progress-bar").style.width = `${progressPercent}%`;
  document.getElementById("curr-time").textContent = formatTime(currentTime);
}

function formatTime(time) {
  const mins = Math.floor(time / 60);
  const secs = Math.floor(time % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

// 7. CONTACT FORM SUBMISSION
function initContactPage() {
  const form = document.getElementById("contact-form");
  const settings = ArkanData.getSettings();
  
  // Fill direct contact details from settings
  document.getElementById("contact-phone").textContent = settings.phone;
  document.getElementById("contact-email").textContent = settings.email;
  document.getElementById("contact-address").textContent = settings.address;
  
  const mapFrame = document.getElementById("contact-map");
  if (mapFrame && settings.map_embed) {
    mapFrame.src = settings.map_embed;
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("form-name").value;
      const message = document.getElementById("form-message").value;
      const subject = encodeURIComponent("طلب تواصل من موقع أركان");
      const body = encodeURIComponent(`الاسم: ${name}\nالرسالة:\n${message}`);
      
      window.location.href = `mailto:${settings.email}?subject=${subject}&body=${body}`;
    });
  }
}

// 8. SCROLL ANIMATIONS (Intersection Observer for fade-in)
function setupScrollAnimations() {
  const items = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  items.forEach(item => observer.observe(item));
}
