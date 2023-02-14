import {Avatar} from '@rneui/themed';
import React from 'react';
import {View, FlatList, Text} from 'react-native';
import styles from './style';
import {PRIMARY} from '../../config/color';
import HeaderWithBack from '../../components/headeBack/HeaderWithBack';

// redux
import {connect} from 'react-redux';
import {State} from '../../redux/store';

function Messages(props) {
  return (
    <View>
      <HeaderWithBack {...props} name="Messages" />
      <FlatList
        data={props.messages}
        renderItem={item => {
          return (
            <View style={styles.container_item_chat}>
              <Avatar
                size={40}
                rounded
                containerStyle={{backgroundColor: PRIMARY}}
                source={{uri: item.item.profile_picture}}
              />
              <View style={styles.container_subChat}>
                <Text style={styles.textUsername}>{item.item.username}</Text>
                <Text style={styles.textChat}>{item.item.lastChat}</Text>
              </View>
            </View>
          );
        }}
        ItemSeparatorComponent={() => {
          return <View style={styles.divider} />;
        }}
        contentContainerStyle={styles.contentList}
      />
    </View>
  );
}

const mapStateToProps = (state = State) => ({
  messages: state.messages.messages,
});

export default connect(mapStateToProps, {})(Messages);
