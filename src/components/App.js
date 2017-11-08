import React, { Component } from "react";
import { Route, Link, withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";
import LazyRoute from "lazy-route";
import DevTools from "mobx-react-devtools";

import Header from "./Header";
import ModelsGrid from "./ModelsGrid";
import ModelsFlow from "./ModelsFlow";

@withRouter
@inject("store")
@observer
export default class App extends Component {
	constructor(props) {
		super(props);
		this.store = this.props.store;
	}
	componentDidMount() {
		this.store.appState.loadData();
	}

	render() {
		return (
			<div className="wrapper">
				{/*<DevTools />*/}
				<Header cities={this.store.appState.cities} />

				<div className='content'>
            <Route exact path='/:city?' component={ModelsGrid} />
            <Route exact path='/:city/:modelName' component={ModelsFlow} />
        </div>
			</div>
		);
	}
}
