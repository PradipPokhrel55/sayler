import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';

export default function Categories() {
  const navigate = useNavigate();

  const handleChange = (event) => {
    const selectedCategory = event.target.value;
    if (selectedCategory) {
      navigate(selectedCategory);
    }
  };

  return (
    <div className='flex justify-start bg-customOrange h-15'>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small"className='h-10'>
        <InputLabel htmlFor="grouped-select">Categories</InputLabel>
        <Select defaultValue="" id="grouped-select" label="Categories" onChange={handleChange}>
          <MenuItem value="/home">
            <em>Home</em>
          </MenuItem>         
          <MenuItem value="/fashion">Fashion</MenuItem>
          <MenuItem value="/electronics">Electronics</MenuItem>         
          <MenuItem value="/watches">Watches</MenuItem>
          <MenuItem value="/shoes">Shoes</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
