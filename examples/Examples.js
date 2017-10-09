import React from 'react';
import Select from '../lib';

/**
 * Class represents Examples component
 *
 * @extends {React.Component}
 */
class Examples extends React.Component {
  /**
   * Create new Examples
   *
   * @param {Object} props - The initial properties
   * @see Examples.propTypes
   */
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };

    this.setValue = this.setValue.bind(this);
  }

  /**
  * Set new value into state
  *
  * @param {String} value - The new value
  *
  * @returns {void}
  */
  setValue(value) {
    this.setState({ value });
  }

  /**
   * Render the component
   *
   * @returns {XML} Markup for the component
   */
  render() {
    return (
      <Select
        emptyOption
        options={[{ id: '1', name: 'First' }, { id: '2', name: 'Second' }, { id: '3', name: 'Third' }]}
        value={this.state.value}
        onChange={this.setValue}
      />
    );
  }
}

export default Examples;
