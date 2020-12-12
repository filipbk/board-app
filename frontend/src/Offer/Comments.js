import React from 'react';
import {Comment, List, Typography, Form, Button, Input} from "antd";
import {authenticationService} from "../services";

export class Comments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newComment: undefined,
      comments: [{date: "2020-05-30", author: 'adasd', authorId: 14, content: 'fdsdfggtasda'}, {date: "2020-06-3", author: 'gdfgdfg', authorId: 13, content: 'fdsdfggtasda'}]
    }
  }

  addComment() {
    const {newComment} = this.state
    const {offerId} = this.props

    console.log(offerId, newComment)
  }

  render() {
    const {comments, newComment} = this.state

    return <>
      {!comments || comments.length === 0 ? <Typography >There are no comments yet</Typography>:
      <List
        className="comment-list"
        header={`${comments.length} comments`}
        itemLayout="horizontal"
        dataSource={comments}
        renderItem={item => (
          <li>
            <Comment
              content={<p>{item.content}</p>} datetime={item.date} author={authenticationService.currentUserValue().id === item.authorId ? "You" : item.author}
            />
          </li>
        )}
      />}
      <Comment className='new-comment'
        content={
          <>
            <Form.Item>
              <Input.TextArea rows={4} value={newComment} onChange={e => this.setState({newComment: e.target.value})} />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" onClick={() => this.addComment()} type="primary">
                Add Comment
              </Button>
            </Form.Item>
          </>
        }
      />
      </>
  }
}
