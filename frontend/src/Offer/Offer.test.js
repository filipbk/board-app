import {shallow} from 'enzyme';
import React from 'react';
import {Offer} from './Offer';
import {authenticationService} from '../services';
import {Link} from 'react-router-dom';
import {Button} from 'antd';
import {UserRoles} from '../constants/UserRoles';

describe('Offer', () => {
  let offerItem;

  beforeEach(() => {
    offerItem = shallow(
      <Offer
        match={{
          params: {
            token:
              'eyJpZCI6NywidGhpcmRQYXJ0eUlkIjoiMTExMjExNjAxMzgxNDc1NDYyOTY1IiwicHJvdmlkZXIiOiJnb29nbGUiLCJlbWFpbCI6ImZpbGlwcDk3M0BnbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJGaWxpcCIsImxhc3ROYW1lIjoiQm9nYXRrbyIsImVuYWJsZWQiOnRydWUsInJvbGVzIjpbIlVTRVIiXSwiaWF0IjoxNTg5NDA2MjM0LCJleHAiOjE1ODk0MTM0MzR9.vw17c_l5qooYwU6Y5iA29OrSSPHaaVYD5XdKUjkmNwo'
          }
        }}
      />
    );
  });

  describe('when the current user is an admin', () => {
    beforeEach(() => {
      jest.spyOn(authenticationService, 'currentUserValue').mockReturnValue({
        id: 6,
        role: UserRoles.ADMIN
      });
    });

    it('should render offer with buttons', () => {
      const offer = {
        id: 1,
        title: 'A',
        image: '400x404.jpg/cc0000/ffffff',
        money: 69329.27,
        description: 'B',
        category: {name: 'C'},
        author: {id: 5}
      };

      offerItem.setState({offerData: offer, isLoading: false});
      expect(offerItem).toBeInTheDocument;
      expect(offerItem.find(Link).text()).toEqual('Edit');
      expect(offerItem.find(Button).text()).toEqual('Delete');
    });
  });

  describe('when the current user is a user', () => {
    beforeEach(() => {
      jest.spyOn(authenticationService, 'currentUserValue').mockReturnValue({
        id: 5
      });
    });

    it('should render offer with buttons for offer author', () => {
      const offer = {
        id: 1,
        title: 'A',
        image: '400x404.jpg/cc0000/ffffff',
        money: 69329.27,
        description: 'B',
        category: {name: 'C'},
        author: {id: 5}
      };

      offerItem.setState({offerData: offer, isLoading: false});
      expect(offerItem).toBeInTheDocument;
      expect(offerItem.find(Link).text()).toEqual('Edit');
      expect(offerItem.find(Button).text()).toEqual('Delete');
    });

    it('should not render offer with buttons for user that is not author of the offer', () => {
      const offer = {
        id: 1,
        title: 'A',
        image: '400x404.jpg/cc0000/ffffff',
        money: 69329.27,
        description: 'B',
        category: {name: 'C'},
        author: {id: 4}
      };

      offerItem.setState({offerData: offer, isLoading: false});
      expect(offerItem).toBeInTheDocument;
      expect(offerItem.find(Link).length).toEqual(0);
      expect(offerItem.find(Button).length).toEqual(0);
    });
  });
});
