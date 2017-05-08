import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Rselect } from '../';
import styles from '../styles.scss';
import {
  NO_DATA_MESSAGE,
  OPTIONS,
  PLACEHOLDER_DEFAULT
} from './data.test';

describe('Rselect', () => {
  const renderComponent = ({
   theme = styles,
   isFocused,
   hasError,
   noDataMessage,
   options,
   placeholder
 } = {}) => shallow(
   <Rselect
     theme={theme}
     isFocused={isFocused}
     hasError={hasError}
     noDataMessage={noDataMessage}
     options={options}
     placeholder={placeholder}
   />
  );

  it('should render component by default', () => {
    const component = renderComponent();
    const placeholder = component.find(`.${styles.placeholder}`);
    const options = component.find(`.${styles.options}`);

    expect(component.state('isFocused')).to.be.equal(false);
    expect(component.state('options')).to.deep.equal([]);
    expect(component.hasClass(styles.container)).to.be.equal(true);
    expect(component.hasClass(styles.isFocused)).to.be.equal(false);
    expect(component.hasClass(styles.hasError)).to.be.equal(false);
    expect(placeholder.text()).to.be.equal(PLACEHOLDER_DEFAULT);
    expect(placeholder.hasClass(styles.hidden)).to.be.equal(false);
    expect(options.hasClass(styles.hidden)).to.be.equal(true);
    expect(options.children()).to.have.length(1);
    expect(options.children().text()).to.be.equal(NO_DATA_MESSAGE);
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

  xit(`should add className "hidden" to placeholder when the property
      is focused was transmitted`, () => {
    const component = renderComponent({ isFocused: true });
    const placeholder = component.find(`.${styles.placeholder}`);

    expect(placeholder.hasClass(styles.hidden)).to.be.equal(true);
  });

  it('should render no data option with text from prop', () => {
    const component = renderComponent({ noDataMessage: 'smth' });
    expect(component.find(`.${styles.option}`).text()).to.be.equal('smth');
  });

  it('should render options equal to data length', () => {
    const component = renderComponent({ options: OPTIONS });
    const option = component.find(`.${styles.option}`);

    expect(component.state('options')).to.be.equal(OPTIONS);
    expect(option).to.have.length(OPTIONS.length);
  });

  it(`should remove className "hidden" to options when the property
      is focused was transmitted`, () => {
    const component = renderComponent({ isFocused: true });
    const options = component.find(`.${styles.options}`);

    expect(options.hasClass(styles.hidden)).to.be.equal(false);
  });
});
