import React from 'react';
import cx from 'classnames';
import { Checkbox } from '../_common';
import styles from './styles.scss';
/**
 * Class represents Table component
 * @extends {React.Component}
 */
class Table extends React.Component {
  /**
   * Create new Table
   * @param {Object} props - The initial properties
   * @see Table.propTypes
   */
  constructor(props) {
    super(props);

    this.renderTableHeader = this.renderTableHeader.bind(this);
    this.renderTableBody = this.renderTableBody.bind(this);
  }

  /**
    * Renders table header for Table
    * @returns {XML} The table header mockup
  */
  renderTableHeader() {
    const { tableHeader } = this.props;
    return (
      <div className={cx(styles.tableHeader, styles.tableRow)}>
        <div className={styles.tableCol}>
          <Checkbox
            theme={styles}
            checked={false}
            onChange={() => {}}
          />
        </div>
        {tableHeader.map(header => (
          <div
            key={`table-header-${Math.random()}`}
            className={styles.tableCol}
          >
            <span>{header.label}</span>
          </div>
        ))}
      </div>
    );
  }

  /**
   * Renders table body
   * @returns {XML} The table header body mock up
   */
  renderTableBody() {
    const { data } = this.props;
    return (
      <div className={cx(styles.table, styles.tableWithTbody)}>
        {data.length
            ? this.renderRows()
            : <div className={styles.noMatching}>
              <span>No matching KPIs found</span>
            </div>
        }
      </div>
    );
  }

  /**
   * Renders table rows
   *
   * @returns {XML} The table row mock up
  */
  renderRows() {
    return this.props.data.map(item => (
      <div key={item.id} className={styles.tableRow} >
        <div className={styles.tableCol}>
          <Checkbox
            theme={styles}
            checked={false}
            onChange={() => {}}
          />
        </div>
        {this.renderCols(item)}
      </div>
    ));
  }

  /**
    * Renders table cols
    *
    * @param {Object} item - The item of col
    *
    * @returns {Array} The array of table cols
  */
  renderCols(item) {
    return [
      <div key={Math.random()} className={styles.tableCol}>{item.name}</div>,
      <div key={Math.random()} className={styles.tableCol}>{item.param}</div>
    ];
  }

  /**
   * Renders the component
   * @returns {XML} Markup for the component
   */
  render() {
    const { tableHeader } = this.props;

    return (
      <div className={styles.KPITableContainer}>
        {tableHeader.length ? this.renderTableHeader() : null}
        <div className={styles.contentTable}>
          {this.renderTableBody()}
        </div>
      </div>
    );
  }
}

/**
 * @prop {Object} propTypes - Properties of the component
 * @prop {Array} propTypes.data - List of data
 * @prop {Array} propTypes.tableHeader - The data of table header
 */
Table.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string
    ]),
    name: React.PropTypes.string
  })).isRequired,
  tableHeader: React.PropTypes.arrayOf(React.PropTypes.shape({
    label: React.PropTypes.string
  }))
};

/**
 * @see {Object} Table.propTypes
 */
Table.defaultProps = {
  tableHeader: []
};

export default Table;
