import React from 'react';
import NavLink from 'react-router-dom'
import Description from './Model/Description';
import Contents from './Model/Contents';

export default class Model extends React.Component {
  constructor() {
    super();
    this.state = {selectedImage: {face: {normal: '', small: ''}}}
  }

  selectImage(image, e) {
    this.setState({
      selectedImage: image
    })
  }

  imageClass(image) {
    if (this.state.selectedImage == image) return 'bordered'
  }

  componentDidMount() {
    var model = this.props.model

    if(model !== undefined) {
      this.setState({
        selectedImage: model.face
      })
    }
  }

  render() {
    var model = this.props.model

    return (
      <div className='model-wrapper'>
        <img className='opened-image' src={this.state.selectedImage.normal}/>
        <div className='column'>
          <div className='model-name'>{model.name}</div>

          {
            [model.face, model.three_quarter, model.profile].map((image) => {
                if (image.small) {
                  return <img key={image.small} className={this.imageClass(image)}
                         src={image.small} onClick={(e) => this.selectImage(image, e)}/>
                }
            })
          }

          <div className='parameters'>
            <p>height: {model.height}</p>
            <p>eyes: {model.eye_color}</p>
            <p>hair: {model.hair_color}</p>
            <p>shoes: {model.shoe_size} </p>
            <p>94/78/92</p>
          </div>
        </div>
        <Contents contents={this.props.model.contents} />
      </div>
    );
  }
}
