// ── ELEMENTS ──
const searchInput   = document.getElementById('searchInput');
const searchBtn     = document.getElementById('searchBtn');
const menuBtn       = document.getElementById('menuBtn');
const sidebar       = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const notifBtn      = document.getElementById('notifBtn');
const notifDropdown = document.getElementById('notifDropdown');
const signinBtn     = document.getElementById('signinBtn');
const modalOverlay  = document.getElementById('modalOverlay');
const cancelBtn     = document.getElementById('cancelBtn');
const confirmBtn    = document.getElementById('confirmBtn');

// ── DETECT MOBILE ──
const isMobile = () => window.innerWidth <= 900;

// ── HOVER / TAP TO PLAY ──
function applyHoverEffect() {
    document.querySelectorAll('.video-card').forEach(card => {
        const iframe = card.querySelector('iframe');
        if (!iframe) return;

        const srcParts = iframe.src.split('/embed/');
        const videoId  = srcParts[1] ? srcParts[1].split('?')[0] : '';
        if (!videoId) return;

        const pausedSrc  = `https://www.youtube.com/embed/${videoId}?mute=1&controls=0`;
        const playingSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0`;

        iframe.src = pausedSrc;

        // Desktop: hover to play
        card.addEventListener('mouseenter', () => {
            if (!isMobile()) iframe.src = playingSrc;
        });

        card.addEventListener('mouseleave', () => {
            if (!isMobile()) iframe.src = pausedSrc;
        });

        // Mobile: tap to play / pause
        card.addEventListener('click', () => {
            if (!isMobile()) return;

            const isPlaying = card.classList.contains('playing');

            // Stop all other cards
            document.querySelectorAll('.video-card').forEach(other => {
                if (other !== card) {
                    const otherIframe = other.querySelector('iframe');
                    const otherParts  = otherIframe.src.split('/embed/');
                    const otherId     = otherParts[1] ? otherParts[1].split('?')[0] : '';
                    otherIframe.src   = `https://www.youtube.com/embed/${otherId}?mute=1&controls=0`;
                    other.classList.remove('playing');
                }
            });

            if (isPlaying) {
                iframe.src = pausedSrc;
                card.classList.remove('playing');
            } else {
                iframe.src = playingSrc;
                card.classList.add('playing');
            }
        });
    });
}

// ── SEARCH ──
function doSearch() {
    const query = searchInput.value.toLowerCase().trim();

    document.querySelectorAll('.video-card').forEach(card => {
        const title   = card.querySelector('.video-title').textContent.toLowerCase();
        const channel = card.querySelector('.channel-name').textContent.toLowerCase();

        if (!query || title.includes(query) || channel.includes(query)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// ── CHIPS ──
document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
        document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
    });
});

// ── SIDEBAR TOGGLE (mobile) ──
menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    sidebarOverlay.classList.toggle('show');
});

sidebarOverlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('show');
});

// ── NOTIFICATION TOGGLE ──
notifBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    notifDropdown.classList.toggle('show');
});

document.addEventListener('click', () => {
    notifDropdown.classList.remove('show');
});

// ── SIGN IN MODAL ──
signinBtn.addEventListener('click', () => {
    modalOverlay.classList.add('show');
});

cancelBtn.addEventListener('click', () => {
    modalOverlay.classList.remove('show');
});

confirmBtn.addEventListener('click', () => {
    const name = document.getElementById('nameInput').value.trim();
    if (!name) { alert('Please enter your name'); return; }

    // Replace sign in button with avatar
    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    avatar.textContent = name.charAt(0).toUpperCase();
    signinBtn.replaceWith(avatar);

    modalOverlay.classList.remove('show');
});

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) modalOverlay.classList.remove('show');
});

// ── SIDEBAR ITEMS ──
document.querySelectorAll('.sidebar-item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        // Close sidebar on mobile after click
        if (isMobile()) {
            sidebar.classList.remove('open');
            sidebarOverlay.classList.remove('show');
        }
    });
});

// ── EVENTS ──
searchBtn.addEventListener('click', doSearch);
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') doSearch();
});

// ── INIT ──
applyHoverEffect();