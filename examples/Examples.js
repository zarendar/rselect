import React from 'react';
import Table from '../lib/Table';
import { ITEMS } from '../lib/Table/__tests__/data.test';

/**
 * Class represents Examples component
 *
 * @extends {React.Component}
 */
class Examples extends React.Component {
  /**
   * Render the component
   *
   * @returns {XML} Markup for the component
   */
  render() {
    return (
      <Table
        items={ITEMS}
        selectedItemsIds={['1']}
        onItemAdd={() => console.log('add item')}
        onItemSelectOrDeselect={kpi => console.log(kpi)}
        onAllItemsSelectOrDeselect={() => console.log('selected all')}
      />
    );
  }
}

export default Examples;
