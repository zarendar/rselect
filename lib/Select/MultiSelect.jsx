import React from 'react';
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
      query: props.value ? this.getName(props.value) : props.query,
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
    this.setState({ values: nextProps.values || [] });
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
    const { options, valueKey } = this.props;
    const { values } = this.state;
    const filteredByQuery = this.filterByQuery(options);

    return filteredByQuery.filter(option => !values.includes(option[valueKey]));
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
      <div className={theme.tags} >
        {values.map(id => (
          <div
            data-close
            key={`tag-${id}`}
            className={theme.tag}
          >
            <span className={theme.tagText}>{this.getName(id)}</span>
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
      <div className={theme.selectContent}>
        {this.renderTags()}
        {this.renderOptions(true)}
        {!values.length && this.renderArrow()}
      </div>
    );
  }
}

/**
 * @prop {Object} propTypes - Properties of the component
 * @prop {Object} propTypes.theme - The styles theme
 * @prop {Boolean} propTypes.name - The name of select
 * @prop {String} propTypes.query - The query for filtering
 * @prop {Array} propTypes.values - The values of select
 * @prop {Function} propTypes.onChange - The on change component handler
 */
MultiSelect.propTypes = {
  theme: React.PropTypes.shape({
    cross: React.PropTypes.string,
    selectContent: React.PropTypes.string
  }).isRequired,
  name: React.PropTypes.string,
  query: React.PropTypes.string,
  values: React.PropTypes.arrayOf(React.PropTypes.string),
  valueKey: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired
};

export default MultiSelect;
