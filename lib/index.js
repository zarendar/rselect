import { themr } from 'react-css-themr';
import Select from './Select';
import styles from './styles.scss';

const applyTheme = Component => themr('Select', styles)(Component);
const ThemedSelect = applyTheme(Select);

export default ThemedSelect;
