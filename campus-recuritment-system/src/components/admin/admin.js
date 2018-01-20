import React, { Component } from 'react';
import * as firebase from 'firebase';
import {Link,browserHistory} from 'react-router';
import NavBarSignOut from '../navBar/navBarSignOut';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

const style = {
  display: 'inline-block',
  margin: '16px 32px 16px 20px',
};

class Admin extends Component {
  render() {
      return(
        firebase.auth().currentUser ? (
      <div>
          <NavBarSignOut />
          <center><h1>Admin Panel</h1></center>
           {/* <Link to="viewdelstd">View Student</Link><br />
           <Link to="viewdelcmp">View Companies</Link><br /> */}
           <MuiThemeProvider>
            <Paper style={style}>
              <Menu>
                <MenuItem primaryText="View OR Delete Student" onClick={()=>(browserHistory.push('viewdelstd'))}/>
                <MenuItem primaryText="View OR Delete Company" onClick={()=>(browserHistory.push('viewdelcmp'))}/>
              </Menu>
            </Paper>
          </MuiThemeProvider>
           
      </div>
        ) : (<div>{browserHistory.push("login")}</div>)
      );
  }
}

export default Admin;