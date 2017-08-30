import * as React from 'react';
import * as ReactDOM from 'react-dom'
import { DIRECTIONS } from './utils'
import { CardStore } from 'stores/cardStore';
import { FeedStore } from 'stores/feedStore';
import { AuthStore } from 'stores/authStore';
import { inject, observer } from 'mobx-react';
import { UserType } from '../type/User'
import { style } from 'typestyle';
import * as csstips from 'csstips';

interface CardContainerProps {
  alertLeft?: JSX.Element
  alertRight?: JSX.Element
  cardStore?: CardStore
  feedStore?: FeedStore
  authStore?: AuthStore
  goBackJSXElement?(f: () => void): JSX.Element;
  onSwipeTop?(): void
  onSwipeBottom?(): void
  onEnd?(): void
}

const CardContainerStyle = style({
  margin: 'auto',
  position: 'relative',
  width: '375px',
  height: '375px',
  overflow: 'hidden',
  border: '1px solid #e5e5e5',
});

@inject('cardStore')
@inject('feedStore')
@inject('authStore')
@observer    
class CardContainer extends React.Component<CardContainerProps, {}> {
  private container: HTMLElement

  constructor(props: CardContainerProps) {
    super(props);
  }
  
  removeCard = (side: string) => {
    const { children, onEnd } = this.props;
    (this.props.cardStore as CardStore).removeCard(side, children as React.ReactNode[], onEnd);
  }
  
  componentDidMount() {
    const { index, containerSize } = (this.props.cardStore as CardStore).state
    this.container = ReactDOM.findDOMNode(this);
    (this.props.cardStore as CardStore).setSize(this.container)
    window.addEventListener('resize', () => (this.props.cardStore as CardStore).setSize(this.container))
  }

  componentWillUnmount() {
    (this.props.cardStore as CardStore).unmount()
    window.removeEventListener('resize', () => (this.props.cardStore as CardStore).setSize(this.container))
  }

  goBack = () => {
    if ((this.props.cardStore as CardStore).goBack()) {
      (this.props.feedStore as FeedStore).unDo(((this.props.authStore as AuthStore).state.userInfo as UserType))
    }
  }

  render () {
    const { index, containerSize, loaded } = (this.props.cardStore as CardStore).state
    const { children, onSwipeTop, onSwipeBottom, goBackJSXElement } = this.props
    if (!loaded) {
      return  <div className={CardContainerStyle} />
    }

    const props = {
      containerSize,
      ...DIRECTIONS.reduce((m, d) => ({ ...m, [`onOutScreen${d}`]: () => this.removeCard(d) }), {}),
    }
    const c = (children as React.ReactNode[])[index]
    // tslint:disable-next-line:no-any
    const _card = !!c ? React.cloneElement(c as React.ReactElement<any>, props) : null;

    return (
      <div className={style(csstips.fillParent, {})}>
        <div className={CardContainerStyle}>
          {DIRECTIONS.map(d => 
            <div key={d} className={`${(this.props.cardStore as CardStore).state[`alert${d}`] ? 'alert-visible' : ''} alert-${d.toLowerCase()} alert`}>
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

export default CardContainer