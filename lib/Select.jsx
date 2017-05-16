import React from 'react';
import BaseSelect from './BaseSelect';
import AutoCompleteSelect from './AutoCompleteSelect';
import MultiSelect from './MultiSelect';

/**
 * Function represents Select HOC component
 *
 * @param {Object} selectData - The select data
 *
 * @returns {Class} - The particular class
 */
function Select(selectData) {
  if (selectData.multi) {
    return <MultiSelect {...selectData} />;
  }

  if (selectData.autocomplete) {
    return <AutoCompleteSelect {...selectData} />;
  }

  return <BaseSelect {...selectData} />;
}

/**
 * @prop {Object} defaultProps - Properties of the component
 * @prop {Object} defaultProps.theme - The styles theme
 * @prop {Boolean} defaultProps.autocomplete - The flag for autocomplete
 * @prop {String} defaultProps.direction - The options direction way
 * @prop {Boolean} defaultProps.disabled - The flag for disabled
 * @prop {Boolean} defaultProps.emptyOption - The flag for emptyOption
 * @prop {Boolean} defaultProps.isFocused - The flag for focused state
 * @prop {Boolean} defaultProps.error - The flag for detecte an error
 * @prop {String} defaultProps.noDataMessage - The text when data is empty
 * @prop {Boolean} defaultProps.name - The name of select
 * @prop {Boolean} defaultProps.multi - The flag for multi select
 * @prop {Array} defaultProps.options - The data for options
 * @prop {String} defaultProps.placeholder - The placeholder text
 * @prop {String} defaultProps.query = The query for autocomplete
 * @prop {String} defaultProps.value - The value of select
 * @prop {Array} defaultProps.values - The values of select
 */
Select.defaultProps = {
  autocomplete: false,
  direction: 'bottom',
  disabled: false,
  emptyOption: false,
  isFocused: false,
  error: null,
  multi: false,
  noDataMessage: 'No data',
  name: null,
  options: [],
  placeholder: '<not set>',
  query: '',
  value: null,
  values: []
};

export default Select;

