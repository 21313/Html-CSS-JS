import React from "react"
import * as firebase from 'firebase';
import NavBarSignOut from '../navBar/navBarSignOut';
import { Link, browserHistory } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { List, ListItem } from 'material-ui/List';



class ViewCompany extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewCompany: []
        }
    }
    componentDidMount() {
        const refRoot = firebase.database().ref('user').orderByChild('typeOfUser').equalTo('company').once('value', snapshot => {
            var userObj = snapshot.val();
            console.log(userObj)
            if (userObj === null) {
                alert("There is no Record Of Company in our Database");
                browserHistory.push('admin');
            }
            else {
                let vm = this;
                let obj = [];
                Object.keys(userObj).forEach(function (key) {
                    obj = userObj[key]
                    obj.id = key
                    vm.state.viewCompany.push(obj)
                    vm.setState({ viewCompany: vm.state.viewCompany })
                });
            }
            console.log(this.state.viewCompany);
        })
    }
    render() {
        return firebase.auth().currentUser ? (
            <div>
                <NavBarSignOut />
                <center>
                    <h1>Registered Companies</h1>
                    <MuiThemeProvider>
                        <List>
                            {this.state.viewCompany.map((data, index) => (
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
                        <FlatButton onClick={() => (browserHistory.push('student'))} label="Go back to the Student Panel" primary={true} />
                    </MuiThemeProvider>
                </center>
            </div>
        ) : (<div>{browserHistory.push('login')}</div>)
    }
}
export default ViewCompany;