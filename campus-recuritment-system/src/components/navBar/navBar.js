import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin';
import './navBar.css';
import {Link} from 'react-router';
import * as mat from 'material-ui';
injectTapEventPlugin();

let style = {
    button : {
        color : '#fafbfc',
        fontFamly : 'Verdana'
    },
};

class NavBar extends Component {
    render() {
        return (
            <div>
            <MuiThemeProvider>
                <AppBar 
                showMenuIconButton={false}
                title="Campus Recuritment System" 
                iconElementRight={
                   <span>
                        <Link to="/signup">
                            <mat.FlatButton style={style.button} label="Sign Up" />
                        </Link>
                         <Link to="/login">
                            <mat.FlatButton style={style.button} label="Login" />
                         </Link>
               </span>
                }
                />  
            </MuiThemeProvider>
            {this.props.children}
            </div>
        );
    }
}

export default NavBar;
