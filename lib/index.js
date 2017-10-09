import { themr } from 'react-css-themr';
import SELECT from './identifiers';
import Select from './Select';
import styles from './styles.scss';

const applyTheme = Component => themr(SELECT, styles)(Component);
const ThemedSelect = applyTheme(Select);

export default ThemedSelect;
