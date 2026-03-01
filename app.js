let currentCategory = "";
let editingIndex = null;

function getSongs() {
  return JSON.parse(localStorage.getItem("lyricsData")) || [];
}

function saveSongs(data) {
  localStorage.setItem("lyricsData", JSON.stringify(data));
}

function loadCategory(category) {
  currentCategory = category;
  editingIndex = null;

  const songs = getSongs().filter(s => s.category === category);
  const listDiv = document.getElementById("songList");
  const viewDiv = document.getElementById("lyricsView");

  viewDiv.innerHTML = "";
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
  const allSongs = getSongs();
  const filtered = allSongs.filter(s => s.category === currentCategory);
  const song = filtered[index];

  document.getElementById("lyricsView").innerHTML = `
    <h2>${song.title}</h2>
    <div class="lyrics-box">${song.lyrics}</div>
    <button class="action" onclick="editSong(${index})">Edit</button>
    <button class="action" onclick="deleteSong(${index})">Delete</button>
    <button class="action" onclick="downloadLyrics('${song.title}', \`${song.lyrics}\`)">Download</button>
  `;
}

function showForm(song = null) {
  document.getElementById("songList").innerHTML = `
    <h2>${song ? "Edit Lyrics" : "Add Lyrics"}</h2>
    <input id="title" placeholder="Song Title" value="${song ? song.title : ""}">
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
    <textarea id="lyrics" rows="8" placeholder="Enter Lyrics">${song ? song.lyrics : ""}</textarea>
    <button onclick="submitLyrics()">${song ? "Update" : "Submit"}</button>
  `;
}

function submitLyrics() {
  const title = document.getElementById("title").value;
  const category = document.getElementById("category").value;
  const lyrics = document.getElementById("lyrics").value;

  const songs = getSongs();

  if (editingIndex !== null) {
    songs[editingIndex] = { title, category, lyrics };
    editingIndex = null;
  } else {
    songs.push({ title, category, lyrics });
  }

  saveSongs(songs);
  alert("Saved successfully!");
}

function editSong(index) {
  const songs = getSongs().filter(s => s.category === currentCategory);
  editingIndex = getSongs().findIndex(s => s.title === songs[index].title);
  showForm(songs[index]);
}

function deleteSong(index) {
  const songs = getSongs();
  const filtered = songs.filter(s => s.category === currentCategory);
  const targetTitle = filtered[index].title;

  const updated = songs.filter(s => s.title !== targetTitle);
  saveSongs(updated);

  loadCategory(currentCategory);
}

function downloadLyrics(title, lyrics) {
  const blob = new Blob([lyrics], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = title + ".txt";
  link.click();
}
