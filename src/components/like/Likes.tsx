import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { AuthStore } from 'stores/authStore';
import Like, { LikeProps } from './Like';
import { ReviewType } from 'type/Review';
import { UserType } from 'type/User';
import { toJS } from 'mobx';
import { Grid } from 'semantic-ui-react'
import { compose } from 'recompose';
import { RouterStore } from 'mobx-react-router';
import swal from 'sweetalert2';

export interface LikeContainerProps {
  authStore: AuthStore;
  routingStore: RouterStore;
}
const enhance = compose<LikeContainerProps, {}>(
  inject('authStore'),
  inject('routingStore'),
  observer
);
const Likes = ({
  authStore,
  routingStore
}: LikeContainerProps) => {
  const { userInfo } = authStore.state;

  const likes = !!userInfo && toJS((userInfo as UserType).like);
  const noLike = !likes || Object.keys(likes).length === 0;

  if (noLike) {
    swal({
      title: 'Like가 없어요!',
      text: '많이 채워주세요😁',
      type: 'warning',
      timer: 5000,
      confirmButtonText: 'Okay',
      width: '300px'
    })
  }
  return (
    <Grid
      container={true}
      divided="vertically"
    >
      <Grid.Row columns={3}>
        {!noLike &&
          Object.keys(likes).map((reviewId, index) => (
            <Grid.Column key={index}>
              <Like like={(likes[reviewId] as ReviewType.Review)} push={routingStore.push}/>
            </Grid.Column>
          ))
        }
      </Grid.Row>
    </Grid>
  )
};

export default enhance(Likes);
