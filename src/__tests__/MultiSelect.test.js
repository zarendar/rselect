import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import MultiSelect from '../MultiSelect';
import { DEFAULT_PLACEHOLDER } from '../Select';
import styles from '../styles.scss';
import {
  CLASS,
  OPTIONS
} from './data.test';

const [FIRST_OPTION, SECOND_OPTION] = OPTIONS;

describe('MultiSelect', () => {
  const renderComponent = ({
    theme = styles,
    labelKey = 'name',
    name = '',
    options = [],
    placeholder = DEFAULT_PLACEHOLDER,
    query = '',
    values = [],
    valueKey = 'id',
    onChange = () => {}
  } = {}) => shallow(<MultiSelect
    theme={theme}
    labelKey={labelKey}
    name={name}
    options={options}
    placeholder={placeholder}
    query={query}
    values={values}
    valueKey={valueKey}
    onChange={onChange}
  />);

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

  it('should correctly render options with sat labelKey', () => {
    const component = renderComponent({
      labelKey: 'year',
      options: [{ id: 'someId', year: '2014' }]
    });
    const options = component.find(CLASS.options);
    const option = component.find(CLASS.option).at(0);

    expect(options).to.have.length(1);
    expect(option.text()).to.be.equal('2014');
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
    const stopPropagation = sinon.spy();
    const component = renderComponent({
      name: 'smth',
      multi: true,
      options: OPTIONS,
      onChange
    });
    const option = component.find(CLASS.option).at(0);

    option.simulate('click', { stopPropagation });
    expect(stopPropagation).to.have.property('callCount', 1);

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
