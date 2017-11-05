import React from 'react';
import Model from './ModelsFlow/Model'
import { Link } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views'
import { virtualize } from 'react-swipeable-views-utils';
import { bindKeyboard } from 'react-swipeable-views-utils';
import {withRouter} from "react-router-dom";
import { observer, inject } from 'mobx-react';

const BindKeyboardSwipeableViews = virtualize(bindKeyboard(SwipeableViews));

@inject("store")

@observer
class ModelsFlow extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.store.appState;
    this.handleNextClick = this.handleNextClick.bind(this)
    this.handlePrevClick = this.handlePrevClick.bind(this)
    this.handleChangeIndex = this.handleChangeIndex.bind(this)
    this.slideRenderer = this.slideRenderer.bind(this)
  }

  componentDidMount() {
    this.store.setCity(this.props.match.params.city)
    this.store.setModel(this.props.match.params.modelName)
  }

  handlePrevClick() {
    this.store.prevModel()
  }

  handleNextClick() {
    this.store.nextModel()
  }

  handleChangeIndex(index) {
    this.store.setModelByIndex(index)
  };

  slideRenderer(params) {
    const { index, key } = params;
    var model = this.store.filteredModels[index]
    return (
      model ? <Model key={model.id} model={model} /> : <div></div>
    )
  }

  render() {
    return (
      <div className='model-flow'>
        <a className='arrow prev-arrow' onClick={this.handlePrevClick} />
        <a className='arrow next-arrow' onClick={this.handleNextClick} />
        <BindKeyboardSwipeableViews onChangeIndex={this.handleChangeIndex}
                                    animateTransitions={false}
                                    enableMouseEvents={true}
                                    disabled={!this.store.modelsSwipeEnabled}
                                    index={this.store.modelIndex}
                                    ignoreNativeScroll={true}
                                    slideRenderer={this.slideRenderer} />
      </div>
    );
  }
}

export default withRouter(ModelsFlow);
