import React from "react";
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react';
import ProgressiveImage from 'react-progressive-image'
import {Helmet} from "react-helmet";
import { forceCheck } from 'react-lazyload';
import LazyLoad from 'react-lazyload';

@inject("store")
@observer
export default class ModelsGrid extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.store.appState;
  }

  componentDidMount() {
    this.store.setModel('')
  }

  componentDidUpdate() {
    let city = this.props.match.params.city
    if (city) { this.store.setCity(city) }
  }

  componentWillUpdate() {
    // forceCheck()
  }

  getModelURI(model) {
    return `/${this.store.city.replace(/ /g,"%20")}/${model.name.toLowerCase()}`
  }

  render() {
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

        <div className='models-wrapper'>
          {this.store.models && this.store.filteredModels.map(model => (
            <div className='model' key={model.id}>
              <Link to={this.getModelURI(model)}>
                <LazyLoad offset={1140} height={380}>
                  <img src={model.avatar.normal} alt={model.name} />
                </LazyLoad>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
