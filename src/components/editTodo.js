import React, { useState } from 'react';
import {  Button, TextField } from '@mui/material';

const EditTodo = ({ onSubmit,item }) => {

  const [title, setTitle] = useState(item.title);

//   this function send the form data to main page onSubmit function on form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      id: item.id,
      title,
      completed: item.completed,
    };
    onSubmit('edit', data);
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
        save changes
      </Button>
    </form>
  );
};

export default EditTodo;
