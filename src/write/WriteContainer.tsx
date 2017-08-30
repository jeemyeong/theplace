import * as React from 'react';
import { WriteStore } from 'stores/writeStore';
import { ReviewType } from 'type/Review';
import * as csstips from 'csstips';
import { style } from 'typestyle';
import { inject, observer } from 'mobx-react';
import Write from './Write';
import * as Dropzone from 'react-dropzone';
import { Button, Form, TextArea, Icon, Image } from 'semantic-ui-react'
import { FormProps } from 'semantic-ui-react/dist/commonjs/collections/Form'

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
  // tslint:disable-next-line:no-any
  onDrop = (acceptedFiles: any, rejectedFiles: any) => {
    console.log(acceptedFiles);
    console.log(rejectedFiles);
  }
  handleSubmit = (event: React.FormEvent<HTMLElement>, data: FormProps) => {
    console.log(event);
    console.log(data);
  }
  render() {
    return (
      <div className={WriteContainerStyle}>
        <Form onSubmit={this.handleSubmit}>
          <div className={DropzoneStyle}>
            <Dropzone
              onDrop={this.onDrop}
              maxSize={5242880}
              accept={`image/*`}
              style={dropZoneStyle}
            >
              5MB 이하의 사진을 첨부해주세요!
            </Dropzone>
          </div>
          <Form.Field
            control={TextArea}
            placeholder="내용"
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
