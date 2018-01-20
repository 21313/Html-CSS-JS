import React, { Component } from 'react';
import * as firebase from 'firebase';
import { browserHistory } from 'react-router';
import NavBar from '../../components/navBar/navBar';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';



const style = {
    height: 400,
    width: 300,
    margin: '16px 32px 16px 60px',
    textAlign: 'center',
    display: 'inline-block',
    radioButton: {
        marginBottom: 0,
    },
};


class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            user: null,
            email: '',
            password: '',
            name: ''
        }
    }

    SignUp(ev) {
        ev.preventDefault();
        var email = this.state.email;
        var password = this.state.password;
        var name = this.state.name;
        console.log(email);
        console.log(password);
        const auth = firebase.auth();
        if (this.state.user == null) {
            alert('please select type first')
        }
        else {
            auth.createUserWithEmailAndPassword(email, password).catch(function (error) {
                alert(error);
            }).then(() => {
                firebase.auth().currentUser.updateProfile({
                    displayName: name
                }); console.log(this.state.user);
                browserHistory.push("/login");
                var rootRef = firebase.database().ref("user" + "/" + firebase.auth().currentUser.uid).set({
                    uName: name,
                    uEmail: email,
                    uPassword: password,
                    typeOfUser: this.state.user
                });
            });
        }
    }
    setUser(event) {
        this.setState({
            user: event.target.value
        });
    }
    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <center>
                        <Paper style={style} zDepth={2}>
                            <h3>SignUp</h3>
                            <TextField
                                hintText="Name"
                                floatingLabelText="Enter FullName"
                                onChange={(e) => (this.setState({ name: e.target.value }))}
                            />
                            <TextField
                                hintText="Email"
                                floatingLabelText="Email"
                                onChange={(e) => (this.setState({ email: e.target.value }))}
                            />
                            <TextField
                                hintText="Password"
                                floatingLabelText="*****"
                                type="password"
                                onChange={(e) => (this.setState({ password: e.target.value }))}
                            />
                            <RaisedButton label="SignUp" onClick={this.SignUp.bind(this)} primary={true} />
                            <RadioButtonGroup name="shipSpeed" onChange={this.setUser.bind(this)} defaultSelected="not_light">
                                <RadioButton
                                    value="student"
                                    label="Student"
                                    style={style.radioButton}
                                />
                                <RadioButton
                                    value="company"
                                    label="Company"
                                    style={style.radioButton}
                                />
                            </RadioButtonGroup>
                        </Paper>
                    </center>
                </MuiThemeProvider>
            </div>

        );
    }
}
export default SignUp;