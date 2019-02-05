import React, { Component } from 'react';
import './App.css';
import Row from './components/Row'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      searchTerm: '',
      imageResults: []
    }
    
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }
  
  fetchImages(term) {
    const url = `https://api.unsplash.com/search/photos?page=1&per_page=9&orientation=landscape&query=${term}`
    fetch(url, {
      headers: {
        'Authorization': 'Client-ID c299a12526acce9657db9772af95d098a009391971cedf472f85009e73d5a1b3'
      }
    })
      .then(res => res.json())
      .then(data => {
        const thumbnails = data.results.map(res => res.urls.small)
        this.setState({ imageResults: thumbnails })
      })
      .catch(error => console.log('An error occurred during fetch', error))
  }
  
  onSubmit(e) {
    e.preventDefault()
    this.fetchImages(this.state.searchTerm)
  }
  
  onChange(e) {
    this.setState({
      searchTerm: e.target.value
    })
  }

  render() {
    return (
      <div className="App">
        <h1>Unsplash Tag Search</h1>
        <form onSubmit={this.onSubmit}>
          <input type="search" placeholder="search" className="search-input" onChange={this.onChange} />
          <button type="submit" className="search-button"><i className="fas fa-search"></i></button>
        </form>
        <div className="image-grid">
          <div className="image-row">
            <Row images={this.state.imageResults.slice(0, 3)} />
          </div>
          <div className="image-row">
            <Row images={this.state.imageResults.slice(3, 6)} />
          </div>
          <div className="image-row">
            <Row images={this.state.imageResults.slice(6, 9)} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
