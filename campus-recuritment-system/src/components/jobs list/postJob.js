import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Link, browserHistory } from 'react-router';
import NavBarSignOut from '../navBar/navBarSignOut';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';

const style = {
    updateProfile: {
        height: 400,
        width: 400,
    },
    display: 'inline-block',
    margin: '16px 32px 16px 20px',

};


class PostJob extends Component {
    constructor(props) {
        super(props);
        this.state = {
            job: [],
            uEmail: ' ',
            uName: ' ',
            userId: ' ',
            open: false,
            jobTitle: '',
            education: '',
            skills: '',
            experience: ''
        }
        console.log(this.state.uEmail, this.state.uName);
    }
    componentWillMount() {
        var userId = firebase.auth().currentUser.uid;
        var compEmail;
        var compName;
        var compData = firebase.database().ref().child('user/' + userId).on('value', snap => {
            compEmail = snap.val().uEmail;
            compName = snap.val().uName;
            this.setState({
                uEmail: compEmail,
                uName: compName,
                userId: userId
            })
        })
    }
    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };
    postJob(ev) {
        ev.preventDefault();
        var jobData = {
            jobTitle: this.state.jobTitle,
            education: this.state.education,
            skills: this.state.skills,
            experience: this.state.experience,
            email: this.state.uEmail,
            companyName: this.state.uName,
            cId: this.state.userId
        }
        console.log(this.state);
        //Firebase Data insert code start
        console.log(this.state);
        console.log(jobData);
        var rootRef = firebase.database().ref();
        var refRoot = rootRef.child('jobs').push(jobData);
        this.setState({
            job: jobData,// ye line kia kr rhi ha?
            open: true
        })
        // browserHistory.push('company');
        //Firebase Data insert code end
    }
   
    componentDidMount() {
        firebase.auth().onAuthStateChanged(() => {
            if (firebase.auth().currentUser) {
                firebase.database().ref('jobs').orderByChild('id').equalTo(firebase.auth().currentUser.uid).once('value').then((snap) => {
                    var obj = snap.val();
                    console.log(obj);
                    let jobs = [];
                    for (let key in obj) {
                        jobs.push(
                            obj[key]
                        )
                    }
                    console.log(jobs);
                    this.setState({ jobs })
                    console.log(this.state.jobs);
                })
            }
        })
    }
    render() {
        return (
            firebase.auth().currentUser ? (
                <div>
                    <NavBarSignOut />
                    <center>
                        <MuiThemeProvider>
                            <Paper style={style.updateProfile} zDepth={2}>
                                <h3>Post Job</h3>
                                <TextField
                                    hintText="jobTitle"
                                    floatingLabelText="jobTitle"
                                    onChange={(e) => (this.setState({ jobTitle: e.target.value }))}
                                />
                                <TextField
                                    hintText="education"
                                    floatingLabelText="Current Education"
                                    onChange={(e) => (this.setState({ education: e.target.value }))}
                                />
                                <TextField
                                    hintText="skills"
                                    floatingLabelText="Skills"
                                    onChange={(e) => (this.setState({ skills: e.target.value }))}
                                />
                                <TextField
                                    hintText="experience"
                                    floatingLabelText="Experienced?"
                                    onChange={(e) => (this.setState({ experience: e.target.value }))}
                                /><br />
                                <RaisedButton label="submit" onClick={this.postJob.bind(this)} primary={true} />
                            </Paper>
                        </MuiThemeProvider>
                        <MuiThemeProvider>
                            <FlatButton onClick={() => (browserHistory.push('company'))} label="Go back to the Company Panel" primary={true} />
                        </MuiThemeProvider>
                        <MuiThemeProvider>
                            <Snackbar
                                open={this.state.open}
                                message="Your Resume has been added in our Database"
                                autoHideDuration={4000}
                                onRequestClose={this.handleRequestClose}
                            />
                        </MuiThemeProvider>
                    </center>
                </div>
            ) : (<div>{browserHistory.push("login")}</div>)
        );
    }
}

export default PostJob;
