import React from "react"
import NavBarSignOut from '../navBar/navBarSignOut';
import * as firebase from 'firebase';
import { Link, browserHistory } from 'react-router';
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


class CreateCV extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updateProfile: null,
            uName: '',
            uEmail: '',
            userId: '',
            education: '',
            skills: '',
            experience: '',
            gpa: '',
            open: false,
        }
    }
    componentDidMount() {
        var userId = firebase.auth().currentUser.uid;
        var name;
        var email;
        var student = firebase.database().ref().child('user/' + userId).on('value', snap => {
            name = snap.val().uName;
            email = snap.val().uEmail;
            console.log(name + ' ' + email);
            this.setState({
                uName: name,
                uEmail: email,
                userId: userId
            })
        })
    }
    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };
    updateProfile(ev) {
        ev.preventDefault();
        var education = this.state.education;
        var gpa = this.state.gpa;
        var skills = this.state.skills;
        var experience = this.state.experience;
        firebase.database().ref('update Profile').child(this.state.userId).set({
            sName: this.state.uName,
            sEmail: this.state.uEmail,
            education: education,
            gpa: gpa,
            skills: skills,
            experience: experience,
            sId: this.state.userId
        });
        this.setState({
            open: true,
        });
    }

    render() {
        return firebase.auth().currentUser ? (
            <div>
                <NavBarSignOut />
                <center>
                    <MuiThemeProvider>
                        <Paper style={style.updateProfile} zDepth={2}>
                            <h3>Update Profile</h3>
                            <TextField
                                hintText="education"
                                floatingLabelText="Education"
                                onChange={(e) => (this.setState({ education: e.target.value }))}
                            />
                            <TextField
                                hintText="gpa"
                                floatingLabelText="Your GPA"
                                onChange={(e) => (this.setState({ gpa: e.target.value }))}
                            />
                            <TextField
                                hintText="skills"
                                floatingLabelText="Skills"
                                onChange={(e) => (this.setState({ skills: e.target.value }))}
                            />
                            <TextField
                                hintText="experience"
                                floatingLabelText="Experience"
                                onChange={(e) => (this.setState({ experience: e.target.value }))}
                            /><br />
                            <RaisedButton label="submit" onClick={this.updateProfile.bind(this)} primary={true} />
                        </Paper>
                    </MuiThemeProvider>
                    <MuiThemeProvider>
                        <FlatButton onClick={() => (browserHistory.push('student'))} label="Go back to the Student Panel" primary={true} />
                    </MuiThemeProvider>
                    <MuiThemeProvider>
                        <Snackbar
                            open={this.state.open}
                            message="Job Post Successfully"
                            autoHideDuration={4000}
                            onRequestClose={this.handleRequestClose}
                        />
                    </MuiThemeProvider>
                </center>
            </div>
        ) : (<div>{browserHistory.push('student')}</div>)
    }
}
export default CreateCV;