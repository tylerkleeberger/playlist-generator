// ============================================================
//  app.js — Playlist Generator
//  Main application logic
//
//  This file has two parts:
//
//  PART 1 — 15 bugs are seeded in the working code below.
//           Each one is labeled with a 🐛 comment.
//           Fix them all to get the app running.
//
//  PART 2 — 6 build tasks are stubbed out.
//           Each one is labeled with a BUILD comment.
//           Implement them to complete the app's features.
// ============================================================

import Track from './track.js';

// ── State ──────────────────────────────────────────────────

// 🐛 BUG 1 — M1: Variables & Data Types
// playlist is declared with const, but it needs to be reassigned later.
// (e.g. playlist = data.results.map(...) in loadInitialPlaylist)
// const does not allow reassignment. Fix the declaration keyword.
const playlist   = [];
let filterMode   = 'all';
let playingId    = null;

// ── DOM References ─────────────────────────────────────────
const trackList           = document.getElementById('trackList');
const playlistEmpty       = document.getElementById('playlistEmpty');
const trackCountEl        = document.getElementById('trackCount');
const searchInput         = document.getElementById('searchInput');
const searchBtn           = document.getElementById('searchBtn');
const searchResults       = document.getElementById('searchResults');
const playlistNameInput   = document.getElementById('playlistNameInput');
const playlistNameWrap    = document.getElementById('playlistNameWrap');
const playlistNameConfirm = document.getElementById('playlistNameConfirm');
const savePlaylistBtn     = document.getElementById('savePlaylistBtn');
const filterBtns          = document.querySelectorAll('.filter-btn');

// Preview player elements
const previewPlayer       = document.getElementById('previewPlayer');
const previewAudio        = document.getElementById('previewAudio');
const previewArt          = document.getElementById('previewArt');
const previewTitle        = document.getElementById('previewTitle');
const previewArtist       = document.getElementById('previewArtist');
const previewTime         = document.getElementById('previewTime');
const previewProgressFill = document.getElementById('previewProgressFill');
const previewClose        = document.getElementById('previewClose');

// ── Render Playlist ────────────────────────────────────────

function renderPlaylist(tracks) {
  // 🐛 BUG 11 — M5: Array Functionality
  // The .filter() condition is inverted — it returns tracks where
  // isFavorite is FALSE when filtering for favorites.
  // Fix the condition to return tracks where isFavorite IS true.
  const filtered = filterMode === 'favorites'
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
      // 🐛 BUG 9 — M4: String Methods / Template Literals
      // The img tag string uses single quotes instead of backticks.
      // This means ${track.artwork} and ${track.title} render as
      // literal text, not variable values. Fix the quote style.
      const artEl = track.artwork
        ? '<img class="track-art" src="${track.artwork}" alt="${track.title}" loading="lazy" />'
        : `<div class="track-art-placeholder">♪</div>`;

      const favClass = track.isFavorite ? ' favorite' : '';

      // 🐛 BUG 5 — M8: Operators, Expressions & Conditionals
      // The condition below uses = (assignment) instead of === (comparison).
      // This assigns true to track.isFavorite rather than checking its value,
      // so favTitle is always 'Remove from favorites' regardless of actual state.
      // Fix the operator so it compares instead of assigns.
      const favTitle = (track.isFavorite = true) ? 'Remove from favorites' : 'Add to favorites';
      const realIndex = playlist.indexOf(track);

      // 🐛 BUG 12 — M6: Object Functionality / Dot Notation
      // track.trackName does not exist on a Track instance.
      // The Track class stores the song title under a different property name.
      // Fix the property name to match what the Track constructor sets.
      return `
        <li class="track-card${favClass}"
            draggable="true"
            data-index="${realIndex}"
            data-id="${track.id}">
          ${artEl}
          <div class="track-info">
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

    updateTrackCount();
    setupDragAndDrop();
  }

  updateTrackCount();
  notifySidebar();
}

// ── BUILD 2: renderPlaylist() ───────────────────────────────
// ⚠️  The renderPlaylist() function above has Bug 9, Bug 11,
//    and Bug 12 in it. Fix those bugs first.
//    Then, as part of Build 2, expand the card HTML to include
//    all track fields properly. See the Notion page for details.


// ── Add & Remove Tracks ────────────────────────────────────

// ── BUILD 3A: addTrack(trackData) ──────────────────────────
//
// This function should:
//   1. Check if the track is already in the playlist
//      (compare trackData.trackId against each track.id using .some())
//   2. If already there: call showToast('Already in playlist!') and return
//   3. Otherwise: create new Track(trackData), push to playlist, re-render
//
// See the Notion assignment page for full instructions and code snippets.

function addTrack(trackData) {
  // Your code here
}

// ── BUILD 3B: removeTrack(index) ───────────────────────────
//
// This function should:
//   1. Validate the index (guard against negative or out-of-bounds)
//   2. Use .splice(index, 1) to remove the track from playlist
//   3. Call renderPlaylist(playlist) to update the display
//
// See the Notion assignment page for full instructions and code snippets.

function removeTrack(index) {
  // Your code here
}

// ── Favorite Toggle ────────────────────────────────────────

// ── BUILD 4A: toggleFavorite(index) ────────────────────────
//
// This function should:
//   1. Validate the index
//   2. Call playlist[index].toggleFavorite() — the method you wrote in Build 1
//   3. Call renderPlaylist(playlist) to update the display

function toggleFavorite(index) {
  // Your code here
}

// ── Filter ─────────────────────────────────────────────────

// ── BUILD 4B: filterPlaylist(mode) ─────────────────────────
//
// This function should:
//   1. Set the filterMode variable to the mode parameter
//   2. Use if/else: if mode === 'favorites', filter with .filter(t => t.isFavorite)
//   3. Update the active CSS class on the filter buttons
//   4. Call renderPlaylist() with the filtered result

function filterPlaylist(mode) {
  // Your code here
}

// ── Search & Fetch ─────────────────────────────────────────

// ── BUILD 6: searchSongs(query) ────────────────────────────
//
// Async function that fetches from the iTunes Search API.
// Read the Notion assignment page for full instructions.
// The try/catch and loading state are stubbed — fill in the middle.

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

    // Step 5: Render search results

  } catch (error) {
    searchResults.innerHTML = `<p class="empty-state">Search failed. Check your internet connection.</p>`;
    console.error('Search error:', error);
  } finally {
    searchBtn.disabled = false;
  }
}

// ── Render Search Results ──────────────────────────────────
// ✅ This function is complete — do not modify it.

function renderSearchResults(results) {
  const currentIds = new Set(playlist.map(t => String(t.id)));

  searchResults.innerHTML = results.map(track => {
    // 🐛 BUG 14 — M7: Optional Chaining
    // track.artwork can be an empty string or undefined for some results.
    // Accessing a property on undefined crashes the app.
    // The line below needs optional chaining (?.) to be safe.
    // Fix: track.artwork?.toString() — or simply ensure the check below
    // uses track.artwork with optional chaining where needed.
    // ACTUAL BUG: artworkUrl100 from iTunes is a plain string, not an object.
    // The issue is that for some tracks, artwork is undefined/null, and the
    // truthy check is correct — but the src attribute below tries
    // track.artwork without guarding. Use optional chaining on the src:
    const artEl = track.artwork
      ? `<img class="track-art" src="${track.artwork}" alt="${track.title}" loading="lazy" />`
      : `<div class="track-art-placeholder">♪</div>`;

    // 🐛 BUG 13 — M6: Dot vs Bracket Notation
    // "prop" is a variable holding the string 'id'.
    // track.prop looks for a literal property named "prop" — it doesn't exist.
    // Use bracket notation: track[prop] — to access the property dynamically.
    const prop = 'id';
    const alreadyAdded = currentIds.has(String(track.prop));

    // 🐛 BUG 2 — M1: Variables (var / scope)
    // "var" is used below. var is function-scoped, not block-scoped.
    // This can cause unexpected behavior in loops and callbacks.
    // Replace var with the correct block-scoped declaration keyword.
    var displayTitle = track.title || 'Unknown Title';

    return `
      <li class="track-card" data-id="${track.id}">
        ${artEl}
        <div class="track-info">
          <div class="track-title">${displayTitle}</div>
          <div class="track-artist">${track.artist}</div>
        </div>
        <span class="track-duration">${track.getFormattedDuration()}</span>
        <div class="track-actions">
          ${track.previewUrl
      ? `<button class="track-btn track-preview-btn"
                data-preview="${track.previewUrl}"
                data-title="${track.title}"
                data-artist="${track.artist}"
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
// ✅ This function loads the default lofi playlist on startup.
//    Bugs 3, 4, 6, 7, 8, and 10 live here.
//    Fixing them will make the initial playlist appear.

async function loadInitialPlaylist() {
  try {
    // 🐛 BUG 6 — M3: Functions (missing return value)
    // buildUrl() computes the correct URL but never returns it.
    // The caller gets undefined. Add a return statement.
    function buildUrl(term) {
      const base = 'https://itunes.apple.com/search';
      `${base}?term=${term}&entity=song&limit=8&media=music`;
    }
    const url = buildUrl('lofi+hip+hop');

    const response = await fetch(url);
    const data = await response.json();

    if (data.results && data.results.length > 0) {

      // 🐛 BUG 8 — M3: Functions (arrow function missing parameter)
      // The .map() callback is missing its parameter.
      // "item" is referenced inside but never declared.
      // Add the parameter to the arrow function: (item) => ...
      playlist = data.results.map(() => new Track(item));

      // 🐛 BUG 10 — M5: Array / Map
      // The .map() callback below does not return anything.
      // This produces an array of undefined values.
      // Fix it so it returns the result of formatDuration().
      const durations = playlist.map(track => {
        // 🐛 BUG 7 — M3: Functions (wrong argument order)
        // formatDuration(seconds, label) expects seconds first.
        // The call below passes the arguments in the wrong order.
        // Fix the order to match the function signature.
        formatDuration(track.title, track.duration);
      });
      console.log('Durations:', durations);

      // 🐛 BUG 3 — M1: Data Types
      // defaultDuration is stored as a string '180', not a number.
      // When you do math on a string, you get unexpected results.
      // Remove the quotes to make it a number.
      const defaultDuration = '180';
      console.log('Default in minutes:', defaultDuration / 60);

      // 🐛 BUG 4 — M2: Data Types (loose vs strict equality)
      // The null check below uses == instead of ===.
      // == (loose equality) also matches undefined, 0, false, ''.
      // Use === (strict equality) to check for exactly null.
      if (data.results[0].artworkUrl100 == null) {
        console.log('First result has no artwork');
      }

      renderPlaylist(playlist);
    }
  } catch (error) {
    console.error('Could not load initial playlist:', error);
    renderPlaylist(playlist);
  }
}

// ── Utility: formatDuration ────────────────────────────────

function formatDuration(seconds, label) {
  const mins   = Math.floor(seconds / 60);
  const secs   = seconds % 60;
  const padded = secs < 10 ? `0${secs}` : `${secs}`;
  return `${mins}:${padded}`;
}

// ── Loops Bug ──────────────────────────────────────────────

// 🐛 BUG 15 — M9: Loops
// This loop uses <= instead of <.
// When i equals tracks.length, tracks[i] is undefined and crashes.
// Fix the loop condition.
function logTrackTitles(tracks) {
  for (let i = 0; i <= tracks.length; i++) {
    console.log(tracks[i].title);
  }
}

// ── Preview Player ─────────────────────────────────────────
// ✅ Pre-built — do not modify.

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

// ── Drag & Drop ────────────────────────────────────────────
// ✅ Pre-built — do not modify.

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
// ✅ Pre-built — do not modify.

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
      trackTimeMillis: t.duration * 1000,
      isFavorite: t.isFavorite
    }))
  };
}

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

// ── Event Listeners ────────────────────────────────────────
// ✅ Pre-built — do not modify.

searchBtn.addEventListener('click', () => searchSongs(searchInput.value));
searchInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') searchSongs(searchInput.value);
});

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => filterPlaylist(btn.dataset.filter));
});

trackList.addEventListener('click', e => {
  const favBtn     = e.target.closest('.track-fav-btn');
  const removeBtn  = e.target.closest('.track-remove-btn');
  const previewBtn = e.target.closest('.track-preview-btn');

  if (favBtn)    toggleFavorite(parseInt(favBtn.dataset.index));
  if (removeBtn) removeTrack(parseInt(removeBtn.dataset.index));
  if (previewBtn) {
    const idx   = parseInt(previewBtn.dataset.index);
    const track = playlist[idx];
    if (!track?.previewUrl) return;
    if (playingId === track.id) {
      stopPreview();
    } else {
      playingId = track.id;
      playPreview(track.previewUrl, track.title, track.artist, track.artwork);
      trackList.querySelectorAll('.track-preview-btn').forEach(b => b.textContent = '▶');
      previewBtn.textContent = '⏸';
    }
  }
});

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

document.getElementById('sidebarToggle').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('collapsed');
});

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
  if (e.key === 'Escape') confirmPlaylistName();
});

savePlaylistBtn.addEventListener('click', () => {
  window.dispatchEvent(new CustomEvent('savePlaylistRequested'));
  showToast('Playlist saved!');
});

// ── Expose globals for sidebar.js ──────────────────────────
window.appState = { getPlaylistState, loadPlaylistState };

// ── Init ───────────────────────────────────────────────────
loadInitialPlaylist();
