import {mount} from 'enzyme';
import React from 'react';
import {Collapse, Comment} from 'antd';
import {authenticationService} from '../../services';
import {UserRoles} from '../../constants/UserRoles';
import {AuthorComments} from './AuthorComments';

describe('AuthorComments', () => {
  let commentsComponent;
  let comments;

  beforeEach(() => {
    commentsComponent = mount(<AuthorComments offerId={1} />);

    jest.spyOn(authenticationService, 'currentUserValue').mockReturnValue({
      id: 13,
      role: UserRoles.ADMIN
    });

    comments = [
      {
        comments: [
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
              email: 'f@gmail.com',
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
              email: 'f@gmail.com',
              firstName: 'A',
              lastName: 'B'
            }
          }
        ]
      },
      {
        comments: [
          {
            createdAt: '2020-06-13T10:41:35.692Z',
            id: 1,
            content: 'aaa',
            author: {
              id: 14,
              firstName: 'B',
              lastName: 'F'
            },
            toWho: {
              id: 13,
              email: 'f@gmail.com',
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
              email: 'f@gmail.com',
              firstName: 'A',
              lastName: 'B'
            }
          }
        ]
      }
    ];
  });

  it('should render comments accordion', () => {
    commentsComponent.setState({comments});

    expect(commentsComponent.find(Collapse.Panel)).toHaveLength(2);
  });

  it('should render names of comment authors', () => {
    commentsComponent.setState({comments});

    expect(commentsComponent.find(Collapse.Panel).at(0).text()).toEqual('F B');
    expect(commentsComponent.find(Collapse.Panel).at(1).text()).toEqual('B F');
  });
});
