"use client"
import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, createTheme, ThemeProvider, Card, CardContent, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: grey[300], // Adjust primary color as needed
    },
    background: {
      paper: '#000', // Set paper background color to black
    },
  },
});

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [autoCompleteOptions, setAutoCompleteOptions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    if (value.length > 0) {
      // Fetch auto-complete options here
    } else {
      setAutoCompleteOptions([]);
    }
  };

  const handleSearchSubmit = () => {
    // Call API with searchTerm
    console.log('API called with search term:', searchTerm);
    // Simulate search results
    const mockSearchResults = ['Result 1', 'Result 2', 'Result 3'];
    setSearchResults(mockSearchResults);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper style={{ padding: '20px' }}>
            <TextField
              fullWidth
              label="Search"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                endAdornment: (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSearchSubmit}
                  >
                    Search
                  </Button>
                ),
              }}
            />
            {autoCompleteOptions.length > 0 && (
              <ul>
                {autoCompleteOptions.map((option, index) => (
                  <li key={index}>{option}</li>
                ))}
              </ul>
            )}
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper style={{ padding: '20px' }}>
            <h2>Search Results</h2>
            <ul>
              {searchResults.map((result, index) => (
                <li key={index}>{result}</li>
              ))}
            </ul>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper style={{ padding: '20px' }}>
            <h2>Other Results</h2>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  Card 1
                </Typography>
                <Typography color="textSecondary">
                  Some description about card 1.
                </Typography>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  Card 2
                </Typography>
                <Typography color="textSecondary">
                  Some description about card 2.
                </Typography>
              </CardContent>
            </Card>
            {/* Add more cards as needed */}
          </Paper>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Dashboard;