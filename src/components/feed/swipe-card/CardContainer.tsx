import * as React from 'react';
import { CardState, CardStore } from 'stores/cardStore';
import { FeedStore } from 'stores/feedStore';
import { AuthStore } from 'stores/authStore';
import { inject, observer } from 'mobx-react';
import { UserType } from '../../../type/User'
import { style } from 'typestyle';
import * as csstips from 'csstips';
import { compose, withHandlers } from 'recompose';

interface CardContainerProps {
  alertLeft?: JSX.Element
  alertRight?: JSX.Element
  cardStore: CardStore
  feedStore: FeedStore
  authStore: AuthStore
  children: React.Component | React.Component[]
  goBackJSXElement?(f: () => void): JSX.Element;
  goBack(): void
}

const CardContainerStyle = style({
  margin: 'auto',
  position: 'relative',
  width: '375px',
  height: '375px',
  overflow: 'hidden',
  border: '1px solid #e5e5e5',
});

const DIRECTIONS = [ 'Right', 'Left', 'Top', 'Bottom' ];
const enhance = compose<{}, {alertRight?: JSX.Element, alertLeft?: JSX.Element, goBackJSXElement?(f: () => void): JSX.Element}> (
  inject('cardStore'),
  inject('authStore'),
  inject('feedStore'),
  observer,
  withHandlers({
    removeCard: ({cardStore, children, onEnd}) => (side: string) => {
      cardStore.removeCard(side, children as React.ReactNode[], onEnd);
    },
    goBack: ({cardStore, feedStore, authStore}) => () => {
      if (cardStore.goBack()) {
        feedStore.unDo(authStore.state.userInfo as UserType)
      }
    }
  }),
  inject('cardStore'),
  inject('feedStore'),
  inject('authStore'),
  observer
);
const CardContainer = ({
  alertLeft,
  alertRight,
  cardStore,
  feedStore,
  authStore,
  goBack,
  goBackJSXElement,
  children,
}: CardContainerProps) => {
  const { containerSize } = cardStore.state;
  const { feeds } = feedStore.state;
  const { userInfo } = authStore.state;

  const propsToChildren = {
    containerSize,
    ...DIRECTIONS.reduce((m, d) => ({ ...m, [`onOutScreen${d}`]: () => cardStore.removeCard(d, children as React.ReactNode[]) }), {}),
  };

  let newIndex = 0;
  for (; newIndex < feeds.length; newIndex++) {
    const feed = feeds[newIndex];
    if (!!userInfo && (!userInfo.like || !userInfo.like[feed.reviewId]) && (!userInfo.pass || !userInfo.pass[feed.reviewId])) {
      break;
    }
  }
  const child = !!children[newIndex] ?
    React.cloneElement(children[newIndex] as React.ReactElement<{containerSize: CardState['containerSize']}>, propsToChildren)
    : '피드가 없어요ㅠㅠ';

  return (
    <div className={style(csstips.fillParent, {})}>
      <div className={CardContainerStyle}>
        {DIRECTIONS.map(d =>
          <div key={d} className={`${cardStore.state[`alert${d}`] ? 'alert-visible' : ''} alert-${d.toLowerCase()} alert`}>
            {[`alert${d}`]}
          </div>
        )}
        <div id="cards">
          {child}
        </div>
      </div>
        {!!goBackJSXElement ? goBackJSXElement(goBack) : null}
    </div>
  )
}

export default enhance(CardContainer)