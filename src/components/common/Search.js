import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import * as React from 'react';


export default (props) => {

  const [searchString,setSearchString] = React.useState("");

  const handleSearch = ()=>{
    props.onSearch(searchString);
  }

  const handleTextChange = (e)=>{
    setSearchString(e.target.value);
  }

  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <IconButton sx={{ p: '10px' }} aria-label="menu">
        <MenuOutlinedIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={props.placeholder}
        inputProps={{ 'aria-label': props.placeholder }}
        value={searchString}
        onChange={handleTextChange}
      />
      <IconButton sx={{ p: '10px' }} aria-label="search">
        <SearchIcon onClick={handleSearch}/>
      </IconButton>


    </Paper>
  )
}