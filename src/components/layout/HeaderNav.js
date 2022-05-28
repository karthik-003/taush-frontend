
import { Box } from '@mui/system'
import './HeaderNav.css'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import Search from '../common/Search';
import { Grid, IconButton } from '@mui/material';
import GoogleBookService from '../../services/GoogleBooksService';
import HeadLineCount from '../common/HeadLineCount';

export default (props) => {

    const handleSearch = (searchString)=>{
        console.log('Search string in headerNav: ',searchString);
        GoogleBookService.getBooks(searchString).then(
            response => {
                if(response.status == 200){
                    props.onGetBooks(response);
                }
            }
        )
    }

    return (
        <Box className="headerNav">
            <Grid container className="flex-justify-center" spacing={10}>
                <Grid item md={2}></Grid>
                <Grid item md={6} ><Search placeholder='Search Books by Title, Author' onSearch={handleSearch}/></Grid>
                <Grid item md={2}>
                    <HeadLineCount savedBookCount={props.bookCount}/>
                    <IconButton>
                        <AccountCircleRoundedIcon fontSize='large' sx={{top:'50px'}} />
                    </IconButton>
                </Grid>
                
            </Grid>
            
        </Box>
    )
}