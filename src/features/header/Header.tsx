import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Button, Input, InputAdornment, MenuItem, OutlinedInput, Select, TextField, Toolbar, styled } from '@mui/material';
import { useState } from 'react';
import { Search } from '@mui/icons-material';
import { useDocumentAction, useGetDocumentPageAction } from '../documentView/documentState';
import DivisionSelecotr from './DivisionSelector';

// const SearchTextField = styled(TextField)(({theme}) => ({



// }));

function SearchTextField() {

  return <OutlinedInput sx={{ width: "70%" }} color="info"  id="input-with-icon-adornment"
    startAdornment={
      <InputAdornment position="start">
        <Search  />
      </InputAdornment>
    }/>
}


export default function AppHeaderBar() {




  const [age, setAge] = useState("");

  const getDocActions = useGetDocumentPageAction();
  const { a } = useDocumentAction(); 

  const click = () => {
    a();
  }


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          
        <DivisionSelecotr></DivisionSelecotr>
        <SearchTextField />


          {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography> */}
          <Button onClick={click} color="inherit">AAAAA</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}