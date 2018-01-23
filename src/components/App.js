import React, { Component } from "react";
import { Route, Link, withRouter, Switch } from "react-router-dom";
import { inject, observer } from "mobx-react";
import LazyRoute from "lazy-route";
import DevTools from "mobx-react-devtools";
import { YMInitializer } from 'react-yandex-metrika';

import Header from "./Header";
import ModelsGrid from "./ModelsGrid";
import ModelsFlow from "./ModelsFlow";
import Contacts from "./Contacts";


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
        <YMInitializer accounts={[25972483]} />
        <Header cities={this.store.appState.cities} />

        <div className='content'>
          <Switch>
            <Route exact path='/contacts' component={Contacts} />
            <Route exact path='/:city?' component={ModelsGrid} />
            <Route exact path='/:city/:modelName' component={ModelsFlow} />
          </Switch>
        </div>
      </div>
    );
  }
}
