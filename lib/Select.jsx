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
  let component = <BaseSelect {...selectData} />;

  if (selectData.multi) {
    component = <MultiSelect {...selectData} />;
  }

  if (selectData.autocomplete) {
    component = <AutoCompleteSelect {...selectData} />;
  }

  return component;
}


export default Select;

