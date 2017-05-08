import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Rselect } from '../';
import styles from '../styles.scss';

describe('Rselect', () => {
  const renderComponent = ({
   theme = styles
 } = {}) => shallow(
   <Rselect
     theme={theme}
   />
  );

  it('should render component by default', () => {
    const component = renderComponent();
    expect(component.hasClass(styles.container)).to.be.equal(true);
  });
});
