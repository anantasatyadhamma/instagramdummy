import {normalizeText} from '@rneui/base';
import {StyleSheet} from 'react-native';
import {BLACK, PRIMARY, WHITE} from '../../config/color';
import {LIGHT, MEDIUM, REGULAR} from '../../config/fonts';
import {PADDING_APP, BORDER_CARD} from '../../config/style';
import {heightPercentage, widthPercentage} from '../../utils/responsiveStyle';

const styles = StyleSheet.create({
  container: {
    paddingBottom: heightPercentage(10),
  },
  // stories
  containerStories: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: PADDING_APP,
  },
  textUsernameStory: {
    fontFamily: REGULAR,
    fontSize: normalizeText(10),
    color: BLACK,
    textAlign: 'center',
    width: widthPercentage(15),
  },
  containerCardStory: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: widthPercentage(3),
  },
  styleAvatarStory: {
    backgroundColor: PRIMARY,
    borderWidth: 2,
    borderColor: WHITE,
  },
  container_plus: {
    position: 'absolute',
    backgroundColor: '#48cae4',
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 20,
    right: 0,
    borderWidth: 1.5,
    borderColor: WHITE,
  },

  // post
  containerPost: {
    marginBottom: heightPercentage(3),
  },
  header_post: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: heightPercentage(0.8),
  },
  textUsernamePost: {
    fontFamily: REGULAR,
    fontSize: normalizeText(12),
    color: BLACK,
    marginLeft: widthPercentage(3),
  },
  imagePost: {
    width: widthPercentage(100),
    height: heightPercentage(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  container_action: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  likes: {
    fontFamily: MEDIUM,
    fontSize: normalizeText(12),
    color: BLACK,
    marginHorizontal: PADDING_APP,
    marginTop: heightPercentage(1.3),
  },
  container_comment: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: PADDING_APP,
  },
  commentCount: {
    fontFamily: REGULAR,
    fontSize: normalizeText(12),
    color: BLACK,
    marginHorizontal: PADDING_APP,
  },
  listComment: {
    marginHorizontal: PADDING_APP,
  },
  textInputComment: {
    flex: 1,
    height: heightPercentage(6),
    paddingLeft: 15,
  },
  text_time: {
    fontFamily: LIGHT,
    fontSize: normalizeText(10),
    color: BLACK,
    marginHorizontal: PADDING_APP,
  },
  indicatorSend: {
    width: widthPercentage(5),
  },

  // notification
  divider: {
    width: '100%',
    height: heightPercentage(0.3),
    borderRadius: 8,
    backgroundColor: '#adb5bd',
    marginTop: heightPercentage(1)
  },
  view: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    width: widthPercentage(80),
    height: heightPercentage(80),
    padding: PADDING_APP,
    borderRadius: BORDER_CARD,
  },
  container_cardNotif: {
    marginTop: heightPercentage(2),
  },
  textNotification: {
    fontFamily: MEDIUM,
    fontSize: normalizeText(16),
    color: BLACK,
  },
  titleNotif: {
    fontFamily: MEDIUM,
    fontSize: normalizeText(12),
    color: BLACK,
  },
  textNotif: {
    fontFamily: REGULAR,
    fontSize: normalizeText(12),
    color: BLACK,
  },
  textTimeNotif: {
    fontFamily: LIGHT,
    fontSize: normalizeText(12),
    color: BLACK,
    textAlign: 'right',
  },
});

export default styles;
