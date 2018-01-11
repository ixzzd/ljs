import React from "react";
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react';
import LazyLoad from 'react-lazyload';

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

  getModelURI(model) {
    return `/${this.store.city}/${model.name.toLowerCase()}`
  }

  renderGrid(models) {
    return (
      <div className='models-wrapper'>
        {models.map(model => (
          <div className='model' key={model.id}>
            <Link to={this.getModelURI(model)}>
              <LazyLoad height={200}>
                <img src={model.avatar_url}/>
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
        { this.renderMansGrid() }
        { this.renderWomensGrid() }
      </div>
    );
  }
}
