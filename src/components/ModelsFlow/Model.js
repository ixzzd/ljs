import React from 'react';
import NavLink from 'react-router-dom'
import Description from './Model/Description';
import LazyLoad from 'react-lazyload';
import { observer, inject } from 'mobx-react';

@inject("store")
@observer
export default class Model extends React.Component {
  constructor(props) {
    super(props)
    this.store = this.props.store.appState
    this.index = this.props.index
    this.model = this.props.model
    this.selectImage = this.selectImage.bind(this)
    this.imageClass = this.imageClass.bind(this)
    this.onContentVisible = this.onContentVisible.bind(this)
    this.state = {selectedImage: this.model.face}
  }

  onContentVisible (isVisible) {
    console.log('Element is now %s', isVisible ? 'visible' : 'hidden');
  };

  selectImage(image, e) {
    this.setState({
      selectedImage: image
    })
  }

  imageClass(image) {
    if (this.state.selectedImage == image) return 'bordered'
  }

  render() {
    return (
      <div>
        {this.props.index > this.store.currentModelIndex - 2 &&
          <div className='model-wrapper'>
            <img className='opened-image' src={this.state.selectedImage.normal}/>
            <div className='column'>
              <div className='model-name'>{this.model.name}</div>
              {
                [this.model.face, this.model.three_quarter, this.model.profile].filter(Boolean).map((image) => {
                    if (image.small) {
                      return <img key={image.small} className={this.imageClass(image)}
                             src={image.small} onClick={(e) => this.selectImage(image, e)}/>
                    }
                })
              }
              <div className='parameters'>
                <p>height: {this.model.height}</p>
                <p>eyes: {this.model.eye_color}</p>
                <p>hair: {this.model.hair_color}</p>
                <p>shoes: {this.model.shoe_size} </p>
                <p>94/78/92</p>
              </div>
            </div>
          </div>
        }
        {this.props.index == this.store.currentModelIndex &&
          <div className='contents'>
            {this.model.contents.map((content, index) => (
              <LazyLoad offset={100} once>
                <div className='item'>
                  <img key={content.id} src={content.image_url.normal}/>
                  <span> {content.description} </span>
                </div>
              </LazyLoad>
            ))}
          </div>
        }
      </div>
    );
  }
}
