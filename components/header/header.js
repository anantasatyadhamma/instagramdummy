import React, {useState} from 'react';
import {View, TextInput} from 'react-native';
import {Icon, Avatar} from '@rneui/themed';
import styles from './style';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  Easing,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

// colors
import {BLACK, PRIMARY} from '../../config/color';

export default function Header(props) {
  const [show, setShow] = useState(1);
  const opacity = useSharedValue(1);
  const opacityInput = useSharedValue(0);

  const updateShow = val => {
    setShow(val);
  };

  const rFade = useAnimatedStyle(() => {
    return {
      opacity: withTiming(
        opacity.value,
        {
          duration: 500,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        },
        isFinished => {
          if (isFinished && opacity.value === 1) {
            runOnJS(updateShow)(1);
          }
        },
      ),
    };
  });
  const rFadeInput = useAnimatedStyle(() => {
    return {
      opacity: withTiming(
        opacityInput.value,
        {
          duration: 500,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        },
        isFinished => {
          if (isFinished && opacityInput.value === 1) {
            runOnJS(updateShow)(0);
          }
        },
      ),
    };
  });
  return (
    <View style={styles.container}>
      {show > 0 ? (
        <Animated.Text style={[styles.brandText, rFade]}>
          Instagram
        </Animated.Text>
      ) : null}
      {show === 0 ? (
        <Animated.View style={[styles.containerTextInput, rFadeInput]}>
          <TextInput
            placeholder="Search"
            style={styles.textInput}
            autoFocus
            onBlur={() => {
              opacity.value = 1;
              opacityInput.value = 0;
            }}
            returnKeyType="search"
            onChangeText={props.textSearch}
            onSubmitEditing={props.search}
            value={props.text}
          />
        </Animated.View>
      ) : null}
      {show > 0 ? (
        <Animated.View style={rFade}>
          <Icon
            name="magnify"
            type="material-community"
            color={BLACK}
            size={27}
            onPress={() => {
              opacity.value = 0;
              opacityInput.value = 1;
            }}
          />
        </Animated.View>
      ) : null}
      <Icon
        name="bell-outline"
        type="material-community"
        color={BLACK}
        size={27}
        onPress={props.showNotif}
      />
      <Icon
        name="message-outline"
        type="material-community"
        color={BLACK}
        size={27}
        onPress={props.navigateMessages}
      />
      <Avatar size={27} rounded containerStyle={{backgroundColor: PRIMARY}} source={props.userProfile} onPress={props.showProfile}/>
    </View>
  );
}
