import React from 'react';
import App from './App';
function NewComp() {
    var nc = <div className="NewComp"><App a="Thing" b={100}  /></div>;
    return (nc);
}
export default NewComp;
