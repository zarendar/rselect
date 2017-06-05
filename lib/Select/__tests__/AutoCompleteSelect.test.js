import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import AutoCompleteSelect from '../AutoCompleteSelect';
import styles from '../styles.scss';
import {
  CLASS,
  OPTIONS
} from './data.test';

const [FIRST_OPTION, SECOND_OPTION] = OPTIONS;

describe('AutoCompleteSelect', () => {
  const renderComponent = ({
   theme = styles,
   options = [],
   placeholder = '<not set>',
   query = '',
   value = '',
   valueKey = 'id',
   onChange = () => {},
   onQueryChange = () => {}
 } = {}) => shallow(
   <AutoCompleteSelect
     theme={theme}
     options={options}
     placeholder={placeholder}
     query={query}
     value={value}
     valueKey={valueKey}
     onChange={onChange}
     onQueryChange={onQueryChange}
   />
  );

  it(`should remove className hidden from options "onFocus"
      event was called in input`, () => {
    const component = renderComponent();
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
      options: OPTIONS,
      value: FIRST_OPTION.id
    });
    const input = component.find(CLASS.input);

    expect(input.prop('value')).to.be.equal(FIRST_OPTION.name);
  });

  it('should change query state when option was clicked', () => {
    const component = renderComponent({ options: OPTIONS });
    const option = component.find(CLASS.option);

    option.at(0).simulate('click');
    expect(component.state('query')).to.be.equal(FIRST_OPTION.name);
    option.at(1).simulate('click');
    expect(component.state('query')).to.be.equal(SECOND_OPTION.name);
  });

  it(`should change query state when "onChange" event
      was called in input`, () => {
    const component = renderComponent({ options: OPTIONS });
    const input = component.find(CLASS.input);

    input.simulate('change', { target: { value: 'smth' } });
    expect(component.state('query')).to.be.equal('smth');
  });

  it('should show option if set value but cleared query', () => {
    const component = renderComponent({
      options: OPTIONS,
      value: FIRST_OPTION.id
    });
    const input = component.find(CLASS.input);

    input.simulate('change', { target: { value: '' } });

    expect(component.find(CLASS.option)).to.have.length(4);
  });

  it('should call "onChange" with query param when option was not select', () => {
    const onQueryChange = sinon.spy();
    const component = renderComponent({
      options: OPTIONS,
      onQueryChange
    });

    const input = component.find(CLASS.input);
    input.simulate('change', { target: { value: 'smth' } });

    const [[arg]] = onQueryChange.args;
    expect(onQueryChange).to.have.property('callCount', 1);
    expect(arg).to.be.equal('smth');
  });

  it('should call "onChange" with particular valueKey when component was changed', () => {
    const onChange = sinon.spy();
    const component = renderComponent({
      options: OPTIONS,
      valueKey: 'name',
      onChange
    });
    const option = component.find(CLASS.option).at(0);

    option.simulate('click');

    const [[firstArg]] = onChange.args;
    expect(onChange).to.have.property('callCount', 1);
    expect(firstArg).to.be.equal(FIRST_OPTION.name);
  });
});
