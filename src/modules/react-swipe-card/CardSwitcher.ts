import * as React from 'react'

import SimpleCard from './SimpleCard'
import DraggableCard from './DraggableCard'

interface CardProps {
  active?: boolean
  containerSize?: { x: number, y: number }
  className?: string
  index?: number
  // tslint:disable-next-line:no-any
  style?: any
  onSwipeTop?(): void
  onSwipeBottom?(): void
  onSwipeLeft?(): void
  onSwipeRight?(): void
}

const Card = (props: CardProps) => {
  const component = props.active ? DraggableCard : SimpleCard
  return React.createElement(component, props)
}

export default Card
