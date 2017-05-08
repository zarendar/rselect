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
      options: props.options
    };

    this.toggleFocusState = this.toggleFocusState.bind(this);
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
   * Render the component
   *
   * @returns {XML} Markup for the component
   */
  render() {
    const {
      props: {
        theme,
        hasError,
        noDataMessage,
        placeholder
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
        onClick={this.toggleFocusState}
      >
        <div
          className={theme.placeholder}
        >
          {placeholder}
        </div>
        <div
          className={cx(theme.options, {
            [theme.hidden]: !isFocused
          })}
        >
          {this.state.options.length
            ? this.state.options.map(option => (
              <div key={option.id} className={theme.option}>
                {option.name}
              </div>
            ))
            : <div className={theme.option}>{noDataMessage}</div>}
        </div>
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
 */

Rselect.propTypes = {
  theme: React.PropTypes.shape({
    container: React.PropTypes.string,
    isFocused: React.PropTypes.string,
    hasError: React.PropTypes.string,
    hidden: React.PropTypes.string
  }).isRequired,
  isFocused: React.PropTypes.bool,
  hasError: React.PropTypes.bool,
  noDataMessage: React.PropTypes.string,
  options: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.string,
    name: React.PropTypes.string
  })),
  placeholder: React.PropTypes.string
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
  placeholder: PLACEHOLDER_DEFAULT
};

export default Rselect;
