import { createStore } from 'redux';
import Firebase from './Firebase';
import defaultPrefs from './defaultPrefs';
//import rootReducer from './reducers/rootReducer';

function mainReducer(state, action) {
	console.log("Responding to: ");
	console.log(action);
	switch (action.type) {
		case 'LOGIN_ACTION':
			return {...state, user:action.payload}
		case 'LOGOUT_ACTION':
			return {...state, user:null}
		case 'GOT_PREFS':
			console.log("got prefs:" + action.prefs);
			return {...state, prefs:action.prefs}
		default:
			return state
	}
}
function defaultState() {
	return {
		user: null,
		prefs: defaultPrefs,
		firebase: new Firebase()
	}
}
export default createStore(
  mainReducer,
  defaultState() );
