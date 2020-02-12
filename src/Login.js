import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import loginAction from './actions/loginAction';
import {connect} from 'react-redux';
import store from './store';
import gotPrefsAction from './actions/gotPrefsAction';
import Welcome from './Welcome';

class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {email:"", pass:"", error:null, welcome:false};
	}
	submit(event) {
		event.preventDefault();
		this.props.firebase.login(this.state.email, this.state.pass)
			.then(res=>{
				this.setState({email:"",pass:""});
				this.props.history.push("/home");	
				this.props.setLogin(res.user);
				this.props.firebase.getPrefs().then(res=>{
					store.dispatch(gotPrefsAction( res.val() ));
				})
			})
			.catch(error=>{
				this.setState({error:error});
			});
	}
	change(event) {
		this.setState({[event.target.name]:event.target.value});
	}
	guestLogin() {
		this.props.firebase.login(null,null).then(res=>{
			this.props.setLogin(res.user);
			this.setState({email:"",pass:"", welcome:true});
		});
	}
	render() {
		if (!this.state.welcome) {
			return (
			<div>
				<form className="form-group col-6" onSubmit={this.submit.bind(this)}>
					<label> Email: </label>
					<input name="email" className="form-control" value={this.state.email} onChange={this.change.bind(this)}/>
					<label> Password: </label>
					<input type="password" name="pass" className="form-control" value={this.state.pass} onChange={this.change.bind(this)}/>
					<p></p>
					<button className="form-control">submit</button>
					{this.state.error? <p>{this.state.error.message}</p> : null }
					<p>Don't have an account? <Link to='/signup'> Sign Up! </Link></p>
					<button type="button" className="form-control" onClick={this.guestLogin.bind(this)}>Continue as Guest</button>
				</form>
			</div>);
		}
		else {
			return <Welcome /> 
		}
	}
}
let mapStateToProps = function(state) {return {...state}};
let mapDispatchToProps = function(dispatch) {
	return {
		setLogin : name => dispatch(loginAction(name))
	};
}
let Connected = connect(mapStateToProps, mapDispatchToProps)(LoginForm);
const Login = withRouter(Connected);
export default Login;