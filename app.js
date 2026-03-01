let currentCategory = "";

function getSongs() {
  return JSON.parse(localStorage.getItem("lyricsData")) || [];
}

function saveSongs(data) {
  localStorage.setItem("lyricsData", JSON.stringify(data));
}

function loadCategory(category) {
  currentCategory = category;
  const songs = getSongs().filter(s => s.category === category);
  const listDiv = document.getElementById("songList");
  const lyricsDiv = document.getElementById("lyricsView");

  lyricsDiv.innerHTML = "";
  listDiv.innerHTML = `<h2>${category}</h2>`;

  songs.forEach((song, index) => {
    listDiv.innerHTML += `
      <div class="song-item" onclick="viewSong(${index})">
        ${song.title}
      </div>
    `;
  });
}

function viewSong(index) {
  const songs = getSongs().filter(s => s.category === currentCategory);
  const song = songs[index];

  document.getElementById("lyricsView").innerHTML = `
    <h2>${song.title}</h2>
    <div>${song.lyrics}</div>
    <br>
    <button class="action" onclick="downloadLyrics('${song.title}','${song.lyrics}')">Download</button>
  `;
}

function showForm() {
  document.getElementById("songList").innerHTML = `
    <h2>Submit Lyrics</h2>
    <input id="title" placeholder="Song Title">
    <select id="category">
      <option>Hindi Movie Songs</option>
      <option>English Movie Songs</option>
      <option>Ganesh Bhajans</option>
      <option>Hanuman Bhajans</option>
      <option>Krishna Bhajans</option>
      <option>Durga Bhajans</option>
      <option>Guru Bhajans</option>
      <option>Regional Folk Songs</option>
    </select>
    <textarea id="lyrics" rows="8" placeholder="Enter Lyrics"></textarea>
    <button onclick="submitLyrics()">Submit</button>
  `;
}

function submitLyrics() {
  const title = document.getElementById("title").value;
  const category = document.getElementById("category").value;
  const lyrics = document.getElementById("lyrics").value;

  const songs = getSongs();
  songs.push({ title, category, lyrics });
  saveSongs(songs);

  alert("Lyrics saved successfully!");
}

function downloadLyrics(title, lyrics) {
  const blob = new Blob([lyrics], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = title + ".txt";
  link.click();
}
