import * as React from 'react';
import { WriteStore } from 'stores/writeStore';
import { ReviewType } from 'type/Review';
import * as csstips from 'csstips';
import { style } from 'typestyle';
import { inject, observer } from 'mobx-react';
import Write from './Write';
import * as Dropzone from 'react-dropzone';
import { Button, Form, TextArea, Icon, Image } from 'semantic-ui-react'

const WriteContainerStyle = style(csstips.fillParent, {
  width: '80%',
  margin: 'auto'
})
const DropzoneStyle = style({
  width: '80%',
  margin: 'auto'
})
const dropZoneStyle = {
  margin: 'auto',
  marginTop: '0.2em',
  marginBottom: '0.2em',
  width: '100%',
  height: '200px',
  borderWidth: '2px',
  borderColor: 'rgb(102, 102, 102)',
  borderStyle: 'dashed',
  borderRadius: '5px',
  display: 'table'
}
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
              style={dropZoneStyle}
            >
              {this.props.writeStore.state.photoFiles.length > 0 ?
                this.props.writeStore.state.photoFiles.map((file: Dropzone.ImageFile, index: number) => <Image src={file.preview} key={index}/>) :
                <Icon name="image" size="big"/>
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
            value={this.props.writeStore.state.evaluate}
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
