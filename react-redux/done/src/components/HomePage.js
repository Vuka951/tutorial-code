import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
// UI Components
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
// Actions
import {fetchUsers} from '../actions/users';


function HomePage(props) {
  const {users, fetchUsers} = props;
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
        {users.map((item) => (
          <Card variant="outlined" key={item.id}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
              Name: {item.name}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
              email: {item.email}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
              phone: {item.phone}
              </Typography>
            </CardContent>
          </Card>
        )
        )}
        <Grid container item xs={12} direction="row" alignItems="center" justify="center" style={{padding: '5em'}}>
          <Button variant="contained" onClick={fetchUsers}>Fetch People</Button>
        </Grid>
      </Grid>
    </>
  );
}

HomePage.propTypes = {
  users: PropTypes.array.isRequired,
  fetchUsers: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  users: state.users.listOfUsers,
});

const mapDispatchToProps = {
  fetchUsers,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);

