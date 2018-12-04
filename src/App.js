import React, { Component } from 'react';
import './App.css';
import Spotify from 'spotify-web-api-js'
import SongCard from './components/SongCard';
import PlaylistList from './components/PlaylistList'
import { Navbar, Button } from 'react-materialize';
import FeaturedPlaylists from './components/FeaturedPlaylists';

const spotifyWebApi = new Spotify()

class App extends Component {
  constructor() {
    super()
    const params = this.getHashParams();
    this.state = {
      loggedIn: params.access_token ? true : false,
      nowPlaying: {
        song: 'Not Checked',
        artist: '',
        image: ''
      },
      playlists: [],
      featuredPlaylists: [],
      showNowPlaying: false,
      showUserPlaylists: false
    }
    if (params.access_token) {
      spotifyWebApi.setAccessToken(params.access_token)
    }
  }

  getHashParams() {
    var hashParams = {};
      var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
      while ( e = r.exec(q)) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
      }
      return hashParams;
  }

  //console log the resp to check
  getNowPlaying() {
    this.toggleNowPlaying()
    spotifyWebApi.getMyCurrentPlaybackState()
    .then(resp => {
      this.setState({
        nowPlaying: {
          song: resp.item.name,
          artist: resp.item.artists[0].name,
          image: resp.item.album.images[0].url
        }
      })
    })
  }

  toggleNowPlaying = () => {
    this.setState({
      showNowPlaying: !this.state.showNowPlaying
    })
  }

  getUserPlaylists() {
    spotifyWebApi.getUserPlaylists()
    .then(resp => {
      resp.items.map(playlist =>
      this.setState({
        playlists: [...this.state.playlists, {
          id: playlist.id,
          user: playlist.owner.id,
          name: playlist.name,
          images: playlist.images,
          tracks: playlist.tracks,
          uri: playlist.uri
        }]
      })
      )
    })
  } 

  getFeaturedPlaylists() {
    spotifyWebApi.getFeaturedPlaylists()
    .then(resp => resp.playlists.items.map(
      playlist => this.setState({
        featuredPlaylists: [...this.state.featuredPlaylists, {
          id: playlist.id,
          name: playlist.name,
          tracks: playlist.tracks,
          images: playlist.images,
          uri: playlist.uri
        }]
      })
    ))
  }

  toggleUserPlaylists = () => {
    this.setState({
      showUserPlaylists: !this.state.showUserPlaylists
    })
  }

  componentDidMount() {
    this.getUserPlaylists()
    this.getFeaturedPlaylists()
  }

  render() {
    const { showNowPlaying, showUserPlaylists } = this.state
    return (
      <div className="App">
      <Navbar />
      <a href="http://localhost:8888">
        <Button waves='light'>Login with Spotify</Button>
        </a>
        <FeaturedPlaylists featuredPlaylists={this.state.featuredPlaylists}/>
    { !showNowPlaying ? 
        <Button waves='light' onClick={() => this.getNowPlaying()}>
          Check Now Playing
        </Button>
        :
          <Button waves='light' onClick={() => this.toggleNowPlaying()}>
            Hide Now Playing
        </Button>
    }    

    { !showUserPlaylists ?
        <Button waves='light' onClick={() => this.toggleUserPlaylists()}>
          Get Playlists
        </Button>
        :
        <Button waves='light' onClick={() => this.toggleUserPlaylists()}>
         Hide User Playlists
        </Button>
    }

    {   showNowPlaying && 
        <div> 
          <SongCard
          songName={this.state.nowPlaying.song}
          artistName={this.state.nowPlaying.artist} 
          image={this.state.nowPlaying.image}
          />
        </div>
    }

    {
      showUserPlaylists &&
      <div>
        <PlaylistList 
          playlists={this.state.playlists}
        />
      </div>
    }

      </div>
    );
  }
}

export default App;

