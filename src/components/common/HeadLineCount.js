import * as React from 'react';
import { IconButton,Box } from '@mui/material';
import ViewHeadlineOutlinedIcon from '@mui/icons-material/ViewHeadlineOutlined';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import './HeadLineCount.css'

export default (props) => {
    const [savedBookCount,setSavedBookCount] = React.useState(0);
    React.useEffect(()=>{
        if(localStorage.getItem('savedBooks')){
            var savedBooks = JSON.parse(localStorage.getItem('savedBooks'));
            setSavedBookCount(Object.keys(savedBooks).length);
        }
    })
    return (
        
            <IconButton>
                <LibraryBooksIcon fontSize='large' sx={{ marginRight: '10%' }} />
                <span className="notification">{savedBookCount}</span>
            </IconButton>
        
    )
}