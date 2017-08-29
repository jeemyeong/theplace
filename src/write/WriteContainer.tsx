import * as React from 'react';
import { WriteStore } from 'stores/writeStore';
import { ReviewType } from 'type/Review';
import * as csstips from 'csstips';
import { style } from 'typestyle';
import { inject, observer } from 'mobx-react';
import { RouterStore } from 'mobx-react-router';
import Write from './Write';
import * as Dropzone from 'react-dropzone';

interface WriteProps {
  writeStore: WriteStore;
}

@inject('writeStore')
@observer    
class WriteContainer extends React.Component<WriteProps, {}> {
  render() {
    return (
      <div>
        <Dropzone/>
      </div>
    );
  }
}

export default WriteContainer;
