import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ImageListItem,ImageList,Grid } from '@mui/material';

export default (props)=>{

    const [open, setOpen] = React.useState(false);
    const [bookObj,setBookObj] = React.useState(props.bookObj);

    React.useEffect(()=>{
      setOpen(props.open);
      setBookObj(props.bookObj);
    })
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      props.onClose();
    };
    return (
        <div>
      
     {open && <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {bookObj.volumeInfo.title}
        </DialogTitle>
        <DialogContent>
          
          <Grid container spacing={2}>
              <Grid item md={4} >
                  <ImageList sx={{height: 270,width:180,position:'absolute',bottom:'35px' }} cols={1}>
                    <ImageListItem sx={{overflow:'hidden'}}>
                    <img
                    src={bookObj.volumeInfo.imageLinks.thumbnail}
                    alt={bookObj.volumeInfo.title}
                    loading="lazy"
                   
                    />
                    </ImageListItem>
                  </ImageList>
              </Grid>
              <Grid item md={8} sx={{height:250}}>
              <DialogContentText id="alert-dialog-description">
                {bookObj.volumeInfo.description}
              </DialogContentText>
              </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Disagree</Button> */}
          <Button onClick={handleClose} autoFocus>
            {props.buttonText}
          </Button>
        </DialogActions>
      </Dialog>}
    </div>
    )
}