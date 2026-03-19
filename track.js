// ============================================================
//  track.js — Track Class
//  BUILD 1 is in this file.
//
//  A class is a blueprint for creating objects. Every song
//  in this app will be created as a Track instance using
//  this class as the template.
//
//  This class is already built and working — your job in
//  Build 1 is to read each section carefully and understand
//  what it does before moving on to the build tasks in app.js.
// ============================================================

export default class Track {
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
  // Each field from data is stored on "this" so the rest of
  // the app can access it as track.title, track.artist, etc.

  constructor(data) {
    this.id         = data.trackId || Math.random();
    this.title      = data.trackName;
    this.artist     = data.artistName;
    this.album      = data.collectionName;
    this.artwork    = data.artworkUrl100;
    this.previewUrl = data.previewUrl;
    // trackTimeMillis is in milliseconds — divide by 1000 for seconds
    this.duration   = Math.floor(data.trackTimeMillis / 1000);
    // Every track starts as not favorited
    this.isFavorite = false;
  }

  // ── BUILD 1B: toggleFavorite() ──────────────────────────
  //
  // This method flips this.isFavorite between true and false.
  // If it is currently false, it becomes true.
  // If it is currently true, it becomes false.
  //
  // Hint: this.isFavorite = !this.isFavorite

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
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
    const minutes = Math.floor(this.duration / 60);
    const seconds = this.duration % 60;
    const paddedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${paddedSeconds}`;
  }
}
