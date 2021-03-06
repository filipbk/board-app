import React from 'react';
import {mount} from 'enzyme';
import {OfferItem} from './OfferItem';

describe('OfferItem', () => {
  it('should render item with all of its properties', () => {
    const offer = {
      id: 1,
      title: 'Lotlux',
      image: '400x404.jpg/cc0000/ffffff',
      money: 69329.27
    };

    const offerItem = mount(<OfferItem {...offer} />);
    const url = process.env.REACT_APP_API_URL;
    expect(offerItem).toBeInTheDocument;
    expect(offerItem.find('#offer-1-thumbnail').at(0).prop('src')).toEqual(
      `${url}/offers/photo/${offer.image}`
    );
    expect(offerItem.find('#offer-1-title').at(0).text()).toEqual(offer.title);
    expect(offerItem.find('#offer-1-price').at(0).text()).toEqual(`${offer.money} zł`);
  });
});
