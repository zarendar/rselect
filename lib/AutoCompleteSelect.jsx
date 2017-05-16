import React from 'react';
import BaseSelect from './BaseSelect';

/**
 * Class represents AutoCompleteSelect component
 *
 * @extends {BaseSelect}
 */
class AutoCompleteSelect extends BaseSelect {
  /**
   * Create new AutoCompleteSelect
   *
   * @param {Object} props - The initial properties
   * @see AutoCompleteSelect.propTypes
   */
  constructor(props) {
    super(props);

    this.state = {
      query: props.value ? this.getName(props.value) : props.query
    };

    this.setQuery = this.setQuery.bind(this);
    this.setValue = this.setValue.bind(this);
    this.filterByQuery = this.filterByQuery.bind(this);
    this.filterOptions = this.filterOptions.bind(this);
    this.renderInput = this.renderInput.bind(this);
  }

  /**
  * Set new value into state
  *
  * @param {String} value - The new value
  *
  * @returns {void}
  */
  setValue(value) {
    const { name, onChange } = this.props;

    this.setState({ value }, () => {
      this.setQuery(this.getName());
      this.toggleFocusSelect();
      onChange(value, name);
    });
  }

  /**
  * Set query state
  *
  * @param {String} query - The query text
  *
  * @returns {void}
  */
  setQuery(query) {
    this.setState({ query }, () => {
      if (!query) this.setState({ value: null });
    });
  }

  /**
  * Filter by query options
  *
  * @param {Array} options - The array of options
  *
  * @returns {Array} -The array filtered by query
  */
  filterByQuery(options) {
    const query = JSON.parse(JSON.stringify(this.state.query)).toLowerCase();

    return options.filter((option) => {
      const name = JSON.parse(JSON.stringify(option.name)).toLowerCase();
      return name.includes(query);
    });
  }

  /**
  * Filter options
  *
  * @returns {Array} -The filtered array of options
  */
  filterOptions() {
    const { options } = this.props;
    const { value } = this.state;
    const filterOptions = this.filterByQuery(options);

    return filterOptions.filter(option => option.id !== value);
  }

  /**
   * Render the input
   *
   * @returns {XML} Markup for the input
   */
  renderInput() {
    const { theme, placeholder } = this.props;
    const { query } = this.state;

    return (
      <input
        type="text"
        className={theme.input}
        placeholder={placeholder}
        value={query}
        onChange={e => this.setQuery(e.target.value)}
        onFocus={() => this.focusSelect()}
      />
    );
  }

  /**
   * Render the content
   *
   * @returns {XML} Markup for the input
   */
  renderContent() {
    const { theme } = this.props;

    return (
      <div className={theme.selectContent} >
        {this.renderInput()}
        {this.renderOptions()}
        {this.renderArrow()}
      </div>
    );
  }
}

/**
 * @prop {Object} propTypes - Properties of the component
 * @prop {Object} propTypes.theme - The styles theme
 * @prop {Boolean} propTypes.name - The name of select
 * @prop {String} propTypes.placeholder - The placeholder text
 * @prop {String} propTypes.query - The query for filtering
 * @prop {String} propTypes.value - The value of select
 * @prop {Function} propTypes.onChange - The on change component handler
 */
AutoCompleteSelect.propTypes = {
  theme: React.PropTypes.shape({
    input: React.PropTypes.string,
    selectContent: React.PropTypes.string
  }).isRequired,
  name: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  query: React.PropTypes.string,
  value: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired
};

export default AutoCompleteSelect;
