import React from 'react';
import cx from 'classnames';

/**
 * Class represents BaseSelect component
 *
 * @extends {React.Component}
 */
class BaseSelect extends React.Component {
  /**
   * Create new BaseSelect
   *
   * @param {Object} props - The initial properties
   * @see BaseSelect.propTypes
   */
  constructor(props) {
    super(props);

    this.state = {
      isFocused: props.isFocused,
      value: props.value
    };

    this.getValue = this.getValue.bind(this);
    this.setValue = this.setValue.bind(this);
    this.setFocusState = this.setFocusState.bind(this);
    this.filterOptions = this.filterOptions.bind(this);
    this.toggleFocusState = this.toggleFocusState.bind(this);
    this.subscribeOnClickOutside = this.subscribeOnClickOutside.bind(this);
    this.unsubscribeOnClickOutside = this.unsubscribeOnClickOutside.bind(this);
    this.clickOutside = this.clickOutside.bind(this);
    this.renderValue = this.renderValue.bind(this);
    this.renderOptions = this.renderOptions.bind(this);
    this.renderArrow = this.renderArrow.bind(this);
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
    this.setState({ value: nextProps.value });
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
    const { name, onChange } = this.props;

    this.setState({ value }, () => {
      this.toggleFocusState();
      onChange(value, name);
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
  * Toggle isFocused state
  *
  * @returns {void}
  */
  toggleFocusState() {
    this.setState({ isFocused: !this.state.isFocused });
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
  * @returns {Boolean}  - return flag for click outside
  */
  clickOutside(e) {
    let node = e.target;
    while (node !== null) {
      if (node.hasAttribute &&
        node.hasAttribute('data-close') && !!node.getAttribute('data-close')) {
        return true;
      }

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
    const { options } = this.props;
    return options.filter(option => option.id !== id);
  }

  /**
   * Render the value
   *
   * @returns {XML} Markup for the input
   */
  renderValue() {
    const { theme, placeholder } = this.props;
    const { value } = this.state;

    return (
      <div
        className={cx(theme.value, { [theme.placeholder]: !value })}
        onClick={this.toggleFocusState}
      >
        {value ? this.getValue() : placeholder}
      </div>
    );
  }

  /**
   * Render the options
   *
   @param {Boolean} closeAfterClick - the flag for close options by click
   *
   * @returns {Array} The array of options
   */
  renderOptions(closeAfterClick) {
    const { theme, direction, emptyOption, noDataMessage, placeholder } = this.props;
    const { isFocused, value } = this.state;
    const options = this.filterOptions(value);

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
              data-close={closeAfterClick}
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
   * Render the arrow
   *
   * @returns {XML} Markup for the input
   */
  renderArrow() {
    const { isFocused } = this.props;
    const { theme } = this.props;
    return (
      <div
        className={cx(theme.arrowContainer)}
        onClick={this.toggleFocusState}
      >
        <i className={cx(theme.arrow, { [theme.up]: isFocused })} />
      </div>
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
      <div
        className={cx(theme.selectContent)}
      >
        {this.renderValue()}
        {this.renderArrow()}
        {this.renderOptions()}
      </div>
    );
  }

  /**
   * Render the component
   *
   * @returns {XML} Markup for the component
   */
  render() {
    const { theme, disabled, error } = this.props;
    const { isFocused } = this.state;

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
          {this.renderContent()}
        </div>
        {error && <div className={theme.error}>{error}</div>}
      </div>
    );
  }
}

/**
 * @prop {Object} propTypes - Properties of the component
 * @prop {Object} propTypes.theme - The styles theme
 * @prop {String} propTypes.direction - The options direction way
 * @prop {Boolean} propTypes.disabled - The flag for disabled
 * @prop {Boolean} propTypes.emptyOption - The flag for emptyOption
 * @prop {Boolean} propTypes.isFocused - The flag for focused state
 * @prop {Boolean} propTypes.error - The flag for detecte an error
 * @prop {String} propTypes.noDataMessage - The text when data is empty
 * @prop {Boolean} propTypes.name - The name of select
 * @prop {Array} propTypes.options - The data for options
 * @prop {String} propTypes.placeholder - The placeholder text
 * @prop {String} propTypes.value - The value of select
 * @prop {Function} propTypes.onChange - The on change component handler
 */
BaseSelect.propTypes = {
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
    selectContent: React.PropTypes.string,
    tag: React.PropTypes.string,
    tags: React.PropTypes.string,
    value: React.PropTypes.string
  }).isRequired,
  direction: React.PropTypes.oneOf(['top', 'bottom']),
  disabled: React.PropTypes.bool,
  emptyOption: React.PropTypes.bool,
  isFocused: React.PropTypes.bool,
  error: React.PropTypes.string,
  name: React.PropTypes.string,
  noDataMessage: React.PropTypes.string,
  options: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string
    ]),
    name: React.PropTypes.string
  })),
  placeholder: React.PropTypes.string,
  value: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired
};

/**
 * @prop {Object} defaultProps - Default Properties of the component
 * @see BaseSelect.propTypes
 */
BaseSelect.defaultProps = {
  direction: 'bottom',
  disabled: false,
  emptyOption: false,
  isFocused: false,
  error: null,
  noDataMessage: 'No data',
  name: null,
  options: [],
  placeholder: '<not set>',
  value: null
};

export default BaseSelect;
