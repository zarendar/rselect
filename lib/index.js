import { themr } from 'react-css-themr';
import Select from './Select';
import BaseSelect from './BaseSelect';
import styles from './styles.scss';

export { Select, BaseSelect };
export default themr('Select', styles)(Select);
