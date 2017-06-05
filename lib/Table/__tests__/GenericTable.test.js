import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { ITEMS } from './data.test';
import GenericTable from '../GenericTable';
import { Checkbox, Button } from '../../_common';
import theme from '../styles.scss';

describe('GenericTable component', () => {
  /**
   * Render GenericTable component
   * @param {Object} props - component properties
   * @returns {Array} Array of KPI tr tags
   */
  function renderComponent({
    items = [],
    selectedItemsIds = [],
    onItemAdd = () => {},
    onItemSelectOrDeselect = () => {},
    onAllItemsSelectOrDeselect = () => {}
  } = {}) {
    const component = shallow(
      <GenericTable
        items={items}
        selectedItemsIds={selectedItemsIds}
        onItemAdd={onItemAdd}
        onItemSelectOrDeselect={onItemSelectOrDeselect}
        onAllItemsSelectOrDeselect={onAllItemsSelectOrDeselect}
      />
    );

    return component;
  }

  it('should render 1 table with specific columns', () => {
    const [firstDataItem] = ITEMS;
    const component = renderComponent({ items: ITEMS });
    const table = component.find('table');
    const tHead = table.at(0);
    const tBody = table.at(1);
    const th = tHead.find('th');
    const firstTh = th.at(0);
    const trs = tBody.find('tr');
    const firstTr = trs.at(0);

    expect(table).to.have.length(2);
    expect(th).to.have.length(2);
    expect(firstTh.find(Checkbox)).to.have.length(1);
    expect(trs).to.have.length(ITEMS.length);
    expect(firstTr.find(Checkbox)).to.have.length(1);
    expect(firstTr.find('td').at(1).text()).to.equal(firstDataItem.name);
    expect(component.find(Button)).to.have.length(1);
  });

  it('should render 1 table with selected KPi', () => {
    const [firstDataItem] = ITEMS;
    const component = renderComponent({
      items: ITEMS,
      selectedItemsIds: [firstDataItem.id]
    });
    const table = component.find('table');
    const tBody = table.at(1);
    const trs = tBody.find('tr');

    expect(trs.at(0).hasClass(theme.selectedItem)).to.equal(true);
    expect(trs.at(0).find(Checkbox).prop('checked')).to.equal(true);
    for (let i = 1, trsLengh = trs.length; i < trsLengh; i++) {
      expect(trs.at(i).hasClass(theme.selectedUser)).to.equal(false);
      expect(trs.at(i).find(Checkbox).prop('checked')).to.equal(false);
    }
  });

  it('should render no matching message if the items data is empty', () => {
    const component = renderComponent();
    const tBody = component.find('table').at(1);
    const trs = tBody.find('tr');

    expect(trs).to.have.length(1);
    expect(trs.at(0).text()).to.equal('No matching items found');
  });

  it('should call onItemSelectOrDeselect function when item row was checked', () => {
    const [firstItem] = ITEMS;
    const onItemSelectOrDeselect = sinon.spy();
    const component = renderComponent({
      items: ITEMS,
      onItemSelectOrDeselect
    });
    const table = component.find('table').at(1);

    table.find('tr').at(0).simulate('click');

    const [[id]] = onItemSelectOrDeselect.args;
    expect(onItemSelectOrDeselect).to.have.property('callCount', 1);
    expect(id).to.be.equal(firstItem.id);
  });

  it('should  doesnt call onItemSelectOrDeselect function when item checkbox was checked', () => {
    const onItemSelectOrDeselect = sinon.spy();
    const component = renderComponent({
      items: ITEMS,
      onItemSelectOrDeselect
    });
    const table = component.find('table').at(1);

    table.find(Checkbox).at(0).simulate('click');
    expect(onItemSelectOrDeselect).to.have.property('callCount', 0);
  });

  it('should call onAllItemsSelectOrDeselect when checkbox in table header was checked', () => {
    const onAllItemsSelectOrDeselect = sinon.spy();
    const component = renderComponent({
      items: ITEMS,
      onAllItemsSelectOrDeselect
    });
    const tHead = component.find('table').at(0);
    const checkbox = tHead.find(Checkbox);

    expect(checkbox.prop('checked')).to.equal(false);
    expect(checkbox.prop('onChange')).to.be.a('function');

    checkbox.props().onChange(true);
    expect(onAllItemsSelectOrDeselect.called).to.equal(true);
  });

  it('should change checkbox state in header', () => {
    const component = renderComponent({
      items: ITEMS,
      selectedItemsIds: ['1', '2', '3', '4', '5']
    });
    const tHead = component.find('table').at(0);
    const checkbox = tHead.find(Checkbox);

    expect(checkbox.prop('checked')).to.equal(true);
  });

  it('should not check checkbox in header if data is empty', () => {
    const component = renderComponent();
    const tHead = component.find('table').at(0);
    const checkbox = tHead.find(Checkbox);

    expect(checkbox.prop('checked')).to.equal(false);
  });

  it('should call onAddKPI function when Add button was clicked', () => {
    const onItemAdd = sinon.spy();
    const component = renderComponent({
      onItemAdd
    });
    const button = component.find(Button);

    button.prop('onClick');
    expect(onItemAdd.called);
  });
});
