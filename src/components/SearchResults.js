import React from "react";
import BookService from "../services/BookService";

import { Box, Divider, Grid, Typography } from "@mui/material";
import BookCard from "./common/BookCard";
import SnackBar from "./common/SnackBar";

export default (props) => {

    const [openSnackBar, setOpenSnackbar] = React.useState(false); //snackbar
    const [snackbarText, setSnackbarText] = React.useState('');

    const handleSavedBook = (bookId,bookObj,isSaved)=>{
        console.log('Saved book obj: ',bookObj);
        
        setOpenSnackbar(true);
        if(isSaved){
           BookService.saveBook(bookId,bookObj);
           setSnackbarText('Book saved successfully.');
        }else{
            BookService.unSaveBook(bookId,bookObj);
            setSnackbarText('Book un-saved successfully.');
        }
        setSavedBooks(JSON.parse(localStorage.getItem('savedBooks')));
        setBookCount(savedBooks.length);
    }
    const handleBookReading = (bookId,bookObj,isReading)=>{
        console.log('Reading book obj: ',bookObj);
        
        if(isReading){
            BookService.addToReading(bookId,bookObj);
            setSnackbarText("Book added to 'Currently reading'.");
        }else{
            BookService.removeFromReading(bookId);
            setSnackbarText("Book removed to 'Currently reading'.");
        }
        
        setOpenSnackbar(true);
    }

    const [savedBooks, setSavedBooks] = React.useState(
        localStorage.getItem('savedBooks') ?
        JSON.parse(localStorage.getItem('savedBooks')) :
        []
    );
    const [bookCount, setBookCount] = React.useState(savedBooks.length);

    const [booksResult,setBooksResult] = React.useState([]);
    React.useEffect(()=>{
        setBooksResult(props.booksResult);
    });

    const handleSnackbarClose = ()=>{
        setOpenSnackbar(false);
    }
    return (
        <div className="searchContainer">
        <Typography variant="h5" >
            Search Results
        </Typography>
        <Divider/>
        {booksResult.length > 0 && <Grid container className="gallery"  sx={{marginTop:'2%',width:'80%'}}>
            { booksResult.map(k=>(
                <Grid item md="auto" className="gridCell" columnSpacing={3}>
                    <BookCard 
                    title={k.volumeInfo.title} 
                    bookId = {k.id}
                    authors={k.volumeInfo.authors} 
                    imgUrl={k.volumeInfo.imageLinks ? k.volumeInfo.imageLinks.smallThumbnail : ''} 
                    description={k.volumeInfo.description}
                    onBookSaved = {handleSavedBook}
                    pageCount = {k.volumeInfo.pageCount}
                    avgRating = {k.volumeInfo.averageRating}
                    bookObj = {k}
                    onBookReading = {handleBookReading}
                />
                </Grid>
            ))}
            </Grid>}
            <SnackBar open={openSnackBar} text={snackbarText} onClose={handleSnackbarClose}/>
        </div>
    )
}