   
import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route, Link} from "react-router-dom"

class Search extends React.Component{

 state = {
    query:'',
    books:[],
  }


updateQuery = (query)=>{
  this.setState({query:query.trim()})
  BooksAPI.search(this.state.query, 10).then((books) => {
      for (let book in books){
            for(let b in this.props.books){
              if(book.id === b.id){
                book.shelf=b.shelf
                }
              }}
      this.setState({ books }) 
      console.log(books)
  
})}


handleChange = (book, e) => {{
  const shelf = e
  const bookid = book
  this.props.onAddBook(bookid,shelf)
  }}

render(){
  return(
          <div className="search-books">
            <div className="search-books-bar">
              <Link to='/' className="close-search" onClick={this.props.onNavigate}>Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" value={this.state.query} onChange = {(event)=>this.updateQuery(event.target.value)}/>   
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              {(this.state.query!=='')&&(
                this.state.books.map((book)=>(
                      <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                            <div className="book-shelf-changer">
                              <select value={book.shelf} onChange = {(e)=>this.handleChange(book, e.target.value)}>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors}</div>
                        </div>
                      </li>)))}
                    </ol>
                  </div>
          </div>)}}

  export default Search;