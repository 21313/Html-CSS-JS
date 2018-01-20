import React from "react"
import * as firebase from 'firebase';
import NavBarSignOut from '../navBar/navBarSignOut';
import { Link, browserHistory } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';



class MyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myProfile: []
    }
  }
  componentDidMount() {
    const refRoot = firebase.database().ref();
    const activeUser = firebase.auth().currentUser.uid;
    const rootRef = refRoot.child('update Profile').orderByChild('sId').equalTo(activeUser);
    rootRef.on('value', snapshot => {
      var userObj = snapshot.val();
      console.log(userObj);
      if (userObj === null) {
        alert("Profile Not Created yet ");
        browserHistory.push('student');
      }
      else {
        let vm = this;
        let obj = [];
        let keys = [];
        Object.keys(userObj).forEach(function (key) {
          obj = userObj[key]
          vm.state.myProfile.push(obj)
          vm.setState({
            myProfile: vm.state.myProfile,
          })
        });
      }
    })
  }

  render() {
    return firebase.auth().currentUser ? (
      <div>
        <NavBarSignOut />
        <center> <h1>Profile</h1> </center>
        <MuiThemeProvider><FlatButton onClick={()=>(browserHistory.push('student'))} label="Go back to the Student Panel" primary={true} /></MuiThemeProvider>
        {this.state.myProfile.map((data, index) => (
          <div key={index} className="container">
            <table className="table">
              <thead >
                <tr>
                  <th>Name</th>
                  <th>Education</th>
                  <th>Skills</th>
                  <th>Email</th>
                  <th>GPA</th>
                  <th>Experience</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{data.sName}</td>
                  <td>{data.education}</td>
                  <td>{data.skills}</td>
                  <td>{data.sEmail}</td>
                  <td>{data.gpa}</td>
                  <td>{data.experience}</td>
                </tr>
              </tbody>
            </table>

          </div>))}
        {/* <Link to="student" className="btn btn-primary">
          Go Back student Panel
  </Link> */}
      </div>
    ) : (<div>{browserHistory.push('login')}</div>)
  }
}
export default MyProfile;