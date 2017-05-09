import React from 'react';
import cx from 'classnames';

const PLACEHOLDER_DEFAULT = 'Placeholder';
const NO_DATA_MESSAGE = 'No data';

/**
 * Class represents Rselect component
 *
 * @extends {React.Component}
 */
class Rselect extends React.Component {
  /**
   * Create new Rselect
   *
   * @param {Object} props - The initial properties
   * @see Rselect.propTypes
   */
  constructor(props) {
    super(props);

    this.state = {
      isFocused: props.isFocused,
      query: props.value ? this.getValue(props.value) : props.query,
      value: props.value
    };

    this.setFocusState = this.setFocusState.bind(this);
    this.setQuery = this.setQuery.bind(this);
    this.getValue = this.getValue.bind(this);
    this.setValue = this.setValue.bind(this);
    this.filterOptions = this.filterOptions.bind(this);
    this.toggleFocusState = this.toggleFocusState.bind(this);
    this.subscribeOnClickOutside = this.subscribeOnClickOutside.bind(this);
    this.unsubscribeOnClickOutside = this.unsubscribeOnClickOutside.bind(this);
    this.clickOutside = this.clickOutside.bind(this);
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
    });
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
      if (node === this.container) {
        return true;
      }
      node = node.parentNode;
    }
    this.setFocusState(false);
    return false;
  }

  /**
  * Filter options
  *
  * @param {String} id - The filtering identificator
  *
  * @returns {Array} -The filtered array of options
  */
  filterOptions(id) {
    let options;
    if (this.props.autocomplete) {
      options = this.props.options.filter((option) => {
        const name = JSON.parse(JSON.stringify(option.name)).toLowerCase();
        const query = JSON.parse(JSON.stringify(this.state.query)).toLowerCase();
        return name.includes(query);
      });
    } else {
      options = this.props.options.filter(option => option.id !== id);
    }

    return options;
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
   * Render the options
   *
   * @returns {Array} The array of options
   */
  renderOptions() {
    const { theme, noDataMessage } = this.props;
    const { isFocused, value } = this.state;
    const options = this.filterOptions(value);

    return (
      <div
        className={cx(theme.options, {
          [theme.hidden]: !isFocused
        })}
      >
        {options.length
          ? options.map(option => (
            <div
              key={option.id}
              className={theme.option}
              onClick={() => this.setValue(option.id)}
            >
              {option.name}
            </div>
          ))
          : <div className={theme.option}>{noDataMessage}</div>}
      </div>
    );
  }

  /**
   * Render the component
   *
   * @returns {XML} Markup for the component
   */
  render() {
    const {
      props: {
        theme,
        autocomplete,
        hasError,
        placeholder
      },
      state: {
        isFocused,
        query,
        value
      }
    } = this;

    return (
      <div
        className={cx(theme.container, {
          [theme.isFocused]: isFocused,
          [theme.hasError]: hasError
        })}
        ref={(node) => { this.container = node; }}
      >
        <div
          className={cx(theme.placeholder, {
            [theme.hidden]: autocomplete || value
          })}
          onClick={this.toggleFocusState}
        >
          {placeholder}
        </div>
        <div
          className={cx(theme.value, {
            [theme.hidden]: autocomplete || !value
          })}
          onClick={this.toggleFocusState}
        >
          {this.getValue()}
        </div>
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
        {this.renderOptions()}
      </div>
    );
  }
}

/**
 * @prop {Object} propTypes - Properties of the component
 * @prop {Object} propTypes.theme - The styles theme
 * @prop {Boolean} propTypes.autocomplete - The flag for autocomplete
 * @prop {Boolean} propTypes.isFocused - The flag for focused state
 * @prop {Boolean} propTypes.hasError - The flag for detecte an error
 * @prop {String} propTypes.noDataMessage - The text when data is empty
 * @prop {Array} propTypes.options - The data for options
 * @prop {String} propTypes.placeholder - The placeholder text
 * @prop {String} propTypes.query - The query for filtering
 * @prop {String} propTypes.value - The value
 */

Rselect.propTypes = {
  theme: React.PropTypes.shape({
    container: React.PropTypes.string,
    isFocused: React.PropTypes.string,
    hasError: React.PropTypes.string,
    hidden: React.PropTypes.string,
    input: React.PropTypes.string,
    options: React.PropTypes.string,
    option: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    value: React.PropTypes.string
  }).isRequired,
  autocomplete: React.PropTypes.bool,
  isFocused: React.PropTypes.bool,
  hasError: React.PropTypes.bool,
  noDataMessage: React.PropTypes.string,
  options: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.string,
    name: React.PropTypes.string
  })),
  placeholder: React.PropTypes.string,
  query: React.PropTypes.string,
  value: React.PropTypes.string
};

/**
 * @prop {Object} defaultProps - Default Properties of the component
 * @see Rselect.propTypes
 */
Rselect.defaultProps = {
  autocomplete: false,
  isFocused: false,
  hasError: false,
  noDataMessage: NO_DATA_MESSAGE,
  options: [],
  placeholder: PLACEHOLDER_DEFAULT,
  query: '',
  value: null
};

export default Rselect;
