import React, {useEffect, useState} from 'react';
import {View, FlatList, Text, ToastAndroid, TextInput} from 'react-native';
import styles from './style';
import {Avatar} from '@rneui/themed';
import 'react-native-get-random-values';
import { nanoid } from 'nanoid';
import { formatDistanceToNow } from 'date-fns'

// colors
import {PRIMARY} from '../../config/color';

// components
import CommentElement from '../../components/comment/comment';
import HeaderWithBack from '../../components/headeBack/HeaderWithBack';
import Loading from '../../components/modal/Loading';

// redux
import {connect} from 'react-redux';
import {State} from '../../redux/store';
import {
 likePost,
 commentPost,
 addPost
} from '../../redux/postSlice';



function HeaderComponentList(props) {
  return (
    <View>
      <Text style={styles.username}>
        {props.username} 
        <Text style={styles.caption}> {props.caption}</Text>
      </Text>
      <Text style={styles.time}>{props.time}</Text>
      <View style={styles.divider} />
    </View>
  );
}

function DetailPost(props) {
  const [comment, setComment] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [postId, setPostId] = useState(null);

  function commentPost(id) {
    if(comment !== "") {
        const userComment = {
        created_time: new Date().getTime(),
        text: comment,
        from: {
          username: 'anan',
          profile_picture: `https://randomuser.me/api/portraits/men/35.jpg`,
          id: '124156363',
          full_name: 'Ananta',
        },
        id: nanoid(10)
      };

      const payload = {
        id,
        userComment
      }

      setComment("");

      props.commentPost(payload);
    } else {
      ToastAndroid.show("Please type something first!", ToastAndroid.SHORT);
    }
    
  }

  useEffect(() => {
    const { id } = props.route.params;
    const data = props.posts.find(item => item.id === id);
    setData(data);
    setPostId(id);
    setLoading(false);

    const listComment = data.comments;
    let sortComments = [...listComment];
    sortComments.sort((a, b) => new Date(parseInt(b.created_time)) - new Date(parseInt(a.created_time)));
    setComments(sortComments);

  }, [props.modified]);

  if(data === null) {
    return <Loading isModalVisible={loading} />;
  }

  return (
    <View style={styles.container}>
      <HeaderWithBack {...props} name="Comments"/>
      <FlatList
        data={comments}
        extraData={props.modified}
        renderItem={(item) => (
          <CommentElement username={item.item.from.username} comment={item.item.text} />
        )}
        ListHeaderComponent={() => <HeaderComponentList username={data.user.username} caption={data.caption.text} time={formatDistanceToNow(parseInt(data.created_time))}/>}
        contentContainerStyle={styles.contentList}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.containerTextInput}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Avatar
            size={25}
            rounded
            containerStyle={{backgroundColor: PRIMARY}}
            source={{uri: props.user.profile_picture}}
          />
          <TextInput
            placeholder={`Comment as ${props.user.username}`}
            style={styles.textInputComment}
            onChangeText={val => setComment(val)}
            returnKeyType="send"
            onSubmitEditing={() => commentPost(postId)}
            value={comment}
          />
        </View>
        <Text style={styles.textSend} onPress={() => commentPost(postId)}>Send</Text>
      </View>
    </View>
  );
}

const mapStateToProps = (state = State) => ({
  posts: state.post.posts,
  modified: state.post.modifiedTime,
  user: state.user.user
});

export default connect(mapStateToProps, {
  likePost,
  commentPost,
  addPost
})(DetailPost);
