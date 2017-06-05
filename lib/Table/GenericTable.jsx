import React from 'react';
import cx from 'classnames';
import { Checkbox, Button } from '../_common';
import styles from './styles.scss';
/**
 * Class represents GenericTable component
 * @extends {React.PureComponent}
 */
class GenericTable extends React.PureComponent {
  /**
    * Renders rows from items
    * @returns {Array} Mapped array of items
  */
  renderRows() {
    const { items, selectedItemsIds, onItemSelectOrDeselect } = this.props;
    const isSelected = id => selectedItemsIds.includes(id);

    return items.map(item => (
      <tr
        key={item.id}
        className={cx({ [styles.selectedItem]: isSelected(item.id) })}
        onClick={() => onItemSelectOrDeselect(item.id)}
      >
        <td>
          <Checkbox
            theme={styles}
            checked={isSelected(item.id)}
            onChange={(value, e) => { e.stopPropagation(); }}
          />
        </td>
        <td>{item.name}</td>
      </tr>
    ));
  }

  /**
   * Renders the component
   * @returns {XML} Markup for the component
   */
  render() {
    const { items, selectedItemsIds, onAllItemsSelectOrDeselect, onItemAdd } = this.props;
    const itemsLength = items.length;
    const isSelectedAllItems = itemsLength ? selectedItemsIds.length === itemsLength : false;

    return (
      <div className={styles.tableContainer}>
        <table className={cx(styles.table, styles.tableWithThead)}>
          <thead>
            <tr>
              <th>
                <Checkbox
                  theme={styles}
                  checked={isSelectedAllItems}
                  onChange={() => onAllItemsSelectOrDeselect()}
                />
              </th>
              <th><span>Items</span></th>
            </tr>
          </thead>
        </table>
        <div className={styles.contentTable}>
          <table className={cx(styles.table, styles.tableWithTbody)}>
            <tbody>
              {itemsLength
                ? this.renderRows()
                : <tr className={styles.noMatching}>
                  <td><span>No matching items found</span></td>
                </tr>
              }
            </tbody>
          </table>
          <Button
            theme={styles}
            className={styles.tableButton}
            title="ADD ITEM"
            onClick={() => onItemAdd()}
          />
        </div>
      </div>
    );
  }
}

/**
 * @prop {Object} propTypes - Properties of the component
 * @prop {Array} propTypes.items - List of items
 * @prop {String} propTypes.selectedItemsIds - Selected KPI id
 * @prop {Function} propTypes.onItemSelectOrDeselect - Handle select KPI
 * @prop {Function} propTypes.onAllItemsSelectOrDeselect - Handle select all items
 * @prop {Function} propTypes.onItemAdd - Handle add new KPi
 */
GenericTable.propTypes = {
  items: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string
    ]),
    name: React.PropTypes.string
  })).isRequired,
  selectedItemsIds: React.PropTypes.arrayOf(React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string
  ])).isRequired,
  onItemSelectOrDeselect: React.PropTypes.func.isRequired,
  onAllItemsSelectOrDeselect: React.PropTypes.func.isRequired,
  onItemAdd: React.PropTypes.func.isRequired
};

export default GenericTable;
