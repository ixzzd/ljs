import React from "react";
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react';
import LazyLoad from 'react-lazyload';
import {Helmet} from "react-helmet";
import { forceCheck } from 'react-lazyload';

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

  renderGrid(models) {
    return (
      <div className='models-wrapper'>
        {models.map(model => (
          <div className='model' key={model.id}>
            <Link to={this.getModelURI(model)}>
              <LazyLoad offset={3000} height={340}>
                <img src={model.avatar.normal}/>
              </LazyLoad>
            </Link>
          </div>
        ))}
      </div>
    )
  }

  renderMansGrid() {
    let models = this.store.filteredModels.filter(model => model.sex == 'men')
    if (models.length > 0) { return this.renderGrid(models) }
  }

  renderWomensGrid() {
    let models = this.store.filteredModels.filter(model => model.sex == 'women')
    if (models.length > 0) {
      return (
        <div>
          <div className='gridTitle'>
            <Link to='/'>
              LUMPENWOMEN
            </Link>
          </div>
          { this.renderGrid(models)}
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>LUMPEN</title>
          <link rel="canonical" href={'http://lumpen.agency/' + this.store.city } />
          <meta property="og:title" content={this.store.city.toUpperCase()} />
          <meta property="og:site_name" content="lumpen.agency" />
          <meta property="og:url" content={'http://lumpen.agency/' + this.store.city} />
          <meta property="og:image" content='http://lumpen.agency/logo.png' />
          <link rel="image_src" href='http://lumpen.agency/logo.png' />
        </Helmet>

        { this.renderMansGrid() }
        { this.renderWomensGrid() }
      </div>
    );
  }
}
