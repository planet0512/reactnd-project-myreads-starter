import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookList from './BookList'
import Search from './Search'
import { Route, Link} from "react-router-dom"

class BooksApp extends React.Component {
  
  state = {
    books:[],
    screen:'MyReads'
  }  

componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }



updateBooks(book,shelf) {
  if(book.shef!==shelf){
  book.shelf = shelf
    BooksAPI.update(book, shelf).then(book => {
      this.setState(state => ({
        books: state.books.filter(b=>b.id!==book.id).concat([ book ])
      }
      ))
    })}}


addBook(book, shelf){
  book.shelf = shelf
    BooksAPI.update(book, shelf).then(()=> {
      this.setState(state => ({
        books: state.books.filter(b=>b.id!==book.id).concat([ book ])
      }
      ))})
    }

render(){
  return(
  <div className="app">
  <Route exact path="/" render={() => (
    <BookList
    onNavigate={()=>this.setState(screen:'showSearchPage')}
    books = {this.state.books}
    changingShelf = {(book,shelf)=>{
      this.updateBooks(book, shelf)
    }} />)} />
    
    <Route path="/search" render={({ history })=>(
      <Search 
    onNavigate={()=>this.setState(screen:'MyReads')} 
    onAddBook={(book, shelf)=>{
      this.addBook(book,shelf)
    history.push('/')}}/>)}/>
  </div>)
}

}




export default BooksApp;

