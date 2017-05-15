import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { BaseSelect } from '../';
import {
  CLASS,
  NO_DATA_MESSAGE,
  OPTIONS,
  PLACEHOLDER_DEFAULT
} from './data.test';
import styles from '../styles.scss';

const OPTIONS_SELECTED = OPTIONS.slice(1);
const [FIRST_OPTION] = OPTIONS;

describe('BaseSelect', () => {
  const renderComponent = ({
   theme = styles,
   direction,
   disabled,
   emptyOption,
   error,
   isFocused,
   name,
   noDataMessage,
   options,
   placeholder,
   query,
   value,
   onChange = () => {}
 } = {}) => shallow(
   <BaseSelect
     theme={theme}
     direction={direction}
     disabled={disabled}
     emptyOption={emptyOption}
     error={error}
     isFocused={isFocused}
     name={name}
     noDataMessage={noDataMessage}
     options={options}
     placeholder={placeholder}
     query={query}
     value={value}
     onChange={onChange}
   />
  );

  it('should render component by default', () => {
    const component = renderComponent();
    const arrow = component.find(CLASS.arrow);
    const error = component.find(CLASS.error);
    const options = component.find(CLASS.options);
    const select = component.find(CLASS.select);
    const value = component.find(CLASS.value);

    expect(component.state('isFocused')).to.be.equal(false);
    expect(component.state('value')).to.be.a('null');
    expect(component.hasClass(styles.container)).to.be.equal(true);
    expect(select.hasClass(styles.isFocused)).to.be.equal(false);
    expect(select.hasClass(styles.error)).to.be.equal(false);
    expect(select.hasClass(styles.disabled)).to.be.equal(false);
    expect(arrow).to.have.length(1);
    expect(arrow.hasClass(styles.up)).to.be.equal(false);
    expect(error).to.have.length(0);
    expect(options.hasClass(styles.hidden)).to.be.equal(true);
    expect(options.hasClass(styles.top)).to.be.equal(false);
    expect(options.children()).to.have.length(1);
    expect(options.children().text()).to.be.equal(NO_DATA_MESSAGE);
    expect(value.text()).to.be.equal(PLACEHOLDER_DEFAULT);
  });

  it(`should render component with "isFocused" className
      by transmitted property`, () => {
    const component = renderComponent({ isFocused: true });
    const arrow = component.find(CLASS.arrow);
    const select = component.find(CLASS.select);

    expect(component.state('isFocused')).to.be.equal(true);
    expect(select.hasClass(styles.isFocused)).to.be.equal(true);
    expect(arrow.hasClass(styles.up)).to.be.equal(true);
  });

  it(`should render component with "disabled" className
      by transmitted property`, () => {
    const component = renderComponent({ disabled: true });
    const select = component.find(CLASS.select);
    expect(select.hasClass(styles.disabled)).to.be.equal(true);
  });

  it('should render error when property "error" was transmitted', () => {
    const component = renderComponent({
      error: 'some error'
    });
    const error = component.find(CLASS.error);
    const select = component.find(CLASS.select);

    expect(select.hasClass(styles.hasError)).to.be.equal(true);
    expect(error.text()).to.be.equal('some error');
  });

  /* OPTIONS */
  it('should render no data option with text from prop', () => {
    const component = renderComponent({ noDataMessage: 'smth' });
    const option = component.find(CLASS.option);

    expect(option.text()).to.be.equal('smth');
  });

  it('should render options equal to data length', () => {
    const component = renderComponent({ options: OPTIONS });
    const option = component.find(CLASS.option);

    expect(option).to.have.length(OPTIONS.length);
  });

  it(`should remove className "hidden" to options when the property
      is focused was transmitted`, () => {
    const component = renderComponent({ isFocused: true });
    const options = component.find(CLASS.options);

    expect(options.hasClass(styles.hidden)).to.be.equal(false);
  });

  it('should change state "value" when option was clicked', () => {
    const component = renderComponent({ options: OPTIONS });
    const option = component.find(CLASS.option).at(0);

    option.simulate('click');
    expect(component.state('value')).to.be.equal(FIRST_OPTION.id);
    expect(component.find(CLASS.option)).to.have.length(
      OPTIONS_SELECTED.length);
    expect(component.find(CLASS.value).text()).to.be.equal(
      FIRST_OPTION.name);
  });

  it('should correctly render options if value not empty', () => {
    const component = renderComponent({
      options: OPTIONS,
      value: FIRST_OPTION.id
    });
    const option = component.find(CLASS.option);

    expect(option).to.have.length(OPTIONS_SELECTED.length);
  });

  it('should change "isFocused" state when option was clicked', () => {
    const component = renderComponent({
      isFocused: true,
      options: OPTIONS
    });
    const option = component.find(CLASS.option).at(0);

    option.simulate('click');
    expect(component.state('isFocused')).to.be.equal(false);
  });

  it('should add class top to options when prop top was transmitted', () => {
    const component = renderComponent({ options: OPTIONS, direction: 'top' });
    const options = component.find(CLASS.options);

    expect(options.hasClass(styles.top)).to.be.equal(true);
  });

  /* VALUE */
  it('should render value when the prop value was transmitted', () => {
    const component = renderComponent({
      options: OPTIONS,
      value: FIRST_OPTION.id
    });
    const value = component.find(CLASS.value);

    expect(value.text()).to.be.equal(FIRST_OPTION.name);
  });

  it(`should change state and toggle "isFocused" className
      by click on value`, () => {
    const component = renderComponent();
    const value = component.find(CLASS.value);

    value.simulate('click');
    expect(component.state('isFocused')).to.be.equal(true);
    expect(component.find(CLASS.select).hasClass(styles.isFocused)).to.be.equal(true);

    value.simulate('click');
    expect(component.state('isFocused')).to.be.equal(false);
    expect(component.find(CLASS.select).hasClass(styles.isFocused)).to.be.equal(false);
  });

  /* onChange */

  it('should call "onChange" when component was changed', () => {
    const onChange = sinon.spy();
    const component = renderComponent({
      name: 'smth',
      options: OPTIONS,
      onChange
    });
    const option = component.find(CLASS.option).at(0);

    option.simulate('click');

    const [[firstArg, secondArg]] = onChange.args;
    expect(onChange).to.have.property('callCount', 1);
    expect(firstArg).to.be.equal(FIRST_OPTION.id);
    expect(secondArg).to.be.equal('smth');
  });

  /* Component will recieve props */
  it('should set state when component recieved new properties', () => {
    const component = renderComponent({});

    component.setProps({
      value: FIRST_OPTION.id
    });
    expect(component.state().value).to.deep.equal(FIRST_OPTION.id);
  });

  /* Empty option  */
  it('should render with empty option in single select', () => {
    const component = renderComponent({
      emptyOption: true,
      options: OPTIONS,
      value: FIRST_OPTION.id
    });
    const option = component.find(CLASS.option);

    expect(option.at(0).text()).to.be.equal(PLACEHOLDER_DEFAULT);
    expect(option).to.have.length(OPTIONS.length);

    option.at(0).simulate('click');
    expect(component.state().value).to.be.a('null');
  });
});
