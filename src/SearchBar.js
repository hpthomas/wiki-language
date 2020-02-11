import React from 'react';
import Results from "./Results";
import Prefs from "./Prefs";
import {connect} from 'react-redux';
import store from './store';
import gotPrefsAction from './actions/gotPrefsAction';

function searchWiki(term, lang) {
    var url = "https://" + lang 
    + ".wikipedia.org/w/api.php?action=query&prop=extracts&format=json&origin=*&titles="
    + term;
    return fetch(url);
}

// TODO 
// these are not really utility functions, they're core functionality
// put them somewhere else
// also try-catch for wiki responses
function wikiResponseToHtml(response) {
    try {
        let page = response['query']['pages'];
        return page[Object.keys(page)[0]]['extract'];
    }
    catch (error) {return null;}
}

function wikiHtmlToArray(html) {
    if (!html) return;
    let page = document.createElement('div');
    page.innerHTML = html;
    return Array.from(page.children)
        .filter(n => n.nodeName === "P" || n.nodeName[0].toUpperCase()==="H")
        .filter(n => n.innerText.length > 2)
        .map(n => ({tag:n.nodeName, text:n.innerText /*, html:n.innerHTML */ }) );
}


class SearchBar extends React.Component {
    // this.state has 'value' tied real-time to search bar, 'term' on submission
    constructor(props) {
        super(props);
        this.state = {
            value:"", 
            term:"", 
            results: []}
    }

    componentDidMount() {
        console.log("mounted");
    }

    // suggestions eventually go here
    handleChange(event) {
        this.setState({value: event.target.value});
    }

    // any processing to final search term goes here
    handleSubmit(event) {
        event.preventDefault();
        searchWiki(this.state.value, this.props.prefs.src)
            .then(response => response.json())
            .then(wikiResponseToHtml) // TODO evaluate better
            .then(wikiHtmlToArray)
            .then(arr => this.setState({results: arr}));
    }

    clear(event) {
        event.preventDefault();
        this.setState({results:[]});
    }

    hidePrefs(event){
        event.preventDefault();
        this.setState({showPrefs:false});
    }

    showPrefs(event){
        event.preventDefault();
        this.setState({showPrefs:true});
    }

    // changing hides prefs window
    // pass it 'null' from Prefs to hide without change
    // TODO is that bad?
    changePrefs(newPrefs) {
        if (newPrefs) {
            // clear results on successful prefs change
            this.setState({results:[]});
            this.setState({showPrefs:false});
            store.dispatch(gotPrefsAction(newPrefs));
            this.props.firebase.setPrefs(newPrefs);
        }
        else {
            this.setState({showPrefs:false});
        }
    }

    render() {
        return (
            <div id="wrap">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <form onSubmit = {this.handleSubmit.bind(this)} >
                        <label >
                            Search:
                            <input type="text" value={this.state.value} onChange={this.handleChange.bind(this)}  />
                        </label>
                        <input type="submit" value="Submit" />
                        <button onClick={this.clear.bind(this)} >clear</button>
                        {this.state.showPrefs?
                            <button onClick={this.hidePrefs.bind(this)}>Hide Preferences</button> 
                        : 
                            <button onClick={this.showPrefs.bind(this)}>Show Preferences</button>
                        }
                        {
                            this.props.user? 
                            <span> Hello, {this.props.user.email || "anonymous"}! </span>
                            :<span>Logged out</span>
                        }
                    </form>
                </nav>
                {this.state.showPrefs ? 
                    <Prefs save={this.changePrefs.bind(this)} priorPrefs={this.props.prefs}/> 
                    : null
                }
                <Results prefs={this.props.prefs} items={this.state.results} />
            </div>
        );
    }
}
function mstp(state, oldProps) {
    return {...oldProps, firebase:state.firebase, user:state.user, prefs:state.prefs};
}
export default connect(mstp)(SearchBar);
