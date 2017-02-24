

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './foundation.css'

var Messages = React.createClass({

	render: function(){

		return(

			<div>
                <ul>
                	{this.props.data.map(({id, msg}) =><li key={id}>{msg}</li>)}
                </ul>
            </div>


			);
	}
}
)
module.exports = Messages;