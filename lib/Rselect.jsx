import React from 'react';

/**
 * Class represents Rselect component
 *
 * @extends {React.Component}
 */
class Rselect extends React.Component {
  /**
   * Render the component
   *
   * @returns {XML} Markup for the component
   */
  render() {
    return (
      <div className={this.props.theme.container}>
        Rselect
      </div>
    );
  }
}

Rselect.propTypes = {
  theme: React.PropTypes.shape({
    container: React.PropTypes.string
  }).isRequired
};

export default Rselect;
