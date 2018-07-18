import React, { Component } from 'react';
import {Content} from './components/Content'
import logo from './logo.svg';
import './App.css';

const API_KEY= '2719bf93'

class App extends Component {
  constructor(props) {
    super(props)
    // fetch data here
    console.log("constructor")

    this.state = {
      movies : [],
      details : {}
    }

    //this.populatemovies()

  }

  populatemovies() {

    fetch('http://www.omdbapi.com/?s=batman&apikey='+API_KEY)
    .then((response) => response.json())
    .then((json) => {

        this.setState({
          movies : json.Search
        })

    })

  }

  getDetails = ((movie) => {
    fetch('http://www.omdbapi.com/?i='+movie.imdbID+'&apikey='+API_KEY)
    .then((response) => response.json())
    .then((json) => {
        this.setState({
          details : json
        })
        console.log(json)
    })

  })

  componentDidMount() {
    this.populatemovies()
  }


  render() {

    let movieDetails = this.state.details

    let movieItems = this.state.movies.map((movie) => {
      return (
        <div key={movie.imdbID} className="card">
        <img className="card-img-top" src={movie.Poster} alt="Card image cap"/>
        <div className="card-body">
          <h5 className="card-title">{movie.Title} ({movie.Year})</h5>
          <p className="card-text">Media: {movie.Type}</p>
          <footer className="blockquote-footer">
            <small className="text-muted">
              IMDB ID: {movie.imdbID}
            </small>
            <button onClick={()=>this.getDetails(movie)}>details</button>
          </footer>
        </div>
      </div>
      )
    })

    return (
      <div>
      {movieDetails.Title}
      <div className='card-columns'>
        {movieItems}
        </div>
      </div>
    )
  }
}

export default App;
