import React from 'react';
import languages from './Languages';

let msg = "Please select a different source and target language!";

// The state for this component is the current selection
// maintained temporarily while prefs form open 
// chhanges only apply when saved
class Prefs extends React.Component {
	constructor(props){
		console.log(props);
		super(props);
		// set component state to prior preferences
		var {src,target} = props.priorPrefs;
		this.state = {src:src,target:target, invalid:false};
	}

	save() {
		this.props.save({src:this.state.src, target:this.state.target});
	}

    change(event) {
        let val = event.target.value;
        let changed = event.target.name;
        let other = changed==='src'?'target':'src';
        this.setState( { 
            [changed]: val, 
            invalid: (val===this.state[other])
        });
    }
	cancel() {
		this.props.save(null);
	}
	render() {
		return  (
			<div className="form-group col-6">
				<label> Source Language (articles will appear in this language):</label>
				<select value={this.state.src} onChange={this.change.bind(this)} className="form-control" name="src">
					{languages.map((lang,i) =>  (
						<option key={i} value={lang.abbr}>
							 	{lang.full}
					 	</option>)
					)}
				</select>

				<label > Target Language (articles will be translated into this language):</label>
				<select value={this.state.target} onChange={this.change.bind(this)} className="form-control" name="target">
					{languages.map((lang,i) =>  (
						<option key={i} value={lang.abbr}>
							 	{lang.full}
					 	</option>)
					)}
				</select>

				<button disabled={this.state.invalid} onClick={this.save.bind(this)}>save</button>
				<button onClick={this.cancel.bind(this)}>cancel</button>
				{this.state.invalid? <p>{msg}</p> : null}
			</div>
		)
	}
}
export default Prefs;
