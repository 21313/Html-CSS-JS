import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Link, browserHistory } from 'react-router';
import NavBarSignOut from '../navBar/navBarSignOut';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { List, ListItem } from 'material-ui/List';

class ViewStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewStudent: []
    }
  }
  componentDidMount() {
    firebase.database().ref('user').orderByChild('typeOfUser').equalTo('student').once('value').then(snapshot => {
      const refRoot = snapshot.val();
      console.log(refRoot);
      let student = [];
      for (let key in refRoot) {
        student.push(refRoot[key]);
      }
      console.log(student)
      this.setState({ viewStudent: student })
    })
  }
  render() {
    return (
      firebase.auth().currentUser ? (
        <div>
          <NavBarSignOut />
          <center><h1>Student List</h1>
            <MuiThemeProvider>
              <List>
                {this.state.viewStudent.map((data, index) => (
                  <ListItem
                    key={index}
                    insetChildren={true}
                    primaryText={data.uName}
                    secondaryText={data.uEmail}
                  />
                ))}
              </List>
            </MuiThemeProvider>
            <MuiThemeProvider>
              <FlatButton onClick={() => (browserHistory.push('company'))} label="Go back to the Student Panel" primary={true} />
            </MuiThemeProvider>
          </center>
        </div>
      ) : (<div>{browserHistory.push("login")}</div>)
    );
  }
}
export default ViewStudent;
