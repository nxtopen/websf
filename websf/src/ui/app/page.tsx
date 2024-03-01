"use client"
import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, createTheme, ThemeProvider, Card, CardContent, Typography, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { grey } from '@mui/material/colors';
import axios from 'axios';
import ExploreIcon from '@mui/icons-material/Explore';
import DnsIcon from '@mui/icons-material/Dns';
import MailIcon from '@mui/icons-material/Mail';
import DescriptionIcon from '@mui/icons-material/Description';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';

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
  const [searchResults, setSearchResults]: any = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [subdomainsFilter, setSubdomainsFilter] = useState('');

  const handleSearchChange = (event: { target: { value: any; }; }) => {
    const { value } = event.target;
    setSearchTerm(value);
  };

  const handleSearchSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/api/scan-all/${searchTerm}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      // Handle error appropriately, e.g., show error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event: { key: string; }) => {
    if (event.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  const handleSubdomainsFilterChange = (event: { target: { value: any; }; }) => {
    const { value } = event.target;
    setSubdomainsFilter(value);
  };

  const filteredSubdomains = searchResults.subdomains?.subdomains.filter((subdomain: string) =>
    subdomain.toLowerCase().includes(subdomainsFilter.toLowerCase())
  );

  const renderDnsRecords = () => {
    const { dnsRecords }: any = searchResults;
    if (!dnsRecords) return null;
  
    const recordIcons: any = {
      A: <ExploreIcon />,
      AAAA: <ExploreIcon />,
      MX: <MailIcon />,
      TXT: <DescriptionIcon />,
      SOA: <CodeIcon />,
      NS: <StorageIcon />,
    };
  
    return (
      <List>
        {Object.keys(dnsRecords).map((type: string) => (
          <React.Fragment key={type}>
            {dnsRecords[type] && (
              <Card key={type} style={{ marginBottom: '10px' }}>
                <CardContent>
                  <ListItem>
                    <ListItemIcon>
                      {recordIcons[type] || <DnsIcon />}
                    </ListItemIcon>
                    <ListItemText primary={type} />
                  </ListItem>
                  <List>
                    {Array.isArray(dnsRecords[type]) ? (
                      dnsRecords[type].map((record: any, index: React.Key | null | undefined) => (
                        <ListItem key={index}>
                          <ListItemText primary={typeof record === 'string' ? record : JSON.stringify(record)} />
                        </ListItem>
                      ))
                    ) : (
                      Object.entries(dnsRecords[type]).map(([key, value]: [string, any]) => (
                        <ListItem key={key}>
                          <ListItemText primary={`${key}: ${value}`} />
                        </ListItem>
                      ))
                    )}
                  </List>
                </CardContent>
              </Card>
            )}
          </React.Fragment>
        ))}
      </List>
    );
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
              onKeyPress={handleKeyPress}
              InputProps={{
                endAdornment: (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSearchSubmit}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Searching...' : 'Search'}
                  </Button>
                ),
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper style={{ padding: '20px' }}>
            <h2>DNS Records</h2>
            {renderDnsRecords()}
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper style={{ padding: '20px' }}>
            <h2>Subdomains</h2>
            <TextField
              fullWidth
              label="Search Subdomains"
              variant="outlined"
              value={subdomainsFilter}
              onChange={handleSubdomainsFilterChange}
            />
            <Card style={{ maxHeight: '300px', overflowY: 'auto', marginTop: '10px' }}>
              <CardContent>
                <ul>
                  {filteredSubdomains?.map((subdomain: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined, index: React.Key | null | undefined) => (
                    <li key={index}>{subdomain}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Dashboard;