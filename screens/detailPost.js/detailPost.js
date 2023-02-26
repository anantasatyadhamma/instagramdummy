import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Text,
  ToastAndroid,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import styles from './style';
import {Avatar} from '@rneui/themed';
import 'react-native-get-random-values';
import {nanoid} from 'nanoid';
import {formatDistanceToNow} from 'date-fns';
import axios from 'axios';

// colors
import {PRIMARY} from '../../config/color';

// components
import CommentElement from '../../components/comment/comment';
import HeaderWithBack from '../../components/headeBack/HeaderWithBack';
import Loading from '../../components/modal/Loading';

// redux
import {connect} from 'react-redux';
import {State} from '../../redux/store';
import {likePost, commentPost, addPost} from '../../redux/postSlice';

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
  const [loadingSend, setLoadingSend] = useState(false);
  const [comments, setComments] = useState([]);
  const [postId, setPostId] = useState(null);

  function commentPost(id) {
    if (comment !== '') {
      setLoadingSend(true);
      axios
        .post(`https://dizzy-lime-tux.cyclic.app/add-comment`, {
          postId: id,
          textComment: comment,
        })
        .then(() => {
          console.log('You have successfully commented on a post!');

          const userComment = {
            created_time: new Date().getTime(),
            text: comment,
            from: {
              username: 'ananta',
              profile_picture: props.user.profile_picture,
              id: '124156363',
              full_name: 'Ananta',
            },
            id: nanoid(10),
          };

          const payload = {
            id,
            userComment,
          };

          props.commentPost(payload);

          setComment('');
          setLoadingSend(false);
        })
        .catch(error => {
          console.log('error', error);
          setLoadingSend(false);
          ToastAndroid.show('Something went wrong!', ToastAndroid.LONG);
        });
    } else {
      ToastAndroid.show('Please type something first!', ToastAndroid.SHORT);
    }
  }

  useEffect(() => {
    const {id} = props.route.params;
    console.log('id post', id);

    const fetchDetailPost = async () => {
      await axios
        .post(
          `https://dizzy-lime-tux.cyclic.app/get-detail-post`,
          {
            postId: id,
          },
          {},
        )
        .then(result => {
          setData(result.data.data);

          const listComment = result.data.data.comments;
          let sortComments = [];

          Object.values(listComment).forEach(e => {
            sortComments.push(e);
          });
          sortComments.sort(
            (a, b) =>
              new Date(parseInt(b.created_time)) -
              new Date(parseInt(a.created_time)),
          );

          setComments(sortComments);
          setLoading(false);
        })
        .catch(error => {
          console.log('error', error);
          setLoading(false);
        });
    };

    fetchDetailPost();

    setPostId(id);
  }, [props.modified]);

  if (data === null) {
    return <Loading isModalVisible={loading} />;
  }

  return (
    <View style={styles.container}>
      <HeaderWithBack {...props} name="Comments" />
      <FlatList
        data={comments}
        extraData={props.modified}
        renderItem={item => (
          <CommentElement
            username={item.item.from.username}
            comment={item.item.text}
          />
        )}
        ListHeaderComponent={() => (
          <HeaderComponentList
            username={data.user.username}
            caption={data.caption.text}
            time={formatDistanceToNow(parseInt(data.created_time))}
          />
        )}
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
        {loadingSend ? (
          <ActivityIndicator
            size={'small'}
            color={PRIMARY}
            style={styles.indicatorSend}
            animating={loadingSend}
          />
        ) : (
          <Text style={styles.textSend} onPress={() => commentPost(postId)}>
            Send
          </Text>
        )}
      </View>
    </View>
  );
}

const mapStateToProps = (state = State) => ({
  posts: state.post.posts,
  modified: state.post.modifiedTime,
  user: state.user.user,
});

export default connect(mapStateToProps, {
  likePost,
  commentPost,
  addPost,
})(DetailPost);
