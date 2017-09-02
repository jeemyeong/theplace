import * as React from 'react'
import * as Hammer from 'hammerjs'
import * as ReactDOM from 'react-dom'
import SimpleCard from './SimpleCard'
import { translate3d } from './utils'

interface DraggableCardProps {
  active?: boolean
  containerSize?: { x: number, y: number }
  className?: string
  onSwipeTop?(): void
  onSwipeBottom?(): void
  onSwipeLeft?(): void
  onSwipeRight?(): void
}
interface DraggableCardState {
  x: number;
  y: number;
  initialPosition: { x: number, y: number }
  startPosition: { x: number, y: number }
  animation: boolean | null
  pristine: boolean
}
class DraggableCard extends React.Component<DraggableCardProps, DraggableCardState> {
  public hammer: HammerManager | null;
  constructor (props: DraggableCardProps) {
    super(props)
    this.state = {
      x: 37.5,
      y: 37.5,
      initialPosition: { x: 37.5, y: 37.5 },
      startPosition: { x: 0, y: 0 },
      animation: null,
      pristine: true
    }
    this.handlePan = this.handlePan.bind(this)
  }
  resetPosition () {
    const initialPosition = {
      x: 37.5,
      y: 37.5
    }
    this.setState({
      x: initialPosition.x,
      y: initialPosition.y,
      initialPosition: initialPosition,
      startPosition: { x: 0, y: 0 }
    })
  }
  panstart () {
    const { x, y } = this.state
    this.setState({
      animation: false,
      startPosition: { x, y },
      pristine: false
    })
  }
  panend (ev: HammerInput) {
    const screen = this.props.containerSize as { x: number, y: number }
    const card: HTMLElement = ReactDOM.findDOMNode(this)

    const getDirection = () => {
      switch (true) {
        case (this.state.x < -50): return 'Left'
        case (this.state.x + (card.offsetWidth - 50) > screen.x): return 'Right'
        case (this.state.y < -50): return 'Top'
        case (this.state.y + (card.offsetHeight - 50) > screen.y): return 'Bottom'
        default: return false
      }
    }
    const direction = getDirection()

    if (this.props[`onSwipe${direction}`]) {
      this.props[`onSwipe${direction}`]()
      this.props[`onOutScreen${direction}`]()
    } else {
      this.resetPosition()
      this.setState({ animation: true })
    }

  }
  panmove (ev: HammerInput) {
    this.setState(this.calculatePosition( ev.deltaX, ev.deltaY ))
  }
  pancancel (ev: HammerInput) {
    // tslint:disable-next-line:no-console
    console.log(ev.type)
  }

  handlePan (ev: HammerInput) {
    ev.preventDefault()
    this[ev.type](ev)
    return false
  }

  handleSwipe (ev: HammerInput) {
    // tslint:disable-next-line:no-console
    console.log(ev.type)
  }

  calculatePosition (deltaX: number, deltaY: number) {
    const { initialPosition : { x, y } } = this.state
    return {
      x: (x + deltaX),
      y: (y + deltaY)
    }
  }
  componentDidMount () {
    this.hammer = new Hammer.Manager(ReactDOM.findDOMNode(this))
    this.hammer.add(new Hammer.Pan({ threshold: 2 }))
    
    this.hammer.on('panstart panend pancancel panmove', this.handlePan)
    this.hammer.on('swipestart swipeend swipecancel swipemove', this.handleSwipe)

    this.resetPosition()
  }
  componentWillUnmount () {
    if (this.hammer) {
      this.hammer.stop(true)
      this.hammer.destroy()
      this.hammer = null
    }
  }
  render () {
    const { x, y, animation, pristine } = this.state
    const style = translate3d(x, y)
    return <SimpleCard {...this.props} style={style} className={animation ? 'animate' : pristine ? 'inactive' : ''} />
  }
}

export default DraggableCard
