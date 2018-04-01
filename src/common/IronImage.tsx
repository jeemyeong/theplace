import * as React from 'react';
import './IronImage.css';

export interface IronImageProps {
  src: string
}

export interface IronImageState {
  init: boolean,
  src: string,
}

class IronImage extends React.Component<IronImageProps, IronImageState> {
  state = { init: false, src: '' };

  render() {
    const { src } = this.props;
    const onload = src === this.state.src;
    return (
      <div className="iron-image-container">
        { onload ?
            <div
                className="iron-image-loaded iron-image-fade-in"
                style={{backgroundImage: `url('${this.props.src}')`}}
            >
                {this.props.children}
            </div> :
            <div
                className="iron-image-preload"
                style={{ backgroundImage: 'url(/spinner.svg)' }}
            />
        }
        <img style={{visibility: 'hidden'}} src={src} onLoad={() => this.setState({src: src})}/>
      </div>
    );
  }
}

export default IronImage;
