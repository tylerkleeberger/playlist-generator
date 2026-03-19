// ============================================================
//  app.js — Playlist Generator
//  Main application logic
//
//  PART 1 — 14 bugs are seeded in the working code.
//           Each is labeled with a 🐛 comment. Fix them all.
//    *TIP* - press command F to search for each bug
//
//  PART 2 — 4 build tasks are stubbed out.
//           Each is labeled with a BUILD comment.
//           The Track class is pre-built in track.js — read it first.
// ============================================================

import Track from './track.js';

// ── State ──────────────────────────────────────────────────
// 🐛 BUG 1 — M1: Variables & Data Types
// playlist needs to be reassigned later (e.g. playlist = data.results.map(...))
// const does not allow reassignment. Fix the declaration keyword.
const playlist   = [];          // Array of Track instances
let filterMode   = 'all';       // 'all' | 'favorites'


// 🐛 BUG 13 — M2: Data Types (null vs number)
// playingId should start as null (no track playing) but is initialized to 0.
// Later code checks: if (playingId === null) — that check never passes with 0.
// Fix: change 0 to null.
let playingId    = 0;           // ID of currently previewing track

// ── DOM References ─────────────────────────────────────────
const trackList        = document.getElementById('trackList');
const playlistEmpty    = document.getElementById('playlistEmpty');
const trackCountEl     = document.getElementById('trackCount');
const searchInput      = document.getElementById('searchInput');
const searchBtn        = document.getElementById('searchBtn');
const searchResults    = document.getElementById('searchResults');
const playlistNameInput= document.getElementById('playlistNameInput');
const playlistNameWrap = document.getElementById('playlistNameWrap');
const playlistNameConfirm = document.getElementById('playlistNameConfirm');
const savePlaylistBtn  = document.getElementById('savePlaylistBtn');
const filterBtns       = document.querySelectorAll('.filter-btn');

// Preview player elements
const previewPlayer    = document.getElementById('previewPlayer');
const previewAudio     = document.getElementById('previewAudio');
const previewArt       = document.getElementById('previewArt');
const previewTitle     = document.getElementById('previewTitle');
const previewArtist    = document.getElementById('previewArtist');
const previewTime      = document.getElementById('previewTime');
const previewProgressFill = document.getElementById('previewProgressFill');
const previewClose     = document.getElementById('previewClose');

// ── Render Playlist ────────────────────────────────────────

/**
 * Renders the current playlist array to the DOM.
 * Applies the active filter (all vs favorites).
 * @param {Track[]} tracks - Array of Track instances to render
 */
function renderPlaylist(tracks) {
  const filtered = filterMode === 'favorites'

    // 🐛 BUG 9 — M5: Array Functionality
    // The .filter() condition is inverted — returns tracks where
    // isFavorite is false instead of true. Fix the condition.
    ? tracks.filter(t => !t.isFavorite)
    : tracks;

  if (filtered.length === 0) {
    trackList.innerHTML = '';
    playlistEmpty.style.display = 'block';
    playlistEmpty.textContent = filterMode === 'favorites'
      ? 'No favorites yet. Heart a song!'
      : 'No tracks yet. Search and add some songs!';
  } else {
    playlistEmpty.style.display = 'none';
    trackList.innerHTML = filtered.map((track, index) => {
      const artEl = track.artwork

        // 🐛 BUG 7 — M4: String Methods / Template Literals
        // Single quotes are used instead of backticks.
        // ${track.artwork} and ${track.title} render as literal text.
        // Fix the quote style to use a template literal.
        // You should see the ${} become a different color
        // Once changes are saved, the track images should display
        ? '<img class="track-art" src="${track.artwork}" alt="${track.title}" loading="lazy" />'
        : `<div class="track-art-placeholder">♪</div>`;

      // 🐛 BUG 4 — M1: Variables (var / scope)
      // var is used here instead of a block-scoped keyword.
      // Replace var with the correct declaration.
      var favClass = track.isFavorite ? ' favorite' : '';

      // 🐛 BUG 5 — M8: Operators, Expressions & Conditionals
      // = (assignment) is used instead of === (comparison).
      // This assigns true to track.isFavorite rather than checking it.
      // Fix the operator.
      const favTitle = (track.isFavorite = true) ? 'Remove from favorites' : 'Add to favorites';
      const realIndex = playlist.indexOf(track);

      // 🐛 BUG 3 — M5: Array / Map
      // This .map() callback uses a {} block body but has no return keyword.
      // Without return, every iteration produces undefined — the list renders blank.
      // Fix: add return before the opening backtick of the template literal below.
      // *TIP* -- make sure the return keyword is on the same line as the opening backtick
      // Save your changes and you should see data show up on the page
      `
        <li class="track-card${favClass}"
            draggable="true"
            data-index="${realIndex}"
            data-id="${track.id}">
          ${artEl}
          <div class="track-info">
            <!-- 🐛 BUG 6 — M6: Object Functionality / Dot Notation          -->
            <!-- track.trackName does not exist on a Track instance.           -->
            <!-- Fix the property name to match what the constructor stores.   -->
            <div class="track-title">${track.trackName}</div>
            <div class="track-artist">${track.artist}</div>
          </div>
          <span class="track-duration">${track.getFormattedDuration()}</span>
          <div class="track-actions">
            ${track.previewUrl
        ? `<button class="track-btn track-preview-btn" data-index="${realIndex}" title="Preview">▶</button>`
        : ''}
            <button class="track-btn track-fav-btn" data-index="${realIndex}" title="${favTitle}">♥</button>
            <button class="track-btn track-remove-btn" data-index="${realIndex}" title="Remove">✕</button>
          </div>
        </li>`;
    }).join('');
    // .map() returns an array of HTML strings — one per track.
    // .join('') collapses that array into a single string with no separator.
    // Assigning it to innerHTML replaces the entire list in one go.

    updateTrackCount();
    setupDragAndDrop();
  }

  updateTrackCount();
  notifySidebar();
}

// ── Add & Remove Tracks ────────────────────────────────────

/**
 * Creates a new Track from raw iTunes data and adds it to the playlist.
 * Prevents duplicate tracks by trackId.
 * @param {Object} trackData - Raw iTunes API result object
 */
// ── BUILD 2A: addTrack(trackData) ──────────────────────────
// 1. Check for duplicates using .some()
// 2. If duplicate: call showToast('Already in playlist!') and return
// 3. Create new Track(trackData), push to playlist, call renderPlaylist(playlist)
// See Notion for full instructions and code snippets.
function addTrack(trackData) {
  // Your code here
}

/**
 * Removes the track at the given index from the playlist.
 * @param {number} index - Index in the playlist array
 */
// ── BUILD 2B: removeTrack(index) ───────────────────────────
// 1. Validate the index
// 2. Use .splice(index, 1) to remove the track
// 3. Call renderPlaylist(playlist)
// See Notion for full instructions and code snippets.
function removeTrack(index) {
  // Your code here
}

// ── Favorite Toggle ────────────────────────────────────────

/**
 * Toggles the favorite state of a track at the given index.
 * @param {number} index - Index in the playlist array
 */
// ── BUILD 3A: toggleFavorite(index) ────────────────────────
// 1. Validate the index
// 2. Call playlist[index].toggleFavorite()
// 3. Call renderPlaylist(playlist)
// See Notion for full instructions.
function toggleFavorite(index) {
  // Your code here
}

// ── Filter ─────────────────────────────────────────────────

/**
 * Sets the filter mode and re-renders the playlist.
 * @param {string} mode - 'all' or 'favorites'
 */
// ── BUILD 3B: filterPlaylist(mode) ─────────────────────────
// 1. Set filterMode = mode
// 2. Use if/else: if 'favorites', filter with .filter(t => t.isFavorite)
// 3. Update active class on filter buttons
// 4. Call renderPlaylist() with the result
// See Notion for full instructions and code snippets.
function filterPlaylist(mode) {
  // Your code here
}

// ── Search & Fetch ─────────────────────────────────────────

/**
 * Fetches songs from the iTunes Search API for a given query.
 * Maps results to Track instances and renders them in the search panel.
 * @param {string} query - The search string entered by the user
 */
// ── BUILD 4: searchSongs(query) ────────────────────────────
// Fill in the 5 steps inside the try block below.
// See the Build 4 section in playlist-generator.md for full instructions.
async function searchSongs(query) {
  if (!query.trim()) return;

  searchBtn.disabled = true;
  searchResults.innerHTML = `
    <div class="loading-indicator">
      <div class="spinner"></div> Searching…
    </div>`;

  try {
    // Step 1: Build the URL and fetch

    // Step 2: Parse the JSON response

    // Step 3: Handle empty results

    // Step 4: Map results to Track instances

    // Step 5: Call renderSearchResults(results)

  } catch (error) {
    searchResults.innerHTML = `<p class="empty-state">Search failed. Check your internet connection.</p>`;
    console.error('Search error:', error);
  } finally {
    searchBtn.disabled = false;
  }
}

/**
 * Renders an array of Track instances into the search results panel.
 * @param {Track[]} results
 */
function renderSearchResults(results) {
  // 🐛 BUG 10 — M5: Array / Map
  // The .map() callback below does not return anything.
  // This produces an array of undefined instead of IDs.
  // Fix the callback so it returns t.id.
  const currentIds = new Set(playlist.map(t => { t.id; }));

  searchResults.innerHTML = results.map(track => {
    const artEl = track.artwork

      // 🐛 BUG 11 — M6: Object / Dot Notation
      // track.artwork is already the URL string — it has no .url property.
      // Appending .url produces undefined, so every artwork image breaks.
      // Fix: remove .url and use track.artwork directly.
      ? `<img class="track-art" src="${track.artwork.url}" alt="${track.title}" loading="lazy" />`
      : `<div class="track-art-placeholder">♪</div>`;

    const alreadyAdded = currentIds.has(track.id);

    return `
      <li class="track-card" data-id="${track.id}">
        ${artEl}
        <div class="track-info">
          <div class="track-title">${track.title}</div>
          <div class="track-artist">${track.artist}</div>
        </div>
        <span class="track-duration">${track.getFormattedDuration()}</span>
        <div class="track-actions">
          ${track.previewUrl
      ? `<button class="track-btn track-preview-btn" data-preview="${track.previewUrl}"
                data-title="${track.title}" data-artist="${track.artist}"
                data-art="${track.artwork}" title="Preview">▶</button>`
      : ''}
          <button class="track-add-btn"
            data-trackjson='${JSON.stringify({
      trackId: track.id,
      trackName: track.title,
      artistName: track.artist,
      collectionName: track.album,
      artworkUrl100: track.artwork,
      previewUrl: track.previewUrl,
      trackTimeMillis: track.duration * 1000
    })}'
            title="Add to playlist"
            ${alreadyAdded ? 'disabled' : ''}>
            ${alreadyAdded ? '✓' : '+'}
          </button>
        </div>
      </li>`;
  }).join('');
}

// ── Load Initial Playlist ──────────────────────────────────

/**
 * Fetches a default set of lofi songs from iTunes to pre-populate
 * the playlist on first load.
 */
async function loadInitialPlaylist() {
  try {
    const url = `https://itunes.apple.com/search?term=lofi+hip+hop&entity=song&limit=8&media=music`;
    const response = await fetch(url);
    const data = await response.json();

    // 🐛 BUG 8 — M2: Data Structures & Collections
    // The condition uses || (or) instead of && (and).
    // This means the block runs even when data.results is undefined,
    // causing a crash. Fix the logical operator.
    if (data.results || data.results.length > 0) {

      // 🐛 BUG 2 — M3: Functions (arrow function missing parameter)
      // ** You should notice an error in your browser console **

      // The .map() callback is missing its parameter.
      // 'item' is used inside but never declared.
      // Add the parameter to the arrow function.
      // This should remove the error in your browser console once you save the changes
      playlist = data.results.map(() => new Track(item));
      renderPlaylist(playlist);
    }
  } catch (error) {
    console.error('Could not load initial playlist:', error);
    renderPlaylist(playlist);
  }
}

// ── Preview Player ─────────────────────────────────────────

/**
 * Plays a 30-second iTunes preview clip.
 * @param {string} url - The preview audio URL
 * @param {string} title - Track title
 * @param {string} artist - Artist name
 * @param {string} art - Artwork URL
 */
function playPreview(url, title, artist, art) {
  previewAudio.src = url;
  previewTitle.textContent = title;
  previewArtist.textContent = artist;
  previewArt.src = art || '';
  previewPlayer.style.display = 'block';
  previewAudio.play();
}

function stopPreview() {
  previewAudio.pause();
  previewAudio.src = '';
  previewPlayer.style.display = 'none';
  previewProgressFill.style.width = '0%';
  previewTime.textContent = '0:00';
  playingId = null;
  // Reset all preview buttons back to ▶
  trackList.querySelectorAll('.track-preview-btn').forEach(b => b.textContent = '▶');
}

previewAudio.addEventListener('timeupdate', () => {
  if (previewAudio.duration) {
    const pct = (previewAudio.currentTime / previewAudio.duration) * 100;
    previewProgressFill.style.width = `${pct}%`;
    const s = Math.floor(previewAudio.currentTime);
    previewTime.textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  }
});

previewAudio.addEventListener('ended', stopPreview);
previewClose.addEventListener('click', stopPreview);

// ── Drag & Drop (pre-built) ────────────────────────────────

function setupDragAndDrop() {
  const items = trackList.querySelectorAll('.track-card');
  let draggedIndex = null;

  items.forEach(item => {
    item.addEventListener('dragstart', e => {
      draggedIndex = parseInt(item.dataset.index);
      item.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
    });

    item.addEventListener('dragend', () => {
      item.classList.remove('dragging');
      trackList.querySelectorAll('.track-card').forEach(c => c.classList.remove('drag-over'));
    });

    item.addEventListener('dragover', e => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      trackList.querySelectorAll('.track-card').forEach(c => c.classList.remove('drag-over'));
      item.classList.add('drag-over');
    });

    item.addEventListener('drop', e => {
      e.preventDefault();
      const targetIndex = parseInt(item.dataset.index);
      if (draggedIndex === null || draggedIndex === targetIndex) return;

      const moved = playlist.splice(draggedIndex, 1)[0];
      playlist.splice(targetIndex, 0, moved);
      draggedIndex = null;
      renderPlaylist(playlist);
    });
  });
}

// ── Utility ────────────────────────────────────────────────

function updateTrackCount() {
  const count = playlist.length;
  trackCountEl.textContent = `${count} track${count !== 1 ? 's' : ''}`;
}

function updateAddButtons() {
  const currentIds = new Set(playlist.map(t => String(t.id)));
  searchResults.querySelectorAll('.track-add-btn').forEach(btn => {
    try {
      const data = JSON.parse(btn.dataset.trackjson);
      const id = String(data.trackId);
      if (currentIds.has(id)) {
        btn.disabled = true;
        btn.textContent = '✓';
      } else {
        btn.disabled = false;
        btn.textContent = '+';
      }
    } catch {}
  });
}

function showToast(msg) {
  const t = document.createElement('div');
  t.textContent = msg;
  t.style.cssText = `position:fixed;bottom:90px;left:50%;transform:translateX(-50%);
    background:var(--bg-elevated);color:var(--text-primary);padding:8px 18px;
    border-radius:20px;font-size:13px;z-index:300;border:1px solid var(--border);
    animation:fadeIn 200ms ease;`;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2000);
}

// Expose getPlaylistState so sidebar.js can read current state
function getPlaylistState() {
  return {
    name: playlistNameInput.value.trim() || 'Untitled Playlist',
    tracks: playlist.map(t => ({
      trackId: t.id,
      trackName: t.title,
      artistName: t.artist,
      collectionName: t.album,
      artworkUrl100: t.artwork,
      previewUrl: t.previewUrl,

      // 🐛 BUG 12 — M1: Data Types
      // '1000' is a string, not a number. Multiplying by a string
      // produces unexpected results. Remove the quotes.
      trackTimeMillis: t.duration * '1000',
      isFavorite: t.isFavorite
    }))
  };
}

// Load a saved playlist (called by sidebar.js)
function loadPlaylistState(state) {
  playlistNameInput.value = state.name || 'Untitled Playlist';
  playlist = state.tracks.map(raw => {
    const t = new Track(raw);
    t.isFavorite = raw.isFavorite || false;
    return t;
  });
  filterMode = 'all';
  filterPlaylist('all');
}

function notifySidebar() {
  window.dispatchEvent(new CustomEvent('playlistUpdated'));
}

// 🐛 BUG 14 — M9: Loops
// This loop uses <= instead of <.
// When i equals tracks.length, tracks[i] is undefined and crashes.
// Fix the loop condition.
function logTrackTitles(tracks) {
  for (let i = 0; i <= tracks.length; i++) {
    console.log(tracks[i].title);
  }
}

// ── Event Listeners ────────────────────────────────────────

// Search
searchBtn.addEventListener('click', () => searchSongs(searchInput.value));
searchInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') searchSongs(searchInput.value);
});

// Filter buttons
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => filterPlaylist(btn.dataset.filter));
});

// Playlist track-list: delegated events
trackList.addEventListener('click', e => {
  const favBtn     = e.target.closest('.track-fav-btn');
  const removeBtn  = e.target.closest('.track-remove-btn');
  const previewBtn = e.target.closest('.track-preview-btn');

  if (favBtn)    toggleFavorite(parseInt(favBtn.dataset.index));
  if (removeBtn) removeTrack(parseInt(removeBtn.dataset.index));
  if (previewBtn) {
    const idx = parseInt(previewBtn.dataset.index);
    const track = playlist[idx];
    if (!track?.previewUrl) return;
    // Toggle play/pause if same track
    if (playingId === track.id) {
      stopPreview();
    } else {
      playingId = track.id;
      playPreview(track.previewUrl, track.title, track.artist, track.artwork);
      // Update button icon
      trackList.querySelectorAll('.track-preview-btn').forEach(b => b.textContent = '▶');
      previewBtn.textContent = '⏸';
    }
  }
});

// Search results: delegated events
searchResults.addEventListener('click', e => {
  const addBtn     = e.target.closest('.track-add-btn');
  const previewBtn = e.target.closest('.track-preview-btn');

  if (addBtn && !addBtn.disabled) {
    try {
      const data = JSON.parse(addBtn.dataset.trackjson);
      addTrack(data);
    } catch (err) {
      console.error('Could not parse track data', err);
    }
  }

  if (previewBtn) {
    const url    = previewBtn.dataset.preview;
    const title  = previewBtn.dataset.title;
    const artist = previewBtn.dataset.artist;
    const art    = previewBtn.dataset.art;
    if (url) playPreview(url, title, artist, art);
  }
});

// Playlist name editing UX
playlistNameInput.addEventListener('focus', () => {
  playlistNameWrap.classList.add('editing');
});

function confirmPlaylistName() {
  playlistNameWrap.classList.remove('editing');
  playlistNameInput.blur();
}

playlistNameConfirm.addEventListener('click', confirmPlaylistName);
playlistNameInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') confirmPlaylistName();
  if (e.key === 'Escape') {
    confirmPlaylistName();
  }
});

// Save Playlist button — delegates to sidebar.js via a custom event
savePlaylistBtn.addEventListener('click', () => {
  window.dispatchEvent(new CustomEvent('savePlaylistRequested'));
  showToast('Playlist saved!');
});

// Sidebar toggle
document.getElementById('sidebarToggle').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('collapsed');
});

// ── Expose globals for sidebar.js ──────────────────────────
window.appState = { getPlaylistState, loadPlaylistState };

// ── Init ───────────────────────────────────────────────────
loadInitialPlaylist();
