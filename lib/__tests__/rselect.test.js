import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Rselect } from '../';
import styles from '../styles.scss';

describe('Rselect', () => {
  const renderComponent = ({
   theme = styles,
   isFocused,
   hasError
 } = {}) => shallow(
   <Rselect
     theme={theme}
     isFocused={isFocused}
     hasError={hasError}
   />
  );

  it('should render component by default', () => {
    const component = renderComponent();

    expect(component.state('isFocused')).to.be.equal(false);
    expect(component.hasClass(styles.container)).to.be.equal(true);
    expect(component.hasClass(styles.isFocused)).to.be.equal(false);
    expect(component.hasClass(styles.hasError)).to.be.equal(false);
  });

  it(`should render component with "isFocused" className
      by transmitted property`, () => {
    const component = renderComponent({ isFocused: true });

    expect(component.state('isFocused')).to.be.equal(true);
    expect(component.hasClass(styles.isFocused)).to.be.equal(true);
  });

  it(`should change state and toggle "isFocused" className
      by click on container`, () => {
    const component = renderComponent();

    component.simulate('click');
    expect(component.state('isFocused')).to.be.equal(true);
    expect(component.hasClass(styles.isFocused)).to.be.equal(true);

    component.simulate('click');
    expect(component.state('isFocused')).to.be.equal(false);
    expect(component.hasClass(styles.isFocused)).to.be.equal(false);
  });

  it(`should render component with "hasError" className
      by transmitted property`, () => {
    const component = renderComponent({ hasError: true });
    expect(component.hasClass(styles.hasError)).to.be.equal(true);
  });
});
