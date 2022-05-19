import BookCard from "./common/BookCard"
import Search from "./common/Search"
import HeaderNav from "./layout/HeaderNav"
import BooksJson from '../mock/GETBooks.json'
import { Grid } from "@mui/material"
import * as React from 'react';
import { SavedSearch } from "@mui/icons-material"

export default () => {

    const [booksResult,setBookResult] = React.useState(BooksJson.items);
    const [savedBooks, setSavedBooks] = React.useState([]);
    const [bookCount, setBookCount] = React.useState(savedBooks.length);

    const handleSavedBook = (bookId,isSaved)=>{
        console.log("Before updating: ", savedBooks);
        var bookIndex = savedBooks.indexOf(bookId);
        console.log('Saved book: ',bookId,' selected: ',isSaved,"bookIndex: ",bookIndex);
        if(isSaved){
            if(bookIndex == -1){
                savedBooks.push(bookId);
            }
        }else{
            if(bookIndex!=-1){
                savedBooks.splice(bookIndex,1);
            }
        }
        console.log(savedBooks);
        setBookCount(savedBooks.length);
    }

    const handleGetBooks = (response) =>{
        setBookResult(response.data.items);
    }
    return (
        <div>
            <HeaderNav onGetBooks={handleGetBooks} bookCount={bookCount}/>
            <Grid container className="gallery" spacing={4} sx={{marginLeft:'15%',marginTop:'1%'}}>
            { booksResult.map(k=>(
                <Grid item sm="auto" className="gridCell" columnSpacing={2}>
                    <BookCard title={k.volumeInfo.title} 
                    bookId = {k.id}
                    authors={k.volumeInfo.authors} 
                    imgUrl={k.volumeInfo.imageLinks.smallThumbnail} 
                    description={k.volumeInfo.description}
                    onBookSaved = {handleSavedBook}
                />
                </Grid>
            ))}
            </Grid>
            
        </div>
    )
}