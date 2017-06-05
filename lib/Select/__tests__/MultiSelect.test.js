import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import MultiSelect from '../MultiSelect';
import styles from '../styles.scss';
import {
  CLASS,
  OPTIONS
} from './data.test';

const OPTIONS_SELECTED = OPTIONS.slice(1);
const [FIRST_OPTION, SECOND_OPTION] = OPTIONS;

describe('MultiSelect', () => {
  const renderComponent = ({
   theme = styles,
   name = '',
   options = [],
   placeholder = '<not set>',
   query = '',
   values = [],
   valueKey = 'id',
   onChange = () => {}
 } = {}) => shallow(
   <MultiSelect
     theme={theme}
     name={name}
     options={options}
     placeholder={placeholder}
     query={query}
     values={values}
     valueKey={valueKey}
     onChange={onChange}
   />
  );

  it('should render with multi property and not empty data', () => {
    const component = renderComponent({
      options: OPTIONS,
      values: [FIRST_OPTION.id]
    });
    const tags = component.find(CLASS.tags);
    const tag = component.find(CLASS.tag);
    const tagText = tag.at(0).find(CLASS.tagText);

    expect(tags.hasClass(styles.hidden)).to.be.equal(false);
    expect(tag).to.have.length(1);
    expect(tagText.text()).to.be.equal(FIRST_OPTION.name);
  });

  it('should set "values" state when option was clicked', () => {
    const component = renderComponent({
      isFocused: true,
      options: OPTIONS
    });
    const option = component.find(CLASS.option).at(0);

    option.at(0).simulate('click');
    expect(component.state('values')).to.deep.equal([FIRST_OPTION.id]);
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
    expect(component.find(CLASS.option)).to.have.length(OPTIONS.length);
  });

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

  it('should call "onChange" when component was changed with multi', () => {
    const onChange = sinon.spy();
    const component = renderComponent({
      name: 'smth',
      multi: true,
      options: OPTIONS,
      onChange
    });
    const option = component.find(CLASS.option).at(0);

    option.simulate('click');

    const [[firstArg, secondArg]] = onChange.args;
    expect(onChange).to.have.property('callCount', 1);
    expect(firstArg).to.deep.equal([FIRST_OPTION.id]);
    expect(secondArg).to.be.equal('smth');
  });

  it('should set state when component recieved new properties', () => {
    const component = renderComponent({});

    component.setProps({
      values: [FIRST_OPTION.id]
    });
    expect(component.state().values).to.deep.equal([FIRST_OPTION.id]);
  });
});
