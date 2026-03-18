// ============================================================
//  track.js — Track Class
//  BUILD 1 is in this file.
//
//  A class is a blueprint for creating objects. Every song
//  in this app will be created as a Track instance using
//  this class as the template.
//
//  ⚠️  Notice: there is no "export default" on this class yet.
//      That is intentional — you will add it in Build 5.
// ============================================================

class Track {
  // ── BUILD 1A: Constructor ───────────────────────────────
  //
  // The constructor runs automatically every time a new Track
  // is created with: new Track(data)
  //
  // "data" is a single song result object from the iTunes API.
  // It looks like this:
  //
  //   {
  //     trackId:        123456,
  //     trackName:      "Song Title",
  //     artistName:     "Artist Name",
  //     collectionName: "Album Name",
  //     artworkUrl100:  "https://...",
  //     previewUrl:     "https://...",
  //     trackTimeMillis: 214000       ← milliseconds!
  //   }
  //
  // Your job: read each field from data and store it on "this"
  // so the rest of the app can use it.

  constructor(data) {
    // Set this.id to data.trackId
    // (fall back to Math.random() if trackId is missing)

    // Set this.title to data.trackName

    // Set this.artist to data.artistName

    // Set this.album to data.collectionName

    // Set this.artwork to data.artworkUrl100

    // Set this.previewUrl to data.previewUrl

    // Set this.duration to data.trackTimeMillis converted from
    // milliseconds to seconds. Use Math.floor() to round down.
    // Formula: Math.floor(data.trackTimeMillis / 1000)

    // Set this.isFavorite to false (always starts as not favorited)
  }

  // ── BUILD 1B: toggleFavorite() ──────────────────────────
  //
  // This method flips this.isFavorite between true and false.
  // If it is currently false, it becomes true.
  // If it is currently true, it becomes false.
  //
  // Hint: this.isFavorite = !this.isFavorite

  toggleFavorite() {
    // Flip this.isFavorite
  }

  // ── BUILD 1C: getFormattedDuration() ───────────────────
  //
  // this.duration is stored in seconds (e.g. 214).
  // This method should return a formatted string like "3:34".
  //
  // Steps:
  //   1. Calculate minutes: Math.floor(this.duration / 60)
  //   2. Calculate remaining seconds: this.duration % 60
  //   3. Pad single-digit seconds with a leading zero
  //      (e.g. 4 becomes "04") using a conditional
  //   4. Return the string using a template literal: `${minutes}:${paddedSeconds}`

  getFormattedDuration() {
    // Step 1: calculate minutes

    // Step 2: calculate remaining seconds

    // Step 3: pad seconds if needed (if seconds < 10, add "0" in front)

    // Step 4: return the formatted string
  }
}
