import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { AuthStore } from 'stores/authStore';
import Like, { LikeProps } from './Like';
import { ReviewType } from 'type/Review';
import { UserType } from 'type/User';
import { toJS } from 'mobx';
import { Grid } from 'semantic-ui-react'
import AppLayout from '../../layout/withAppLayout';
import withAppLayout from '../../layout/withAppLayout';
import { compose } from 'recompose';
import { RouterStore } from 'mobx-react-router';

export interface LikeContainerProps {
  authStore: AuthStore;
  routingStore: RouterStore;
}

const enhance = compose<LikeContainerProps, {}>(
  inject('authStore'),
  inject('routingStore'),
  observer
);
const LikeContainer = ({
  authStore,
  routingStore
}: LikeContainerProps) => {
  const { userInfo } = authStore.state;
  if (!userInfo) {
    return null
  }
  const likes = toJS((userInfo as UserType).like);
  return (
    <Grid
      container={true}
      divided="vertically"
    >
      <Grid.Row columns={3}>
        {!!likes && Object.keys(likes).length > 0 ?
          Object.keys(likes).map((reviewId, index) => (
            <Grid.Column key={index}>
              <Like like={(likes[reviewId] as ReviewType.Review)} push={routingStore.push}/>
            </Grid.Column>
          )) :
            <div>Like가 없어요!</div>
        }
      </Grid.Row>
    </Grid>
  )
};

export default enhance(LikeContainer);
