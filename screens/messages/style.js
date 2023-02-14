import {normalizeText} from '@rneui/base';
import {StyleSheet} from 'react-native';
import {BLACK} from '../../config/color';
import {MEDIUM, REGULAR} from '../../config/fonts';
import {PADDING_APP} from '../../config/style';
import {heightPercentage, widthPercentage} from '../../utils/responsiveStyle';

const styles = StyleSheet.create({
  container_item_chat: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  contentList: {
    paddingHorizontal: PADDING_APP,
  },
  divider: {
    width: '100%',
    height: heightPercentage(0.3),
    borderRadius: 8,
    backgroundColor: '#adb5bd',
    marginVertical: heightPercentage(2),
  },
  textUsername: {
    fontFamily: MEDIUM,
    fontSize: normalizeText(12),
    color: BLACK,
  },
  textChat: {
    fontFamily: REGULAR,
    fontSize: normalizeText(12),
    color: BLACK,
  },
  container_subChat: {
    marginLeft: widthPercentage(4),
  },
});

export default styles;
