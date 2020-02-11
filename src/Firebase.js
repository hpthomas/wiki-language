import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/functions';
import defaultPrefs from './defaultPrefs';
import store from './store';
import loginAction from './actions/loginAction';
import gotPrefsAction from './actions/gotPrefsAction';
var firebaseConfig = {
    apiKey: "AIzaSyA-nW21JGoMUfz5JyI5cFQiJL8_9etUXBw",
    authDomain: "react-language.firebaseapp.com",
    databaseURL: "https://react-language.firebaseio.com",
    projectId: "react-language",
    storageBucket: "",
    messagingSenderId: "624932585997",
    appId: "1:624932585997:web:14319ed2f1ff3514"
};

let defaultUserState = {prefs: defaultPrefs}
class Firebase {
	// stateChange is a funciton called whenever a successful login/out occurs
	constructor() {
		app.initializeApp(firebaseConfig);
		this.auth = app.auth();
		this.db = app.database();
		this.functions = app.functions();
		window.auth=this.auth;
		this.userState = defaultUserState;
		this.unsub = this.auth.onAuthStateChanged(user=>{
			if (user) {
				store.dispatch(loginAction(user.email));
				this.getPrefs().then(res=>{
					let prefs = res.val();
					if (prefs) {
						store.dispatch(gotPrefsAction( prefs ));
					}
				});
			}
			this.unsub(); //unsubscribe to auth change - only want this to run once 
		});
	}

	email() {
		return this.auth.currentUser ? this.auth.currentUser.email : null;
	}

	createUser = (email, pass) => {
		return this.auth.createUserWithEmailAndPassword(email,pass);
	}

	login = (email, pass)=> {
		if (!email || !pass) {
			return this.auth.signInAnonymously();
		}
		return this.auth.signInWithEmailAndPassword(email, pass);
	}

	logOut = ()=> {
		return this.auth.signOut();
	}

	resetPass = (email) => {
		return this.auth.sendPasswordResetEmail(email);
	}

	updatePass = (newPass) => {
	    return this.auth.currentUser.updatePassword(newPass);
	}
	getPrefs = () => {
		if (!this.auth.currentUser) return null;
		return this.db.ref('/users/' + this.auth.currentUser.uid + '/prefs').once('value');
	}
	setPrefs = (newPrefs) => {
		if (!this.auth.currentUser) return null;
		let prefs = this.db.ref('/users/' + this.auth.currentUser.uid + '/prefs');
        console.log(newPrefs);
		prefs.update(newPrefs);
	}
	translate = (text, source, target) => {
		let params = {text: text, source:source, target:target};
		return this.functions.httpsCallable('translate')(params);
	}
}

export default Firebase;
