import React, { PropTypes } from 'react';
import { Checkbox } from 'react-toolbox/lib/checkbox';

const CustomCheckbox = ({
  checked,
  className,
  disabled,
  label,
  name,
  onBlur,
  onChange,
  onFocus,
  theme
}) => (
  <Checkbox
    checked={checked}
    className={className}
    disabled={disabled}
    label={label}
    name={name}
    onBlur={onBlur}
    onChange={onChange}
    onFocus={onFocus}
    theme={theme}
  />
);

CustomCheckbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  children: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  theme: PropTypes.shape({
    check: PropTypes.string,
    checked: PropTypes.string,
    disabled: PropTypes.string,
    field: PropTypes.string,
    input: PropTypes.string,
    ripple: PropTypes.string,
    text: PropTypes.string
  })
};

export default CustomCheckbox;
