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

  componentWillMount() {
    this.store.setCity(this.props.match.params.city)
    this.store.setModel(this.props.match.params.modelName)
    window.scrollTo(0, 0)
  }

  handlePrevClick() {
    this.store.prevModel()
    window.scrollTo(0, 0)
  }

  handleNextClick() {
    this.store.nextModel()
    window.scrollTo(0, 0)
  }

  handleChangeIndex(index) {
    this.store.setModelByIndex(index)
    window.scrollTo(0, 0)
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
        <div className='arrow scroll-down'>
          scroll down
          <div className='arrow down-arrow'></div>
        </div>
        <BindKeyboardSwipeableViews onChangeIndex={this.handleChangeIndex}
                                    animateTransitions={false}
                                    enableMouseEvents={true}
                                    disabled={!this.store.modelsSwipeEnabled}
                                    index={this.store.modelIndex}
                                    ignoreNativeScroll={true}
                                    slideRenderer={this.slideRenderer}
                                    animateHeight={true} />
      </div>
    );
  }
}

export default withRouter(ModelsFlow);
