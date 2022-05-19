import BookCard from "./common/BookCard"
import Search from "./common/Search"
import HeaderNav from "./layout/HeaderNav"
import BooksJson from '../mock/GETBooks.json'
import { Grid } from "@mui/material"
import * as React from 'react';

export default () => {

    const [booksResult,setBookResult] = React.useState(BooksJson.items);
    const savedBooks = [];

    const handleSavedBook = (bookId,isSaved)=>{
        console.log('Saved book: ',bookId,' selected: ',isSaved);
        booksResult.forEach(book=>{
            if(book.id == bookId){
                console.log(book.volumeInfo.title);
            }
        });

    }
    const handleGetBooks = (response) =>{
        setBookResult(response.data.items);
    }
    return (
        <div>
            <HeaderNav onGetBooks={handleGetBooks}/>
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