import React from 'react';
import Select from '../lib/';
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
          <h3>Default</h3>
          <Select
            options={OPTIONS}
          />
        </li>
        <li>
          <h3>Autocomplete</h3>
          <Select
            options={OPTIONS}
            autocomplete
          />
        </li>
        <li>
          <h3>Multi</h3>
          <Select
            options={OPTIONS}
            multi
          />
        </li>
        <li>
          <h3>Autocomplete in Multi</h3>
          <Select
            options={OPTIONS}
            multi
            autocomplete
          />
        </li>
      </ul>
    );
  }
}

export default Examples;
