import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Rselect } from '../';
import styles from '../styles.scss';

const PLACEHOLDER_DEFAULT = 'Placeholder';

describe('Rselect', () => {
  const renderComponent = ({
   theme = styles,
   isFocused,
   hasError,
   placeholder
 } = {}) => shallow(
   <Rselect
     theme={theme}
     isFocused={isFocused}
     hasError={hasError}
     placeholder={placeholder}
   />
  );

  it('should render component by default', () => {
    const component = renderComponent();
    const placeholder = component.find(`.${styles.placeholder}`);

    expect(component.state('isFocused')).to.be.equal(false);
    expect(component.hasClass(styles.container)).to.be.equal(true);
    expect(component.hasClass(styles.isFocused)).to.be.equal(false);
    expect(component.hasClass(styles.hasError)).to.be.equal(false);
    expect(placeholder.text()).to.be.equal(PLACEHOLDER_DEFAULT);
    expect(placeholder.hasClass(styles.hidden)).to.be.equal(false);
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

  it(`should render specify placeholder text by transmitted
      property`, () => {
    const component = renderComponent({ placeholder: 'Smth' });
    const placeholder = component.find(`.${styles.placeholder}`);

    expect(placeholder.text()).to.be.equal('Smth');
  });

  it(`should add className "hidden" to placeholder when the property
      is focused was transmitted`, () => {
    const component = renderComponent({ isFocused: true });
    const placeholder = component.find(`.${styles.placeholder}`);

    expect(placeholder.hasClass(styles.hidden)).to.be.equal(true);
  });
});
