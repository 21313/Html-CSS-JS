import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Link, browserHistory } from 'react-router';
import NavBarSignOut from '../navBar/navBarSignOut';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
const style = {
  display: 'inline-block',
  margin: '16px 32px 16px 20px',
};

class Student extends Component {
  render() {
    return (
      firebase.auth().currentUser ? (
        <div>
          <NavBarSignOut />
          <center><h1>Student Panel</h1></center>
          <MuiThemeProvider>
            <Paper style={style}>
              <Menu>
                <MenuItem primaryText="View Jobs" onClick={()=>(browserHistory.push('viewjobs'))}/>
                <MenuItem primaryText="View Companies" onClick={()=>(browserHistory.push('viewcompany'))}/>
                <MenuItem primaryText="Create Your CV" onClick={()=>(browserHistory.push('createcv'))}/>
                <MenuItem primaryText="My Profile" onClick={()=>(browserHistory.push('myProfile'))}/>                
              </Menu>
            </Paper>
          </MuiThemeProvider>
        </div>
      ) : (<div>{browserHistory.push("login")}</div>)
    );
  }
}

export default Student;
