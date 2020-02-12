import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import Prefs from './Prefs';
import store from './store';
import gotPrefsAction from './actions/gotPrefsAction';
import defaultPrefs from './defaultPrefs';
import {connect} from 'react-redux';
let Welcome = (props) => (
	<div>
		<p>Welcome to LingBash! Please select a goal language and a home language to get started.</p>
	<Prefs priorPrefs={defaultPrefs} save={ (newPrefs)=> {
        store.dispatch(gotPrefsAction(newPrefs));
        props.firebase.setPrefs(newPrefs);
        props.history.push('/search');
	}} />
	</div> 
)
function mstp(state, oldProps) {
    return {...oldProps, firebase:state.firebase};
}
export default withRouter(connect(mstp)(Welcome));