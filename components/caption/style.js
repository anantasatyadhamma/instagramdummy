import { normalizeText } from '@rneui/base';
import { StyleSheet } from 'react-native';
import { BLACK, PRIMARY, WHITE } from '../../config/color';
import { MEDIUM, REGULAR } from '../../config/fonts';
import { PADDING_APP } from '../../config/style';
import { heightPercentage, widthPercentage } from '../../utils/responsiveStyle';

const styles = StyleSheet.create({
 containerCaption: {
    marginHorizontal: PADDING_APP
 },
 caption: {
    fontFamily: REGULAR,
    fontSize: normalizeText(12),
    color: BLACK
 },
 textUsername: {
    fontFamily: MEDIUM,
    fontSize: normalizeText(12),
    color: BLACK
 },
 textFooter: {
    fontFamily: MEDIUM,
    fontSize: normalizeText(12),
    color: BLACK
 }
});

export default styles;