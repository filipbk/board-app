import React from 'react';

export class AuthorComments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: [{date: "2020-05-30", author: 'adasd', authorId: 14, content: 'fdsdfggtasda'}, {date: "2020-06-3", author: 'gdfgdfg', authorId: 13, content: 'fdsdfggtasda'}]
    }
  }

  render() {
    return 'Author comments';
  }
}
