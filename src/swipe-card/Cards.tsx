import * as React from 'react';
import * as ReactDOM from 'react-dom'
import { DIRECTIONS } from './utils'

interface SwipeCardsProps {
  className?: string
  alertLeft?: JSX.Element;
  alertRight?: JSX.Element;
  goBackJSXElement?(f: () => void): JSX.Element;
  onSwipeTop?(): void
  onSwipeBottom?(): void
  onEnd?(): void
}
interface SwipeCardsState {
  index: number;
  alertLeft: boolean;
  alertRight: boolean;
  alertTop: boolean;
  alertBottom: boolean;
  containerSize: { x: number, y: number }
}
class SwipeCards extends React.Component<SwipeCardsProps, SwipeCardsState> {
  constructor (props: SwipeCardsProps) {
    super(props)
    this.state = {
      index: 0,
      alertLeft: false,
      alertRight: false,
      alertTop: false,
      alertBottom: false,
      containerSize: { x: 0, y: 0 }
    }
    this.removeCard = this.removeCard.bind(this)
    this.setSize = this.setSize.bind(this)
  }
  removeCard (side: string) {
    const { children, onEnd } = this.props
    const stateAfterAlert = {}
    stateAfterAlert[`alert${side}`] = false;
    setTimeout(() => this.setState(stateAfterAlert), 300)
    
    if ((children as React.ReactNode[]).length === (this.state.index + 1) && onEnd) {
      onEnd()
    }

    const stateWhileAlerting = {index: this.state.index + 1}
    stateWhileAlerting[`alert${side}`] = true
    this.setState(stateWhileAlerting)
  }

  public goBack = () => {
    this.setState({index: this.state.index - 1})
  }
  
  componentDidMount () {
    this.setSize()
    window.addEventListener('resize', this.setSize)
  }
   componentWillUnmount () {
    window.removeEventListener('resize', this.setSize)
  }

  setSize () {
    const container: HTMLElement = ReactDOM.findDOMNode(this)
    const containerSize = {
      x: container.offsetWidth,
      y: container.offsetHeight
    }
    this.setState({ containerSize })
  }

  render () {
    const { index, containerSize } = this.state
    const { children, className, onSwipeTop, onSwipeBottom, goBackJSXElement } = this.props
    if (!containerSize.x || !containerSize.y) {
      return  <div className={className} />
    }

    const props = {
      containerSize,
      ...DIRECTIONS.reduce((m, d) => ({ ...m, [`onOutScreen${d}`]: () => this.removeCard(d) }), {}),
    }
    const c = (children as React.ReactNode[])[index]
    // tslint:disable-next-line:no-any
    const _card = !!c ? React.cloneElement(c as React.ReactElement<any>, props) : null;

    return (
      <div>
        <div className={className}>
          {DIRECTIONS.map(d => 
            <div key={d} className={`${this.state[`alert${d}`] ? 'alert-visible' : ''} alert-${d.toLowerCase()} alert`}>
              {this.props[`alert${d}`]}
            </div>
          )}
          <div id="cards">
            {_card}
          </div>
        </div>
          {!!goBackJSXElement ? goBackJSXElement(this.goBack) : null}
      </div>
    )
  }
}

export default SwipeCards