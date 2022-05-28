
const BookService = {
    saveBook : function(bookId,bookData){
        if(localStorage.getItem('savedBooks')){
            var savedBooks = JSON.parse(localStorage.getItem('savedBooks'));
            if(!(bookId in savedBooks)){
                savedBooks[bookId] = bookData;
                localStorage.setItem('savedBooks',JSON.stringify(savedBooks));
            }

        }else{
            //Create for the first time. 
            var savedBooks = {};
            savedBooks[bookId] = bookData;
            localStorage.setItem('savedBooks',JSON.stringify(savedBooks));

        }
    },

    unSaveBook : function(bookId){
        if(localStorage.getItem('savedBooks')){
            var savedBooks = JSON.parse(localStorage.getItem('savedBooks'));
            if(bookId in savedBooks){
                delete savedBooks.bookId;
                localStorage.setItem('savedBooks',JSON.stringify(savedBooks));
            }
            
        }

    },

    addToReading : function(bookId,bookData){
        if(localStorage.getItem('currentlyReading')){
            var readingBooks = JSON.parse(localStorage.getItem('currentlyReading'));
            if(!(bookId in readingBooks)){
                readingBooks[bookId] = bookData;
                localStorage.setItem('currentlyReading',JSON.stringify(readingBooks));
            }

        }else{
            //Create for the first time. 
            var readingBooks = {};
            readingBooks[bookId] = bookData;
            localStorage.setItem('currentlyReading',JSON.stringify(readingBooks));

        }
    },
    removeFromReading : function(bookId){
        if(localStorage.getItem('currentlyReading')){
            var readingBooks = JSON.parse(localStorage.getItem('currentlyReading'));
            if(bookId in readingBooks){
                delete readingBooks.bookId;
                localStorage.setItem('currentlyReading',JSON.stringify(readingBooks));
            }
            
        }
    }

    
}

export default BookService