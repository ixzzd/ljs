import React from "react";
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react';
import LazyLoad from 'react-lazyload';
import {Helmet} from "react-helmet";
import { forceCheck } from 'react-lazyload';
import Filters from "./Filters";

@inject("store")
@observer
export default class ModelsGrid extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.store.appState;
  }

  componentDidMount() {
    let city = this.props.match.params.city
    if (city) { this.store.setCity(city) }
    this.store.setModel('')
  }

  componentWillUpdate() {
    forceCheck()
  }

  getModelURI(model) {
    return `/${this.store.city.replace(/ /g,"%20")}/${model.name.toLowerCase()}`
  }

  render() {
    let models = this.store.filteredModels;

    return (
      <div>
        <Helmet>
          <title>LUMPEN</title>
          <link rel="canonical" href={'https://lumpen.agency/' + this.store.city } />
          <meta property="og:title" content={this.store.city.toUpperCase()} />
          <meta property="og:site_name" content="lumpen.agency" />
          <meta property="og:url" content={'https://lumpen.agency/' + this.store.city} />
          <meta property="og:image" content="https://lumpen.ams3.digitaloceanspaces.com/logo.png" />
          <link rel="image_src" href="https://lumpen.ams3.digitaloceanspaces.com/logo.png" />
        </Helmet>

        <Filters />
        <div className='models-wrapper'>
          {models.map(model => (
            <div className='model' key={model.id}>
              <Link to={this.getModelURI(model)}>
                {/* <LazyLoad offset={1000} height={380}> */}
                  <img src={model.avatar.normal}/>
                {/* </LazyLoad> */}
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
