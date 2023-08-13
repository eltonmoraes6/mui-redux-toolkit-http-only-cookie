import React, { useState } from 'react';
import { useAddNewNoteMutation } from '../../Store/Slices/notesSlice';

import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const AddNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const initialNoteState = {
    id: null,
    title: '',
    description: '',
    published: false,
  };
  const [note, setNote] = useState(initialNoteState);
  const [submitted, setSubmitted] = useState(false);

  const [addNewNote, response] = useAddNewNoteMutation();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNote({ ...note, [name]: value });
  };

  const saveNote = () => {
    const { title, description } = note;

    let formData = {
      title,
      description,
    };

    addNewNote(formData)
      .unwrap()
      .then(() => {
        setSubmitted(true);
        navigate('/notes');
        setSubmitted(false);
        setNote(initialNoteState);
      })
      .then((error) => {
        setSubmitted(false);
        console.log(error);
      });
  };

  return (
    <Box sx={{ padding: 2 }}>
      {submitted ? (
        <div>
          <Typography component='h1' variant='h5'>
            Loading...
          </Typography>
        </div>
      ) : (
        <div>
          <Typography component='h1' variant='h5'>
            Add Notes
          </Typography>
          <div className='form-group'>
            <TextField
              fullWidth
              label='Title'
              margin='normal'
              size='small'
              variant='outlined'
              type='text'
              id='title'
              required
              value={note.title || ''}
              onChange={handleInputChange}
              name='title'
            />
          </div>

          <div className='form-group'>
            <TextField
              fullWidth
              label='Description'
              margin='normal'
              size='small'
              variant='outlined'
              type='text'
              id='description'
              required
              value={note.description || ''}
              onChange={handleInputChange}
              name='description'
            />
          </div>

          <Button
            onClick={saveNote}
            fullWidth
            size='small'
            variant='contained'
            color='primary'
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </div>
      )}
    </Box>
  );
};

export default AddNote;
