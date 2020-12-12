import React from 'react';
import {authenticationService, commentsService} from '../../services';
import {Typography, Collapse, Comment} from 'antd';
import {NewComment} from './NewComment';

export class AuthorComments extends React.Component {
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

    commentsService.getOfferCommentsForAuthor(offerId).then((result) => {
      this.setState({comments: result});
    });
  }

  addNewCommentToList(comment) {
    const {comments} = this.state;
    const conversationIndex = comments.findIndex(
      (element) => element.comments[0].author.id === comment.toWho.id
    );

    comments[conversationIndex].comments.push(comment);
    this.setState({comments});
  }

  render() {
    const {comments} = this.state;
    const {offerId} = this.props;

    return (
      <>
        {!comments || comments.length === 0 ? (
          <Typography>There are no comments yet</Typography>
        ) : (
          <Collapse className='comment-list'>
            {comments.map((commentsObject, key) => (
              <Collapse.Panel
                header={`${commentsObject.comments[0].author.firstName} ${commentsObject.comments[0].author.lastName}`}
                key={key}
              >
                <>
                  {commentsObject.comments.map((comment, key) => (
                    <Comment
                      key={key}
                      content={<p>{comment.content}</p>}
                      datetime={new Date(comment.updatedAt).toLocaleString()}
                      author={
                        authenticationService.currentUserValue().id === comment.author.id
                          ? 'You'
                          : `${comment.author.firstName} ${comment.author.lastName}`
                      }
                    />
                  ))}
                  <NewComment
                    addComment={this.addNewCommentToList}
                    offerId={offerId}
                    toWhoId={commentsObject.comments[0].author.id}
                  />
                </>
              </Collapse.Panel>
            ))}
          </Collapse>
        )}
      </>
    );
  }
}
