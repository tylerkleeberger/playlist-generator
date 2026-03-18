// ============================================================
//  sidebar.js — Saved Playlists Sidebar
//  Pre-built feature. Students do NOT modify this file.
//
//  Handles:
//   - Listing saved playlists in the sidebar
//   - Saving the current playlist to localStorage
//   - Loading a saved playlist into the app
//   - Deleting a saved playlist
//   - Exporting all playlists to a .json file
//   - Importing playlists from a .json file
// ============================================================

const STORAGE_KEY = 'playlistGenerator_savedPlaylists';

// ── State ──────────────────────────────────────────────────
let savedPlaylists  = loadFromStorage();  // Array of { id, name, tracks[] }
let activeId        = null;

// ── DOM ────────────────────────────────────────────────────
const playlistListEl   = document.getElementById('playlistList');
const newPlaylistBtn   = document.getElementById('newPlaylistBtn');
const exportBtn        = document.getElementById('exportBtn');
const importInput      = document.getElementById('importInput');

// ── Render Sidebar ─────────────────────────────────────────

function renderSidebar() {
  if (savedPlaylists.length === 0) {
    playlistListEl.innerHTML = `<li style="padding: 12px 8px; color: var(--text-muted); font-size: 12px;">No saved playlists yet.</li>`;
    return;
  }

  playlistListEl.innerHTML = savedPlaylists.map(pl => `
    <li class="playlist-item ${pl.id === activeId ? 'active' : ''}"
        data-id="${pl.id}">
      <span class="playlist-item-name">${pl.name}</span>
      <span class="playlist-item-meta">${pl.tracks.length} tracks</span>
      <button class="playlist-item-delete" data-delete="${pl.id}" title="Delete">✕</button>
    </li>
  `).join('');
}

// ── Save Current Playlist ──────────────────────────────────

function saveCurrentPlaylist() {
  if (!window.appState) return;
  const state = window.appState.getPlaylistState();

  if (state.tracks.length === 0) {
    alert('Add some tracks before saving!');
    return;
  }

  if (activeId) {
    // Update existing
    const idx = savedPlaylists.findIndex(p => p.id === activeId);
    if (idx !== -1) {
      savedPlaylists[idx] = { id: activeId, name: state.name, tracks: state.tracks };
      persistToStorage();
      renderSidebar();
      showSidebarToast('Playlist updated!');
      return;
    }
  }

  // Save as new
  const newPlaylist = {
    id: Date.now().toString(),
    name: state.name,
    tracks: state.tracks
  };
  savedPlaylists.unshift(newPlaylist);
  activeId = newPlaylist.id;
  persistToStorage();
  renderSidebar();
  showSidebarToast('Playlist saved!');
}

// ── Load a Saved Playlist ──────────────────────────────────

function loadSavedPlaylist(id) {
  const pl = savedPlaylists.find(p => p.id === id);
  if (!pl || !window.appState) return;
  activeId = id;
  window.appState.loadPlaylistState(pl);
  renderSidebar();
}

// ── Delete a Saved Playlist ────────────────────────────────

function deleteSavedPlaylist(id) {
  if (!confirm('Delete this playlist?')) return;
  savedPlaylists = savedPlaylists.filter(p => p.id !== id);
  if (activeId === id) activeId = null;
  persistToStorage();
  renderSidebar();
}

// ── New Playlist ───────────────────────────────────────────

function startNewPlaylist() {
  // Save current first if it has tracks
  if (window.appState) {
    const state = window.appState.getPlaylistState();
    if (state.tracks.length > 0) {
      const shouldSave = confirm('Save the current playlist before starting a new one?');
      if (shouldSave) saveCurrentPlaylist();
    }

    activeId = null;
    window.appState.loadPlaylistState({ name: 'New Playlist', tracks: [] });
    renderSidebar();

    // Focus the name input
    setTimeout(() => {
      const nameInput = document.getElementById('playlistNameInput');
      if (nameInput) {
        nameInput.value = 'New Playlist';
        nameInput.focus();
        nameInput.select();
      }
    }, 50);
  }
}

// ── Export ─────────────────────────────────────────────────

function exportPlaylists() {
  // Also save the current state before exporting
  if (window.appState) {
    const state = window.appState.getPlaylistState();
    if (state.tracks.length > 0) {
      if (activeId) {
        const idx = savedPlaylists.findIndex(p => p.id === activeId);
        if (idx !== -1) savedPlaylists[idx] = { id: activeId, ...state };
      } else {
        savedPlaylists.unshift({ id: Date.now().toString(), ...state });
      }
    }
  }

  const blob = new Blob([JSON.stringify(savedPlaylists, null, 2)], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = 'my-playlists.json';
  a.click();
  URL.revokeObjectURL(url);
}

// ── Import ─────────────────────────────────────────────────

function importPlaylists(file) {
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const imported = JSON.parse(e.target.result);
      if (!Array.isArray(imported)) throw new Error('Invalid format');

      const count = imported.length;
      savedPlaylists = [...imported, ...savedPlaylists];

      // De-duplicate by id
      const seen = new Set();
      savedPlaylists = savedPlaylists.filter(p => {
        if (seen.has(p.id)) return false;
        seen.add(p.id);
        return true;
      });

      persistToStorage();
      renderSidebar();
      showSidebarToast(`Imported ${count} playlist${count !== 1 ? 's' : ''}!`);
    } catch {
      alert('Invalid playlist file. Please import a valid my-playlists.json file.');
    }
  };
  reader.readAsText(file);
}

// ── Storage ────────────────────────────────────────────────

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function persistToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedPlaylists));
  } catch {
    console.warn('Could not save to localStorage.');
  }
}

// ── Toast ──────────────────────────────────────────────────

function showSidebarToast(msg) {
  const t = document.createElement('div');
  t.textContent = msg;
  t.style.cssText = `position:fixed;bottom:90px;left:50%;transform:translateX(-50%);
    background:var(--bg-elevated);color:var(--text-primary);padding:8px 18px;
    border-radius:20px;font-size:13px;z-index:300;border:1px solid var(--border);`;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2000);
}

// ── Event Listeners ────────────────────────────────────────

newPlaylistBtn.addEventListener('click', startNewPlaylist);
exportBtn.addEventListener('click', exportPlaylists);
importInput.addEventListener('change', e => {
  if (e.target.files[0]) importPlaylists(e.target.files[0]);
});

playlistListEl.addEventListener('click', e => {
  const deleteBtn = e.target.closest('[data-delete]');
  const item      = e.target.closest('.playlist-item');

  if (deleteBtn) {
    e.stopPropagation();
    deleteSavedPlaylist(deleteBtn.dataset.delete);
    return;
  }

  if (item) loadSavedPlaylist(item.dataset.id);
});

// Auto-save when playlist changes
window.addEventListener('playlistUpdated', () => {
  if (!window.appState) return;
  if (!activeId) return;
  const state = window.appState.getPlaylistState();
  const idx = savedPlaylists.findIndex(p => p.id === activeId);
  if (idx !== -1) {
    savedPlaylists[idx] = { id: activeId, name: state.name, tracks: state.tracks };
    persistToStorage();
    renderSidebar();
  }
});

// Save button — attach to playlist name input blur and a keyboard shortcut
document.getElementById('playlistNameInput').addEventListener('blur', () => {
  if (activeId && window.appState) {
    const state = window.appState.getPlaylistState();
    const idx = savedPlaylists.findIndex(p => p.id === activeId);
    if (idx !== -1) {
      savedPlaylists[idx].name = state.name;
      persistToStorage();
      renderSidebar();
    }
  }
});

document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key === 's') {
    e.preventDefault();
    saveCurrentPlaylist();
  }
});

window.addEventListener('savePlaylistRequested', saveCurrentPlaylist);

// ── Init ───────────────────────────────────────────────────
renderSidebar();
