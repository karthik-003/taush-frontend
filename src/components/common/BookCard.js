import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import ChromeReaderModeIcon from "@mui/icons-material/ChromeReaderMode";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AlertDialog from "./Dialog";
import Tooltip from "@mui/material/Tooltip";
import Ratings from "./Ratings";
import logo from "../../images/book_404.png";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default (props) => {
  const bookId = props.bookId;
  const [expanded, setExpanded] = React.useState(false);

  const [bookmarked, setBookMarked] = React.useState(Boolean(false));
  const [reading,setReading] = React.useState(false);

  React.useEffect(()=>{
      if(localStorage.getItem('savedBooks')){
        var savedBooks = JSON.parse(localStorage.getItem('savedBooks'));
        if(bookId in savedBooks){
          setBookMarked(true);
        }else{
          setBookMarked(false);
        }
      }
      if(localStorage.getItem('currentlyReading')){
        var currentlyReading = JSON.parse(localStorage.getItem('currentlyReading'));
        if(bookId in currentlyReading){
          setReading(true);
        }else{
          setReading(false);
        }
      }
  });

  

  //If Book thumbnail available.
  var imgUrl = props.imgUrl != "" ? props.imgUrl : logo;

  //Adjust title if its too big.

  var bookTitle = props.title;
  var titleLength = bookTitle.length;
  if (titleLength > 40) {
    bookTitle = bookTitle.substr(0, 38);
    bookTitle += "...";
  }

  
  const authors = props.authors ? props.authors.join() : "";

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDialogClose = () => {
    setExpanded(!expanded);
  };

  const handleBookMark = (e) => {
    setBookMarked(!bookmarked);
    props.onBookSaved(bookId,props.bookObj, !bookmarked);
  };

  const handleReading = ()=>{
    setReading(!reading);
    props.onBookReading(bookId,props.bookObj, !reading);
  }

  return (
    <Card sx={{ width: 300, height: 600 }}>
      
      <CardMedia
        component="img"
        height="400"
        image={imgUrl}
        alt={props.title}
        width="150"
        sx={{ paddingTop: "10px" }}
      />
      <CardContent
        sx={{ height: "100px", display: "flex", flexDirection: "column" }}
      >
        <Typography
          gutterBottom
          variant="p"
          component="div"
          sx={{
            width: "100%",
            alignContent: "center",
            display: "flex",
            justifyContent: "center",
            wordWrap: "break-word",
          }}
        >
          {bookTitle}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {authors}
        </Typography>
        <Typography
          variant="span"
          color="text.secondary"
          sx={{ position: "relative", float: "left", marginTop: "10px" }}
        >
          Total Pages: {props.pageCount}
         
        </Typography>
        <Typography variant="p" sx={{ position: "relative" }}>
          {props.avgRating && <Ratings rating={props.avgRating} />}
          {!props.avgRating && (
            <Typography sx={{ fontSize: "10px", marginTop: "10px" }}>
              No ratings available.
            </Typography>
          )}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Tooltip title="Save to shelf">
          <IconButton aria-label="add to favorites">
            {!bookmarked && 
              <BookmarkBorderOutlinedIcon onClick={handleBookMark} />
            }
            {bookmarked && <BookmarkOutlinedIcon onClick={handleBookMark} />}
          </IconButton>
        </Tooltip>
        <Tooltip title="Currently Reading">
          <IconButton aria-label="share">

            {
              !reading && 
              <ChromeReaderModeIcon onClick={handleReading}/>
            }
            {
              reading && 
              <AutoStoriesOutlinedIcon onClick={handleReading}/>
            }
          </IconButton>
        </Tooltip>
        
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <Tooltip title="About Book">
            <InfoOutlinedIcon />
          </Tooltip>
        </ExpandMore>
      </CardActions>

      {expanded && (
        <AlertDialog
          open={expanded}
          title={props.title}
          description={props.description}
          buttonText="Close"
          onClose={handleDialogClose}
        />
      )}
    </Card>
  );
};
