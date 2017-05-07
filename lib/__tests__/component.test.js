import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Component from '../component.js';

describe('Component', () => {
  it('first test', () => {
    const component = shallow(<Component />);
    expect(component.text()).to.be.equal('Hello world!!!');
  });
})
