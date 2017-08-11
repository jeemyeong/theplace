import * as React from 'react';
import { Icon } from 'semantic-ui-react';

export interface RaitingProps {
    rating: number;
    className?: string;
    size?: 'mini' | 'tiny' | 'small' | 'large' | 'big' | 'huge' | 'massive' | undefined;
}

class Raiting extends React.Component<RaitingProps, {}> {
  render() {
    const rating = this.props.rating;
    const size = this.props.size;
    const half = rating % 1;
    const icons: JSX.Element[] = [];
    const className = this.props.className;
    for (let i = 1; i <= rating; i++) {
        icons.push(<Icon name="star" size={size} key={i} />);
    }
    return (
      <div className={className}>
          {icons}
          {!!half ? <Icon name="star half" size={size} /> : null}
      </div>
    );
  }
}

export default Raiting;
