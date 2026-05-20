// ── ELEMENTS ──
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

// ── DETECT MOBILE ──
const isMobile = window.matchMedia('(max-width: 768px)').matches;

// ── HOVER / CLICK EFFECT ──
function applyHoverEffect() {
    document.querySelectorAll('.video-card').forEach(card => {
        const iframe = card.querySelector('iframe');
        const overlay = card.querySelector('.play-overlay');

        // Get the video ID from the iframe src
        const srcParts = iframe.src.split('/embed/');
        const videoId = srcParts[1].split('?')[0];

        const pausedSrc = `https://www.youtube.com/embed/${videoId}?mute=1&controls=0`;
        const playingSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0`;

        iframe.src = pausedSrc;

        if (isMobile) {
            // ── MOBILE: TAP TO PLAY ──
            card.addEventListener('click', () => {

                // pause all other cards first
                document.querySelectorAll('.video-card').forEach(otherCard => {
                    if (otherCard !== card) {
                        const otherIframe = otherCard.querySelector('iframe');
                        const otherSrcParts = otherIframe.src.split('/embed/');
                        const otherVideoId = otherSrcParts[1].split('?')[0];
                        otherIframe.src = `https://www.youtube.com/embed/${otherVideoId}?mute=1&controls=0`;
                        otherCard.classList.remove('playing');
                    }
                });

                if (card.classList.contains('playing')) {
                    iframe.src = pausedSrc;
                    card.classList.remove('playing');
                } else {
                    iframe.src = playingSrc;
                    card.classList.add('playing');
                }
            });

        } else {
            // ── DESKTOP: HOVER TO PLAY ──
            card.addEventListener('mouseenter', () => {
                iframe.src = playingSrc;
                if (overlay) overlay.style.opacity = '1';
            });

            card.addEventListener('mouseleave', () => {
                iframe.src = pausedSrc;
                if (overlay) overlay.style.opacity = '0';
            });
        }
    });
}

// ── SEARCH ──
function doSearch() {
    const query = searchInput.value.toLowerCase().trim();

    document.querySelectorAll('.video-card').forEach(card => {
        const title = card.querySelector('.video-title').textContent.toLowerCase();
        const channel = card.querySelector('.channel-name').textContent.toLowerCase();

        if (!query || title.includes(query) || channel.includes(query)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// ── EVENTS ──
searchBtn.addEventListener('click', doSearch);

searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') doSearch();
});

// ── RUN ON LOAD ──
applyHoverEffect();