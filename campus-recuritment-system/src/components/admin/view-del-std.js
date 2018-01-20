import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Link, browserHistory } from 'react-router';
import NavBarSignOut from '../navBar/navBarSignOut';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { List, ListItem } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 0,
  padding: 0
};

class ViewDeleteStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewStudent: [],
      deleteStd: []
    }
  }
  componentDidMount() {
    firebase.database().ref('user').orderByChild('typeOfUser').equalTo('student').once('value').then(snapshot => {
      const refRoot = snapshot.val();
      console.log(refRoot);
      let student = [];
      let deleteStd = [];
      for (let key in refRoot) {
        student.push(refRoot[key]);
        deleteStd.push(key);
      }
      console.log(student)
      console.log(deleteStd)
      this.setState({ viewStudent: student, deleteStd: deleteStd })
    })
  }

  deleteStd(i) {
    firebase.database().ref('user/' + this.state.deleteStd[i]).remove();
  }
  render() {
    return (
      firebase.auth().currentUser ? (
        <div>
          <NavBarSignOut />
          <center>
            <h1>Student List</h1>
            {this.state.viewStudent.map((data, index) => (
              <table key={index} className="table">
                <tbody>
                  <tr>
                    <td>
                      <MuiThemeProvider Key={index}>
                        <List>
                          <ListItem
                            insetChildren={true}
                            primaryText={data.uName}
                            secondaryText={data.uEmail}
                          />
                        </List>
                      </MuiThemeProvider>
                    </td>
                    <td>
                      <MuiThemeProvider>
                        <RaisedButton label="Remove" onClick={this.deleteStd.bind(this, index)} secondary={true} style={style} />
                      </MuiThemeProvider>
                    </td>
                  </tr>
                </tbody>
              </table>
            ))}
            <MuiThemeProvider>
              <FlatButton label="Go back to the Admin" primary={true} onClick={()=>(browserHistory.push('admin'))} />
            </MuiThemeProvider>
          </center>
        </div>
      ) : (<div>{browserHistory.push("admin")}</div>)
    );
  }
}
export default ViewDeleteStudent;


{/* <div key={index} className="container">
    <table className="table">
        <thead >
      <tr>
        <th>Name</th>
        <th>Email</th>   
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{data.uName}</td>
        <td>{data.uEmail}</td>
        <td><button className='btn btn-danger' onClick={this.deleteStd.bind(this,index)}>Remove</button></td>
        
      </tr>
    </tbody>
  </table>
    
</div>    */}