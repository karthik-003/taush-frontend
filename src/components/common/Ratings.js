import { AddBoxTwoTone } from '@mui/icons-material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import StarHalfOutlinedIcon from '@mui/icons-material/StarHalfOutlined';
import { Box } from '@mui/material';

export default (props) =>{
    const rating = props.rating;
    var range = [1,2,3,4,5];
    
    
    return (
        <div>
            <Box sx={{width:'auto'}}>
                {range.map(i=>{
                    if(i <= rating){
                        return <StarOutlinedIcon/>
                    }
                    else if( i-1 < rating && i > rating){
                        return <StarHalfOutlinedIcon/>
                    }
                    else if(i> rating ){
                        return <StarBorderIcon/>
                    }
                }
                )}
                
            </Box>
        </div>
    )
}