import React from 'react';
import Select from '../lib/';
import {
  OPTIONS
} from '../lib/__tests__/data.test';
import theme from './theme.scss';

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
            onChange={() => {}}
          />
        </li>
        <li>
          <h3>Autocomplete</h3>
          <Select
            options={OPTIONS}
            autocomplete
            onChange={() => {}}
          />
        </li>
        <li>
          <h3>Multi</h3>
          <Select
            options={OPTIONS}
            multi
            values={['1']}
            onChange={() => {}}
          />
        </li>
        <li>
          <h3>Autocomplete in Multi</h3>
          <Select
            options={OPTIONS}
            multi
            autocomplete
            onChange={() => {}}
          />
        </li>
        <li>
          <h3>Themed</h3>
          <Select
            options={OPTIONS}
            onChange={() => {}}
            emptyOption
          />
        </li>
      </ul>
    );
  }
}

export default Examples;
