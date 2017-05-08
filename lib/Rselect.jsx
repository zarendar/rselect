import React from 'react';
import cx from 'classnames';

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
      isFocused: props.isFocused
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
        hasError
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
        Rselect
      </div>
    );
  }
}

/**
 * @prop {Object} propTypes - Properties of the component
 * @prop {Object} propTypes.theme - The styles theme
 * @prop {Boolean} propTypes.isFocused - The flag for focused state
 * @prop {Boolean} propTypes.isFocused - The flag for detecte an error
 */

Rselect.propTypes = {
  theme: React.PropTypes.shape({
    container: React.PropTypes.string
  }).isRequired,
  isFocused: React.PropTypes.bool,
  hasError: React.PropTypes.bool
};

/**
 * @prop {Object} defaultProps - Default Properties of the component
 * @see Rselect.propTypes
 */
Rselect.defaultProps = {
  isFocused: false,
  hasError: false
};

export default Rselect;
