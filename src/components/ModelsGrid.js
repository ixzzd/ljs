import React from "react";
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react';

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
  }

  getModelURI(model) {
    return `/${model.city}/${model.name.toLowerCase()}`
  }

  render() {
    return (
      <div className='models-wrapper'>
        {this.store.filteredModels.map(model => (
          <div className='model' key={model.id}>
            <Link to={this.getModelURI(model)}>
              <img src={model.avatar_url}/>
            </Link>
          </div>
        ))}
      </div>
    );
  }
}
