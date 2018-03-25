import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { AuthStore } from 'stores/authStore';
import Like from './Like';
import { ReviewType } from 'type/Review';
import { UserType } from 'type/User';
import { toJS } from 'mobx';
import { Grid } from 'semantic-ui-react'
import AppLayout from '../AppLayout';
import withAppLayout from '../hoc/withAppLayout';

export interface LikeContainerProps {
  authStore: AuthStore;
}

@inject('authStore')
@observer
class LikeContainer extends React.Component<LikeContainerProps, {}> {
  render() {
    const { userInfo } = this.props.authStore.state;
    const likes = toJS((userInfo as UserType).like);
    return (
      <Grid
        container={true}
        divided="vertically"
      >
        <Grid.Row columns={3}>
            {!!userInfo && !!likes && Object.keys(likes).length > 0 ?
              Object.keys(likes).map((reviewId, index) => (
                <Grid.Column
                  key={index}
                >
                  <Like
                      like={(likes[reviewId] as ReviewType.Review)}
                  />
                </Grid.Column>
              )) :
              <div>Like가 없어요!</div>
            }
        </Grid.Row>
      </Grid>
    );
  }
}

export default withAppLayout(LikeContainer);
