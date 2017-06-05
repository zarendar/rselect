import { themr } from 'react-css-themr';
import { CHECKBOX } from '../../identifiers';
import Checkbox from './Checkbox';
import theme from './theme.scss';

const applyTheme = Component => themr(CHECKBOX, theme)(Component);
const ThemedCheckbox = applyTheme(Checkbox);

export default ThemedCheckbox;
