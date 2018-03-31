import * as React from 'react';
import * as ReactDOM from 'react-dom'
import { translate3d } from './utils'

interface CardProps {
  containerSize?: { x: number, y: number }
  className?: string
  index?: number
  // tslint:disable-next-line:no-any
  style?: any
}
interface CardState {
  initialPosition: { x: number, y: number }
}
class Card extends React.Component<CardProps, CardState> {
  constructor (props: CardProps) {
    super(props);
    this.state = { initialPosition: { x: 0, y: 0 } };
    this.setInitialPosition = this.setInitialPosition.bind(this)
  }
  setInitialPosition () {
    const card: HTMLElement = ReactDOM.findDOMNode(this);
    const initialPosition = {
      x: Math.round(((this.props.containerSize as { x: number, y: number }).x - card.offsetWidth) / 2),
      y: Math.round(((this.props.containerSize as { x: number, y: number }).y - card.offsetHeight) / 2)
    };
    this.setState({ initialPosition })
  }

  componentDidMount () {
    this.setInitialPosition();
    window.addEventListener('resize', this.setInitialPosition)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.setInitialPosition)
  }

  render () {
    const { initialPosition: { x, y } } = this.state;
    const { className = 'inactive' } = this.props;
    var style = {
      ...translate3d(x, y),
      zIndex: this.props.index,
      ...this.props.style
    };

    return (
      <div style={style} className={`card ${className}`}>
        {this.props.children}
      </div>
    )
  }
}

export default Card
