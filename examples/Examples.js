import React from 'react';
import Select from '../src';
import options from './data';


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
      basicValue: '',
      autoCompleteQuery: '',
      autoCompleteValue: '',
      multiValues: []
    };

    this.setBasicValue = this.setBasicValue.bind(this);
    this.setAutoCompleteValue = this.setAutoCompleteValue.bind(this);
    this.setMultiValues = this.setMultiValues.bind(this);
  }

  /**
  * Set new basic value into state
  *
  * @param {String} basicValue - The new value
  *
  * @returns {void}
  */
  setBasicValue(basicValue) {
    this.setState({ basicValue });
  }

  /**
   * Set new autoComplete value into state
   *
   * @param {String} autoCompleteValue - The new autoComplete value
   *
   * @returns {void}
   */
  setAutoCompleteValue(autoCompleteValue) {
    this.setState({ autoCompleteQuery: autoCompleteValue, autoCompleteValue });
  }

  /**
   * Set new multi value into state
   *
   * @param {String} multiValues - The new values
   *
   * @returns {void}
   */
  setMultiValues(multiValues) {
    this.setState({ multiValues });
  }

  /**
   * Render the component
   *
   * @returns {XML} Markup for the component
   */
  render() {
    const {
      basicValue,
      autoCompleteValue,
      autoCompleteQuery,
      multiValues
    } = this.state;

    return (
      <div>
        <section>
          <p>Basic</p>
          <Select
            options={options}
            value={basicValue}
            onChange={this.setBasicValue}
          />
        </section>
        <section>
          <p>AutoComplete</p>
          <Select
            autocomplete
            options={options}
            query={autoCompleteQuery}
            value={autoCompleteValue}
            onChange={this.setAutoCompleteValue}
            onQueryChange={this.setAutoCompleteValue}
          />
        </section>
        <section>
          <p>Multi</p>
          <Select
            multi
            options={options}
            values={multiValues}
            onChange={this.setMultiValues}
          />
        </section>
      </div>
    );
  }
}

export default Examples;
