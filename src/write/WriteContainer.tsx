import * as React from 'react';
import { WriteStore } from 'stores/writeStore';
import { ReviewType } from 'type/Review';
import * as csstips from 'csstips';
import { style } from 'typestyle';
import { inject, observer } from 'mobx-react';
import * as Dropzone from 'react-dropzone';
import { Button, Form, TextArea, Icon, Image } from 'semantic-ui-react'
import WritePreview from './WritePreview'

const WriteContainerStyle = style(csstips.fillParent, {
  width: '80%',
  margin: 'auto'
})
const DropzoneStyle = style({
  width: '80%',
  margin: 'auto'
})
const dropZoneStyle = style({
  margin: 'auto',
  width: '100%',
  borderWidth: '2px',
  borderColor: 'rgb(102, 102, 102)',
  borderStyle: 'dashed',
  borderRadius: '5px',
  display: 'table'
})

const notMountedDropzoneStyle = style(
  csstips.flexRoot,
  csstips.centerJustified,
  csstips.vertical, {
  width: '100%',
  height: '200px'
})

const imageIconWrapperStyle = style(csstips.centerCenter, {
})

interface WriteProps {
  writeStore: WriteStore;
}

@inject('writeStore')
@observer    
class WriteContainer extends React.Component<WriteProps, {}> {
  render() {
    return (
      <div className={WriteContainerStyle}>
        <Form onSubmit={this.props.writeStore.handleSubmit}>
          <div className={DropzoneStyle}>
            <Dropzone
              onDrop={this.props.writeStore.onDrop}
              maxSize={5242880}
              accept={`image/*`}
              className={dropZoneStyle}
            >
                {this.props.writeStore.state.photoFiles.length > 0 ?
                  this.props.writeStore.state.photoFiles.map((file: Dropzone.ImageFile, index: number) => (<WritePreview index={index} key={index}/>)) :
                  <div className={notMountedDropzoneStyle}>
                    <div className={imageIconWrapperStyle}>
                      <Icon name="image" size="big" />
                    </div>
                  </div>
                }
            </Dropzone>
            5MB 이하의 사진을 첨부해주세요!
          </div>
          <Form.Input
            label="식당이름"
            onChange={this.props.writeStore.writeRestaurant}
            value={this.props.writeStore.state.restaurant}
          />
          <Form.Field
            control={TextArea}
            onChange={this.props.writeStore.writeReviewText}
            value={this.props.writeStore.state.reviewText}
            label="리뷰"
          />
          <Form.Input
            onChange={this.props.writeStore.writeEvaluate}
            label="평가"
          />
          <Button type="submit">
            입력
          </Button>

        </Form>
      </div>
    );
  }
}

export default WriteContainer;
