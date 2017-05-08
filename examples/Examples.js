import React from 'react';
import Select from '../lib/';

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
          <Select />
        </li>
        <li>
          <h3>Is focused</h3>
          <Select isFocused />
        </li>
        <li>
          <h3>Has error</h3>
          <Select hasError />
        </li>
      </ul>
    );
  }
}

export default Examples;
