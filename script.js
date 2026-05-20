// ── ELEMENTS ──
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const content = document.getElementById('content');
const modalOverlay = document.getElementById('modalOverlay');
const cancelBtn = document.getElementById('cancelBtn');
const confirmBtn = document.getElementById('confirmBtn');
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');
const notifWrapper = document.querySelector('.notif-wrapper');
const notifDropdown = document.getElementById('notifDropdown');
const notifBadge = document.querySelector('.notif-badge');
const menuBtn = document.querySelector('.menu-btn');
const sidebar = document.getElementById('sidebar');
const signinBtn = document.getElementById('signinBtn');

// ── SEARCH FUNCTION ──
function doSearch() {
    const query = searchInput.value.trim();

    if (!query) {
        searchInput.focus();
        return;
    }

    content.innerHTML = '<p style="padding:20px;font-size:16px;">Loading videos...</p>';

    // Simulated search results (no API key needed)
    const fakeResults = [
        { title: query + ' - Full Tutorial', channel: 'Dev Masters', views: '120K', time: '1 year ago', letter: 'D' },
        { title: 'Learn ' + query + ' in 1 Hour', channel: 'Code Academy', views: '85K', time: '2 years ago', letter: 'C' },
        { title: query + ' for Beginners 2024', channel: 'Tech With Tim', views: '200K', time: '6 months ago', letter: 'T' },
        { title: 'Advanced ' + query + ' Tips', channel: 'JS Mastery', views: '55K', time: '3 months ago', letter: 'J' },
        { title: query + ' Project Build', channel: 'Traversy Media', views: '310K', time: '1 year ago', letter: 'T' },
        { title: query + ' Crash Course', channel: 'Web Dev Simplified', views: '400K', time: '2 years ago', letter: 'W' },
    ];

    displayVideos(fakeResults);
}

// ── DISPLAY VIDEOS ──
function displayVideos(videos) {
    content.innerHTML = '';

    const colors = ['#e53935','#1e88e5','#43a047','#8e24aa','#f4511e','#00897b','#f9a825','#c62828'];

    videos.forEach((video, index) => {
        const videoCard = document.createElement('div');
        videoCard.className = 'video-card';

        const color = colors[index % colors.length];
        const letter = video.letter || video.channel.charAt(0);

        videoCard.innerHTML = 

        content.appendChild(videoCard);
    });
}

// ── SEARCH BUTTON CLICK ──
searchBtn.addEventListener('click', doSearch);

// ── ENTER KEY ──
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        doSearch();
    }
});

// ── CHIPS ──
const chips = document.querySelectorAll('.chip');
chips.forEach(chip => {
    chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');

        // Simulate filter
        searchInput.value = chip.textContent === 'All' ? '' : chip.textContent;
        if (chip.textContent !== 'All') {
            doSearch();
        }
    });
});

// ── SIDEBAR ITEMS ──
const sidebarItems = document.querySelectorAll('.sidebar-item');
sidebarItems.forEach(item => {
    item.addEventListener('click', () => {
        sidebarItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
    });
});
// ── MENU TOGGLE (mobile) ──
menuBtn.addEventListener('click', () => {
    if (sidebar.style.display === 'block') {
        sidebar.style.display = 'none';
    } else {
        sidebar.style.display = 'block';
        sidebar.style.position = 'fixed';
        sidebar.style.top = '56px';
        sidebar.style.left = '0';
        sidebar.style.zIndex = '150';
        sidebar.style.height = 'calc(100vh - 56px)';
        sidebar.style.boxShadow = '4px 0 16px rgba(0,0,0,0.1)';
    }
});

// ── NOTIFICATIONS ──
notifWrapper.addEventListener('click', (e) => {
    e.stopPropagation();
    const isVisible = notifDropdown.style.display === 'block';
    notifDropdown.style.display = isVisible ? 'none' : 'block';
    if (!isVisible) {
        notifBadge.style.display = 'none';
    }
});

document.addEventListener('click', () => {
    notifDropdown.style.display = 'none';
});

// ── SIGN IN MODAL ──
signinBtn.addEventListener('click', () => {
    modalOverlay.classList.add('show');
});

cancelBtn.addEventListener('click', () => {
    modalOverlay.classList.remove('show');
    nameInput.value = '';
    emailInput.value = '';
    passwordInput.value = '';
});

// ── CONFIRM SIGN IN ──
confirmBtn.addEventListener('click', () => {
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!name|| !email ||!password) {
        alert('Please fill in all fields');
        return;
    }

    if (!email.includes('@')) {
        alert('Please enter a valid email');
        return;
    }

    if (password.length < 6) {
        alert('Password must be at least 6 characters');
        return;
    }

    // Replace sign in button with avatar + logout


    modalOverlay.classList.remove('show');
    nameInput.value = '';
    emailInput.value = '';
    passwordInput.value = '';

    // Add logout function
    setTimeout(() => {
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                location.reload();
            });
        }
    }, 100);

    alert('Welcome, ' + name + '! You are now signed in.');
});

// ── CLOSE MODAL OUTSIDE CLICK ──
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.classList.remove('show');
    }
});
