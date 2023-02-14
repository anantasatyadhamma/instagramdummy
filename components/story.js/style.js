import { normalizeText } from '@rneui/base';
import { StyleSheet } from 'react-native';
import { BLACK, PRIMARY, WHITE } from '../../config/color';
import { LIGHT, MEDIUM, REGULAR } from '../../config/fonts';
import { PADDING_APP } from '../../config/style';
import { heightPercentage, widthPercentage } from '../../utils/responsiveStyle';


const styles = StyleSheet.create({
    headerStory: {
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: "center",
        position: 'absolute',
        top: PADDING_APP,
        paddingHorizontal: PADDING_APP
    },
    username: {
        fontFamily: REGULAR,
        color: BLACK,
        fontSize: normalizeText(12),
        marginLeft: widthPercentage(2)
    },
    view: {
        flex: 1,
      },
      activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        padding: PADDING_APP,
        justifyContent: 'center',
        alignItems: 'center',
      },
      close: {
        marginTop: PADDING_APP,
        marginRight: PADDING_APP
      }
});

export default styles;