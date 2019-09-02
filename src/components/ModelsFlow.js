import React from 'react';
import Model from './ModelsFlow/Model'
import Filters from './Filters'
import { Link } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views'
import { virtualize } from 'react-swipeable-views-utils';
import { bindKeyboard } from 'react-swipeable-views-utils';
import {withRouter} from "react-router-dom";
import { observer, inject } from 'mobx-react';
import {Helmet} from "react-helmet";

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
  }

  slideRenderer(params) {
    const { index, key } = params;
    var model = this.store.filteredModels[index]
    return (
      model ? <Model key={index} index={index} model={model} /> : <div key={index}></div>
    )
  }

  render() {
    return (
      <div className='model-flow'>
        <Filters />
        {this.store.currentModel &&
          <Helmet>
            <title>{this.store.currentModel.name} . LUMPEN</title>
            <link rel="canonical" href={'https://lumpen.agency/' + this.store.currentModel.cities[0].name + '/' + this.store.currentModel.name } />
            <meta property="og:title" content={this.store.currentModel.name.toUpperCase()} />
            <meta property="og:site_name" content="lumpen.agency" />
            <meta property="og:url" content={'https://lumpen.agency/' + this.store.city + '/' + this.store.currentModel.name }/>
            <meta property="og:image" content={this.store.currentModel.avatar.og} />
            <link rel="image_src" href={this.store.currentModel.avatar.normal} />
          </Helmet>
        }

        <a className='arrow prev-arrow' onClick={this.handlePrevClick} />
        <a className='arrow next-arrow' onClick={this.handleNextClick} />
        <BindKeyboardSwipeableViews onChangeIndex={this.handleChangeIndex}
                                    index={this.store.currentModelIndex}
                                    slideRenderer={this.slideRenderer}
                                    animateHeight={true}
                                    overscanSlideAfter={2}
                                    overscanSlideBefore={1}
                                    />
      </div>
    );
  }
}

export default withRouter(ModelsFlow);
