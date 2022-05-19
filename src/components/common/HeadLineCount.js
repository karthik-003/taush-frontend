
import { IconButton,Box } from '@mui/material';
import ViewHeadlineOutlinedIcon from '@mui/icons-material/ViewHeadlineOutlined';

import './HeadLineCount.css'

export default (props) => {
    return (
        
            <IconButton>
                <ViewHeadlineOutlinedIcon sx={{ marginRight: '10%' }} />
                <span className="notification">{props.savedBookCount}</span>
            </IconButton>
        
    )
}