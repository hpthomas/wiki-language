import React from 'react';
import {Link} from 'react-router-dom';
/*
TODO
Explain purpose & scope of app
Demo obvious functionality? e.g. pre-loaded article w/ lang dropdowns
*/
let Landing = ()=>(
	  <div className="container-fluid landing">
	    <div className="row">
      		<div className="col-lg-6">
				<h3>
					LingBash is a language learning tool!
				</h3>
				<p>
					Designed to help users with vocabulary and reading comprehension, LingBash allows users to read wikipedia articles in your goal language without viewing translations.
					The articles are displayed section-by-section. If you reach a section you don't fully understand, you can view a translation into your native language.
					Try to read as much as you can without translating!
				</p>


				<p>
					This demo page provides a preview of it's core functionality.
					To view translations, you must first <Link to='/login'> Log In </Link> or continue as a guest (available on Login page).
					Then, continue to the <Link to='/search'> Search </Link> page.
					Use the 'show preferences' menu select your goal language (the language you are learning) and your home language.
				</p>
				<p>
					Finally, simply search for articles in your goal language!
				</p>
      </div>
    </div>
  </div>

	)
export default Landing;