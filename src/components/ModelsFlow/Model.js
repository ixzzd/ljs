import React from 'react';
import NavLink from 'react-router-dom'
import ProgressiveImage from 'react-progressive-image'
import Description from './Model/Description';
import ContentItem from './Model/ContentItem';
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
    this.handleImageLoaded = this.handleImageLoaded.bind(this)
    this.state = {selectedImage: this.model.face, faceImageLoaded: false}
  }

  selectImage(image, e) {
    this.setState({
      selectedImage: image
    })
  }

  handleImageLoaded() {
    this.setState({ faceImageLoaded: true });
  }

  imageClass(image) {
    if (this.state.selectedImage == image) return 'bordered'
  }

  render() {
    return (
      <div>
        {(this.props.index >= this.store.currentModelIndex - 1 && this.props.index < this.store.currentModelIndex + 2) &&
          <div className='model-wrapper'>
            <ProgressiveImage src={this.state.selectedImage.normal} placeholder={this.state.selectedImage.small}>
              {(src, loading) => (
                <img className='opened-image' src={src} alt={this.model.name} onLoad={this.handleImageLoaded.bind(this)} />
              )}
            </ProgressiveImage>
            <div className='column'>
              <div className='model-name'>{this.model.name}</div>
              {
                [this.model.face, this.model.three_quarter, this.model.profile, this.model.smile].filter(Boolean).map((image) => {
                    return <img key={image.small} className={this.imageClass(image)}
                           src={image.small} onClick={(e) => this.selectImage(image, e)}/>
                })
              }
              <div className='parameters'>
                { this.model.height &&
                  <p>height: {this.model.height}</p>
                }
                { this.model.eye_color &&
                    <p>eyes: {this.model.eye_color}</p>
                }
                { this.model.hair_color &&
                    <p>hair: {this.model.hair_color}</p>
                }
                { this.model.shoe_size &&
                    <p>shoes: {this.model.shoe_size} </p>
                }
                { this.model.size.length > 0 &&
                    <p>{this.model.size}</p>
                }
              </div>
            </div>
          </div>
        }
        { this.props.index == this.store.currentModelIndex &&
            this.state.faceImageLoaded &&
            <div className='contents'>
              {this.model.contents.map((content, index) => (
                <ContentItem key={index} content={content} />
              ))}
            </div>
        }
      </div>
    );
  }
}
