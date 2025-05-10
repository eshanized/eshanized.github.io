# YouTube Music API Setup

The music players are now using the `ytmusic-api` package to fetch song information from YouTube Music. This package provides a more comprehensive and reliable way to access YouTube Music data.

## Features

- Search for songs, videos, albums, artists, and playlists on YouTube Music
- Get song metadata including title, artist, album, thumbnail, and duration
- No API key required - the library handles authentication automatically
- TypeScript support for return types

## Technical Details

The integration uses the [ytmusic-api](https://www.npmjs.com/package/ytmusic-api) NPM package which provides a way to scrape YouTube Music data. The package initializes automatically, so no additional configuration is required.

### How it Works

1. When the music player loads, it initializes the YTMusic API
2. The player fetches song details by:
   - Searching for songs by their YouTube ID
   - Converting YouTube URLs to IDs using regex patterns
   - Fetching metadata like song title, artist, and thumbnail

### Limitations

- YouTube Music's API is not official, so changes to YouTube's UI might break functionality
- Some features may be limited due to the unofficial nature of the API
- Performance depends on YouTube's response times

## Usage for Custom Songs

Users can add their own YouTube/YouTube Music links to create custom playlists:

1. Click the "Add Song" button in the player
2. Paste a YouTube or YouTube Music URL
3. (Optional) Add a custom title and artist
4. Click "Add Song"

The player will automatically fetch the song's metadata and begin playback. 