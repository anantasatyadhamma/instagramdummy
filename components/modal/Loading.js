import {normalizeText} from '@rneui/base';
import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import Modal from 'react-native-modal';
import {BLACK, PRIMARY, SECONDARY} from '../../config/color';
import {REGULAR} from '../../config/fonts';
import {PADDING_APP} from '../../config/style';
import {heightPercentage, widthPercentage} from '../../utils/responsiveStyle';

export default function Loading(props) {
  return (
    <Modal
      isVisible={props.isModalVisible}
      backdropColor="black"
      backdropOpacity={0.8}
      hasBackdrop={true}
      animationIn="zoomIn"
      animationOut="zoomOut"
      animationInTiming={600}
      animationOutTiming={600}
      backdropTransitionInTiming={600}
      backdropTransitionOutTiming={600}
      style={styles.view}>
      <View style={styles.activityIndicatorWrapper}>
        <ActivityIndicator size="small" color={PRIMARY} />
        <Text style={styles.text}>Loading</Text>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  view: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: PADDING_APP ,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: REGULAR,
    fontSize: normalizeText(12),
    color: BLACK,
    marginTop: heightPercentage(2)
  },
});
