import React, { useState } from 'react';
import {  Button, TextField } from '@mui/material';

const AddTodo = ({ onSubmit }) => {

  const [title, setTitle] = useState('');

//   this function send the form data to main page onSubmit function on form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      id: Math.random() * 10000,
      title,
      completed: false,
    };
    onSubmit('add', data);
    setTitle(''); // Reset the title after submitting
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: '20px' }}>
      <TextField
        label="Todo Title"
        variant="outlined"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        fullWidth // Adjust the styling as needed
        required
      />
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{mt:2}}>
        Add Todo
      </Button>
    </form>
  );
};

export default AddTodo;
