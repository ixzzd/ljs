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
import About from "./About";


@withRouter
@inject("store")
@observer
export default class App extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
  }
  componentDidMount() {
    this.store.appState.fetchData();
  }

  render() {
    return (
      <div className="wrapper">
        {/*<DevTools />*/}
        <YMInitializer accounts={[25972483]} />
        <Header />

        <div className='content'>
          <Switch>
            <Route exact path='/contacts' component={Contacts} />
            <Route exact path='/about' component={About} />
            <Route exact path='/:city?' component={ModelsGrid} />
            <Route exact path='/:city/:modelName' component={ModelsFlow} />
          </Switch>
        </div>
      </div>
    );
  }
}
