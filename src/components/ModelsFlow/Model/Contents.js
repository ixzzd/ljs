import React from 'react';
import Modal from 'react-modal';

export default class Contents extends React.Component {

  constructor() {
    super();
    this.state = {lightboxIsOpen: false, currentContent: {image_url: {normal: '', small: ''}}};
    this.closeLightbox = this.closeLightbox.bind(this)
    this.openLightbox = this.openLightbox.bind(this)
  }

	closeLightbox() {
		this.setState({lightboxIsOpen: false})
	}

  openLightbox(content) {
    this.setState({lightboxIsOpen: true, currentContent: content})
  }

  selectContent(content) {
    this.setState({
      currentImage: content
    })
  }

  onClickThumbnail(content) {

  }

  render() {
    return (
      <div>
      	<div className='content'>
      		{this.props.contents.map((content, index) => (
        		<img key={content.id} src={content.image_url.small} onClick={this.openLightbox.bind(this, content)}/>
      		))}
      	</div>

        <Modal
          isOpen={this.state.lightboxIsOpen}
          // onAfterOpen={afterOpenFn}
          // onRequestClose={requestCloseFn}
          // closeTimeoutMS={n}
          // style={customStyle}
          contentLabel="Modal"
        >
          <div className='close-button' onClick={this.closeLightbox.bind(this)}>X</div>
          <div className='current-content'>
            <img src={this.state.currentContent.image_url.normal}/>
          </div>
          <div className='thumbnails'>
            {this.props.contents.map((content, index) => (
              <img key={content.id} src={content.image_url.small} onClick={this.onClickThumbnail.bind(this, content)}/>
            ))}
          </div>
        </Modal>
      </div>
    );
  }
}
