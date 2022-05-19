
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AlertDialog from './Dialog';
import Tooltip from '@mui/material/Tooltip';


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default (props) => {
    const [expanded, setExpanded] = React.useState(false);
    const [bookmarked, setBookMarked] = React.useState(false);
    const bookId = props.bookId;

    const authors = props.authors.join();

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleDialogClose = () => {
        setExpanded(!expanded);
    }
    const handleBookMark = (e) => {
        setBookMarked(!bookmarked);
        props.onBookSaved(bookId,!bookmarked);
    }
    return (
        <Card sx={{ width: 350, height: 400 }}>
            <CardHeader

                sx={{ height: '80px' }}
                title={props.title}
                subheader={authors}
            />
            <CardMedia
                component="img"
                height="200"
                image={props.imgUrl}
                alt={props.title}
                width="150"
            />

            <CardActions disableSpacing>

                <Tooltip title="Save to shelf"> 
                    <IconButton aria-label="add to favorites" >
                        {!bookmarked && <BookmarkBorderOutlinedIcon onClick={handleBookMark} />}
                        {bookmarked && <BookmarkOutlinedIcon onClick={handleBookMark} />}
                    </IconButton> 
                </Tooltip>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <InfoOutlinedIcon />
                </ExpandMore>
            </CardActions>

            {expanded && <AlertDialog open={expanded} title={props.title} description={props.description} buttonText="Close" onClose={handleDialogClose} />}
        </Card>
    );
}
