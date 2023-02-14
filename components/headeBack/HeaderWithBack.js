import {normalizeText} from '@rneui/base';
import {Icon} from '@rneui/themed';
import React from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {BLACK} from '../../config/color';
import {MEDIUM} from '../../config/fonts';
import {PADDING_APP} from '../../config/style';
import {heightPercentage, widthPercentage} from '../../utils/responsiveStyle';

export default function HeaderWithBack(props) {
  return (
    <TouchableWithoutFeedback
      onPress={() => props.navigation.goBack()}>
      <View style={styles.container}>
        <Icon
          name="arrow-left"
          type="material-community"
          color={BLACK}
          size={30}
        />
        <Text style={styles.text}>{props.name}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: PADDING_APP,
  },
  text: {
    fontFamily: MEDIUM,
    fontSize: normalizeText(14),
    color: BLACK,
    marginLeft: widthPercentage(4),
  },
});
