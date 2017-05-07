import React from 'react';

/**
 * Class represents Component component
 *
 * @extends {React.Component}
 */
class Component extends React.Component {
  /**
   * Render the component
   *
   * @returns {XML} Markup for the component
   */
  render() {
    return (
      <div className={this.props.theme.component}>
        <div className={this.props.theme.inside}>Hello world!!!</div>
      </div>
    );
  }
}

Component.propTypes = {
  theme: React.PropTypes.shape({
    component: React.PropTypes.string,
    inside: React.PropTypes.string
  }).isRequired
};

export default Component;
