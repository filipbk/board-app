import React from 'react';
import {Button, Comment, Form, Input, notification} from 'antd';
import {commentsService} from '../services';

export class NewComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: undefined
    };
  }

  addComment() {
    const {comment} = this.state;
    const {addComment, toWhoId, offerId} = this.props;
    const commentBody = {content: comment, toWhoId, offerId: parseInt(offerId, 10)};

    if (!comment || comment.length === 0) {
      return;
    }

    commentsService
      .addComment(commentBody)
      .then((result) => {
        notification.success({
          message: 'Success',
          description: 'New comment added successfully'
        });
        this.setState({comment: undefined});
        addComment(result);
      })
      .catch((error) => {
        notification.error({
          message: 'Error',
          description: error.message || error
        });
      });
  }

  render() {
    const {comment} = this.state;

    return (
      <Comment
        className='new-comment'
        content={
          <>
            <Form.Item>
              <Input.TextArea
                rows={4}
                value={comment}
                onChange={(e) => this.setState({comment: e.target.value})}
              />
            </Form.Item>
            <Form.Item>
              <Button htmlType='submit' onClick={() => this.addComment()} type='primary'>
                Add Comment
              </Button>
            </Form.Item>
          </>
        }
      />
    );
  }
}
