import React from 'react';
import LazyLoad from 'react-lazyload';
import ReactPlayer from 'react-player'

export default class ContentItem extends React.Component {
  constructor(props) {
    super(props);
    this.content = this.props.content
  }

  render() {
    return (
      <LazyLoad offset={100} height={900} once>
        <div className='item'>
          {this.content.type.toLowerCase() == 'video' ? (
              <ReactPlayer url={this.content.source}
                           controls={true}
                           width='900px' />
            ) : (
              <img key={this.content.id} src={this.content.image_url.normal}/>
            )
          }
          <span> {this.content.description} </span>
        </div>
      </LazyLoad>
    );
  }
}
