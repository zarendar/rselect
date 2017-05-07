import React from 'react';
import styles from './styles.scss';

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
      <div className={styles.component}>
        <div className={styles.inside}>Hello world!!!</div>
      </div>
    );
  }
}

export default Component;
