import React from "react"
import * as firebase from 'firebase';
import NavBarSignOut from '../navBar/navBarSignOut';
import {Link,browserHistory} from 'react-router';



class ViewJobByCompany extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            viewJob : [],
            jobKeys:[],
            cvOfStudent : []
        }
    }
    componentDidMount(){
        const refRoot = firebase.database().ref();
        const rootRef = refRoot.child('jobs');
        rootRef.on('value',snapshot=>{
            var userObj = snapshot.val();
            if(userObj === null){
                 alert("you dn't have posted job")
            }
    else{
          let vm = this;
             let obj = [];
             let keys = [];
                Object.keys(userObj).forEach(function (key) {
                 obj = userObj[key]
                 keys.push(key)

            vm.state.viewJob.push(obj)
            vm.setState({ viewJob: vm.state.viewJob})
                });
        this.setState({
            jobKeys:keys
        })
    }
            console.log(this.state.jobKeys);
            // this.setState(
            //     {viewJob : [userObj]}
            // )
        })
    }
    render(){
        return  firebase.auth().currentUser ? (
            <div>
                <NavBarSignOut />
               <center> <h1>All Job</h1> </center>
                 {this.state.viewJob.map((data , index) => (
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
      </tr>
    </tbody>
  </table>
    
</div>      ))}
 <Link to="company" className="btn btn-primary">
    Go Back Company Panel
  </Link>
            </div>
        ) : ( <div>{browserHistory.push('login')}</div> )
    }
}
export default ViewJobByCompany;