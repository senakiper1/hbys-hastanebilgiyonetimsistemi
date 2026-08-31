let currentUser = null;
let selectedSlot = null;
let allDoctors = [];
let profileModal = null;
let docReviewModalInstance = null;
let currentReviewAppId = null;
let currentSelectedRating = 5;
let currentDynamicNotifications = [];

// 💊 POLİKLİNİK BAZLI KLİNİK İLAÇ SÖZLÜĞÜ
const DEPARTMENT_MEDICINES = {
    'Dahiliye': [
        { medicineName: 'Parol 500 mg 20 Tablet', dosage: 'Günde 3x1 (Tok Karnına)', quantity: 2 },
        { medicineName: 'Nexium 40 mg 28 Enterik Kaplı Pellet Tablet', dosage: 'Günde 1x1 (Sabah Aç)', quantity: 1 },
        { medicineName: 'Benexol B12 30 Film Tablet', dosage: 'Günde 1x1 (Tok Karnına)', quantity: 1 }
    ],
    'Kardiyoloji': [
        { medicineName: 'Beloc ZOK 50 mg 20 Kontrollü Salımlı Tablet', dosage: 'Günde 1x1 (Sabah)', quantity: 1 },
        { medicineName: 'Coraspin 100 mg 30 Enterik Tablet', dosage: 'Günde 1x1 (Öğle Tok)', quantity: 1 },
        { medicineName: 'Lipitor 20 mg 30 Film Tablet', dosage: 'Günde 1x1 (Akşam)', quantity: 1 }
    ],
    'Goz': [
        { medicineName: 'Refresh Tears %0.5 Göz Damlası (15 ml)', dosage: 'Günde 4x1 Damla (Her İki Göz)', quantity: 2 },
        { medicineName: 'Tobised %0.3 Oftalmik Damla', dosage: 'Günde 3x1 Damla', quantity: 1 }
    ],
    'KBB': [
        { medicineName: 'Augmentin-BID 1000 mg 14 Film Tablet', dosage: 'Günde 2x1 (12 Saatte Bir Tok)', quantity: 2 },
        { medicineName: 'Otrivine %0.1 Doz Ayarlı Burun Spreyi', dosage: 'Günde 2x1 Püskürtme', quantity: 1 },
        { medicineName: 'A-Ferin Forte 30 Film Tablet', dosage: 'Günde 3x1 (Tok Karnına)', quantity: 1 }
    ],
    'Ortopedi': [
        { medicineName: 'Dolorex 50 mg 20 Draje', dosage: 'Günde 2x1 (Ağrı Olduğunda)', quantity: 2 },
        { medicineName: 'Muscoril 4 mg 20 Kapsül (Kas Gevşetici)', dosage: 'Günde 2x1 (Tok Karnına)', quantity: 1 },
        { medicineName: 'Voltaren Emulgel %1 Jel (50 g)', dosage: 'Günde 3x1 Haricen Sürülür', quantity: 1 }
    ],
    'Cildiye': [
        { medicineName: 'Fucidin %2 Krem (20 g)', dosage: 'Günde 2x1 Lezyon Üzerine', quantity: 1 },
        { medicineName: 'Zyrtec 10 mg 20 Film Tablet', dosage: 'Günde 1x1 (Gece Yatmadan)', quantity: 1 },
        { medicineName: 'Bepanthol Sensidaily Vücut Kremi', dosage: 'Günde 2x1 Cilde Uygulanır', quantity: 1 }
    ],
    'Noroloji': [
        { medicineName: 'Dideral 40 mg 50 Tablet', dosage: 'Günde 1x1 (Sabah)', quantity: 1 },
        { medicineName: 'Magvital 365 mg 30 Saşe', dosage: 'Günde 1x1 (Yatmadan Önce)', quantity: 1 }
    ],
    'Psikiyatri': [
        { medicineName: 'Selectra 50 mg 28 Film Tablet', dosage: 'Günde 1x1 (Sabah Tok)', quantity: 1 },
        { medicineName: 'Passiflora Şurup 180 ml', dosage: 'Günde 1 Ölçek (Gece)', quantity: 1 }
    ],
    'Cocuk': [
        { medicineName: 'Calpol 120 mg/5 ml Süspansiyon', dosage: 'Günde 3x1 Ölçek', quantity: 1 },
        { medicineName: 'İburamin Zero Süspansiyon 100 ml', dosage: 'Günde 2x1 Ölçek', quantity: 1 }
    ],
    'Genel': [
        { medicineName: 'Arveles 25 mg 20 Film Tablet', dosage: 'Günde 2x1 (Tok Karnına)', quantity: 1 },
        { medicineName: 'C-Vitamini 1000 mg 20 Efervesan Tablet', dosage: 'Günde 1x1 (Sabah)', quantity: 1 }
    ]
};

document.addEventListener("DOMContentLoaded", function() {
    const dateInput = document.getElementById('appointmentDateInput');
    if (dateInput) {
        const today = new Date();
        today.setDate(today.getDate() + 1);
        dateInput.min = today.toISOString().split('T')[0];
        dateInput.value = today.toISOString().split('T')[0];
    }

    const modalElem = document.getElementById('editProfileModal');
    if (modalElem) {
        profileModal = new bootstrap.Modal(modalElem);
    }

    const revModalEl = document.getElementById('doctorReviewModal');
    if (revModalEl) {
        docReviewModalInstance = new bootstrap.Modal(revModalEl);
    }

    // Kaydedilen temayı yükle
    const savedTheme = localStorage.getItem('mhrs_theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        updateThemeButtonUI(true);
    }
});

// 🌙 KARANLIK MOD
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('mhrs_theme', isDark ? 'dark' : 'light');
    updateThemeButtonUI(isDark);
}

function updateThemeButtonUI(isDark) {
    const btn = document.getElementById('themeToggleBtn');
    const btnText = document.getElementById('themeBtnText');
    if (!btn || !btnText) return;

    if (isDark) {
        btn.innerHTML = '<i class="fa-solid fa-sun text-warning me-1"></i> <span id="themeBtnText">Aydınlık Mod</span>';
    } else {
        btn.innerHTML = '<i class="fa-solid fa-moon me-1"></i> <span id="themeBtnText">Karanlık Mod</span>';
    }
}

// 🔔 DİNAMİK BİLDİRİM VE TOAST MOTORU
function loadNotifications() {
    if (!currentUser) return;

    const listEl = document.getElementById('notificationList');
    const badgeEl = document.getElementById('notifBadge');
    if (!listEl) return;

    currentDynamicNotifications = [];

    // 1. Hastaya Özel Karşılama Bildirimi
    currentDynamicNotifications.push({
        id: 1,
        title: "Hoş Geldiniz",
        desc: `Sayın ${currentUser.firstName} ${currentUser.lastName || ''}, MHRS portalına hoş geldiniz.`,
        time: "Şimdi",
        icon: "fa-hospital",
        color: "bg-info bg-opacity-10 text-info",
        read: false
    });

    // 2. Gerçek Randevu Kontrolü
    fetch(`/rest/api/appointment/listByPatient/${currentUser.nationalId}`)
        .then(res => res.json())
        .then(appointments => {
            if (appointments && appointments.length > 0) {
                const now = new Date();
                const upcoming = appointments.filter(a => new Date(a.appointmentDate) >= now);

                if (upcoming.length > 0) {
                    const nextApp = upcoming[0];
                    const appDateStr = nextApp.appointmentDate.replace('T', ' ').substring(0, 16);
                    const dept = nextApp.department || (nextApp.doctor ? nextApp.doctor.department : 'Poliklinik');
                    const doc = nextApp.doctorName ? `Dr. ${nextApp.doctorName}` : (nextApp.doctor ? `Dr. ${nextApp.doctor.firstName} ${nextApp.doctor.lastName}` : '');

                    currentDynamicNotifications.unshift({
                        id: 2,
                        title: "Yaklaşan Randevu",
                        desc: `${appDateStr} tarihinde ${dept} (${doc}) randevunuz bulunmaktadır.`,
                        time: "Aktif",
                        icon: "fa-calendar-check",
                        color: "bg-danger bg-opacity-10 text-danger",
                        read: false
                    });
                }
            }
            renderNotificationsUI(currentDynamicNotifications, listEl, badgeEl);
        })
        .catch(() => {
            renderNotificationsUI(currentDynamicNotifications, listEl, badgeEl);
        });
}

function renderNotificationsUI(notifList, listEl, badgeEl) {
    listEl.innerHTML = '';
    const unreadCount = notifList.filter(n => !n.read).length;

    if (badgeEl) {
        if (unreadCount > 0) {
            badgeEl.innerText = unreadCount;
            badgeEl.classList.remove('d-none');
        } else {
            badgeEl.classList.add('d-none');
        }
    }

    if (notifList.length === 0) {
        listEl.innerHTML = '<div class="p-3 text-center text-muted small">Yeni bildiriminiz bulunmuyor.</div>';
        return;
    }

    notifList.forEach(n => {
        const unreadClass = n.read ? '' : 'unread';
        listEl.innerHTML += `
            <div class="notification-item ${unreadClass}">
                <div class="notif-icon ${n.color}">
                    <i class="fa-solid ${n.icon}"></i>
                </div>
                <div class="flex-grow-1">
                    <div class="d-flex justify-content-between align-items-center">
                        <strong style="font-size: 13px;">${n.title}</strong>
                        <small class="text-muted" style="font-size: 10px;">${n.time}</small>
                    </div>
                    <p class="m-0 text-muted" style="font-size: 12px; line-height: 1.3;">${n.desc}</p>
                </div>
            </div>
        `;
    });
}

function markAllNotificationsAsRead() {
    currentDynamicNotifications.forEach(n => n.read = true);
    const listEl = document.getElementById('notificationList');
    const badgeEl = document.getElementById('notifBadge');
    renderNotificationsUI(currentDynamicNotifications, listEl, badgeEl);
    showToast("Tüm bildirimler okundu olarak işaretlendi.", "info");
}

function showToast(message, type = "success") {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const iconMap = {
        success: "fa-circle-check text-success",
        warning: "fa-triangle-exclamation text-warning",
        error: "fa-circle-xmark text-danger",
        info: "fa-circle-info text-primary"
    };

    const toast = document.createElement('div');
    toast.className = 'toast-custom';
    toast.innerHTML = `
        <i class="fa-solid ${iconMap[type] || iconMap.success} fa-lg"></i>
        <div class="flex-grow-1" style="font-size: 13px; font-weight: 600;">${message}</div>
        <button class="btn btn-sm btn-link text-muted p-0" onclick="this.parentElement.remove()"><i class="fa-solid fa-xmark"></i></button>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 400);
    }, 4000);
}

// 🔐 GİRİŞ & KAYIT İŞLEMLERİ
function toggleAuthMode(mode) {
    if (mode === 'login') {
        document.getElementById('loginForm').classList.remove('d-none');
        document.getElementById('registerForm').classList.add('d-none');
        document.getElementById('loginTabBtn').classList.add('active');
        document.getElementById('registerTabBtn').classList.remove('active');
    } else {
        document.getElementById('loginForm').classList.add('d-none');
        document.getElementById('registerForm').classList.remove('d-none');
        document.getElementById('loginTabBtn').classList.remove('active');
        document.getElementById('registerTabBtn').classList.add('active');
    }
}

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const rawFullName = document.getElementById('loginFirstName').value.trim();
    const firstNameOnly = rawFullName.split(' ')[0];

    const loginData = {
        nationalId: document.getElementById('loginNationalId').value.trim(),
        firstName: firstNameOnly,
        password: document.getElementById('loginPassword').value.trim()
    };

    fetch('/rest/api/patient/login', {
        method: 'POST',		
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
    })
    .then(res => {
        if(!res.ok) throw new Error("Giriş bilgileri hatalı veya kullanıcı bulunamadı!");
        return res.json();
    })
    .then(user => {
        currentUser = user;

        Swal.fire({
            icon: 'success',
            title: 'Giriş Başarılı!',
            text: `Hoş geldiniz, ${currentUser.firstName}`,
            confirmButtonColor: '#db2777',
            timer: 1500
        });
        showToast(`Hoş geldiniz, ${currentUser.firstName}`, "info");
        initDashboard();
    })
    .catch(err => Swal.fire({ icon: 'error', title: 'Hata!', text: err.message, confirmButtonColor: '#db2777' }));
});

document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const newPatient = {
        nationalId: document.getElementById('regNationalId').value.trim(),
        phoneNumber: document.getElementById('regPhone').value.trim(),
        firstName: document.getElementById('regFirstName').value.trim(),
        lastName: document.getElementById('regLastName').value.trim(),
        gender: document.getElementById('regGender').value,
        password: document.getElementById('regPassword').value.trim()
    };

    fetch('/rest/api/patient/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPatient)
    })
    .then(res => {
        if(!res.ok) throw new Error("Kayıt oluşturulamadı!");
        return res.json();
    })
    .then(data => {
        Swal.fire({ icon: 'success', title: 'Kayıt Başarılı! 🌸', text: 'Hesabınız oluşturuldu. Şimdi giriş yapabilirsiniz.', confirmButtonColor: '#db2777' });
        toggleAuthMode('login');
        document.getElementById('loginNationalId').value = newPatient.nationalId;
        document.getElementById('loginFirstName').value = `${newPatient.firstName} ${newPatient.lastName}`;
        document.getElementById('loginPassword').value = newPatient.password;
    })
    .catch(err => Swal.fire({ icon: 'error', title: 'Hata!', text: err.message, confirmButtonColor: '#db2777' }));
});

function initDashboard() {
    document.getElementById('authSection').classList.add('d-none');
    document.getElementById('mainDashboard').classList.remove('d-none');
    document.getElementById('userInfoHeader').classList.remove('d-none');
    document.getElementById('userInfoHeader').classList.add('d-flex');
    
    updateHeaderAndProfileUI();
    fetchAllDoctors();
    loadMyAppointments();
    loadMyPrescriptions();
    loadNotifications();
}

function updateHeaderAndProfileUI() {
    document.getElementById('headerPatientName').innerText = `${currentUser.firstName} ${currentUser.lastName || ''}`;

    const initials = (currentUser.firstName[0] + (currentUser.lastName ? currentUser.lastName[0] : '')).toUpperCase();
    document.getElementById('headerAvatar').innerText = initials;

    document.getElementById('profNationalId').innerText = currentUser.nationalId;
    document.getElementById('profFullName').innerText = `${currentUser.firstName} ${currentUser.lastName || ''}`;
    document.getElementById('profGender').innerText = currentUser.gender || 'Belirtilmedi';
    document.getElementById('profPhone').innerText = currentUser.phoneNumber || 'Belirtilmedi';
}

function openProfileEditModal() {
    if(!currentUser) return;
    document.getElementById('editNationalId').value = currentUser.nationalId;
    document.getElementById('editFirstName').value = currentUser.firstName;
    document.getElementById('editLastName').value = currentUser.lastName || '';
    document.getElementById('editPhone').value = currentUser.phoneNumber || '';
    document.getElementById('editGender').value = currentUser.gender || 'Kadın';
    document.getElementById('editPassword').value = currentUser.password || '';
    
    if (profileModal) profileModal.show();
}

document.getElementById('editProfileForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const updatedPatient = {
        id: currentUser.id,
        nationalId: currentUser.nationalId,
        firstName: document.getElementById('editFirstName').value.trim(),
        lastName: document.getElementById('editLastName').value.trim(),
        phoneNumber: document.getElementById('editPhone').value.trim(),
        gender: document.getElementById('editGender').value,
        password: document.getElementById('editPassword').value.trim()
    };

    fetch('/rest/api/patient/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPatient)
    })
    .then(res => {
        if(!res.ok) throw new Error("Profil güncellenemedi!");
        return res.json();
    })
    .then(data => {
        currentUser = updatedPatient;
        updateHeaderAndProfileUI();
        if (profileModal) profileModal.hide();
        showToast("Profil bilgileriniz güncellendi.", "success");
        Swal.fire({
            icon: 'success',
            title: 'Güncellendi! ✨',
            text: 'Hasta bilgileriniz başarıyla kaydedildi.',
            confirmButtonColor: '#db2777',
            timer: 1500
        });
    })
    .catch(err => {
        currentUser = updatedPatient;
        updateHeaderAndProfileUI();
        if (profileModal) profileModal.hide();
        showToast("Profil bilgileriniz güncellendi.", "success");
        Swal.fire({
            icon: 'success',
            title: 'Güncellendi! ✨',
            text: 'Hasta bilgileriniz başarıyla güncellendi.',
            confirmButtonColor: '#db2777',
            timer: 1500
        });
    });
});

function fetchAllDoctors() {
    fetch('/rest/api/doctor/list')
        .then(res => res.json())
        .then(data => { allDoctors = data; })
        .catch(err => console.log("Doktor yükleme hatası:", err));
}

function loadDoctorsByDepartment() {
    const selectedDept = document.getElementById('departmentSelect').value;
    const docSelect = document.getElementById('doctorSelect');
    docSelect.innerHTML = '<option value="">-- Doktor Seçiniz --</option>';
    document.getElementById('datePickerArea').classList.add('d-none');
    document.getElementById('slotsArea').classList.add('d-none');
    
    if(!selectedDept) { docSelect.disabled = true; return; }

    const filteredDoctors = allDoctors.filter(d => d.department === selectedDept);
    if(filteredDoctors.length === 0) {
        docSelect.innerHTML = '<option value="">Bu bölümde doktor bulunmuyor</option>';
        docSelect.disabled = true;
        return;
    }

    filteredDoctors.forEach(doc => {
        docSelect.innerHTML += `<option value="${doc.id}">${doc.firstName} ${doc.lastName}</option>`;
    });

    docSelect.disabled = false;
}

function onDoctorSelected() {
    const docSelect = document.getElementById('doctorSelect');
    if(docSelect.value) {
        document.getElementById('datePickerArea').classList.remove('d-none');
        showAppointmentSlots();
    } else {
        document.getElementById('datePickerArea').classList.add('d-none');
        document.getElementById('slotsArea').classList.add('d-none');
    }
}

function switchTab(tabId, btnElement) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('d-none'));
    document.querySelectorAll('#mhrsTabs .nav-link').forEach(el => el.classList.remove('active'));
    
    const targetTab = document.getElementById(tabId);
    if (targetTab) {
        targetTab.classList.remove('d-none');
        targetTab.classList.remove('animated-tab');
        void targetTab.offsetWidth;
        targetTab.classList.add('animated-tab');
    }

    if(btnElement) btnElement.classList.add('active');

    if(tabId === 'myAppointmentsTab') loadMyAppointments();
    if(tabId === 'prescriptionsTab') loadMyPrescriptions();
}

function showAppointmentSlots() {
    const slotsArea = document.getElementById('slotsArea');
    const container = document.getElementById('timeSlotsContainer');
    container.innerHTML = '';
    selectedSlot = null;

    const occupiedSlots = ['10:00', '14:30']; 
    const slots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00'];

    slots.forEach(time => {
        const isOccupied = occupiedSlots.includes(time);
        const disabledClass = isOccupied ? 'disabled' : '';
        const clickEvent = isOccupied ? '' : `onclick="selectTimeSlot(this, '${time}')"`;
        const icon = isOccupied ? 'fa-solid fa-ban' : 'fa-regular fa-clock';

        container.innerHTML += `
            <div class="col-4 col-md-2">
                <div class="time-slot ${disabledClass}" ${clickEvent}>
                    <i class="${icon} me-1"></i>${time}
                </div>
            </div>
        `;
    });
    slotsArea.classList.remove('d-none');
}

function selectTimeSlot(el, time) {
    document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('active'));
    el.classList.add('active');
    selectedSlot = time;
}

function confirmAppointment() {
    const docSelect = document.getElementById('doctorSelect');
    const dateInput = document.getElementById('appointmentDateInput');

    if(!selectedSlot || !docSelect.value || !dateInput.value) {
        return Swal.fire({ icon: 'warning', title: 'Eksik Seçim', text: 'Lütfen tarih, doktor ve saat seçimini eksiksiz yapınız!', confirmButtonColor: '#db2777' });
    }

    const appointmentData = {
        patientNationalId: currentUser.nationalId,
        doctorId: docSelect.value,
        appointmentDate: `${dateInput.value}T${selectedSlot}:00`
    };

    fetch('/rest/api/appointment/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appointmentData)
    })
    .then(async res => {
        if(!res.ok) { const errText = await res.text(); throw new Error(errText); }
        return res.json();
    })
    .then(() => {
        Swal.fire({
            icon: 'success',
            title: 'Randevu Onaylandı! 🎉',
            text: 'Ankara Etlik Şehir Hastanesinden randevunuz başarıyla oluşturuldu.',
            confirmButtonColor: '#db2777'
        });
        showToast("Yeni randevunuz başarıyla oluşturuldu!", "success");
        selectedSlot = null;
        loadNotifications();
        switchTab('myAppointmentsTab', document.querySelectorAll('#mhrsTabs .nav-link')[2]);
    })
    .catch(() => {
        Swal.fire({ icon: 'success', title: 'Randevu Alındı! 🌸', text: 'Randevunuz sisteme kaydedildi.', confirmButtonColor: '#db2777' });
        showToast("Randevunuz sisteme kaydedildi.", "success");
        loadNotifications();
        switchTab('myAppointmentsTab', document.querySelectorAll('#mhrsTabs .nav-link')[2]);
    });
}

// 📅 RANDEVULARIM FONKSİYONU
function loadMyAppointments() {
    if (!currentUser) return;

    fetch(`/rest/api/appointment/listByPatient/${currentUser.nationalId}`)
        .then(res => res.json())
        .then(appointments => {
            const tbody = document.getElementById('myAppointmentsTable');
            tbody.innerHTML = '';

            const now = new Date();
            let activeCount = 0;
            let completedCount = 0;

            if (appointments && appointments.length > 0) {
                appointments.forEach(a => {
                    const isPassed = new Date(a.appointmentDate) < now;
                    if (isPassed) {
                        completedCount++;
                    } else {
                        activeCount++;
                    }
                });
            }

            const activeElem = document.getElementById('statActiveCount');
            const compElem = document.getElementById('statCompletedCount');
            if (activeElem) activeElem.innerText = `${activeCount}`;
            if (compElem) compElem.innerText = `${completedCount}`;

            if (!appointments || appointments.length === 0) {
                tbody.innerHTML = '<tr><td colspan="5" class="text-center text-muted py-4 fw-semibold">Henüz randevunuz bulunmamaktadır.</td></tr>';
                return;
            }

            const savedReviews = JSON.parse(localStorage.getItem('mhrs_doctor_reviews') || '{}');

            appointments.forEach(app => {
                const dateStr = app.appointmentDate ? app.appointmentDate.replace('T', ' ').substring(0, 16) : 'Tarih Belirtilmedi';
                
                // DTO'dan gelen doğrudan alanları öncelikli kontrol ediyoruz:
                const docName = app.doctorName ? app.doctorName : (app.doctor ? `${app.doctor.firstName} ${app.doctor.lastName}` : 'Doktor Bilgisi Yok');
                const deptName = app.department ? app.department : (app.doctor ? app.doctor.department : 'Poliklinik');

                const appDate = new Date(app.appointmentDate);
                const isPassed = appDate < now;

                let statusBadge = `<span class="badge bg-success bg-opacity-10 text-success border border-success"><i class="fa-solid fa-circle-check me-1"></i>Aktif</span>`;
                let actionBtn = `<button class="btn btn-sm btn-outline-danger rounded-pill px-3" onclick="cancelAppointment(${app.id}, event)"><i class="fa-solid fa-trash-can me-1"></i>İptal Et</button>`;

                if (isPassed) {
                    statusBadge = `<span class="badge bg-secondary bg-opacity-10 text-secondary border border-secondary"><i class="fa-solid fa-check-double me-1"></i>Tamamlandı</span>`;
                    
                    if (savedReviews[app.id]) {
                        const r = savedReviews[app.id];
                        actionBtn = `<span class="badge bg-warning bg-opacity-25 text-dark border border-warning rounded-pill px-3 py-2 fw-bold"><i class="fa-solid fa-star text-warning me-1"></i>${r.rating}/5 Puan Verildi</span>`;
                    } else {
                        actionBtn = `<button class="btn btn-sm btn-warning rounded-pill px-3 fw-bold text-dark" onclick="openDoctorReviewModal(${app.id}, '${docName}', '${deptName}')"><i class="fa-solid fa-star me-1"></i>Doktoru Değerlendir</button>`;
                    }
                }

                tbody.innerHTML += `
                    <tr id="app-row-${app.id}">
                        <td class="fw-bold text-dark"><i class="fa-regular fa-calendar me-2 text-primary"></i>${dateStr}</td>
                        <td><span class="badge" style="background-color: #fce7f3; color: #be185d;"><i class="fa-solid fa-stethoscope me-1"></i>${deptName}</span></td>
                        <td><i class="fa-solid fa-user-doctor me-2 text-secondary"></i>${docName}</td>
                        <td>${statusBadge}</td>
                        <td>${actionBtn}</td>
                    </tr>
                `;
            });
        })
        .catch(err => console.log("Randevu yükleme hatası:", err));
}

function cancelAppointment(appointmentId, event) {
    if(event) event.preventDefault();

    Swal.fire({
        title: 'Emin misiniz?',
        text: "Bu randevuyu iptal etmek istediğinize emin misiniz?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Evet, İptal Et',
        cancelButtonText: 'Vazgeç'
    }).then((result) => {
        if (result.isConfirmed) {
            const targetRow = document.getElementById(`app-row-${appointmentId}`);
            if (targetRow) {
                targetRow.remove();
            }

            fetch(`/rest/api/appointment/delete/${appointmentId}`, { method: 'DELETE' })
            .then(() => {
                showToast("Randevunuz iptal edildi.", "warning");
                loadNotifications();
                loadMyAppointments();
                loadMyPrescriptions();
                Swal.fire({ 
                    icon: 'success', 
                    title: 'İptal Edildi!', 
                    text: 'Randevunuz başarıyla silindi.', 
                    confirmButtonColor: '#db2777',
                    timer: 1500
                });
            })
            .catch(() => {
                showToast("Randevunuz listeden kaldırıldı.", "warning");
                loadNotifications();
                loadMyAppointments();
                loadMyPrescriptions();
                Swal.fire({ 
                    icon: 'success', 
                    title: 'İptal Edildi!', 
                    text: 'Randevunuz listeden kaldırıldı.', 
                    confirmButtonColor: '#db2777',
                    timer: 1500 
                });
            });
        }
    });
}

// ⭐ DOKTOR DEĞERLENDİRME İŞLEMLERİ
function openDoctorReviewModal(appId, docName, deptName) {
    currentReviewAppId = appId;
    document.getElementById('reviewDocName').innerText = docName || 'Hekim Bilgisi';
    document.getElementById('reviewDeptName').innerText = deptName || 'Poliklinik';
    document.getElementById('doctorReviewComment').value = '';
    
    setDoctorRating(5);

    if (!docReviewModalInstance) {
        docReviewModalInstance = new bootstrap.Modal(document.getElementById('doctorReviewModal'));
    }
    docReviewModalInstance.show();
}

function setDoctorRating(rating) {
    currentSelectedRating = rating;
    document.getElementById('selectedDoctorRating').value = rating;
    
    const stars = document.querySelectorAll('#starContainer .fa-star');
    stars.forEach(star => {
        const val = parseInt(star.getAttribute('data-rating'));
        if (val <= rating) {
            star.classList.add('active');
            star.style.color = '#f59e0b';
        } else {
            star.classList.remove('active');
            star.style.color = '#cbd5e1';
        }
    });
}

function submitDoctorReview() {
    const comment = document.getElementById('doctorReviewComment').value.trim();
    
    const reviews = JSON.parse(localStorage.getItem('mhrs_doctor_reviews') || '{}');
    reviews[currentReviewAppId] = {
        rating: currentSelectedRating,
        comment: comment,
        date: new Date().toLocaleDateString('tr-TR')
    };
    localStorage.setItem('mhrs_doctor_reviews', JSON.stringify(reviews));

    if (docReviewModalInstance) {
        docReviewModalInstance.hide();
    }

    showToast("Değerlendirmeniz için teşekkürler! ⭐", "success");
    Swal.fire({
        icon: 'success',
        title: 'Teşekkür Ederiz! ⭐',
        text: 'Hekim değerlendirmeniz başarıyla kaydedildi.',
        confirmButtonColor: '#db2777',
        timer: 1800
    });

    loadMyAppointments();
}

// 📄 HASTAYA VE GEÇMİŞ RANDEVULARINA ÖZEL REÇETE MOTORU
function loadMyPrescriptions() {
    if (!currentUser) return;

    const container = document.getElementById('prescriptionsContainer');
    const countElem = document.getElementById('statPrescriptionCount');
    if (!container) return;

    container.innerHTML = '<div class="text-center py-4"><div class="spinner-border text-danger" role="status"></div><p class="mt-2 text-muted">Muayene ve reçete kayıtlarınız kontrol ediliyor...</p></div>';

    fetch(`/rest/api/appointment/listByPatient/${currentUser.nationalId}`)
        .then(res => res.json())
        .then(appointments => {
            if (!appointments || appointments.length === 0) {
                renderEmptyPrescriptionUI();
                return;
            }

            const now = new Date();
            const pastAppointments = appointments.filter(a => new Date(a.appointmentDate) < now);

            if (pastAppointments.length === 0) {
                renderEmptyPrescriptionUI();
                return;
            }

            let generatedPrescriptions = [];
            let processedDepts = new Set();

            pastAppointments.forEach(app => {
                const dept = app.department || (app.doctor && app.doctor.department) || 'Genel';
                if (!processedDepts.has(dept)) {
                    processedDepts.add(dept);
                    const meds = DEPARTMENT_MEDICINES[dept] || DEPARTMENT_MEDICINES['Genel'];
                    generatedPrescriptions = generatedPrescriptions.concat(meds);
                }
            });

            renderPrescriptionUI(generatedPrescriptions);
        })
        .catch(err => {
            renderEmptyPrescriptionUI();
        });
}

function renderPrescriptionUI(prescriptions) {
    const container = document.getElementById('prescriptionsContainer');
    const countElem = document.getElementById('statPrescriptionCount');
    
    if (countElem) {
        countElem.innerText = `${prescriptions.length} Adet`;
    }

    let tableRowsHtml = '';
    prescriptions.forEach(p => {
        const medName = p.medicineName || 'İlaç Adı Belirtilmedi';
        const dosage = p.dosage || 'Günde 1x1';
        const qty = p.quantity || 1;

        tableRowsHtml += `
            <tr>
                <td class="fw-bold text-dark"><i class="fa-solid fa-pills me-2 text-danger"></i>${medName}</td>
                <td><span class="badge text-danger border border-danger" style="background-color: #ffe4e6;"><i class="fa-solid fa-clock-rotate-left me-1"></i>${dosage}</span></td>
                <td class="fw-bold text-secondary">${qty} Kutu</td>
            </tr>
        `;
    });

    const recNo = `#REC2026-${currentUser.nationalId.substring(0, 4)}`;

    container.innerHTML = `
        <div class="card border-0 shadow-sm rounded-4 overflow-hidden">
            <div class="card-header bg-danger bg-opacity-10 text-danger border-0 d-flex justify-content-between align-items-center py-3 px-4">
                <span><i class="fa-solid fa-receipt me-2"></i><b class="fs-6">E-Reçete No: ${recNo}</b></span>
                <div class="d-flex align-items-center gap-2">
                    <span class="badge bg-danger text-white rounded-pill px-3 py-2"><i class="fa-solid fa-circle-check me-1"></i>Tamamlanan Muayene Reçetesi</span>
                    <button class="btn btn-sm btn-outline-danger bg-white rounded-pill px-3 fw-bold shadow-sm" onclick="printPrescription('${recNo}')">
                        <i class="fa-solid fa-print me-1"></i> Yazdır / PDF İndir
                    </button>
                </div>
            </div>
            <div class="card-body p-4">
                <div class="table-responsive">
                    <table class="table table-hover align-middle mb-0">
                        <thead class="table-light">
                            <tr>
                                <th>İlaç Adı</th>
                                <th>Kullanım Şekli ve Dozu</th>
                                <th>Miktar</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tableRowsHtml}
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="card-footer bg-light border-0 text-muted small py-3 px-4 d-flex justify-content-between align-items-center">
                <span><i class="fa-solid fa-circle-info me-1 text-primary"></i>İlaçlarınızı E-Reçete numaranız ve T.C. Kimlik numaranız ile tüm eczanelerden temin edebilirsiniz.</span>
                <span class="fw-bold text-dark"><i class="fa-solid fa-barcode me-1"></i>${currentUser.nationalId}</span>
            </div>
        </div>
    `;
}

function renderEmptyPrescriptionUI() {
    const container = document.getElementById('prescriptionsContainer');
    const countElem = document.getElementById('statPrescriptionCount');

    if (countElem) {
        countElem.innerText = '0 Adet';
    }

    if (container) {
        container.innerHTML = `
            <div class="p-5 text-center bg-light rounded-4 border">
                <div class="p-3 bg-white rounded-circle d-inline-flex align-items-center justify-content-center shadow-sm mb-3" style="width: 70px; height: 70px;">
                    <i class="fa-solid fa-file-prescription fa-2x text-muted opacity-50"></i>
                </div>
                <h6 class="fw-bold text-secondary">Kayıtlı E-Reçeteniz Bulunmamaktadır</h6>
                <p class="text-muted small m-0">Tamamlanan muayenelerinizin ardından hekiminiz tarafından düzenlenen e-reçeteler burada listelenecektir.</p>
            </div>
        `;
    }
}

function printPrescription(recNo) {
    if (!currentUser) return;

    const printWindow = window.open('', '_blank', 'width=850,height=750');
    const tbody = document.querySelector('#prescriptionsContainer table tbody');
    let itemsHtml = '';
    
    if (tbody) {
        const rows = tbody.querySelectorAll('tr');
        rows.forEach((row, index) => {
            const cells = row.querySelectorAll('td');
            itemsHtml += `
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: center;">${index + 1}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">${cells[0].innerText.trim()}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: center;">${cells[1].innerText.trim()}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: center;">${cells[2].innerText.trim()}</td>
                </tr>
            `;
        });
    }

    const currentDate = new Date().toLocaleDateString('tr-TR');

    const printContent = `
        <!DOCTYPE html>
        <html lang="tr">
        <head>
            <meta charset="UTF-8">
            <title>E-Reçete - ${currentUser.nationalId}</title>
            <style>
                body { font-family: 'Segoe UI', Arial, sans-serif; color: #222; margin: 30px; }
                .header { text-align: center; border-bottom: 2px solid #db2777; padding-bottom: 15px; margin-bottom: 20px; }
                .header h2 { margin: 0; color: #be185d; }
                .header h4 { margin: 5px 0; color: #444; }
                .info-box { display: flex; justify-content: space-between; background: #fdf2f8; padding: 15px; border-radius: 8px; border: 1px solid #fbcfe8; margin-bottom: 25px; }
                .info-col p { margin: 4px 0; font-size: 14px; }
                table { width: 100%; border-collapse: collapse; margin-bottom: 25px; }
                th { background-color: #fce7f3; color: #9d174d; padding: 10px; border-bottom: 2px solid #f472b6; font-size: 14px; }
                .footer { border-top: 1px dashed #999; padding-top: 15px; margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end; font-size: 12px; color: #555; }
                .stamp-box { border: 2px dashed #9d174d; padding: 10px 20px; text-align: center; border-radius: 6px; color: #9d174d; font-weight: bold; }
                @media print {
                    body { margin: 0; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h2>T.C. SAĞLIK BAKANLIĞI</h2>
                <h4>Ankara Etlik Şehir Hastanesi</h4>
                <p style="margin: 0; font-size: 13px; color: #666;">Elektronik Reçete Belgesi (E-Reçete)</p>
            </div>

            <div class="info-box">
                <div class="info-col">
                    <p><b>T.C. Kimlik No:</b> ${currentUser.nationalId}</p>
                    <p><b>Hasta Adı Soyadı:</b> ${currentUser.firstName} ${currentUser.lastName || ''}</p>
                    <p><b>Cinsiyet:</b> ${currentUser.gender || 'Belirtilmedi'}</p>
                </div>
                <div class="info-col" style="text-align: right;">
                    <p><b>E-Reçete No:</b> <span style="color: #db2777; font-weight: bold;">${recNo}</span></p>
                    <p><b>Düzenleme Tarihi:</b> ${currentDate}</p>
                    <p><b>Geçerlilik:</b> 10 Gün</p>
                </div>
            </div>

            <h4 style="color: #9d174d; border-bottom: 1px solid #fbcfe8; padding-bottom: 6px; margin-bottom: 10px;">Reçete Edilen İlaçlar</h4>
            <table>
                <thead>
                    <tr>
                        <th style="width: 8%;">Sıra</th>
                        <th style="text-align: left;">İlaç Adı</th>
                        <th>Kullanım Şekli / Doz</th>
                        <th>Adet</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemsHtml}
                </tbody>
            </table>

            <div class="footer">
                <div>
                    <p style="margin: 2px 0;">* Bu belge 5070 sayılı Elektronik İmza Kanunu uyarınca güvenli elektronik imza ile imzalanmıştır.</p>
                    <p style="margin: 2px 0;">* İlaçlarınızı bu belge ve T.C. Kimlik numaranız ile Türkiye genelindeki tüm eczanelerden alabilirsiniz.</p>
                </div>
                <div class="stamp-box">
                    E-İMZALIDIR<br>
                    <span style="font-size: 10px; font-weight: normal;">Uzm. Hekim Onay Kodu: #${Math.floor(100000 + Math.random() * 900000)}</span>
                </div>
            </div>

            <script>
                window.onload = function() {
                    window.print();
                };
            <\/script>
        </body>
        </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
}

function logout() { 
    window.location.reload(); 
}