import {shallow, mount} from 'enzyme';
import React from 'react';
import {OfferForm} from './OfferForm';

describe('OfferForm', () => {
  it('state changes after inserting some values', () => {
    const offerForm = shallow(<OfferForm />);

    offerForm.find('#categoryId').simulate('change', 1);
    offerForm.find('#title').simulate('change', {target: {value: 'A'}});
    offerForm.find('#description').simulate('change', {target: {value: 'B'}});
    offerForm.find('#city').simulate('change', {target: {value: 'C'}});
    offerForm.find('#money').simulate('change', {target: {value: 2}});

    expect(offerForm.state('categoryId')).toBe(1);
    expect(offerForm.state('title')).toBe('A');
    expect(offerForm.state('description')).toBe('B');
    expect(offerForm.state('city')).toBe('C');
    expect(offerForm.state('money')).toBe(2);
  });

  it('passes proper values to onSubmit', () => {
    const onSubmit = jest.fn();
    const offerForm = shallow(<OfferForm onSubmit={onSubmit} />);
    const eventData = {
      categoryId: 1,
      title: 'A',
      description: 'B',
      city: 'C',
      money: 2
    };

    offerForm.find('#form').simulate('finish', eventData);
    expect(onSubmit).toHaveBeenCalledWith(eventData, null);
  });

  it('renders offer form in non edit mode', () => {
    const offerForm = mount(<OfferForm editMode={false} />);

    expect(offerForm.find('h2').text()).toBe('Create new offer');
  });

  it('renders offer form in edit mode', () => {
    const offerForm = mount(<OfferForm editMode={true} />);

    expect(offerForm.find('h2').text()).toBe('Edit offer');
  });
});
