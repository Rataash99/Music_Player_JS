const songsData = [
  {
    id: 1,
    name: "Escapism",
    artist: "Raye",
    image: "./music/escapism/escapism.jpg",
    genre: "Pop",
    source: "./music/escapism/escapism.mp3",
  },
  {
    id: 2,
    name: "Beast",
    artist: "8 Graves",
    image: "./music/beast/beast.jpg",
    genre: "Rock",
    source: "./music/beast/beast.mp3",
  },
  {
    id: 3,
    name: "RIP",
    artist: "8 Graves",
    image: "./music/rip/rip.jpg",
    genre: "Rock",
    source: "./music/rip/rip.mp3",
  },
  {
    id: 4,
    name: "Flowers",
    artist: "Miley Cyrus",
    image: "./music/flowers/flowers.jpg",
    genre: "Pop",
    source: "./music/flowers/flowers.mp3",
  },
  {
    id: 5,
    name: "Jennifer's Body",
    artist: "Ken Carson",
    image: "./music/jenniferB/jenniferB.jpg",
    genre: "Hip Hop",
    source: "/music/jenniferB/jenniferB.mp3",
  },
  {
    id: 6,
    name: "Numb",
    artist: "Linkin Park",
    image: "./music/numb/numb.jpg",
    genre: "Rock",
    source: "/music/numb/numb.mp3",
  },
  {
    id: 7,
    name: "First Person Shooter",
    artist: "Drake",
    image: "./music/firstPS/firstPS.jpg",
    genre: "Hip Hop",
    source: "./music/firstPS/firstPS.mp3",
  },
];
const optionGenre = document.querySelector("select");
showSongs();

// handing theme toggler
const elements = document.querySelectorAll("[data-theme]");
const toggleBtn = document.querySelector(".toggler");

function toggleTheme(theme) {
  const bodyBg = document.querySelector("body");
  elements.forEach((item) => {
    item.setAttribute("data-theme", theme);
  });
  theme == "light"
    ? (bodyBg.style.backgroundColor = "#d7dcff")
    : (bodyBg.style.backgroundColor = "var(--primary)");
}
toggleBtn.addEventListener("click", (e) => {
  let theme = "";
  const header = document.querySelector("header");
  const glass = document.querySelector(".search-playlist");
  const input = document.querySelector('.PL-input');
  const themeCh = document.querySelector(".toggle-theme");

  if (e.target.classList.contains("right")) {
    theme = "light";
    e.target.classList.add("left");
    e.target.classList.remove("right");
    e.target.style.left = "-1px";
    e.target.style.right = "auto";
    header.style.backgroundColor = "#d7dcff";
    header.style.color = "black";
    themeCh.style.border = "1px solid black";
    glass.style.color = "black";
    input.style.color = "black";

  } else if (e.target.classList.contains("left")) {
    theme = "dark";
    e.target.classList.remove("left");
    e.target.classList.add("right");
    e.target.style.right = "-1px";
    e.target.style.left = "auto";
    header.style.backgroundColor = "var(--primary)";
    header.style.color = "white";
    themeCh.style.border = "1px solid white";
    glass.style.color = "white";
    input.style.color = "white";
  }
  toggleTheme(theme);
});

// handling songs in left section of main div
optionGenre.addEventListener("change", showSongs);
function showSongs() {
  const selectedGenre = optionGenre.value;
  const genreSpan = document.querySelector(".selected-genre");
  const songlist = document.querySelector(".song-list");

  genreSpan.textContent = selectedGenre;

  songlist.innerHTML = "";

  if (selectedGenre === "All") {
    songsData.forEach((ele) => {
      const list = document.createElement("li");
      list.textContent = `${ele.name} - ${ele.artist}`;
      list.classList.add("pointer", "scale");
      songlist.appendChild(list);
      list.setAttribute("id", ele.id);
    });
    return;
  }

  songsData
    .filter((item) => item.genre === selectedGenre)
    .forEach((ele) => {
      const list = document.createElement("li");
      list.textContent = `${ele.name} - ${ele.artist}`;
      list.classList.add("pointer", "scale");
      songlist.appendChild(list);
      list.setAttribute("id", ele.id);
    });
}

// play selected song from preferred genre
const songlist = document.querySelector(".song-list");
songlist.addEventListener("click", (e) => playSelectedSong(e));
function playSelectedSong(e) {
  const id = Number(e.target.id);
  const name = document.querySelector(".song-name");
  const artist = document.querySelector(".song-artist");
  const img = document.querySelector(".music-img");
  const musicSrc = document.querySelector("audio");

  songsData.forEach((item) => {
    if (item.id === id) {
      name.textContent = item.name;
      artist.textContent = item.artist;
      img.src = item.image;
      musicSrc.src = item.source;
    }
  });
}

// play next song
let currSongIdx = 0;
const next = document.querySelector("#next");
next.addEventListener("click", playNext);

function playNext() {
    const songs = Array.from(document.querySelectorAll(".song-list li"));
    currSongIdx++;
    if (currSongIdx >= songs.length) {
        currSongIdx = 0;
    }
    playSong(songs[currSongIdx]);
}

// play previous song 
const prev = document.querySelector("#prev");
prev.addEventListener('click', playPrev);

function playPrev() {
    const songs = Array.from(document.querySelectorAll(".song-list li"));
    currSongIdx--;
    if (currSongIdx < 0) {
        currSongIdx = songs.length - 1;
    }
    playSong(songs[currSongIdx]);
    console.log(currSongIdx);
}

function playSong(songElement) {
    const id = Number(songElement.id);
    const name = document.querySelector(".song-name");
    const artist = document.querySelector(".song-artist");
    const img = document.querySelector(".music-img");
    const musicSrc = document.querySelector("audio");

    const songData = songsData.find(item => item.id === id);
    if (songData) {
        name.textContent = songData.name;
        artist.textContent = songData.artist;
        img.src = songData.image;
        musicSrc.src = songData.source;
    }
}

// creating playlist 
const createPL = document.querySelector('#create-playlist');
createPL.addEventListener('click', createPlayList);
const playListSongs = [];

function createPlayList(){
    const allPlayList = document.querySelector('.all-list');
    const playListName = document.querySelector('.PL-input');
    const val = playListName.value;
    if([...allPlayList.childNodes].some(item => item.textContent.trim() === val.trim())){
        playListName.value = "";
            alert("PlayList already Exist!");
            return;
        };
    if(val !== ""){
        const obj = {
            name: val,
            selected: false,
            songs : []
        }

        playListSongs.push(obj);
        const list = document.createElement('li');
        list.textContent = val;
        list.classList.add("pointer", "scale");

        allPlayList.appendChild(list);
    }
    playListName.value = "";
}

// selecting curr playlist 
const allPlayList = document.querySelector('.all-list');
allPlayList.addEventListener('click', selectCurrPlayList);

function selectCurrPlayList(e){
    const nodes = allPlayList.childNodes;
    const list = e.target;

    nodes.forEach(item => {
        if(item.textContent == list.textContent){
            list.classList.add("selected");
        }
        else item.classList.remove("selected");
    })
    let selected = {};
    playListSongs.forEach(item => {
        if(item.name === list.textContent){
            item.selected = true;
            selected = item;
        }
        else item.selected = false;
    })
    showCurrPlayList(selected);
}
function showCurrPlayList(item){
    const currList = document.querySelector('.curr-list');
    currList.innerHTML = "";
    item.songs && item.songs.length > 0 && item.songs.forEach(song => {
        const li = document.createElement("li");
        li.classList.add('cu-li', "scale");
        li.innerHTML = `${song} <i class="fa-regular fa-trash-can scale pointer"></i>`
        currList.appendChild(li);
    })
}

// adding song to playlist 
const addToPL = document.querySelector('.addToPlaylist');
addToPL.addEventListener('click', addToPlayList);

function addToPlayList(){
    const allPlayList = document.querySelector('.all-list').childNodes;

    const currSong = document.querySelector(".song-name").textContent;
    const currArtist = document.querySelector('.song-artist').textContent;

    if(allPlayList.length == 0){
        alert("No PlayList Found! Please create a new PlayList.");
        return;
    }
    let val = currSong + " - " + currArtist;
    let obj = {};
    let isSelected = false;
    playListSongs.forEach(item => {
        if(item.selected){
            isSelected = true;
            if(!item.songs.includes(val)){
                item.songs.push(val);
                obj = item;
                showCurrPlayList(obj);
                return;
            }
        }
    })
    if(!isSelected){
        alert("No PlayList Selected, Please select a PlayList");
        return;
    } 
}

// deleting songs from current playlist 

const currPL = document.querySelector(".curr-playlist");
currPL.addEventListener('click', (e) => deletePLSong(e));
function deletePLSong(e){
    if(!e.target.classList.contains("fa-trash-can")) return;
    const songName = e.target.parentNode.textContent.trim();

    const selected = playListSongs.filter(item => item.selected)[0];
    const songs = selected.songs.filter(song => song != songName);
    selected.songs = songs;
    showCurrPlayList(selected);
}

// search playlist
const search = document.querySelector(".fa-magnifying-glass");
search.addEventListener('click', searchPL);

function searchPL(){
    const searchInput = document.querySelector(".PL-input");
    const val = searchInput.value.trim();
    if(val == "") {
        alert("Please enter a playlist name to search.");
        return;
    }

    let selected = {};

    let isPresent = false;
    playListSongs.forEach(item => {
        if(item.name === val){
            item.selected = true;
            selected = item;
            isPresent = true;
        }
        else item.selected = false;
    })
    if(!isPresent){
        alert(`No PlayList Found!`);
        searchInput.value = "";
        return;
    }
    searchInput.value = "";
    showCurrPlayList(selected);
}