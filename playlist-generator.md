# Playlist Generator - JavaScript Capstone Lab
You've been handed a partially-built music app called **Playlist Generator**. The HTML and CSS are complete and production-ready. Your job is to do two things:

1. Fix the broken JavaScript
2. Implement the missing features

When everything is working, you'll have a real music app that connects to Apple's music catalog, lets you search for any song, build a custom playlist, mark favorites, and save your work.

---

## Project Setup

### 1. Clone the Starter Repo

Open your terminal and run:

```bash
git clone https://github.com/tylerkleeberger/playlist-generator.git
cd playlist-generator
```

### 2. Open in VS Code

### 3. Run with Live Server

- Install the **Live Server** extension in VS Code if you don't have it
- Right-click `index.html` → **Open with Live Server**
- The app opens at `http://127.0.0.1:5500`

> ⚠️ You **must** use Live Server — not just open the file directly. The app uses JavaScript modules which require a local server to work.
>

### File Structure

Here's what you're working with:

| File | Status | Your Role |
| --- | --- | --- |
| `index.html` | ✅ Complete | Do not modify |
| `styles.css` | ✅ Complete | Do not modify |
| `sidebar.js` | ✅ Complete | Do not modify |
| `track.js` | ✅ Pre-built | Read and understand (Build 1) |
| `app.js` | 🐛 Broken + Incomplete | Parts 1 and 2 live here |

> 💡 **Between class periods:** Use the **Export** button in the sidebar to download your playlists as a `.json` backup file. Import it the next day to restore your playlists if they were removed.
>

---

# Part 1 — Debugging

`app.js` has **14 labeled bugs**. Each one is marked with a comment directly in the code:

```
// 🐛 BUG X — [Module Name]
```

Find each bug, fix it, and move on. The bugs are your primary assessment of everything from Modules 1–9.

You can use "Command F" to open a search within the file and search each bug at a time instead of scrolling through the code to find them.

> 🎯 **Checkpoint after Bug 1, 2, and 3:** 
> 
> When you fix these three together, track cards will appear in the playlist — that's your signal the core pipeline is working. Bug 1 unblocks the `playlist =` reassignment, Bug 2 fixes the broken `.map()` callback in `loadInitialPlaylist`, and Bug 3 makes `renderPlaylist` produce visible cards instead of a blank list. None of the three work without the others.
>
> The cards won't look right yet — titles will show `undefined` and artwork will be broken. That's expected. Those are fixed by the remaining bugs. Keep going.
>
> The ▶ preview buttons will work at this point. If you see an `AbortError` in the console when clicking ▶, ignore it — it's a browser audio race condition, not a bug you need to fix. Bug 13 later fixes the play/pause toggle behavior for the same track.
>

### Bug Reference Table

| # | What's Wrong | Module |
| --- | --- | --- |
| Bug 1 | `playlist` declared with `const` but needs to be reassigned — fix the declaration keyword | M1 — Variables |
| Bug 2 | Arrow function missing its parameter — `item` is used inside the callback but never declared | M3 — Functions |
| Bug 3 | `.map()` callback uses a `{}` block body but is missing `return` — the list renders completely blank | M5 — Array / Map |
| Bug 4 | `var` used instead of a block-scoped keyword | M1 — Variables |
| Bug 5 | `=` (assignment) used instead of `===` (comparison) in a conditional — always evaluates as truthy | M8 — Operators & Conditionals |
| Bug 6 | Object property accessed with wrong key name (`track.trackName`) — doesn't exist on a Track instance | M6 — Object / Dot Notation |
| Bug 7 | Template literal uses single quotes instead of backticks — `${track.artwork}` renders as literal text | M4 — String Methods |
| Bug 8 | `\|\|` (or) used instead of `&&` (and) — the `if` block runs even when `data.results` is `undefined`, causing a crash | M2 — Data Structures |
| Bug 9 | `.filter()` condition is inverted — returns every track where `isFavorite` is `false` instead of `true` | M5 — Array Functionality |
| Bug 10 | `.map()` callback has no `return` — produces an array of `undefined` instead of IDs | M5 — Array / Map |
| Bug 11 | Wrong property access — `track.artwork` is already the URL string, but `.url` is appended, breaking every image | M6 — Object / Dot Notation |
| Bug 12 | A value multiplied by string `'1000'` instead of number `1000` — math produces wrong results | M1 — Data Types |
| Bug 13 | `playingId` initialized to `0` instead of `null` — breaks the check for whether anything is playing | M2 — Data Types |
| Bug 14 | `for` loop uses `<=` instead of `<` — runs one too many iterations and crashes | M9 — Loops |

---

# Part 2 — Build Features

The app is functional after your bug fixes, but it's missing its core features. Each build task has a labeled stub in `app.js` or `track.js` — you fill in the logic.

All HTML is pre-written. When you implement something correctly, you'll see it come to life in the browser immediately.

> ⚠️ **Order matters.** Complete the builds in order. Build 1 (understanding the Track class) should be read first before fixing bugs. Then complete Builds 2, 3, and 4 in sequence.
>

> 🤖 **Using AI:** Each task has a collapsed "How to Ask AI" section. You're encouraged to use AI — but you must be able to read, explain, and adapt whatever code it gives you.
>

---

## Build 1 — The Track Class

**File:** `track.js` | **New concept:** Classes (M10)

### What is a Class?

Every song in this app needs to store the same set of information — a title, artist, duration, whether it's a favorite, etc. — and it needs to be able to *do things*, like format its duration or toggle its favorite state.

You could use a plain object for this, but then you'd have to write the formatting logic separately every time. A **class** solves this by bundling the data *and* the behavior together in one reusable blueprint.

```js
// Define the blueprint once
class Car {
  constructor(make, model) {
    this.make  = make;    // stored on this specific instance
    this.model = model;
  }

  describe() {
    return `${this.make} ${this.model}`;   // method: uses this instance's data
  }
}

// Stamp out as many instances as you need
const car1 = new Car('Toyota', 'Camry');
const car2 = new Car('Honda', 'Civic');

console.log(car1.describe()); // "Toyota Camry"
console.log(car2.describe()); // "Honda Civic"
```

Key vocabulary:

- **`constructor(data)`** — runs automatically every time you write `new Track(...)`. This is where you read the incoming data and store it on the instance.
- **`this`** — refers to the specific instance being created or used. `this.title` on `car1` is completely separate from `this.title` on `car2`.
- **Instance variables** — properties attached to `this` inside the constructor (e.g. `this.duration`). Every method in the class can read and change them.
- **Methods** — functions defined inside the class body (no `function` keyword needed). They automatically have access to `this` and all instance variables.

The key insight: when you call `new Track(data)`, JavaScript runs the constructor, creates a fresh object, and returns it. That object has all the properties you set with `this.` *and* all the methods defined on the class.

---

## Your Task

Open `track.js` and read through the class before moving on to the other build steps. 
### Step 1 — Read the constructor

The constructor receives a `data` object from the iTunes API that looks like this:

```js
{
  trackId:         123456,
  trackName:       "Lofi Hip Hop",
  artistName:      "ChilledCow",
  collectionName:  "Lofi Beats",
  artworkUrl100:   "https://is1-ssl.mzstatic.com/...",
  previewUrl:      "https://audio-ssl.itunes.apple.com/...",
  trackTimeMillis: 214000    // ← milliseconds, not seconds!
}
```

The constructor is already written. Read it line by line:

```js
constructor(data) {
  this.id         = data.trackId || Math.random();
  this.title      = data.trackName;
  this.artist     = data.artistName;
  this.album      = data.collectionName;
  this.artwork    = data.artworkUrl100;
  this.previewUrl = data.previewUrl;
  this.duration   = Math.floor(data.trackTimeMillis / 1000); // convert ms → seconds
  this.isFavorite = false; // always starts unfavorited
}
```

Notice the naming: the API gives you `trackName` but it's stored as `this.title`. The rest of the app uses the clean names (`title`, `artist`, `artwork`) rather than the verbose iTunes field names. **Ask yourself:** why does `this.duration` divide by 1000?

### Step 2 — Read `toggleFavorite()`

This method flips `this.isFavorite` between `true` and `false`. The `!` (not) operator reverses a boolean — so `!true` is `false` and `!false` is `true`:

```js
toggleFavorite() {
  this.isFavorite = !this.isFavorite;
}
```

This is called by `app.js` whenever the user clicks the heart button. Because `this.isFavorite` lives on the instance, each track independently tracks its own favorite state. **Ask yourself:** what would happen if you wrote `this.isFavorite = true` here instead?

### Step 3 — Read `getFormattedDuration()`

`this.duration` is stored in seconds (e.g. `214`). This method returns a formatted string like `"3:34"`.

The `%` operator gives the **remainder** after division. `214 % 60 = 34` because 60 goes into 214 three full times (180) with 34 left over.

```js
getFormattedDuration() {
  const minutes       = Math.floor(this.duration / 60);  // 214 / 60 → 3
  const seconds       = this.duration % 60;               // 214 % 60 → 34
  const paddedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`; // "04" not "4"
  return `${minutes}:${paddedSeconds}`;                   // "3:34"
}
```

The ternary on `paddedSeconds` handles the edge case where seconds is a single digit — without it, `3:4` would display instead of `3:04`. **Ask yourself:** what would `getFormattedDuration()` return if `this.duration` was `60`? What about `0`?

### Step 4 — Verify it works in the console

Open the browser console (F12) and try:

```js
const testTrack = new Track({
  trackId: 1, trackName: 'Test Song',
  artistName: 'Test Artist', trackTimeMillis: 214000
});
console.log(testTrack.title);                  // "Test Song"
console.log(testTrack.getFormattedDuration()); // "3:34"
console.log(testTrack.isFavorite);             // false
testTrack.toggleFavorite();
console.log(testTrack.isFavorite);             // true
```

---

## Build 2 — Add & Remove Tracks

**File:** `app.js` | **Concept:** Functions + Arrays (M3 & M5)

Find the `addTrack(trackData)` and `removeTrack(index)` stubs in `app.js`. These two functions are the heart of the app — everything the user does to modify the playlist flows through them.

> **Note:** `removeTrack` is testable immediately using the initial playlist. `addTrack` is wired up correctly once you implement it, but you won't be able to fully test it until Build 4 when search is implemented and results can be added.

### Key Array Methods You'll Use

**`.some(callback)`** — scans the array and returns `true` the moment any item passes the test. Stops early once it finds a match — you don't need a loop.

```js
const numbers  = [1, 2, 3, 4];
const hasThree = numbers.some(n => n === 3);  // true
const hasTen   = numbers.some(n => n === 10); // false
```

**`.push(item)`** — appends an item to the end of an array. Mutates the original array (changes it in place).

```js
const fruits = ['apple', 'banana'];
fruits.push('mango');
console.log(fruits); // ['apple', 'banana', 'mango']
```

**`.splice(startIndex, deleteCount)`** — removes items from an array in place. `splice(1, 1)` means "starting at index 1, remove 1 item."

```js
const colors = ['red', 'green', 'blue'];
colors.splice(1, 1);
console.log(colors); // ['red', 'blue']
```

> **Mutation vs. returning a new array:** `.push()` and `.splice()` *change the original array directly*. This is different from `.map()` and `.filter()`, which always return a brand-new array and leave the original alone. Knowing which methods mutate and which don't is important — a common bug is accidentally using `.filter()` and expecting the original to change.

### Step 1 — Implement `addTrack(trackData)`

```js
function addTrack(trackData) {
  // 1. Check for duplicates using .some()
  const alreadyExists = playlist.some(t => t.id === trackData.trackId);
  if (alreadyExists) {
    showToast('Already in playlist!');
    return;
  }

  // 2. Create a new Track instance and add it to the array
  const track = new Track(trackData);
  playlist.push(track);

  // 3. Re-render so the new track appears on screen
  renderPlaylist(playlist);
  updateAddButtons(); // grays out the + button in search results
}
```

Why `updateAddButtons()`? The search results panel is still showing — after adding a track, the `+` button for that song should become a grayed-out `✓`. `updateAddButtons()` scans the search results and updates them to match the current playlist.

### Step 2 — Implement `removeTrack(index)`

```js
function removeTrack(index) {
  // 1. Guard: bail out if the index is out of range
  if (index < 0 || index >= playlist.length) return;

  // 2. Remove the track at this position
  playlist.splice(index, 1);

  // 3. Re-render and sync the search panel
  renderPlaylist(playlist);
  updateAddButtons();
}
```

The guard clause on line 1 is a defensive programming habit — the click handler in `app.js` uses `parseInt()` on `data-index`, which can produce `NaN` if something goes wrong. The guard ensures no crash.

### Step 3 — Test it

- Click **✕** on a track in the initial playlist — it should disappear immediately
- Reload the page to restore the initial playlist, then remove a few more tracks
- The duplicate guard and `+` button behavior can't be tested until Build 4 (Search & Fetch) — that's expected

### 🔍 Alternative Approach: Immutability

**The code above uses mutation** — `.push()` and `.splice()` modify the `playlist` array directly. This is fine for this project, but in professional React/Vue/Angular codebases, you'll often see an **immutable** approach instead.

#### Why Immutability Matters in Modern Frameworks

Frameworks like React rely on **reference equality** to detect changes. If you mutate an array in place, the reference stays the same — React doesn't know anything changed and won't re-render. Immutable updates create a *new* array with a new reference, triggering the framework's change detection automatically.

#### What the Immutable Version Looks Like

**Adding a track (immutable):**

```js
function addTrack(trackData) {
  const alreadyExists = playlist.some(t => t.id === trackData.trackId);
  if (alreadyExists) {
    showToast('Already in playlist!');
    return;
  }

  const track = new Track(trackData);
  playlist = [...playlist, track]; // creates a new array instead of mutating

  renderPlaylist(playlist);
  updateAddButtons();
}
```

The spread syntax `[...playlist, track]` creates a brand-new array containing all the old items plus the new one. The original array is untouched.

**Removing a track (immutable):**

```js
function removeTrack(index) {
  if (index < 0 || index >= playlist.length) return;

  playlist = playlist.filter((_, i) => i !== index); // new array without the item at index

  renderPlaylist(playlist);
  updateAddButtons();
}
```

`.filter()` returns a new array containing only the items where the callback returns `true`. By filtering out the item at `index`, you get a new array without it.

#### When to Use Each Approach

| Approach | When to Use |
| --- | --- |
| **Mutation** (`.push()`, `.splice()`) | Vanilla JavaScript projects, simple scripts, performance-critical code where you control re-rendering manually |
| **Immutability** (spread `...`, `.filter()`) | React, Vue, Angular, Redux, or any framework that relies on reference equality for change detection |

#### Why This Project Uses Mutation

1. **No framework** — you're calling `renderPlaylist()` manually, so there's no automatic change detection to worry about
2. **Simpler for beginners** — mutation is more direct and easier to trace when learning
3. **Teaches the distinction** — understanding *both* patterns prepares you for real-world code

When you move to React or similar frameworks, you'll switch to immutable patterns. But the logic — checking duplicates, adding items, removing items — stays exactly the same. Only the syntax changes.

- 💬 How to Ask AI for Help

  *"Write the body of a JavaScript function called `addTrack(trackData)` for a playlist app. It should: (1) use `.some()` to check if any item in the `playlist` array already has an `.id` matching `trackData.trackId`; (2) if a duplicate is found, call `showToast('Already in playlist!')` and return early; (3) otherwise, create `new Track(trackData)`, push it to `playlist`, call `renderPlaylist(playlist)`, and call `updateAddButtons()`. Write only the function body."*


---

## Build 3 — Favorites & Filter

**File:** `app.js` | **Concept:** Conditionals + Array Methods (M5 & M8)

Find `toggleFavorite(index)` and `filterPlaylist(mode)` in `app.js`.

These two functions work together. `toggleFavorite` changes data on a Track instance. `filterPlaylist` controls which tracks are *displayed* based on that data. Neither one re-implements the other's logic — they each do one job.

### Step 1 — Implement `toggleFavorite(index)`

This is a thin wrapper around the `toggleFavorite()` method on the `Track` class. The app-level function's only job is to look up the right track by index and call the method on it:

```js
function toggleFavorite(index) {
  if (index < 0 || index >= playlist.length) return;

  playlist[index].toggleFavorite(); // calls the method on your Track instance

  renderPlaylist(playlist);
}
```

This is a great example of why classes are useful. The *logic* of flipping a boolean lives in `Track.toggleFavorite()` — defined once, usable from anywhere. `app.js` doesn't need to know how it works; it just calls it.

### Step 2 — Implement `filterPlaylist(mode)`

`filterPlaylist` decides which tracks to show based on whether the user clicked "All" or "Favorites". It stores the current mode in `filterMode`, updates the button styles, then passes the right set of tracks to `renderPlaylist`:

```js
function filterPlaylist(mode) {
  // 1. Store mode — renderPlaylist reads this to know which filter is active
  filterMode = mode;

  // 2. Update button highlight
  filterBtns.forEach(btn => {
    if (btn.dataset.filter === mode) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // 3. Pass the right tracks to renderPlaylist
  if (mode === 'favorites') {
    const filtered = playlist.filter(t => t.isFavorite);
    renderPlaylist(filtered);
  } else {
    renderPlaylist(playlist);
  }
}
```

**Why store `filterMode`?** When the user adds or removes a track, `renderPlaylist(playlist)` is called again. Without `filterMode`, the filter would reset to "All" on every update. Storing it in state means re-renders always respect the current filter.

**Why explicit `if/else`?** A ternary would also work technically, but `if/else` makes the two code paths visually distinct — important when one path calls `.filter()` and the other doesn't.

### Step 3 — Test it

- Click the ♥ button on some songs
- Click **Favorites** — only hearted songs should show
- Click **All** — all songs return
- Remove a favorite while in Favorites mode — the list should update immediately and the removed song should disappear

- 💬 How to Ask AI for Help

  *"Write the body of a JavaScript function called `filterPlaylist(mode)` that receives either `'all'` or `'favorites'`. It should: (1) set a module-level variable called `filterMode` to `mode`; (2) loop over all elements matching `.filter-btn` and add the CSS class `active` to the one whose `dataset.filter` equals `mode`, removing it from all others; (3) use an explicit `if/else` — if mode is `'favorites'`, call `playlist.filter(t => t.isFavorite)` and pass the result to `renderPlaylist()`; otherwise pass the full `playlist` array. Use if/else, not a ternary."*


---

## 📖 Understanding Modules (ES Modules)

**This is not a build task** — the module wiring is already complete. This section explains how `import` and `export` work in this project so you understand what's happening when `app.js` imports `Track` from `track.js`.

### Why Modules Exist

Imagine writing an entire app in one file — thousands of lines of functions, variables, and logic all mixed together. It becomes unreadable fast. **Modules** let you split code across multiple files and explicitly control what each file shares.

This matters more than it sounds: without modules, every variable in every script is globally accessible, which means name collisions, accidental overwriting, and no way to reason about what depends on what.

JavaScript's native module system uses two keywords:

**`export`** — makes something available to other files. Nothing is shared by default.

```js
// math.js
export default function add(a, b) {
  return a + b;
}
```

**`import`** — brings exported code into the current file's scope.

```js
// app.js
import add from './math.js';

console.log(add(2, 3)); // 5
```

Key rules:
- The path must start with `./` — without it, JavaScript thinks you're importing an installed npm package, not a local file
- The `.js` extension is required when using native ES modules (as opposed to bundlers like Webpack or Vite that handle this automatically)
- `export default` means "this file has one main thing to export." When importing, you can name it anything — `import Track from './track.js'` and `import MyTrack from './track.js'` both work, but using the same name is conventional

**`export default` vs named exports:**

```js
// Default export — one per file
export default class Track { ... }
import Track from './track.js';

// Named export — multiple allowed per file
export function formatDuration(ms) { ... }
export const MAX_TRACKS = 50;
import { formatDuration, MAX_TRACKS } from './utils.js';
```

For this project, `Track` is the only thing `track.js` exports, so `export default` is the right choice.

### How It Works in This Project

Open `track.js` — the first line of the class declaration is:

```js
export default class Track {
```

Open `app.js` — the first import at the top is:

```js
import Track from './track.js';
```

That's it. The `Track` class is exported from `track.js` and imported into `app.js`. Every time you write `new Track(data)` in `app.js`, you're using the class defined in the other file.

> ⚠️ **Live Server is required for ES modules.** Opening `index.html` directly with `file://` in the browser will block module imports with a CORS error. Always use the Live Server extension in VS Code.


---

## Build 4 — Search & Fetch

**File:** `app.js` | **New concept:** Async/Await + Fetch + APIs

### What is an API?

An **API** (Application Programming Interface) is a contract between your code and an external service. The service says: "send me a request in this format, and I'll send back data in that format." You don't need to know how the service works internally — you just follow the contract.

You'll use Apple's **iTunes Search API** — a free, public endpoint that returns real song metadata. No account or API key required. You send it a URL with a search term, it sends back JSON.

### What is `fetch()`?

`fetch()` is a built-in JavaScript function for making HTTP requests. You give it a URL; it returns a **Promise** that resolves to a `Response` object. From there, you call `.json()` to parse the response body:

```js
const response = await fetch('https://some-api.com/data');
const data     = await response.json();
console.log(data); // the parsed JSON object
```

Two awaits, always in sequence: first get the response headers (the connection arrives), then parse the body (the data streams in).

### What is `async`/`await`?

Network requests take time — the browser sends a request, a server somewhere processes it, and data travels back. If JavaScript just *waited* for that, the entire page would freeze.

Instead, JavaScript is **non-blocking** by default. The `async`/`await` syntax lets you write code that *looks* sequential but doesn't actually freeze anything:

```js
async function searchSongs(query) {
  const response = await fetch('https://api.example.com/songs?q=' + query);
  const data     = await response.json();
  // everything below runs only after both awaits complete
  renderResults(data.results);
}
```

- `async` before the function declaration tells JavaScript: "this function may do slow work — it will return a Promise."
- `await` before a slow call tells JavaScript: "pause *this function* here and go do other things until the result is ready." The rest of the page keeps running.
- `await` only works inside an `async` function.

### What is `try/catch`?

Network calls can fail — bad internet, the API is down, the response is malformed. `try/catch` handles this gracefully:

```js
try {
  const response = await fetch(url);
  const data = await response.json();
  // ... happy path
} catch (error) {
  // runs if anything in the try block throws
  console.error('Something went wrong:', error);
  showErrorMessage();
}
```

Without `try/catch`, an unhandled error would crash the function silently. With it, you can show the user a friendly message instead.

### The iTunes API

Endpoint:

```
https://itunes.apple.com/search?term=QUERY&entity=song&limit=12&media=music
```

Replace `QUERY` with `encodeURIComponent(query)` — this converts spaces and special characters so they work safely in a URL. `"lofi hip hop"` becomes `"lofi%20hip%20hop"`.

The response shape:

```js
{
  resultCount: 12,
  results: [
    {
      trackId:         123456,
      trackName:       "Song Title",
      artistName:      "Artist Name",
      collectionName:  "Album",
      artworkUrl100:   "https://...",
      previewUrl:      "https://...",
      trackTimeMillis: 214000
    }
    // ... 11 more objects
  ]
}
```

Each object in `results` is exactly the shape your `Track` constructor expects.

---

### Your Task

Find `searchSongs(query)` in `app.js`. The function signature, `async`, `try/catch`, and the loading spinner are already written. Fill in the 5 steps inside the `try` block:

### Step 1 — Build the URL and fetch

```js
const url      = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=12&media=music`;
const response = await fetch(url);
```

### Step 2 — Parse the JSON

```js
const data = await response.json();
```

### Step 3 — Handle empty results

```js
if (!data.results || data.results.length === 0) {
  searchResults.innerHTML = `<p class="empty-state">No results found for "${query}".</p>`;
  return;
}
```

The `||` check covers two failure cases: `data.results` doesn't exist at all, or it's an empty array.

### Step 4 — Map results to Track instances

```js
const results = data.results.map(item => new Track(item));
```

Each raw object from the API becomes a `Track` instance with all the methods defined in the `Track` class. This is where Classes pay off — one line turns 12 raw objects into 12 fully-featured Track instances.

### Step 5 — Render the results

```js
renderSearchResults(results);
```

`renderSearchResults` is already written — once you pass it an array of Track instances, the search panel populates automatically.

### Step 6 — Test it

Type an artist name into the search bar and press Enter or click **Search**. Real song results with artwork, title, and duration should appear in the left panel. Click **+** to add one to your playlist.

- 💬 How to Ask AI for Help

  *"Write the body of a JavaScript async function called `searchSongs(query)`. Inside a try block, it should: (1) build a URL: `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=12&media=music`; (2) call `await fetch(url)` and store as `response`; (3) call `await response.json()` and store as `data`; (4) if `!data.results` or `data.results.length === 0`, set `searchResults.innerHTML` to `<p class="empty-state">No results found for "${query}".</p>` and return; (5) use `.map()` to convert `data.results` to `new Track(item)` instances stored as `results`; (6) call `renderSearchResults(results)`. Write only the code that goes inside the try block — the function signature, async keyword, and try/catch wrapper are already there."*

  What makes this prompt effective: it gives the exact URL, specifies every step in numbered order, and explicitly scopes what's already written so AI doesn't duplicate it.


---

## Grading Rubric

| Category | Detail | Points     |
| --- | --- |------------|
| **Part 1 — Bugs** | Each bug correctly fixed (3 pts × 14) | 42 pts     |
| **Build 1** — Track Class | Reading exercise — no points (class is pre-built) | 10 pts     |
| **Build 2** — Add & Remove | Both functions work; duplicate guard prevents re-adding | 10 pts     |
| **Build 3** — Favorites & Filter | Toggle updates correctly; filter shows only the right tracks | 10 pts     |
| **Build 4** — Search & Fetch | Real iTunes results appear in the search panel; tracks can be added to playlist | 28 pts     |
| **Total** |  | **100 pts** |

[Grading Scoresheet](https://www.notion.so/Grading-Scoresheet-327f754dfa2481eda64de66c0320da78?pvs=21)
