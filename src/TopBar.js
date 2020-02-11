import React from 'react';
import {Link, Route} from 'react-router-dom';
import SearchBar from './SearchBar';
import Landing from './Landing';
import Login from './Login';
import Signup from './Signup';
import Profile from './Profile';
import {connect} from 'react-redux';

let TopBar = props=> (
			<div>
				<div>
		        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
					<Link to={'/'}>
						<button className="btn btn-primary">Home</button>
					</Link>

					<Link to={'/home'}>
						<button className="btn btn-primary">Search</button>
					</Link>
					{props.user? 
						<button
							className="btn btn-primary" 
							onClick={()=> {props.firebase.logOut(); props.doLogout();} }>
							Log Out
						</button>
					: null }

					{ 
						/*|| props.user?
						<Link to={'/profile'}>
							<button className="btn btn-primary">Profile</button>
						</Link>
					: null */ }

					{!props.user? 
						<Link to={'/login'}>
							<button className="btn btn-primary">Log In</button>
						</Link>
					: null }

					{!props.user? 
						<Link to={'/signup'}>
							<button className="btn btn-primary">Sign Up</button>
						</Link>
					:null }
					}

				</nav>
				</div>
				<Route exact path='/' component = {Landing} />
				<Route path='/home' component = {SearchBar} />
				<Route path='/login' component = {Login} />
				<Route path='/profile' component = {Profile} />
				<Route path='/signup' component = {Signup} />
			</div>
		);
function mstp(state, ownProps) {
	return {user: state.user, firebase:state.firebase};
}
function mdtp(disp) {
	return {
		doLogout: ()=>disp({type:'LOGOUT_ACTION'})
	}
}
export default connect(mstp,mdtp)(TopBar);


