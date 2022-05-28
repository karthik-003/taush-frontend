import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Typography,Divider } from "@mui/material";
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import BookInforDialog from "../common/BookInfoDialog";
import BookInfoDialog from "../common/BookInfoDialog";

export default (props) => {
  const [savedBooks, setSavedBooks] = React.useState(
    localStorage.getItem("savedBooks")
      ? JSON.parse(localStorage.getItem("savedBooks"))
      : {}
  );

  const [showBookInfo,setShowBookInfo] = React.useState(false);
  const [bookData, setBookData] = React.useState({}); //Book object for displaying in Book Info dialog.
  
  const showBookInfoDialog = (bookData)=>{
    console.log('opening bookInfo Dialog: ',bookData);
    setBookData(bookData);
    setShowBookInfo(true);
  }

  const handleBookDialogClose = ()=>{
    setShowBookInfo(false);
  }
  return (
    <div>
      <Card
        sx={{
          justifyContent: "flex-start",
          border: "2px solid black",
          backgroundColor: "#E7EBF0",
        }}
      >
        <CardContent>
          <Typography variant="h5">Saved Books</Typography>
          <Divider/>
          <ImageList sx={{height: 350,overflow:'auto' }} cols={6} gap={20} >
            {Object.keys(savedBooks).map((bookId) => {
              var bookData = savedBooks[bookId];
              return (
                <ImageListItem key={bookId}>
                    <img
                    src={bookData.volumeInfo.imageLinks.smallThumbnail}
                    alt={bookData.volumeInfo.title}
                    loading="lazy"
                   
                    />
                    <ImageListItemBar
                        title={bookData.volumeInfo.title}
                        subtitle={bookData.volumeInfo.authors ? bookData.volumeInfo.authors.join(): ''}
                        actionIcon={
                        <IconButton
                            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                            
                        >
                            <ArrowCircleRightOutlinedIcon fontSize="medium" onClick={()=>showBookInfoDialog(bookData)}/>
                        </IconButton>
                        }
                    />
                </ImageListItem>
              )
            })}
          </ImageList>
        </CardContent>
        <CardActions></CardActions>
      </Card>
      <BookInfoDialog open={showBookInfo} bookObj={bookData} buttonText='Close' onClose={handleBookDialogClose}/>
    </div>
  );
};
