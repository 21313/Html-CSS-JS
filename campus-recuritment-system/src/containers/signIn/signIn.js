import React, { Component } from 'react';
import * as firebase from 'firebase';
import { browserHistory, Link } from 'react-router';
import NavBar from '../../components/navBar/navBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';


const style = {
  height: 300,
  width: 300,
  margin: '16px 32px 16px 60px',
  textAlign: 'center',
  display: 'inline-block',
};


class SignIn extends Component {
  constructor(){
    super();
    this.state = {
      email: '',
      password: ''
    }
  }
  componentWillMount() {
    firebase.auth().onAuthStateChanged(() => {
      if (firebase.auth().currentUser) {
        firebase.database().ref('user/' + firebase.auth().currentUser.uid).once('value', function (snap) {
          var type = snap.val().typeOfUser;
          if (type === "student") {
            browserHistory.push('student');
          }
          else if (type === "company") {
            browserHistory.push('company');
          }
          else if (type === "admin"){
            browserHistory.push('admin');
          }
        })
      }
      else {
        browserHistory.push('login');
      }
    })
  }
  SignIn(ev) {
    ev.preventDefault();
    var username;
    var email = this.state.email;
    var password = this.state.password;
    console.log(email);
    console.log(password);
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      // browserHistory.push("/dashboard");
      var userId = firebase.auth().currentUser.uid;
      return firebase.database().ref('user/' + userId).once('value').then(function (snapshot) {
        username = snapshot.val().typeOfUser;
        console.log(username);
        if (username === "student") {
          browserHistory.push('student');
        }
        else if (username === "company") {
          browserHistory.push('company');
        }
        else if(username === "admin"){
          browserHistory.push('admin');
        }
      });
    }).catch(function (error) {
      // Handle Errors here.
      alert(error);
      // ...
    });
  }
  render() {
    return (
      <div>
        <center>
          <MuiThemeProvider>
            <Paper style={style} zDepth={2}>
              <h3>SignIn</h3>
              <TextField
                hintText="Email"
                floatingLabelText="Email"
                ref="email"
                onChange={(e)=>(this.setState({email: e.target.value}))}
              />
              <TextField
                hintText="******"
                floatingLabelText="Password"
                type="password"
                ref="password"
                onChange={(e)=>(this.setState({password: e.target.value}))}
              />
              <RaisedButton label="Login" onClick={this.SignIn.bind(this)} primary={true} />
            <Link to="/signup">You Don't Have an Account</Link>
            </Paper>
          </MuiThemeProvider>
        </center>
      </div>
    );
  }
}

export default SignIn;
