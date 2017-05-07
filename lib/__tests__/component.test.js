import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Component } from '../';
import styles from '../styles.scss';

describe('Component', () => {
  it('first test', () => {
    const component = shallow(<Component theme={styles} />);
    expect(component.text()).to.be.equal('Hello world!!!');
  });
});
