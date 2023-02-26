import {Avatar, normalizeText} from '@rneui/base';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {BLACK, PRIMARY} from '../../config/color';
import {REGULAR} from '../../config/fonts';
import {PADDING_APP, BORDER_CARD} from '../../config/style';
import {heightPercentage, widthPercentage} from '../../utils/responsiveStyle';


function Profil(props) {
  return (
    <Modal
      isVisible={props.isModalVisible}
      onBackdropPress={props.closeModal}
      backdropColor="black"
      backdropOpacity={0.8}
      hasBackdrop={true}
      animationIn="zoomIn"
      animationOut="zoomOut"
      animationInTiming={600}
      animationOutTiming={600}
      backdropTransitionInTiming={600}
      backdropTransitionOutTiming={600}>
      <View style={styles.view}>
        <View style={styles.activityIndicatorWrapper}>
          <Text style={styles.textProfil}>Your Profile</Text>
          <Avatar
            size={47}
            rounded
            containerStyle={{backgroundColor: PRIMARY}}
            source={{uri: props.profile_picture}}
          />
          <Text style={styles.textUsername}>{props.username}</Text>
        </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    width: widthPercentage(50),
    padding: PADDING_APP,
    borderRadius: BORDER_CARD,
  },
  textProfil: {
    fontFamily: REGULAR,
    fontSize: normalizeText(12),
    color: BLACK,
    marginBottom: heightPercentage(3),
  },
  textUsername: {
    fontFamily: REGULAR,
    fontSize: normalizeText(14),
    color: BLACK,
    marginTop: heightPercentage(2),
  },
});


export default Profil;
