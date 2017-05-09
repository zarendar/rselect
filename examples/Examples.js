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
      </ul>
    );
  }
}

export default Examples;
