import {ColorValues} from '../../types/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {scale} from '../../utils/responsive';
import {useTheme} from '../../hooks';

interface Props {
  name:
    | 'dashboard'
    | 'layers'
    | 'add'
    | 'remove'
    | 'file-download'
    | 'dark_mode'
    | 'wb_sunny'
    | 'table-chart';
  color: ColorValues;
  size?: 10 | 12 | 16;
}
const NativeIcon: React.FC<Props> = ({name, color, size = 10}) => {
  const {theme} = useTheme();
  return <Icon name={name} color={theme.colors[color]} size={scale(size)} />;
};

export default NativeIcon;
