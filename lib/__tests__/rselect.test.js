import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Rselect } from '../';
import styles from '../styles.scss';

describe('Rselect', () => {
  it('first test', () => {
    const component = shallow(<Rselect theme={styles} />);
    expect(component.hasClass(styles.rSelect)).to.be.equal(true);
  });
});
