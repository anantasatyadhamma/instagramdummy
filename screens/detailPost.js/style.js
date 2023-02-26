import {normalizeText} from '@rneui/base';
import {StyleSheet} from 'react-native';
import {BLACK, WHITE} from '../../config/color';
import {MEDIUM, REGULAR} from '../../config/fonts';
import {PADDING_APP} from '../../config/style';
import {heightPercentage, widthPercentage} from '../../utils/responsiveStyle';

const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE,
    flex: 1
  },
  divider: {
    width: widthPercentage(90),
    height: heightPercentage(0.1),
    borderRadius: 8,
    backgroundColor: '#adb5bd',
    marginVertical: heightPercentage(2),
  },
  time: {
    marginTop: heightPercentage(1),
    fontSize: normalizeText(12),
    fontFamily: REGULAR,
    color: BLACK,
  },
  caption: {
    fontFamily: REGULAR,
    fontSize: normalizeText(12),
    color: BLACK
  },
  username: {
    fontFamily: MEDIUM,
    fontSize: normalizeText(12),
    color: BLACK,
  },
  indicatorSend: {
    width: widthPercentage(5),
  },

  // list comment
  contentList: {
    marginHorizontal: PADDING_APP,
    paddingBottom: PADDING_APP
  },

  // textinput
  containerTextInput: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    backgroundColor: '#f3f4f8',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    elevation: 20,
    marginHorizontal: 0,
    paddingHorizontal: PADDING_APP
  },
  textInputComment: {
    fontFamily: REGULAR,
    fontSize: normalizeText(12),
    color: BLACK,
    marginLeft: widthPercentage(3),
    width: widthPercentage(70),
  },
  textSend: {
    fontFamily: REGULAR,
    fontSize: normalizeText(12),
    color: BLACK
  }
});

export default styles;
