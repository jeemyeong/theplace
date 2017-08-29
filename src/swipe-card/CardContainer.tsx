import * as React from 'react';
import * as ReactDOM from 'react-dom'
import { DIRECTIONS } from './utils'
import { CardStore } from 'stores/cardStore';
import { inject, observer } from 'mobx-react';

interface CardContainerProps {
  className?: string
  alertLeft?: JSX.Element
  alertRight?: JSX.Element
  cardStore?: CardStore
  goBackJSXElement?(f: () => void): JSX.Element;
  onSwipeTop?(): void
  onSwipeBottom?(): void
  onEnd?(): void
}

@inject('cardStore')
@observer    
class CardContainer extends React.Component<CardContainerProps, {}> {
  private container: HTMLElement

  constructor(props: CardContainerProps) {
    super(props);
  }
  
  removeCard (side: string) {
    const { children, onEnd } = this.props;
    (this.props.cardStore as CardStore).removeCard(side, children as React.ReactNode[], onEnd);
  }
  
  componentDidMount () {
    this.container = ReactDOM.findDOMNode(this);
    (this.props.cardStore as CardStore).setSize(this.container)
    window.addEventListener('resize', () => (this.props.cardStore as CardStore).setSize(this.container))
  }

   componentWillUnmount () {
    window.removeEventListener('resize', () => (this.props.cardStore as CardStore).setSize(this.container))
  }
  
  render () {
    const { index, containerSize } = (this.props.cardStore as CardStore).state
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
            <div key={d} className={`${(this.props.cardStore as CardStore).state[`alert${d}`] ? 'alert-visible' : ''} alert-${d.toLowerCase()} alert`}>
              {this.props[`alert${d}`]}
            </div>
          )}
          <div id="cards">
            {_card}
          </div>
        </div>
          {!!goBackJSXElement ? goBackJSXElement((this.props.cardStore as CardStore).goBack) : null}
      </div>
    )
  }
}

export default CardContainer