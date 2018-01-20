import React from 'react';
import * as firebase from 'firebase';
import NavBarSignOut from '../navBar/navBarSignOut';
import { Link, browserHistory } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar from 'material-ui/Snackbar';

class ViewJob extends React.Component {
    constructor() {
        super();
        this.state = {
            viewJob: [],
            jobKeys: []
        }
    }
    componentDidMount() {
        const refRoot = firebase.database().ref('jobs').on('value', snap => {
            var userObj = snap.val();
            console.log(userObj);
            if (userObj === null) {
                alert('There is no Job Posted By Any Company');
                browserHistory.push('student');
            }
            else {
                var jobs = [];
                var postKey = [];
                for (let key in userObj) {
                    console.log(userObj);
                    console.log(key);
                    jobs.push(userObj[key]);
                    console.log(jobs);
                    postKey.push(key);
                    console.log(postKey);
                }
                this.setState({
                    viewJob: jobs,
                    jobKeys: postKey
                })
            }
        })
    }
    applyJob(i) {
        firebase.database().ref('update Profile').child(firebase.auth().currentUser.uid).on('value', snap => {
            const userObj = snap.val();
            console.log(userObj);
            if (userObj === null) {
                alert("You Should First Have to create CV!!");
                browserHistory.push('student');
            }
            else {
                firebase.database().ref('jobs/' + this.state.jobKeys[i] + '/appliers').child(firebase.auth().currentUser.uid).set(
                    userObj
                );
                this.setState({
                    open: true,
                });
            }
        })
    }
    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };
    render() {
        return (
            firebase.auth().currentUser ?
                (
                    <div>
                        <NavBarSignOut />
                        <center> <h1>Vicancies</h1>
                            {this.state.viewJob.map((data, index) => (
                                <div key={index} className="container">

                                    <table className="table">
                                        <thead >
                                            <tr>
                                                <th>Job Title</th>
                                                <th>education</th>
                                                <th>skills</th>
                                                <th>Email</th>
                                                <th>Company Name</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{data.jobTitle}</td>
                                                <td>{data.education}</td>
                                                <td>{data.skills}</td>
                                                <td>{data.email}</td>
                                                <td>{data.companyName}</td>
                                                <button className="btn btn-primary" onClick={this.applyJob.bind(this, index)}>Apply</button>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>))}
                            <MuiThemeProvider>
                                <FlatButton onClick={() => (browserHistory.push('student'))} label="Go back to the Student Panel" primary={true} />
                            </MuiThemeProvider>
                            <MuiThemeProvider>
                                <Snackbar
                                    open={this.state.open}
                                    message="Apply Successfully"
                                    autoHideDuration={4000}
                                    onRequestClose={this.handleRequestClose}
                                />
                            </MuiThemeProvider>
                        </center>
                    </div>
                )
                :
                (<div>{browserHistory.push("login")}</div>)

        );
    }
}
export default ViewJob;