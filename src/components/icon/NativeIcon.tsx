import {ColorValues} from '../../types/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {scale} from '../../utils/responsive';
import {useTheme} from '../../hooks';

export type TIcon =
  | 'layers'
  | 'add'
  | 'remove'
  | 'backup'
  | 'file-present'
  | 'format-list-numbered'
  | 'palette'
  | 'crop-free'
  | 'more-horiz'
  | 'power-settings-new';

interface Props {
  name: TIcon;
  color: ColorValues;
  size?: 8 | 10 | 12;
}
const NativeIcon: React.FC<Props> = ({name, color, size = 8}) => {
  const {theme} = useTheme();
  return <Icon name={name} color={theme.colors[color]} size={scale(size)} />;
};

export default NativeIcon;
