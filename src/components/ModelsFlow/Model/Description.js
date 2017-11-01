import React from 'react';

export default class Description extends React.Component {
  constructor() {
    super()
    this.state = {selectedImage: {normal: '', small: ''}}
    this.selectImage = this.selectImage.bind(this);
  }

  componentWillReceiveProps(props){
    this.setState({
      selectedImage: props.model.face
    })
  }

  selectImage(image) {
    this.setState({
      selectedImage: image
    })
  }

  imageClass(image) {
    if (this.state.selectedImage == image) return 'bordered'
  }

  render() {
    var model = this.props.model

    return (
      <div className='description'>
        <img className='opened-image' src={this.state.selectedImage.normal}/>
        <div className='column'>

          <div className='model-name'>{model.name}</div>

          <img className={this.imageClass(model.face)}
               src={model.face.small}
               onClick={() => this.selectImage(model.face)}/>

          <img className={this.imageClass(model.three_quarter)}
               src={model.three_quarter.small}
               onClick={() => this.selectImage(model.three_quarter)}/>

          <img className={this.imageClass(model.profile)}
               src={model.profile.small}
               onClick={() => this.selectImage(model.profile)}/>

          <div className='parameters'>
            <p>height: {model.height}</p>
            <p>eyes: {model.eye_color}</p>
            <p>hair: {model.hair_color}</p>
            <p>shoes: {model.shoe_size} </p>
            <p>94/78/92</p>
          </div>
        </div>
      </div>
    );
  }
}
