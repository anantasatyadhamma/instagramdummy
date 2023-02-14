import { normalizeText } from '@rneui/base';
import { StyleSheet } from 'react-native';
import { BLACK } from '../../config/color';

// utils
import { heightPercentage, widthPercentage } from '../../utils/responsiveStyle';

// fonts
import { BOLD, REGULAR } from '../../config/fonts';
import { PADDING_APP } from '../../config/style';


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: PADDING_APP,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    brandText: {
        fontFamily: BOLD,
        fontSize: normalizeText(20),
        color: BLACK,
    },
    container_iconGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        width: widthPercentage(40),
        backgroundColor: 'yellow'
    },

    // textinput
    containerTextInput: {
        borderWidth: 1,
        borderRadius: 25,
        width: 200,
        height: heightPercentage(6),
    },
    textInput: {
        flex: 1,
        paddingLeft: widthPercentage(4),
        borderRadius: 25,
        fontSize: normalizeText(12),
    }
});

export default styles;