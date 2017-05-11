import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Rselect } from '../';
import styles from '../styles.scss';
import {
  CLASS,
  NO_DATA_MESSAGE,
  OPTIONS,
  PLACEHOLDER_DEFAULT
} from './data.test';

const OPTIONS_SELECTED = OPTIONS.slice(1);
const [FIRST_OPTION, SECOND_OPTION] = OPTIONS;

describe('Rselect', () => {
  const renderComponent = ({
   theme = styles,
   autocomplete,
   direction,
   isFocused,
   hasError,
   multi,
   noDataMessage,
   options,
   placeholder,
   query,
   value,
   values
 } = {}) => shallow(
   <Rselect
     theme={theme}
     autocomplete={autocomplete}
     direction={direction}
     isFocused={isFocused}
     hasError={hasError}
     multi={multi}
     noDataMessage={noDataMessage}
     options={options}
     placeholder={placeholder}
     query={query}
     value={value}
     values={values}
   />
  );

  it('should render component by default', () => {
    const component = renderComponent();
    const arrow = component.find(CLASS.arrow);
    const input = component.find(CLASS.input);
    const options = component.find(CLASS.options);
    const tags = component.find(CLASS.tags);
    const tag = component.find(CLASS.tag);
    const value = component.find(CLASS.value);

    expect(component.state('isFocused')).to.be.equal(false);
    expect(component.state('query')).to.be.equal('');
    expect(component.state('value')).to.be.a('null');
    expect(component.state('values')).to.deep.equal([]);
    expect(component.hasClass(styles.container)).to.be.equal(true);
    expect(component.hasClass(styles.isFocused)).to.be.equal(false);
    expect(component.hasClass(styles.hasError)).to.be.equal(false);
    expect(arrow).to.have.length(1);
    expect(arrow.hasClass(styles.up)).to.be.equal(false);
    expect(options.hasClass(styles.hidden)).to.be.equal(true);
    expect(options.hasClass(styles.top)).to.be.equal(false);
    expect(options.children()).to.have.length(1);
    expect(options.children().text()).to.be.equal(NO_DATA_MESSAGE);
    expect(tags).to.have.length(0);
    expect(tag).to.have.length(0);
    expect(value.hasClass(styles.hidden)).to.be.equal(false);
    expect(value.text()).to.be.equal(PLACEHOLDER_DEFAULT);
    expect(input.hasClass(styles.hidden)).to.be.equal(true);
  });

  it(`should render component with "isFocused" className
      by transmitted property`, () => {
    const component = renderComponent({ isFocused: true });
    const arrow = component.find(CLASS.arrow);

    expect(component.state('isFocused')).to.be.equal(true);
    expect(component.hasClass(styles.isFocused)).to.be.equal(true);
    expect(arrow.hasClass(styles.up)).to.be.equal(true);
  });

  it(`should render component with "hasError" className
      by transmitted property`, () => {
    const component = renderComponent({ hasError: true });
    expect(component.hasClass(styles.hasError)).to.be.equal(true);
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
    expect(component.hasClass(styles.isFocused)).to.be.equal(true);

    value.simulate('click');
    expect(component.state('isFocused')).to.be.equal(false);
    expect(component.hasClass(styles.isFocused)).to.be.equal(false);
  });

  /* AUTOCOMPLETE */
  it('should render component with autocomplete', () => {
    const component = renderComponent({ autocomplete: true });
    const value = component.find(CLASS.value);
    const input = component.find(CLASS.input);

    expect(value.hasClass(styles.hidden)).to.be.equal(true);
    expect(input.hasClass(styles.hidden)).to.be.equal(false);
  });

  it(`should remove className hidden from options "onFocus"
      event was called in input`, () => {
    const component = renderComponent({ autocomplete: true });
    const input = component.find(CLASS.input);

    input.simulate('focus');
    expect(component.state('isFocused')).to.be.equal(true);
    expect(component.find(CLASS.options).hasClass(styles.hidden))
      .to.be.equal(false);

    input.simulate('blur');

    input.simulate('focus');
    expect(component.state('isFocused')).to.be.equal(true);
    expect(component.find(CLASS.options).hasClass(styles.hidden))
      .to.be.equal(false);
  });

  it('should render component with autocomplete and set value', () => {
    const component = renderComponent({
      autocomplete: true,
      options: OPTIONS,
      value: FIRST_OPTION.id
    });
    const value = component.find(CLASS.value);
    const input = component.find(CLASS.input);

    expect(value.hasClass(styles.hidden)).to.be.equal(true);
    expect(input.hasClass(styles.hidden)).to.be.equal(false);
    expect(input.prop('value')).to.be.equal(FIRST_OPTION.name);
  });

  it('should change query state when option was cliecked', () => {
    const component = renderComponent({
      autocomplete: true,
      options: OPTIONS
    });
    const option = component.find(CLASS.option);

    option.at(0).simulate('click');
    expect(component.state('query')).to.be.equal(FIRST_OPTION.name);
    option.at(1).simulate('click');
    expect(component.state('query')).to.be.equal(SECOND_OPTION.name);
  });

  it(`should change query state when "onChange" event
      was called in input`, () => {
    const component = renderComponent({
      autocomplete: true,
      options: OPTIONS
    });
    const input = component.find(CLASS.input);

    input.simulate('change', { target: { value: 'smth' } });
    expect(component.state('query')).to.be.equal('smth');
  });

  it('should filter options by query state', () => {
    const component = renderComponent({
      autocomplete: true,
      options: OPTIONS,
      query: 'Al'
    });
    const option = component.find(CLASS.option);

    expect(option).to.have.length(2);
    expect(option.at(0).text()).to.be.equal(FIRST_OPTION.name);
  });

  it('should filter options by query state in lowercase', () => {
    const component = renderComponent({
      autocomplete: true,
      options: OPTIONS,
      query: 'al'
    });
    const option = component.find(CLASS.option);

    expect(option.at(0).text()).to.be.equal(FIRST_OPTION.name);
  });

  /* Multi */
  it('should render with multi property and empty data', () => {
    const component = renderComponent({ multi: true });
    const value = component.find(CLASS.value);
    // const tags = component.find(CLASS.tags);// TODO

    expect(value.hasClass(styles.hidden)).to.be.equal(false);
    // expect(tags.hasClass(styles.hidden)).to.be.equal(true); // TODO
  });

  it('should render with multi property and not empty data', () => {
    const component = renderComponent({
      multi: true,
      options: OPTIONS,
      values: [FIRST_OPTION.id]
    });
    const arrow = component.find(CLASS.arrow);
    const tags = component.find(CLASS.tags);
    const tag = component.find(CLASS.tag);
    const tagText = tag.at(0).find(CLASS.tagText);
    const value = tags.find(CLASS.value);

    expect(arrow.hasClass(styles.hidden)).to.be.equal(true);
    expect(value).to.have.length(1);
    expect(tags.hasClass(styles.hidden)).to.be.equal(false);
    expect(tag).to.have.length(1);
    expect(tagText.text()).to.be.equal(FIRST_OPTION.name);
  });

  it('should change "isFocused" state when value in tags was clicked', () => {
    const component = renderComponent({
      multi: true,
      options: OPTIONS
    });
    const tags = component.find(CLASS.tags);
    const value = tags.find(CLASS.value);

    value.simulate('click');
    expect(component.state('isFocused')).to.be.equal(true);
    value.simulate('click');
    expect(component.state('isFocused')).to.be.equal(false);
    value.simulate('click');
    expect(component.state('isFocused')).to.be.equal(true);
  });

  it('should set "values" state when option was clicked', () => {
    const component = renderComponent({
      isFocused: true,
      multi: true,
      options: OPTIONS
    });
    const option = component.find(CLASS.option).at(0);

    option.at(0).simulate('click');
    expect(component.state('values')).to.deep.equal([FIRST_OPTION.id]);
    expect(component.state('isFocused')).to.deep.equal(true);
    expect(component.find(CLASS.option)).to.have.length(
      OPTIONS_SELECTED.length);
  });

  it(`should remove value from  "values" state when option
           was clicked if values has this option`, () => {
    const component = renderComponent({
      isFocused: true,
      multi: true,
      options: OPTIONS,
      values: [FIRST_OPTION.id]
    });
    const tag = component.find(CLASS.tag).at(0);
    const cross = tag.find(CLASS.cross);

    cross.simulate('click');
    expect(component.state('values')).to.deep.equal([]);
    expect(component.state('isFocused')).to.deep.equal(true);
    expect(component.find(CLASS.option)).to.have.length(OPTIONS.length);
  });

  /* Autocomplete in multiselect */
  it('should render input in tags', () => {
    const component = renderComponent({
      autocomplete: true,
      multi: true,
      options: OPTIONS
    });
    const tags = component.find(CLASS.tags);

    expect(tags.hasClass(styles.hidden)).to.be.equal(false);
    expect(component.children(CLASS.input)).to.have.length(0);
    expect(tags.find(CLASS.input)).to.have.length(1);
  });

  it('should change "isFocused" state when input in tags was focused', () => {
    const component = renderComponent({
      autocomplete: true,
      multi: true,
      options: OPTIONS
    });
    const tags = component.find(CLASS.tags);
    const input = tags.find(CLASS.input);

    input.simulate('focus');
    expect(component.state('isFocused')).to.be.equal(true);
  });

  it('should filter options by query state in multiselect', () => {
    const component = renderComponent({
      autocomplete: true,
      multi: true,
      options: OPTIONS,
      query: 'Al'
    });
    const option = component.find(CLASS.option);

    expect(option).to.have.length(2);
    expect(option.at(0).text()).to.be.equal(FIRST_OPTION.name);
  });

  it('should filter options by query state and with values', () => {
    const component = renderComponent({
      autocomplete: true,
      multi: true,
      options: OPTIONS,
      query: 'Al',
      values: [FIRST_OPTION.id]
    });
    const option = component.find(CLASS.option);

    expect(option).to.have.length(1);
    expect(option.at(0).text()).to.be.equal(SECOND_OPTION.name);
  });
});
