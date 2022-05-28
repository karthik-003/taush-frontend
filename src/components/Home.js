import BookCard from "./common/BookCard"
import Search from "./common/Search"
import HeaderNav from "./layout/HeaderNav"
import BooksJson from '../mock/GETBooks.json'
import Dashboard from './dashboard/Dashboard';
import { Box, Grid } from "@mui/material";
import * as React from 'react';
import { SavedSearch } from "@mui/icons-material"

import NavBar from "./layout/NavBar";
import GoogleBookService from "../services/GoogleBooksService";
import { BrowserRouter, Route, Routes,useNavigate } from "react-router-dom";
import SearchResults from "./SearchResults";


export default () => {
    //const navigate = useNavigate();
    const [booksResult,setBookResult] = React.useState([]);//BooksJson.items
    const [savedBooks, setSavedBooks] = React.useState(
        localStorage.getItem('savedBooks') ?
        JSON.parse(localStorage.getItem('savedBooks')) :
        []
    );
    const [bookCount, setBookCount] = React.useState(savedBooks.length);
    const [showDashboard, setShowDashboard] = React.useState(true);
    const [showSearchResults,setShowSearchResults] = React.useState(false);
   

    const handleGetBooks = (response) =>{
        
        console.log('response: ',response.data.items)
        setBookResult(response.data.items);
        setShowDashboard(false);
        setShowSearchResults(true);
        
    }

    const handleSearch = (searchString)=>{
        console.log('Search string in headerNav: ',searchString);
        setBookResult([]);
        GoogleBookService.getBooks(searchString).then(
            response => {
                if(response.status == 200){
                    handleGetBooks(response);

                }
            }
        )
    }
    const handleNavigation = (path)=>{
        if(path == "/"){
            setShowDashboard(true);
            setShowSearchResults(false);
        }
    }
    return (
        <div>
            {/* <HeaderNav onGetBooks={handleGetBooks} bookCount={bookCount}/> */}
            <NavBar onSearch={handleSearch} onNavigate={handleNavigation} />
            <Box className="box-container">
                {
                    showSearchResults && !showDashboard &&
                    <SearchResults booksResult={booksResult}/>
                }{
                    !showSearchResults && showDashboard &&
                    <Dashboard/>
                }
            
            </Box>
            
        </div>
    )
}