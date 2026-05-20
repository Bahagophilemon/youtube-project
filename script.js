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
}
];

const content = document.getElementById("content");

function displayVideos() {
    content.innerHTML = "";

    videos.forEach(video => {

        const card = document.createElement("div");
        card.className = "video-card";

        card.innerHTML = `
        <div class="thumbnail">
            <img src="https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg">
            <div class="play-overlay">
                <i class="ri-play-circle-fill"></i>
            </div>
        </div>

        <div class="video-info">
            <div class="channel-icon" style="background:${video.color}">
                ${video.channel[0]}
            </div>

            <div>
                <p>${video.title}</p>
                <small>${video.channel}</small>
            </div>
        </div>
        `;

        content.appendChild(card);
    });
}

displayVideos();

/* SIDEBAR TOGGLE */
document.querySelector(".menu-btn").addEventListener("click", () => {
    document.getElementById("sidebar").classList.toggle("show");
});