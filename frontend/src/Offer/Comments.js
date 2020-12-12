import React from 'react';
import {Comment, List, Typography} from 'antd';
import {authenticationService, commentsService} from '../services';
import {NewComment} from './NewComment';

export class Comments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: []
    };

    this.addNewCommentToList = this.addNewCommentToList.bind(this);
  }

  componentDidMount() {
    this.fetchComments();
  }

  fetchComments() {
    const {offerId} = this.props;

    commentsService.getOfferComments(offerId).then((result) => {
      this.setState({comments: result});
    });
  }

  addNewCommentToList(comment) {
    const {comments} = this.state;
    this.setState({comments: [...comments, comment]});
  }

  render() {
    const {comments} = this.state;
    const {offerId, toWhoId} = this.props;

    return (
      <>
        {!comments || comments.length === 0 ? (
          <Typography>There are no comments yet</Typography>
        ) : (
          <List
            className='comment-list'
            header={`${comments.length} comments`}
            itemLayout='horizontal'
            dataSource={comments}
            renderItem={(item) => (
              <li>
                <Comment
                  content={<p>{item.content}</p>}
                  datetime={new Date(item.updatedAt).toLocaleString()}
                  author={
                    authenticationService.currentUserValue().id === item.author.id
                      ? 'You'
                      : `${item.author.firstName} ${item.author.lastName}`
                  }
                />
              </li>
            )}
          />
        )}
        <NewComment addComment={this.addNewCommentToList} offerId={offerId} toWhoId={toWhoId} />
      </>
    );
  }
}
