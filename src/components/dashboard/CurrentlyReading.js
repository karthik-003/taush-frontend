import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Divider, Typography } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ImageListItem from "@mui/material/ImageListItem";
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowCircleRightTwoToneIcon from '@mui/icons-material/ArrowCircleRightTwoTone';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import BookInfoDialog from "../common/BookInfoDialog";

export default () => {

  
  const [showBookInfo,setShowBookInfo] = React.useState(false);
  const [bookData, setBookData] = React.useState({}); //Book object for displaying in Book Info dialog.

  const [currentlyReading, setCurrentlyReading] = React.useState(
    localStorage.getItem("currentlyReading") ?
    JSON.parse(localStorage.getItem("currentlyReading")) :
    {}
  );
  
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
          <Typography variant="h5">Currently reading</Typography>
          <Divider/>
          
          {Object.keys(currentlyReading).length > 0 && (
          <ImageList sx={{height: 350}} cols={6} gap={20} >
            {Object.keys(currentlyReading).map((bookId) => {
              var bookData = currentlyReading[bookId];
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
          </ImageList>)}
          {Object.keys(currentlyReading).length == 0 && 
          (<Typography sx={{marginTop:'10px'}}>Not reading any books currently. :( </Typography>)}
        </CardContent>
        <CardActions></CardActions>
      </Card>
      <BookInfoDialog open={showBookInfo} bookObj={bookData} buttonText='Close' onClose={handleBookDialogClose}/>
    </div>
  );
};
