import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// style
import {BLACK} from '../../config/color';
import {MEDIUM, REGULAR} from '../../config/fonts';
import {normalizeText} from '@rneui/base';
import {widthPercentage} from '../../utils/responsiveStyle';


export default function CommentElement(props) {
    return (
      <View style={styles.comment}>
        <Text style={styles.textUsernameComment}>{props.username}</Text>
        <Text style={styles.commentText}>{props.comment}</Text>
      </View>
    );
  }

  

  const styles = StyleSheet.create({
    comment: {
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    textUsernameComment: {
        fontFamily: MEDIUM,
        fontSize: normalizeText(12),
        color: BLACK
    },
    commentText: {
        fontFamily: REGULAR,
        fontSize: normalizeText(12),
        color: BLACK,
        marginLeft: widthPercentage(2)
    },

  })