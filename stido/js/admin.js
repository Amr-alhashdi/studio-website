// ARKAN STUDIO - ADMIN PANEL JS

document.addEventListener("DOMContentLoaded", () => {
  // Check if user is logged in (except on login page itself)
  const isLoginPage = window.location.pathname.includes("login.html");
  const isLoggedIn = sessionStorage.getItem("arkan_admin_logged") === "true";

  if (!isLoggedIn && !isLoginPage) {
    window.location.href = "login.html";
    return;
  }

  if (isLoginPage) {
    initLoginPage();
  } else {
    initAdminDashboard();
  }
});

// 1. ADMIN LOGIN
function initLoginPage() {
  const form = document.getElementById("login-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    const errorEl = document.getElementById("login-error");

    if (username === "admin" && pass === "admin123") {
      sessionStorage.setItem("arkan_admin_logged", "true");
      window.location.href = "dashboard.html";
    } else {
      errorEl.textContent = "اسم المستخدم أو كلمة المرور غير صحيحة.";
      errorEl.style.display = "block";
    }
  });
}

// Logout
function adminLogout() {
  sessionStorage.removeItem("arkan_admin_logged");
  window.location.href = "../index.html";
}

// 2. ADMIN DASHBOARD & MANAGEMENT
let editingWorkId = null;

function initAdminDashboard() {
  // Load Stats
  updateAdminStats();

  // Load Manage Table if we are on manage page
  const tableBody = document.getElementById("admin-works-table");
  if (tableBody) {
    renderAdminWorks();
  }

  // Load Settings Form if we are on settings page
  const settingsForm = document.getElementById("admin-settings-form");
  if (settingsForm) {
    loadAdminSettings();
    settingsForm.addEventListener("submit", saveAdminSettings);
  }

  // Setup Add/Edit Work Form
  const workForm = document.getElementById("admin-work-form");
  if (workForm) {
    workForm.addEventListener("submit", handleWorkSubmit);
  }

  // Setup Type change listener
  const typeSelect = document.getElementById("work-type");
  if (typeSelect) {
    typeSelect.addEventListener("change", updateFormFieldsByType);
  }

  // Setup Base64 image reader for uploads
  setupMediaUploads();

  // Check URL parameters for edit or add actions from client-side
  const urlParams = new URLSearchParams(window.location.search);
  const editId = urlParams.get("edit");
  const addAction = urlParams.get("add");
  
  if (editId) {
    editWork(editId);
  } else if (addAction === "true") {
    openWorkModalForm();
  }
}

function updateAdminStats() {
  const works = JSON.parse(localStorage.getItem("arkan_works")) || [];
  
  const totalPhotos = works.filter(w => w.type === "photo").length;
  const totalVideos = works.filter(w => w.type === "video").length;
  const totalAudios = works.filter(w => w.type === "audio").length;

  const phEl = document.getElementById("stat-photos-count");
  const viEl = document.getElementById("stat-videos-count");
  const auEl = document.getElementById("stat-audios-count");

  if (phEl) phEl.textContent = totalPhotos;
  if (viEl) viEl.textContent = totalVideos;
  if (auEl) auEl.textContent = totalAudios;
}

// Load and Render Works in Admin Panel
function renderAdminWorks() {
  const tableBody = document.getElementById("admin-works-table");
  if (!tableBody) return;

  const works = JSON.parse(localStorage.getItem("arkan_works")) || [];
  tableBody.innerHTML = "";

  if (works.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:30px;">لا توجد أعمال مضافة حالياً.</td></tr>`;
    return;
  }

  works.forEach((work, index) => {
    const typeLabel = { photo: "صورة", video: "فيديو", audio: "صوتيات" }[work.type] || work.type;
    const tr = document.createElement("tr");
    tr.className = "draggable-item";
    tr.setAttribute("draggable", "true");
    tr.setAttribute("data-id", work.id);
    tr.innerHTML = `
      <td>
        <img src="${work.cover}" style="width:50px; height:50px; border-radius:8px; object-fit:cover;">
      </td>
      <td style="font-weight:bold;">${work.title}</td>
      <td><span class="card__badge" style="position:static;">${typeLabel}</span></td>
      <td>${work.date}</td>
      <td>${work.views || 0}</td>
      <td>
        <div style="display:flex; gap:10px;">
          <button class="admin-action-btn admin-action-btn--edit" onclick="editWork('${work.id}')">تعديل</button>
          <button class="admin-action-btn admin-action-btn--delete" onclick="deleteWork('${work.id}')">حذف</button>
        </div>
      </td>
    `;
    tableBody.appendChild(tr);
  });

  setupDragAndDrop();
}

// 3. ADD / EDIT WORK
let uploadedCoverBase64 = "";
let uploadedMediaBase64 = "";

function setupMediaUploads() {
  const coverInput = document.getElementById("work-cover-file");
  const mediaInput = document.getElementById("work-media-file");

  if (coverInput) {
    coverInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          uploadedCoverBase64 = event.target.result;
          // Show preview
          const preview = document.getElementById("cover-preview");
          if (preview) {
            preview.src = uploadedCoverBase64;
            preview.style.display = "block";
          }
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (mediaInput) {
    mediaInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          uploadedMediaBase64 = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }
}

function handleWorkSubmit(e) {
  e.preventDefault();

  const title = document.getElementById("work-title").value;
  const type = document.getElementById("work-type").value;
  const category = document.getElementById("work-category").value;
  const date = document.getElementById("work-date").value;
  const desc = document.getElementById("work-desc").value;
  const artist = document.getElementById("work-artist")?.value || "";

  // Check if they inputted a URL instead of uploading a file
  const coverUrlInput = document.getElementById("work-cover-url").value;
  const mediaUrlInput = document.getElementById("work-media-url").value;

  const works = JSON.parse(localStorage.getItem("arkan_works")) || [];
  let existingWork = null;
  if (editingWorkId) {
    existingWork = works.find(w => w.id === editingWorkId);
  }

  const finalCover = uploadedCoverBase64 || coverUrlInput || (existingWork ? existingWork.cover : "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600");
  
  // For photo type, the media is the same as the cover
  let finalMedia = "";
  if (type === "photo") {
    finalMedia = finalCover;
  } else {
    finalMedia = uploadedMediaBase64 || mediaUrlInput || (existingWork ? existingWork.media : finalCover);
  }

  if (editingWorkId) {
    // Edit existing
    const index = works.findIndex(w => w.id === editingWorkId);
    if (index !== -1) {
      works[index] = {
        ...works[index],
        title,
        type,
        category,
        date,
        desc,
        artist,
        cover: finalCover,
        media: finalMedia
      };
    }
    editingWorkId = null;
    document.getElementById("form-submit-btn").textContent = "إضافة العمل";
  } else {
    // Add new
    const newWork = {
      id: "w_" + Date.now(),
      title,
      type,
      category,
      date,
      desc,
      artist,
      cover: finalCover,
      media: finalMedia,
      views: 0,
      gallery: []
    };
    works.unshift(newWork);
  }

  localStorage.setItem("arkan_works", JSON.stringify(works));
  
  // Reset form & state
  document.getElementById("admin-work-form").reset();
  uploadedCoverBase64 = "";
  uploadedMediaBase64 = "";
  const preview = document.getElementById("cover-preview");
  if (preview) preview.style.display = "none";

  // Refresh stats and table
  updateAdminStats();
  renderAdminWorks();
  closeWorkModalForm();
}

function editWork(id) {
  const works = JSON.parse(localStorage.getItem("arkan_works")) || [];
  const work = works.find(w => w.id === id);
  if (!work) return;

  editingWorkId = work.id;
  
  document.getElementById("work-title").value = work.title;
  document.getElementById("work-type").value = work.type;
  document.getElementById("work-category").value = work.category;
  document.getElementById("work-date").value = work.date;
  document.getElementById("work-desc").value = work.desc;
  if (document.getElementById("work-artist")) {
    document.getElementById("work-artist").value = work.artist || "";
  }

  // Set URLs
  document.getElementById("work-cover-url").value = work.cover.startsWith("data:") ? "" : work.cover;
  document.getElementById("work-media-url").value = work.media.startsWith("data:") ? "" : work.media;

  // Show cover preview if it's base64
  const preview = document.getElementById("cover-preview");
  if (preview) {
    preview.src = work.cover;
    preview.style.display = "block";
  }

  // Adapt form fields based on type
  updateFormFieldsByType();

  document.getElementById("form-submit-btn").textContent = "حفظ التعديلات";
  openWorkModalForm();
}

function deleteWork(id) {
  if (!confirm("هل أنت متأكد من رغبتك في حذف هذا العمل؟")) return;

  let works = JSON.parse(localStorage.getItem("arkan_works")) || [];
  works = works.filter(w => w.id !== id);
  localStorage.setItem("arkan_works", JSON.stringify(works));

  updateAdminStats();
  renderAdminWorks();
}

// Modal Toggle for Form
function openWorkModalForm() {
  const modal = document.getElementById("admin-form-modal");
  if (modal) {
    modal.style.display = "flex";
    updateFormFieldsByType();
  }
}

function closeWorkModalForm() {
  const modal = document.getElementById("admin-form-modal");
  if (modal) {
    modal.style.display = "none";
    document.getElementById("admin-work-form").reset();
    editingWorkId = null;
    uploadedCoverBase64 = "";
    uploadedMediaBase64 = "";
    document.getElementById("form-submit-btn").textContent = "إضافة العمل";
    const preview = document.getElementById("cover-preview");
    if (preview) preview.style.display = "none";
  }
}

// Dynamically adapt form fields based on selected media type
function updateFormFieldsByType() {
  const typeSelect = document.getElementById("work-type");
  if (!typeSelect) return;

  const type = typeSelect.value;
  const coverSection = document.getElementById("cover-media-section");
  const mainSection = document.getElementById("main-media-section");
  const coverTitle = document.getElementById("cover-section-title");
  const mainTitle = document.getElementById("main-section-title");
  const mediaFileInput = document.getElementById("work-media-file");

  if (type === "photo") {
    if (coverSection) coverSection.style.display = "flex";
    if (mainSection) mainSection.style.display = "none";
    if (coverTitle) coverTitle.textContent = "ملف الصورة الفنية (أو رابط الصورة)";
  } else if (type === "video") {
    if (coverSection) coverSection.style.display = "flex";
    if (mainSection) mainSection.style.display = "flex";
    if (coverTitle) coverTitle.textContent = "صورة الغلاف / البوستر (فيديو)";
    if (mainTitle) mainTitle.textContent = "ملف الفيديو الرئيسي (أو الرابط)";
    if (mediaFileInput) mediaFileInput.accept = "video/*";
  } else if (type === "audio") {
    if (coverSection) coverSection.style.display = "flex";
    if (mainSection) mainSection.style.display = "flex";
    if (coverTitle) coverTitle.textContent = "صورة الغلاف / الألبوم (صوتيات)";
    if (mainTitle) mainTitle.textContent = "ملف الصوت الرئيسي (أو الرابط)";
    if (mediaFileInput) mediaFileInput.accept = "audio/*";
  }
}

// 4. SETTINGS MANAGEMENT
function loadAdminSettings() {
  const settings = JSON.parse(localStorage.getItem("arkan_settings")) || {};
  
  document.getElementById("settings-name").value = settings.name || "";
  document.getElementById("settings-logo").value = settings.logo_text || "";
  document.getElementById("settings-phone").value = settings.phone || "";
  document.getElementById("settings-email").value = settings.email || "";
  document.getElementById("settings-address").value = settings.address || "";
  document.getElementById("settings-map").value = settings.map_embed || "";
}

function saveAdminSettings(e) {
  e.preventDefault();

  const settings = {
    name: document.getElementById("settings-name").value,
    logo_text: document.getElementById("settings-logo").value,
    phone: document.getElementById("settings-phone").value,
    email: document.getElementById("settings-email").value,
    address: document.getElementById("settings-address").value,
    map_embed: document.getElementById("settings-map").value
  };

  localStorage.setItem("arkan_settings", JSON.stringify(settings));
  alert("تم حفظ إعدادات الموقع بنجاح!");
}

// 5. DRAG & DROP FOR REORDERING WORKS
let dragSrcEl = null;

function setupDragAndDrop() {
  const rows = document.querySelectorAll(".admin-table tr.draggable-item");
  rows.forEach(row => {
    row.addEventListener("dragstart", handleDragStart, false);
    row.addEventListener("dragover", handleDragOver, false);
    row.addEventListener("drop", handleDrop, false);
    row.addEventListener("dragend", handleDragEnd, false);
  });
}

function handleDragStart(e) {
  this.style.opacity = "0.4";
  dragSrcEl = this;
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/html", this.innerHTML);
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.dataTransfer.dropEffect = "move";
  return false;
}

function handleDrop(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  }

  if (dragSrcEl !== this) {
    // Swap IDs and values in LocalStorage
    const srcId = dragSrcEl.getAttribute("data-id");
    const targetId = this.getAttribute("data-id");

    const works = JSON.parse(localStorage.getItem("arkan_works")) || [];
    const srcIdx = works.findIndex(w => w.id === srcId);
    const targetIdx = works.findIndex(w => w.id === targetId);

    if (srcIdx !== -1 && targetIdx !== -1) {
      // Swap elements in array
      const temp = works[srcIdx];
      works[srcIdx] = works[targetIdx];
      works[targetIdx] = temp;
      localStorage.setItem("arkan_works", JSON.stringify(works));
    }

    renderAdminWorks();
  }
  return false;
}

function handleDragEnd(e) {
  this.style.opacity = "1";
}
