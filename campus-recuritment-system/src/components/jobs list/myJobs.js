import React from "react"
import * as firebase from 'firebase';
import NavBarSignOut from '../navBar/navBarSignOut';
import { Link, browserHistory } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class MyJobs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myJob: [],
      jobKeys: [],
      applier: [],
      applierKey: []
    }
  }
  componentDidMount() {
    const refRoot = firebase.database().ref('jobs');
    console.log(refRoot)
    if (firebase.auth().currentUser !== null) {
      const rootRef = refRoot.orderByChild('cId').equalTo(firebase.auth().currentUser.uid).on('value', snapshot => {
        var userObj = snapshot.val();
        console.log(userObj);
        if (userObj === null) {
          alert('There is no record in our database');
          browserHistory.push('company');
        }
        else {
          var job = [];
          var jobKey = [];
          for (let key in userObj) {
            job.push(userObj[key]);
            console.log(job);
            jobKey.push(key)
            console.log(jobKey)
          }
        }
        this.setState({
          myJob: job,
          jobKeys: jobKey
        })
      })
    }
  }
  viewCv(i) {
    console.log(this.state.jobKeys[i])
    var refRoot = firebase.database().ref('jobs/' + this.state.jobKeys[i] + '/appliers').on('value', snap => {
      var obj = snap.val();
      console.log(obj);
      let apply = [];
      let applierKey = [];
      for (let key in obj) {
        apply.push(obj[key]);
        applierKey.push(key)
        console.log(apply)
        console.log(applierKey)

      }
      this.setState({
        applier: apply,
        applierKey: applierKey
      })
    });


  }
  deleteApplier(i) {
    // ev.preventDefault();
    var deleteApplier = this.state.applierKey[i];
    firebase.database().ref('jobs/' + this.state.jobKeys[i] + '/appliers/' + deleteApplier).remove();
    // console.log(deleteApplier)
    // firebase.database().ref('jobs/'+this.state.jobKeys[i]+'appliers/'+deleteApplier).remove();
  }
  deleteJob(i) {
    firebase.database().ref('jobs/' + this.state.jobKeys[i]).remove();
    alert('successFull Deleted!');
  }
  render() {
    return (
      firebase.auth().currentUser ? (
        <div>
          <NavBarSignOut />
          <center> <h1>Job Posted </h1> </center>
          {this.state.myJob.map((data, index) => (
            <div key={index} className="container">

              <table className="table">
                <thead >
                  <tr>
                    <th>Job Title</th>
                    <th>education</th>
                    <th>skills</th>
                    <th>Email</th>
                    <th>Company Name</th>
                    <th>Interested Candidiates</th>
                    <th>Remove Job</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{data.jobTitle}</td>
                    <td>{data.education}</td>
                    <td>{data.skills}</td>
                    <td>{data.email}</td>
                    <td>{data.companyName}</td>
                    <td><button className='btn btn-default' onClick={this.viewCv.bind(this, index)}>view Profile</button></td>
                    <td><button className="btn btn-danger" onClick={this.deleteJob.bind(this, index)}>Remove</button></td>
                  </tr>
                </tbody>
              </table>
            </div>))}
          <center>
            <MuiThemeProvider>
              <FlatButton onClick={() => (browserHistory.push('company'))} label="Go back to the Student Panel" primary={true} />
            </MuiThemeProvider>
          </center>
          <div><center> <h1>Resume Of Interested student </h1></center>
            {this.state.applier.map((data, index) => (
              <div key={index} className="container">
                <table className="table">
                  <thead >
                    <tr>
                      <th>Candidate Name</th>
                      <th>Education</th>
                      <th>Skills</th>
                      <th>GPA</th>
                      <th>Exprience </th>
                      <th> Email </th>
                      <th>Delete Applier</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{data.sName}</td>
                      <td>{data.education}</td>
                      <td>{data.skills}</td>
                      <td>{data.gpa}</td>
                      <td>{data.experience}</td>
                      <td>{data.sEmail}</td>
                      <td><button className="btn btn-danger" onClick={this.deleteApplier.bind(this, index)}>Remove</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>))}
          </div>
        </div>
      ) : (<div>{browserHistory.push('login')}</div>))
  }

}
export default MyJobs;