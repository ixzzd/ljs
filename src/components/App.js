import React, { Component } from "react";
import { Route, Link, withRouter, Switch } from "react-router-dom";
import { inject, observer } from "mobx-react";
import LazyRoute from "lazy-route";
// import { YMInitializer } from 'react-yandex-metrika';

import Header from "./Header";
import ModelsGrid from "./ModelsGrid";
import ModelsFlow from "./ModelsFlow";
import Contacts from "./Contacts";
import About from "./About";
import ReactLoading from 'react-loading';

@inject("store")
@withRouter
@observer
export default class App extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
  }
  componentDidMount() {
    this.store.fetchData();
  }

  render() {
    console.log(this)
    return (
      <div>
        {this.store.isLoaded ?

          <div className="wrapper">
            {/* <YMInitializer accounts={[25972483]} /> */}
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

          :

          <div className="loaderWrapper">
            <div className="loader">
              <div className='logo'>LUMPEN</div>
              <ReactLoading color={"#000000"} type={"bars"} width={120} />
            </div>
          </div>

        }
      </div>
    );
  }
}
