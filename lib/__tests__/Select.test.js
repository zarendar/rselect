import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Select from '../Select';
import styles from '../styles.scss';
import BaseSelect from '../BaseSelect';
import AutoCompleteSelect from '../AutoCompleteSelect';
import MultiSelect from '../MultiSelect';

describe('Select', () => {
  const renderComponent = ({
    theme = styles,
    autocomplete,
    multi,
    onChange = () => {}
  } = {}) => shallow(<Select
    theme={theme}
    autocomplete={autocomplete}
    multi={multi}
    onChange={onChange}
  />);

  it('should render BaseSelect', () => {
    const component = renderComponent();
    expect(component.find(BaseSelect)).to.have.length(1);
  });

  it('should render AutoCompleteSelect', () => {
    const component = renderComponent({ autocomplete: true });
    expect(component.find(AutoCompleteSelect)).to.have.length(1);
  });

  it('should render MultiSelect', () => {
    const component = renderComponent({ multi: true });
    expect(component.find(MultiSelect)).to.have.length(1);
  });
});
