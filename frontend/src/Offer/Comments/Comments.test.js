import {Comments} from './Comments';
import {mount} from 'enzyme';
import React from 'react';
import {Comment} from 'antd';
import {authenticationService} from '../../services';
import {UserRoles} from '../../constants/UserRoles';

describe('Comments', () => {
  let commentsComponent;
  let comments;

  beforeEach(() => {
    commentsComponent = mount(<Comments offerId={1} toWhoId={13} />);

    jest.spyOn(authenticationService, 'currentUserValue').mockReturnValue({
      id: 14,
      role: UserRoles.ADMIN
    });

    comments = [
      {
        createdAt: '2020-06-13T10:41:35.692Z',
        id: 1,
        content: 'aaa',
        author: {
          id: 14,
          firstName: 'F',
          lastName: 'B'
        },
        toWho: {
          id: 13,
          email: 'filipp973@gmail.com',
          firstName: 'A',
          lastName: 'B'
        }
      },
      {
        createdAt: '2020-06-13T10:41:35.692Z',
        id: 1,
        content: 'bbb',
        toWho: {
          id: 14,
          firstName: 'F',
          lastName: 'B'
        },
        author: {
          id: 13,
          email: 'filipp973@gmail.com',
          firstName: 'A',
          lastName: 'B'
        }
      }
    ];
  });

  it('should render comments list', () => {
    commentsComponent.setState({comments});
    //Two comments + one Comment component for new comment
    expect(commentsComponent.find(Comment)).toHaveLength(3);
  });

  it('should render comments authors and content', () => {
    commentsComponent.setState({comments});
    expect(commentsComponent.find(Comment).at(0).text()).toContain('You');
    expect(commentsComponent.find(Comment).at(0).text()).toContain('aaa');
    expect(commentsComponent.find(Comment).at(1).text()).toContain('A B');
    expect(commentsComponent.find(Comment).at(1).text()).toContain('bbb');
  });
});
