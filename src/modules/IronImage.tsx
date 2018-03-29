import * as React from 'react';
import './IronImage.css';

export interface IronImageProps {
  src: string
}

export interface IronImageState {
  init: boolean,
  onload: boolean,
}

class IronImage extends React.Component<IronImageProps, IronImageState> {
  constructor (props: IronImageProps) {
    super(props)
    this.state = { init: false, onload: false }
  }

  render() {
    const { onload } = this.state;
    const { src } = this.props;
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
        <img style={{visibility: 'hidden'}} src={src} onLoad={() => this.setState({onload: true})}/>
      </div>
    );
  }
}

export default IronImage;
