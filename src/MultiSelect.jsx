import React from 'react';
import PropTypes from 'prop-types';
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
      query: props.value ? this.getName(props.value) : props.query
    };

    this.setValue = this.setValue.bind(this);
    this.filterOptions = this.filterOptions.bind(this);
    this.renderTags = this.renderTags.bind(this);
  }

  /**
  * Handler on component will receive props
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
    const { name, values, onChange } = this.props;
    const newValues = values.includes(value)
      ? values.filter(id => id !== value)
      : [...values, value];

    onChange(newValues, name);
  }

  /**
  * Filter options
  *
  * @returns {Array} -The filtered array of options
  */
  filterOptions() {
    const { options, valueKey, values } = this.props;
    const filteredByQuery = this.filterByQuery(options);

    return filteredByQuery.filter(option => !values.includes(option[valueKey]));
  }

  /**
   * Render the tags
   *
   * @returns {XML} The array of options
   */
  renderTags() {
    const { theme, values } = this.props;

    return (
      <div className={theme.tags} onClick={e => e.stopPropagation()}>
        {values.map(id => (
          <div
            data-close
            key={`tag-${id}`}
            className={theme.tag}
          >
            <span className={theme.tagText}>{this.getName(id)}</span>
            <i
              className={theme.cross}
              onClick={(e) => {
                e.stopPropagation();
                this.setValue(id);
              }}
            />
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
    const { theme, values } = this.props;

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
  theme: PropTypes.shape({
    cross: PropTypes.string,
    selectContent: PropTypes.string
  }).isRequired,
  name: PropTypes.string,
  query: PropTypes.string,
  values: PropTypes.arrayOf(PropTypes.string),
  valueKey: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default MultiSelect;
