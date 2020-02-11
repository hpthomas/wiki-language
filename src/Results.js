import React from 'react';
import Result from './Result';

//TODO: UUID key or terrm+index key or something
function Results(props) {
	return (!props.items)? null : 
	( 
		<ul className="list-group">
		{props.items.map((item,index) => 
			<li key={index} className="list-group-item">
				<Result prefs={props.prefs} data={item} />
			</li>
		)}
		</ul>
	);
}

export default Results;