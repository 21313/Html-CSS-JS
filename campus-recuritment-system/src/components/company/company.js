import React, { Component } from 'react';
import * as firebase from 'firebase';
import {Link,browserHistory} from 'react-router';
import NavBarSignOut from '../navBar/navBarSignOut';
import PostJob from '../jobs list/postJob';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
const style = {
    display: 'inline-block',
    margin: '16px 32px 16px 20px',
  };

class Company extends Component {
  render() {
      return(
          firebase.auth().currentUser ? (
      <div>
          <NavBarSignOut />
        <center><h1>Company Panel</h1></center>
        <MuiThemeProvider>
            <Paper style={style}>
              <Menu>
                <MenuItem primaryText="View Students" onClick={()=>(browserHistory.push('viewStudent'))}/>
                <MenuItem primaryText="Post Job" onClick={()=>(browserHistory.push('postjob'))}/>
                <MenuItem primaryText="My Posted Jobs" onClick={()=>(browserHistory.push('myjobs'))}/>
              </Menu>
            </Paper>
          </MuiThemeProvider>
        
      </div>
          ) : (<div>{browserHistory.push("login")}</div>)
      );
  }
}

export default Company;



{/* <MuiThemeProvider>
                      <RaisedButton label="Secondary" secondary={true} onClick={this.deleteStd.bind(this, index)} style={style} />
                    </MuiThemeProvider> */}