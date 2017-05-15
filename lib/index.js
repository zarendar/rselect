import { themr } from 'react-css-themr';
import BaseSelect from './BaseSelect';
import AutoCompleteSelect from './AutoCompleteSelect';
import MultiSelect from './MultiSelect';
import styles from './styles.scss';

const applyTheme = Component => themr('Select', styles)(Component);
const ThemedBaseSelect = applyTheme(BaseSelect);
const ThemedAutoCompleteSelect = applyTheme(AutoCompleteSelect);
const ThemedMultiSelect = applyTheme(MultiSelect);

export {
  BaseSelect,
  ThemedBaseSelect,
  AutoCompleteSelect,
  ThemedAutoCompleteSelect,
  MultiSelect,
  ThemedMultiSelect
};
