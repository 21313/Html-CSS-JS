
import React from "react"
import * as firebase from 'firebase';
import NavBarSignOut from '../navBar/navBarSignOut';
import { Link, browserHistory } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { List, ListItem } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
    margin: 0,
    padding: 0
};


class ViewDeleteCompany extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewCompany: [],
            deleteCompany: []
        }
    }
    componentWillUnMount(){
        this.state.viewCompany = 0
    }
    componentDidMount() {
        const refRoot = firebase.database().ref('user/').orderByChild('typeOfUser').equalTo('company').on('value', snapshot => {
            var userObj = snapshot.val();
            if (userObj === null) {
                alert("There is no Record Of Company in our Database");
                browserHistory.push('admin');
            }
            else {
                let vm = this;
                let obj = [];
                let deleteCompany = [];
                Object.keys(userObj).forEach(function (key) {
                    obj = userObj[key]
                    obj.id = key
                    deleteCompany.push(key);
                    console.log(deleteCompany)
                    vm.state.viewCompany.push(obj)
                    vm.setState({ viewCompany: vm.state.viewCompany, deleteCompany: deleteCompany })
                });
            }
            console.log(this.state.viewCompany);
        })
    }
    deleteComp(i) {
        firebase.database().ref('user/' + this.state.deleteCompany[i]).remove();
        alert('succesFull Deleted')
    }
    render() {
        return firebase.auth().currentUser ? (
            <div>
                <NavBarSignOut />
                <center>
                    <h1>Student List</h1>
                    {this.state.viewCompany.map((data, index) => (
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
                                            <RaisedButton label="Remove" onClick={this.deleteComp.bind(this, index)} secondary={true} style={style} />
                                        </MuiThemeProvider>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    ))}
                    <MuiThemeProvider>
                        <FlatButton label="Go back to the Admin" primary={true} onClick={() => (browserHistory.push('admin'))} />
                    </MuiThemeProvider>
                </center>
            </div>
        ) : (<div>{browserHistory.push('login')}</div>)
    }
}
export default ViewDeleteCompany;