import React from 'react';
import Lightbox from 'react-images';
import { observer, inject } from 'mobx-react';

@inject("store")
@observer
export default class Contents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lightboxIsOpen: false,
      currentImage: 0,
    };
    this.store = this.props.store.appState;
    this.closeLightbox = this.closeLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
    this.gotoImage = this.gotoImage.bind(this);
    this.handleClickImage = this.handleClickImage.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
  }
  openLightbox (index, event) {
    event.preventDefault();
    this.store.disableModelsSwipe();
    this.setState({
      currentImage: index,
      lightboxIsOpen: true,
    });
  }
  closeLightbox () {
    this.store.enableModelsSwipe();
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }
  gotoPrevious () {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }
  gotoNext () {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }
  gotoImage (index) {
    this.setState({
      currentImage: index,
    });
  }
  handleClickImage () {
    if (this.state.currentImage === this.props.contents.length - 1) return;

    this.gotoNext();
  }

  render() {
    const images = this.props.contents.map((content, index) => (
      {
        thumbnail: content.image_url.small,
        src: content.image_url.normal,
        caption: content.description,
      }
    ))

    const theme = {
      // container
      container: {
        background: 'rgba(255, 255, 255, 1)',
      },

      // arrows
      arrow: {
        'display': 'none'
      },
      close: {
        fill: '#000000',
        opacity: 1,
      },

      // footer
      footer: {
        color: 'black',
      },
      footerCount: {
        display: 'none'
      },

      // thumbnails
      thumbnail: {
        padding: '2px',
        'border-radius': '0px'
      },
      thumbnail__active: {
        border: '1px solid #000000'
      }
    };

    return (
      <div>
      	<div className='content'>
      		{this.props.contents.map((content, index) => (
        		<img key={content.id} src={content.image_url.small} onClick={(e) => this.openLightbox(index, e)}/>
      		))}
      	</div>

         <Lightbox
            images={images}
            currentImage={this.state.currentImage}
            isOpen={this.state.lightboxIsOpen}
            onClickPrev={this.gotoPrevious}
            onClickNext={this.gotoNext}
            onClickThumbnail={this.gotoImage}
            onClose={this.closeLightbox}
            onClickImage={this.handleClickImage}
            showThumbnails={true}
            theme={theme}
          />
      </div>
    );
  }
}
