import React, { useState } from 'react';
import { View, Text } from 'react-native';
import styles from './style';

export default function Caption(props) {

    const [lines, setLines] = useState(2);

    function actionFooter() {
        if(lines === 2) {
            setLines(null);
        } else {
            setLines(2);
        }
    }
    
    return(
        <View style={styles.containerCaption}>
            <Text numberOfLines={lines} style={styles.caption}><Text style={styles.textUsername}>{props.username} </Text>{props.text}</Text>
            <Text style={styles.textFooter} onPress={actionFooter}>{lines === 2 ? "View more" : "View less"}</Text>
        </View>
    );
}