import React from 'react';
import ThemedSelect from '../lib/';
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
          <ThemedSelect
            emptyOption
            options={OPTIONS}
            onChange={() => {}}
          />
        </li>
      </ul>
    );
  }
}

export default Examples;
