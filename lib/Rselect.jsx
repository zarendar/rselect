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
      value: props.value
    };

    this.getValue = this.getValue.bind(this);
    this.setValue = this.setValue.bind(this);
    this.filterOptionsById = this.filterOptionsById.bind(this);
    this.toggleFocusState = this.toggleFocusState.bind(this);
  }

  /**
  * Get name from options by id
  *
  * @returns {String} - The found name
  */
  getValue() {
    const { options } = this.props;
    const { value } = this.state;
    const option = options.find(item => item.id === value);

    return option ? option.name : null;
  }

  /**
  * Set new value into state
  *
  * @param {String} value - The new value
  *
  * @returns {void}
  */
  setValue(value) {
    this.setState({ value }, () => this.toggleFocusState());
  }

  /**
  * Filter options state by id
  *
  * @param {String} id - The filtering identificator
  *
  * @returns {Array} -The filtered array of options
  */
  filterOptionsById(id) {
    const options = this.props.options.filter(option => option.id !== id);
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
    const options = this.filterOptionsById(value);

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
        hasError,
        placeholder,
        value
      },
      state: {
        isFocused
      }
    } = this;

    return (
      <div
        className={cx(theme.container, {
          [theme.isFocused]: isFocused,
          [theme.hasError]: hasError
        })}
      >
        <div
          className={cx(theme.placeholder, {
            [theme.hidden]: value
          })}
          onClick={this.toggleFocusState}
        >
          {placeholder}
        </div>
        <div
          className={cx(theme.value, {
            [theme.hidden]: !value
          })}
          onClick={this.toggleFocusState}
        >
          {this.getValue()}
        </div>
        {this.renderOptions()}
      </div>
    );
  }
}

/**
 * @prop {Object} propTypes - Properties of the component
 * @prop {Object} propTypes.theme - The styles theme
 * @prop {Boolean} propTypes.isFocused - The flag for focused state
 * @prop {Boolean} propTypes.hasError - The flag for detecte an error
 * @prop {String} propTypes.noDataMessage - The text when data is empty
 * @prop {Array} propTypes.options - The data for options
 * @prop {String} propTypes.placeholder - The placeholder text
 * @prop {String} propTypes.value - The value
 */

Rselect.propTypes = {
  theme: React.PropTypes.shape({
    container: React.PropTypes.string,
    isFocused: React.PropTypes.string,
    hasError: React.PropTypes.string,
    hidden: React.PropTypes.string,
    options: React.PropTypes.string,
    option: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    value: React.PropTypes.string
  }).isRequired,
  isFocused: React.PropTypes.bool,
  hasError: React.PropTypes.bool,
  noDataMessage: React.PropTypes.string,
  options: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.string,
    name: React.PropTypes.string
  })),
  placeholder: React.PropTypes.string,
  value: React.PropTypes.string
};

/**
 * @prop {Object} defaultProps - Default Properties of the component
 * @see Rselect.propTypes
 */
Rselect.defaultProps = {
  isFocused: false,
  hasError: false,
  noDataMessage: NO_DATA_MESSAGE,
  options: [],
  placeholder: PLACEHOLDER_DEFAULT,
  value: null
};

export default Rselect;
