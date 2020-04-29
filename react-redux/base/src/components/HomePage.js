import React from 'react';
// UI Components
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


function HomePage(props) {
  return (
    <>
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="center"
        style={{
          position: 'absolute',
          top: '40%',
        }}
      >
        <Grid container item xs={12} direction="row" alignItems="center" justify="center" style={{padding: '5em'}}>
          <Button variant="contained">Fetch Poeple</Button>
        </Grid>
      </Grid>
    </>
  );
}

export default HomePage;
