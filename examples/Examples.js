import React from 'react';
import Select from '../lib';
import {
  OPTIONS
} from '../lib/__tests__/data.test';

/**
 * Class represents Examples component
 *
 * @extends {React.Component}
 */
class Examples extends React.Component {
  /**
   * Render the component
   *
   * @returns {XML} Markup for the component
   */
  render() {
    return (
      <ul>
        <li>
          <h3>Base</h3>
          <Select
            emptyOption
            options={OPTIONS}
            onChange={() => {}}
          />
        </li>
        <li>
          <h3>Autocomplete</h3>
          <Select
            autocomplete
            emptyOption
            options={OPTIONS}
            onChange={() => {}}
          />
        </li>
        <li>
          <h3>Multi</h3>
          <Select
            multi
            options={OPTIONS}
            onChange={() => {}}
          />
        </li>
      </ul>
    );
  }
}

export default Examples;
