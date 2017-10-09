import React from 'react';
import BaseSelect from './BaseSelect';
import AutoCompleteSelect from './AutoCompleteSelect';
import MultiSelect from './MultiSelect';

/**
 * The placeholder by default
 *
 * @type {String}
 */
export const DEFAULT_PLACEHOLDER = '<select>';

/**
 * The text shows when options array is empty
 *
 * @type {String}
 */
export const NO_DATA_MESSAGE = 'No data';

/**
 * Function represents Select HOC component
 *
 * @param {Object} selectData - The select data
 *
 * @returns {XML} - The particular class
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
 * @prop {String} defaultProps.labelKey - The key of label in the options
 * @prop {Boolean} defaultProps.multi - The flag for multi select
 * @prop {Array} defaultProps.options - The data for options
 * @prop {String} defaultProps.placeholder - The placeholder text
 * @prop {String} defaultProps.query = The query for autocomplete
 * @prop {String} defaultProps.value - The value of select
 * @prop {Array} defaultProps.values - The values of select
 * @prop {Array} defaultProps.valueKey - The key of selected value
 * @prop {Function} defaultProps.onQueryChange - The handler on query was changed
 */
Select.defaultProps = {
  autocomplete: false,
  direction: 'bottom',
  disabled: false,
  emptyOption: false,
  isFocused: false,
  error: '',
  labelKey: 'name',
  multi: false,
  noDataMessage: NO_DATA_MESSAGE,
  name: '',
  options: [],
  placeholder: DEFAULT_PLACEHOLDER,
  query: '',
  value: '',
  values: [],
  valueKey: 'id',
  onQueryChange: () => {}
};

export default Select;

