import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin';
import './navBar.css';
import {Link} from 'react-router';
import * as mat from 'material-ui';
import * as firebase from 'firebase';

// injectTapEventPlugin();

let style = {
    button : {
        color : '#fafbfc',
        fontFamly : 'Verdana'
    },
};
//  <Link to="/login" className="btn btn-danger" onClick={this.SignOut.bind(this)} > SignOut </Link> <br />
class NavBarSignOut extends Component {
      SignOut(){
    firebase.auth().signOut();
  }
    render() {
        return (
            <div>
            <MuiThemeProvider>
                <AppBar 
                showMenuIconButton={false}
                title="Campus Recuritment System" 
                iconElementRight={
                   <span>
                         <Link to="/login" onClick={this.SignOut.bind(this)}>
                            <mat.FlatButton style={style.button} label="SignOut" />
                         </Link>
               </span>
                }
                />  
            </MuiThemeProvider>
            </div>
        );
    }
}

export default NavBarSignOut;
