// ── ELEMENTS ──
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const content = document.getElementById('content');

// ── VIDEO DATABASE ──
const videos = [
{
    title: "Build YouTube Clone with HTML CSS",
    channel: "Web Dev Simplified",
    views: "245K views",
    time: "1 year ago",
    color: "#e53935",
    videoId: "ykztGVW6x7w"
},
{
    title: "JavaScript Full Course",
    channel: "Programming with Mosh",
    views: "1.2M views",
    time: "8 months ago",
    color: "#1e88e5",
    videoId: "W6NZfCO5SIk"
},
{
    title: "CSS Grid Tutorial",
    channel: "Traversy Media",
    views: "830K views",
    time: "2 years ago",
    color: "#43a047",
    videoId: "0xMQfnTU6oo"
},
{
    title: "React JS Crash Course",
    channel: "Codevolution",
    views: "520K views",
    time: "6 months ago",
    color: "#8e24aa",
    videoId: "w7ejDZ8SWv8"
},
{
    title: "Node JS Beginner Tutorial",
    channel: "Dev Ed",
    views: "300K views",
    time: "1 year ago",
    color: "#f4511e",
    videoId: "TlB_eWDSMt4"
},
{
    title: "HTML Full Tutorial",
    channel: "freeCodeCamp",
    views: "2M views",
    time: "3 years ago",
    color: "#00897b",
    videoId: "pQN-pnXPaVg"
},
{
    title: "Build Netflix Clone",
    channel: "Easy Tutorials",
    views: "420K views",
    time: "11 months ago",
    color: "#f9a825",
    videoId: "jUuqBZwwkQw"
},
{
    title: "Responsive Website Design",
    channel: "Online Tutorials",
    views: "190K views",
    time: "5 months ago",
    color: "#6d4c41",
    videoId: "srvUrASNj0s"
},
{
    title: "Modern JavaScript ES6",
    channel: "Academind",
    views: "780K views",
    time: "2 years ago",
    color: "#3949ab",
    videoId: "NCwa_xi0Uuc"
},
{
    title: "Build Spotify Clone",
    channel: "CodingNepal",
    views: "275K views",
    time: "7 months ago",
    color: "#c62828",
    videoId: "1hHMwLxN6EM"
}
];

// ── DISPLAY VIDEOS ──
function displayVideos(videoArray) {

    content.innerHTML = '';

    videoArray.forEach(video => {

        const card = document.createElement('div');
        card.className = 'video-card';

        card.innerHTML = `
        
        <div class="thumbnail">
        
            <iframe
                src="https://www.youtube.com/embed/${video.videoId}?mute=1&controls=0"
                allowfullscreen>
            </iframe>

            <div class="play-overlay">
                <i class="ri-play-circle-fill"></i>
            </div>

        </div>

        <div class="video-info">

            <div class="channel-icon"
                style="background:${video.color};">
                ${video.channel.charAt(0)}
            </div>

            <div class="video-details">

                <p class="video-title">
                    ${video.title}
                </p>

                <p class="channel-name">
                    ${video.channel}
                </p>

                <p class="video-meta">
                    ${video.views} • ${video.time}
                </p>

            </div>

        </div>
        `;

        // ── HOVER PLAY EFFECT ──
        const iframe = card.querySelector("iframe");

        card.addEventListener("mouseenter", () => {
            iframe.src =
            `https://www.youtube.com/embed/${video.videoId}?autoplay=1&mute=1&controls=0`;
        });

        card.addEventListener("mouseleave", () => {
            iframe.src =
            `https://www.youtube.com/embed/${video.videoId}?mute=1&controls=0`;
        });

        content.appendChild(card);
    });
}

// ── SEARCH ──
function doSearch() {

    const query = searchInput.value.toLowerCase().trim();

    if (!query) {
        displayVideos(videos);
        return;
    }

    const filtered = videos.filter(video =>
        video.title.toLowerCase().includes(query) ||
        video.channel.toLowerCase().includes(query)
    );

    displayVideos(filtered);
}

// ── EVENTS ──
searchBtn.addEventListener('click', doSearch);

searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        doSearch();
    }
});

// ── INITIAL LOAD ──
displayVideos(videos);