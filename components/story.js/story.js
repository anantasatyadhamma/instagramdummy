import {Avatar, Icon} from '@rneui/themed';
import React, {useState} from 'react';
import {View, useWindowDimensions, ImageBackground, Text} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import styles from './style';
import Modal from 'react-native-modal';
import {BLACK} from '../../config/color';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function Story(props) {
  const {height, width} = useWindowDimensions();
  const [index, setIndex] = useState(0);
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
      <Carousel
        loop={false}
        width={width}
        height={height}
        mode="parallax"
        autoPlay={true}
        data={props.data}
        scrollAnimationDuration={8000}
        onSnapToItem={index => setIndex(index)}
        renderItem={({index, item}) => (
          <ImageBackground
            source={{uri: item.stories}}
            resizeMode="cover"
            style={{width, height}}>
            <View style={styles.headerStory}>
              <Avatar source={{uri: item.profil_picture}} rounded size={40} />
              <Text style={styles.username}>{item.username}</Text>
            </View>
            <View style={styles.close}>
              <TouchableOpacity style={{alignSelf: "flex-end"}}>
                <Icon
                  name="close"
                  type="material-community"
                  color={BLACK}
                  size={40}
                  onPress={props.closeModal}
                />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        )}
      />
    </Modal>
  );
}
