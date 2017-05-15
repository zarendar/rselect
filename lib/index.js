import { themr } from 'react-css-themr';
import Select from './Select';
import BaseSelect from './BaseSelect';
import AutoCompleteSelect from './AutoCompleteSelect';
import styles from './styles.scss';

const applyTheme = Component => themr('Select', styles)(Component);
const ThemedBaseSelect = applyTheme(BaseSelect);
const ThemedAutoCompleteSelect = applyTheme(AutoCompleteSelect);

export {
  Select,
  BaseSelect,
  ThemedBaseSelect,
  AutoCompleteSelect,
  ThemedAutoCompleteSelect
};
export default themr('Select', styles)(Select);
