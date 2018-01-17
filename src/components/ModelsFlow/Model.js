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
    this.model = this.props.model
    this.state = {selectedImage: this.model.face}
  }

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
        {this.model.name.toLowerCase() == this.store.model.toLowerCase() &&
          <div className='contents'>
            {this.model.contents.map((content, index) => (
              <LazyLoad offset={100} once>
                <img key={content.id} src={content.image_url.normal}/>
              </LazyLoad>
            ))}
          </div>
        }
      </div>
    );
  }
}
