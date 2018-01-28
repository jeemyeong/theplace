import * as React from 'react';
import { style, media } from 'typestyle';

export interface IronImageProps {
  src: string
}

export interface IronImageState {
  init: boolean,
  onload: boolean,
  ironImageHd: HTMLDivElement | null;
}

const cardImageStyle = style({
  width: '100%'
})

class IronImage extends React.Component<IronImageProps, IronImageState> {
  constructor (props: IronImageProps) {
    super(props)
    this.state = { init: false, onload: false, ironImageHd: null }
  }

  loadImage(imageLoadedElem: HTMLDivElement | null) { 
    const hdLoaderImg = new Image();

    hdLoaderImg.src = this.props.src;

    hdLoaderImg.onload = () => {
      const toChange: HTMLDivElement = (this.state.ironImageHd as HTMLDivElement);
      toChange.setAttribute(
        'style',
        `background-image: url('${this.props.src}')`
      );
      toChange.classList.add('iron-image-fade-in');
      this.setState({ironImageHd : toChange, onload: true}, () => console.log('COMPELETE'))
    }
  }

  handleImageLoaded(src: string) {
    this.setState({init: true})
  }
  render() {
    const { init } = this.state;
    const { src } = this.props;
    return (
      <div className="iron-image-container">
        <div 
          className="iron-image-loaded" 
          ref={imageLoadedElem => {
            if (this.state.init === false) {
              this.setState(
                {ironImageHd: imageLoadedElem, init: true}, () => this.loadImage(imageLoadedElem)
              )
            }
          }}
        />
        <div 
          className="iron-image-preload" 
          style={{ backgroundColor: 'azure' }}
        />
      </div>
    );
  }
}

export default IronImage;
