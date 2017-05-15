import React from 'react';
import cx from 'classnames';
import AutoCompleteSelect from './AutoCompleteSelect';

/**
 * Class represents MultiSelect component
 *
 * @extends {AutoCompleteSelect}
 */
class MultiSelect extends AutoCompleteSelect {
  /**
   * Create new MultiSelect
   *
   * @param {Object} props - The initial properties
   * @see MultiSelect.propTypes
   */
  constructor(props) {
    super(props);

    this.state = {
      query: props.value ? this.getValue(props.value) : props.query,
      values: props.values || []
    };

    this.setValue = this.setValue.bind(this);
    this.filterOptions = this.filterOptions.bind(this);
    this.renderTags = this.renderTags.bind(this);
  }

  /**
  * Handler on component will recieve props
  *
  * @param {Object} nextProps - The next properties
  *
  * @returns {void}
  */
  componentWillReceiveProps(nextProps) {
    this.setState({
      values: nextProps.values || []
    });
  }

  /**
  * Set values into state
  *
  * @param {String} value - The new value
  *
  * @returns {void}
  */
  setValue(value) {
    const { name, onChange } = this.props;
    const { values } = this.state;
    const newValues = values.includes(value)
      ? values.filter(id => id !== value)
      : [...values, value];

    this.setState({ values: newValues }, () => onChange(newValues, name));
  }

  /**
  * Filter options
  *
  * @returns {Array} -The filtered array of options
  */
  filterOptions() {
    const { options } = this.props;
    const { values } = this.state;
    const filterByQuery = this.filterByQuery(options);

    return filterByQuery.filter(option => !values.includes(option.id));
  }

  /**
   * Render the tags
   *
   * @returns {Array} The array of options
   */
  renderTags() {
    const { theme } = this.props;
    const { values } = this.state;

    return (
      <div
        className={theme.tags}
      >
        {values.map(id => (
          <div
            data-state
            key={`tag-${id}`}
            className={theme.tag}
          >
            <span className={theme.tagText}>{this.getValue(id)}</span>
            <i className={theme.cross} onClick={() => this.setValue(id)} />
          </div>
        ))}
        {this.renderInput()}
      </div>
    );
  }

  /**
   * Render the content
   *
   * @returns {XML} Markup for the input
   */
  renderContent() {
    const { theme } = this.props;
    const { values } = this.state;

    return (
      <div
        className={cx(theme.selectContent)}
      >
        {this.renderTags()}
        {this.renderOptions(true)}
        {!values.length && this.renderArrow()}
      </div>
    );
  }
}

/**
 * @prop {Object} propTypes - Properties of the component
 * @prop {Boolean} propTypes.name - The name of select
 * @prop {Array} propTypes.options - The data for options
 * @prop {String} propTypes.placeholder - The placeholder text
 * @prop {String} propTypes.query - The query for filtering
 * @prop {Array} propTypes.value - The values of select
 * @prop {Function} propTypes.onChange - The on change component handler
 */
MultiSelect.propTypes = {
  name: React.PropTypes.string,
  noDataMessage: React.PropTypes.string,
  options: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string
    ]),
    name: React.PropTypes.string
  })),
  placeholder: React.PropTypes.string,
  query: React.PropTypes.string,
  values: React.PropTypes.arrayOf(React.PropTypes.string),
  onChange: React.PropTypes.func.isRequired
};

/**
 * @prop {Object} defaultProps - Default Properties of the component
 * @see MultiSelect.propTypes
 */
MultiSelect.defaultProps = {
  noDataMessage: 'No data',
  name: null,
  options: [],
  placeholder: '<not set>',
  query: '',
  values: []
};

export default MultiSelect;
