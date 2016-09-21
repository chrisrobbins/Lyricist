import React, { Component } from 'react';

import './App.css';

import SearchBar from './components/SearchBar';
import VideoReturn from './components/VideoReturn';
import Lyrics from './components/Lyrics';
import VideoList from './components/VideoList';

import YTSearch from 'youtube-api-search';

import _ from 'lodash';

const API_KEY='AIzaSyCnk7rSA5owsjUDTLgoYRho-7W6Y9BeWV0';

  class App extends Component {
    constructor(props) {
      super(props);
      // console.log(App);

      this.state = {
        videos: [],
        activeVideo: null
      };


      this.videoSearch('guitars');
      // console.log(this.videoSearch);


//auto search
      this.onSearchTermChanged = _.debounce(this.onSearchTermChanged, 200)
    }

    onSearchTermChanged(term) {
      this.videoSearch(term);
    }

    videoSearch(term) {
      YTSearch({ key: API_KEY, term: term }, (videos) => {
        if (videos.length > 4) {
          videos.pop();
        }
        console.log('videos', videos);

        this.setState({
          videos: videos,
          activeVideo: videos[0]
        });
      });
    }

    onVideoSelect(video) {
      this.setState({
        activeVideo: video
      })
    }

  render() {
    return (
      <div className="container">
        <SearchBar onSearchTermChanged={this.onSearchTermChanged.bind(this)}/>
          {/* <!-- Jumbotron Header --> */}
          <header className="jumbotron hero-spacer col-lg-12">

            <div className="lyricsContainer col-lg-6">
              <Lyrics />
            </div>
            <div className="search-return col-lg-6">
              <VideoReturn video={this.state.activeVideo} />

            </div>

          </header>

          <hr />

          {/* <!-- Title --> */}
          <div className="row">
              <div className="col-lg-12">
                  <h3>Latest Features</h3>
              </div>
          </div>
          {/* <!-- /.row --> */}


              <VideoList onVideoSelect={this.onVideoSelect.bind(this)} videos={this.state.videos} />



          {/* <!-- Footer --> */}
          <footer>
              <div className="row">
                  <div className="col-lg-12">
                      <p>Copyright &copy; Kickbutt GA WDI8 Developers</p>
                  </div>
              </div>
          </footer>

      </div>
    );
  }
}

export default App;
