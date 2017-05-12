import React from 'react';
import cx from 'classnames';

const PLACEHOLDER_DEFAULT = 'Placeholder';
const NO_DATA_MESSAGE = 'No data';

/**
 * Class represents Select component
 *
 * @extends {React.Component}
 */
class Select extends React.Component {
  /**
   * Create new Select
   *
   * @param {Object} props - The initial properties
   * @see Select.propTypes
   */
  constructor(props) {
    super(props);

    this.state = {
      isFocused: props.isFocused,
      query: props.value ? this.getValue(props.value) : props.query,
      value: props.value,
      values: props.values || []
    };

    this.setFocusState = this.setFocusState.bind(this);
    this.setQuery = this.setQuery.bind(this);
    this.getValue = this.getValue.bind(this);
    this.setValue = this.setValue.bind(this);
    this.setValues = this.setValues.bind(this);
    this.filteredByQuery = this.filteredByQuery.bind(this);
    this.filterOptions = this.filterOptions.bind(this);
    this.filterOptionsForMulti = this.filterOptionsForMulti.bind(this);
    this.toggleFocusState = this.toggleFocusState.bind(this);
    this.subscribeOnClickOutside = this.subscribeOnClickOutside.bind(this);
    this.unsubscribeOnClickOutside = this.unsubscribeOnClickOutside.bind(this);
    this.clickOutside = this.clickOutside.bind(this);
    this.renderValue = this.renderValue.bind(this);
    this.renderInput = this.renderInput.bind(this);
    this.renderOptions = this.renderOptions.bind(this);
    this.renderTags = this.renderTags.bind(this);
  }

  /**
  * Handler on component did mount
  *
  * @returns {void}
  */
  componentDidMount() {
    this.subscribeOnClickOutside();
  }

  /**
  * Handler on component will recieve props
  *
  * @param {Object} nextProps - The next properties
  *
  * @returns {void}
  */
  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value,
      values: nextProps.values || []
    });
  }

  /**
  * Handler on component will unmount
  *
  * @returns {void}
  */
  componentWillUnmount() {
    this.unsubscribeOnClickOutside();
  }

  /**
  * Get name from options by id
  *
  * @param {String} value - The identificator from properties
  *
  * @returns {String} - The found name
  */
  getValue(value) {
    const id = value || this.state.value;
    const { options } = this.props;
    const option = options.find(item => item.id === id);

    return option ? option.name : '';
  }

  /**
  * Set new value into state
  *
  * @param {String} value - The new value
  *
  * @returns {void}
  */
  setValue(value) {
    this.setState({ value }, () => {
      if (this.props.autocomplete) {
        this.setQuery(this.getValue());
      }

      this.toggleFocusState();
      this.props.onChange(value);
    });
  }

  /**
  * Set values into state
  *
  * @param {String} value - The new value
  *
  * @returns {void}
  */
  setValues(value) {
    let values;

    if (this.state.values.includes(value)) {
      values = this.state.values.filter(id => id !== value);
    } else {
      values = [...this.state.values, value];
    }

    this.setState({ values }, () => this.props.onChange(values));
  }

  /**
  * Set isFocused state
  *
  * @param {Boolean} isFocused - The flag for isFocused state
  *
  * @returns {void}
  */
  setFocusState(isFocused) {
    this.setState({ isFocused });
  }

  /**
  * Set query state
  *
  * @param {String} query - The query text
  *
  * @returns {void}
  */
  setQuery(query) {
    this.setState({ query });
  }

  /**
  * Subscribe on click outside event
  *
  * @returns {void}
  */
  subscribeOnClickOutside() {
    document.addEventListener('click', this.clickOutside);
  }

  /**
  * Unsubscribe on click outside event
  *
  * @returns {void}
  */
  unsubscribeOnClickOutside() {
    document.removeEventListener('click', this.clickOutside);
  }

  /**
  * Click outside component
  *
  * @param {Object} e - Event object by click outside
  *
  * @returns {void}
  */
  clickOutside(e) {
    let node = e.target;
    while (node !== null) {
      if (node.hasAttribute &&
        node.hasAttribute('data-state') && !!node.getAttribute('data-state')) {
        return true;
      } // TODO I don't line this

      if (node === this.container) {
        return true;
      }
      node = node.parentNode;
    }
    this.setFocusState(false);
    return false;
  }

  /**
  * Filter by query options
  *
  * @param {Array} options - The array of options
  *
  * @returns {Array} -The array filtered by query
  */
  filteredByQuery(options) {
    return options.filter((option) => {
      const name = JSON.parse(JSON.stringify(option.name)).toLowerCase();
      const query = JSON.parse(JSON.stringify(this.state.query)).toLowerCase();
      return name.includes(query);
    });
  }

  /**
  * Filter options
  *
  * @param {String} id - The filtering identificator
  *
  * @returns {Array} -The filtered array of options
  */
  filterOptions(id) {
    let filteredOptions;
    const { autocomplete, options } = this.props;
    if (autocomplete) {
      filteredOptions = this.filteredByQuery(options);
    } else {
      filteredOptions = options.filter(option => option.id !== id);
    }

    return filteredOptions;
  }

  /**
  * Filter options for multi
  *
  * @param {Array} ids - The array of identificator
  *
  * @returns {Array} -The filtered array of options
  */
  filterOptionsForMulti(ids) {
    let filteredOptions;
    const { autocomplete, options } = this.props;
    const { values } = this.state;

    if (autocomplete) {
      const filteredByQuery = this.filteredByQuery(options);
      filteredOptions = filteredByQuery.filter(option => !values.includes(option.id));
    } else {
      filteredOptions = options.filter(option =>
        !ids.includes(option.id));
    }

    return filteredOptions;
  }

  /**
  * Toggle isFocused state
  *
  * @returns {void}
  */
  toggleFocusState() {
    this.setState({ isFocused: !this.state.isFocused });
  }

  /**
   * Render the value
   *
   * @returns {XML} Markup for the input
   */
  renderValue() {
    const { theme, autocomplete, placeholder } = this.props;
    const { value } = this.state;

    return (
      <div
        className={cx(theme.value, {
          [theme.placeholder]: !value,
          [theme.hidden]: autocomplete
        })}
        onClick={this.toggleFocusState}
      >
        {value ? this.getValue() : placeholder}
      </div>
    );
  }

  /**
   * Render the input
   *
   * @returns {XML} Markup for the input
   */
  renderInput() {
    const { theme, autocomplete, placeholder } = this.props;
    const { query } = this.state;

    return (
      <input
        type="text"
        className={cx(theme.input, {
          [theme.hidden]: !autocomplete
        })}
        placeholder={placeholder}
        value={query}
        onChange={e => this.setQuery(e.target.value)}
        onFocus={() => this.setFocusState(true)}
      />
    );
  }

  /**
   * Render the options
   *
   * @returns {Array} The array of options
   */
  renderOptions() {
    const { theme, direction, emptyOption, noDataMessage, multi, placeholder } = this.props;
    const { isFocused, value, values } = this.state;
    let options;

    if (multi) {
      options = this.filterOptionsForMulti(values);
    } else {
      options = this.filterOptions(value);
    }

    return (
      <div
        className={cx(theme.options, {
          [theme.hidden]: !isFocused,
          [theme.top]: direction === 'top'
        })}
      >
        {emptyOption && value && (
          <div
            className={cx(theme.option, theme.placeholder)}
            onClick={() => this.setValue(null)}
          >
            {placeholder}
          </div>
        )}
        {options.length
          ? options.map(option => (
            <div
              data-state={multi}
              key={option.id}
              className={theme.option}
              onClick={() => (
                multi ? this.setValues(option.id) : this.setValue(option.id)
              )}
            >
              {option.name}
            </div>
          ))
          : <div className={theme.option}>{noDataMessage}</div>}
      </div>
    );
  }

  /**
   * Render the tags
   *
   * @returns {Array} The array of options
   */
  renderTags() {
    const { theme, autocomplete, multi } = this.props;
    const { values } = this.state;

    return (
      <div
        className={cx(theme.tags, {
          [theme.hidden]: !multi
        })}
      >
        {values.map(id => (
          <div
            data-state={multi}
            key={`tag-${id}`}
            className={theme.tag}
          >
            <span className={theme.tagText}>{this.getValue(id)}</span>
            <i className={theme.cross} onClick={() => this.setValues(id)} />
          </div>
        ))}
        {!autocomplete && this.renderValue()}
        {autocomplete && multi && this.renderInput()}
      </div>
    );
  }

  /**
   * Render the component
   *
   * @returns {XML} Markup for the component
   */
  render() {
    const { theme, disabled, error, multi } = this.props;
    const { isFocused, values } = this.state;

    return (
      <div
        className={theme.container}
        ref={(node) => { this.container = node; }}
      >
        <div
          className={cx(theme.select, {
            [theme.isFocused]: isFocused,
            [theme.disabled]: disabled,
            [theme.hasError]: error
          })}
        >
          {!multi && this.renderValue()}
          {!multi && this.renderInput()}
          {this.renderOptions()}
          {multi && this.renderTags()}
          <i
            className={cx(theme.arrow, {
              [theme.up]: isFocused,
              [theme.hidden]: values.length
            })}
            onClick={this.toggleFocusState}
          />
        </div>
        {error && <div className={theme.error}>{error}</div>}
      </div>
    );
  }
}

/**
 * @prop {Object} propTypes - Properties of the component
 * @prop {Object} propTypes.theme - The styles theme
 * @prop {Boolean} propTypes.autocomplete - The flag for autocomplete
 * @prop {String} propTypes.direction - The options direction way
 * @prop {Boolean} propTypes.disabled - The flag for disabled
 * @prop {Boolean} propTypes.emptyOption - The flag for emptyOption
 * @prop {Boolean} propTypes.isFocused - The flag for focused state
 * @prop {Boolean} propTypes.error - The flag for detecte an error
 * @prop {String} propTypes.noDataMessage - The text when data is empty
 * @prop {Boolean} propTypes.multi - The flag for muti select
 * @prop {Array} propTypes.options - The data for options
 * @prop {String} propTypes.placeholder - The placeholder text
 * @prop {String} propTypes.query - The query for filtering
 * @prop {String} propTypes.value - The value of select
 * @prop {Array} propTypes.value - The values of select
 * @prop {Function} propTypes.onChange - The on change component handler
 */
Select.propTypes = {
  theme: React.PropTypes.shape({
    arrow: React.PropTypes.string,
    cross: React.PropTypes.string,
    container: React.PropTypes.string,
    disabled: React.PropTypes.string,
    error: React.PropTypes.string,
    isFocused: React.PropTypes.string,
    hasError: React.PropTypes.string,
    hidden: React.PropTypes.string,
    input: React.PropTypes.string,
    options: React.PropTypes.string,
    option: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    tag: React.PropTypes.string,
    tags: React.PropTypes.string,
    value: React.PropTypes.string
  }).isRequired,
  autocomplete: React.PropTypes.bool,
  direction: React.PropTypes.oneOf(['top', 'bottom']),
  disabled: React.PropTypes.bool,
  emptyOption: React.PropTypes.bool,
  isFocused: React.PropTypes.bool,
  error: React.PropTypes.string,
  noDataMessage: React.PropTypes.string,
  options: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string
    ]),
    name: React.PropTypes.string
  })),
  placeholder: React.PropTypes.string,
  multi: React.PropTypes.bool,
  query: React.PropTypes.string,
  value: React.PropTypes.string,
  values: React.PropTypes.arrayOf(React.PropTypes.string),
  onChange: React.PropTypes.func.isRequired
};

/**
 * @prop {Object} defaultProps - Default Properties of the component
 * @see Select.propTypes
 */
Select.defaultProps = {
  autocomplete: false,
  direction: 'bottom',
  disabled: false,
  emptyOption: false,
  isFocused: false,
  error: null,
  noDataMessage: NO_DATA_MESSAGE,
  multi: false,
  options: [],
  placeholder: PLACEHOLDER_DEFAULT,
  query: '',
  value: null,
  values: []
};

export default Select;
