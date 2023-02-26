import React, {useState, useEffect, forwardRef} from 'react';
import {
  View,
  Text,
  Dimensions,
  FlatList,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import styles from './style';
import {Avatar, Icon} from '@rneui/themed';
import {Image} from '@rneui/base';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import 'react-native-get-random-values';
import {nanoid} from 'nanoid';
import {formatDistanceToNow} from 'date-fns';
import Modal from 'react-native-modal';
import Share from 'react-native-share';

// components
import Header from '../../components/header/header';
import Caption from '../../components/caption/caption';
import Loading from '../../components/modal/Loading';
import CommentElement from '../../components/comment/comment';
import Story from '../../components/story.js/story';
import Profil from '../../components/profil/Profil';

// colors
import {BLACK, PRIMARY, WHITE} from '../../config/color';

// style
import {PADDING_APP} from '../../config/style';
import {heightPercentage} from '../../utils/responsiveStyle';

// redux
import {connect} from 'react-redux';
import {State} from '../../redux/store';
import {
  likePost,
  commentPost,
  addPost,
  addToBookmark,
  removeBookmark,
  dislikePost,
} from '../../redux/postSlice';
import {addNotification} from '../../redux/notificationSlice';
import {addUser} from '../../redux/userSlice';

function StoriesElement(props) {
  return (
    <TouchableOpacity
      style={styles.containerCardStory}
      onPress={props.showStories}>
      <LinearGradient
        colors={['#bc2ad8', '#e95950', '#fccc63']}
        style={{padding: 2, borderRadius: 50}}>
        <Avatar
          size={55}
          rounded
          containerStyle={styles.styleAvatarStory}
          source={{uri: props.profil_picture}}
        />
      </LinearGradient>

      <Text style={styles.textUsernameStory} numberOfLines={1}>
        {props.username}
      </Text>
    </TouchableOpacity>
  );
}

function NotificationModal(props) {
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
          <Text style={styles.textNotification}>Notification</Text>
          <FlatList
            data={props.data}
            extraData={props.extraData}
            renderItem={item => {
              return (
                <View style={styles.container_cardNotif}>
                  <Text style={styles.titleNotif}>{item.item.title}</Text>
                  <Text style={styles.textNotif}>{item.item.text}</Text>
                  <Text style={styles.textTimeNotif}>
                    {formatDistanceToNow(parseInt(item.item.created_time))}
                  </Text>
                </View>
              );
            }}
            ItemSeparatorComponent={() => {
              return <View style={styles.divider} />;
            }}
          />
        </View>
      </View>
    </Modal>
  );
}

const PostElement = forwardRef((props, ref) => {
  const data = props.data;
  let comments = props.data.comments;
  let sortComments = [];

  Object.values(comments).forEach(e => {
    sortComments.push(e);
  });

  sortComments.sort(
    (a, b) =>
      new Date(parseInt(b.created_time)) - new Date(parseInt(a.created_time)),
  );
  let listComments = [];

  if (sortComments.length > 0) {
    for (let i = 0; i < 2; i++) {
      if (i <= sortComments.length - 1) {
        listComments.push(sortComments[i]);
      } else {
        break;
      }
    }
  }

  return (
    <View style={styles.containerPost}>
      <View style={[styles.header_post, {marginHorizontal: PADDING_APP}]}>
        <View style={styles.header_post}>
          <Avatar
            size={25}
            rounded
            containerStyle={{backgroundColor: PRIMARY}}
            source={{uri: data.type === 'search' ? data.profile_picture : data.user.profile_picture}}
          />
          <Text style={styles.textUsernamePost}>{data.type === 'search' ? data.username : data.user.username}</Text>
        </View>
      </View>
      <View>
        <Image
          source={{
            uri: data.type === 'search' ? data.image : data.images.standard_resolution.url,
          }}
          style={styles.imagePost}
          resizeMode="cover"
        />
      </View>

      <View
        style={[
          styles.container_action,
          {marginHorizontal: PADDING_APP, marginTop: heightPercentage(2)},
        ]}>
        <View style={[styles.container_action, {flex: 2}]}>
          <Icon
            name={data.user_has_liked ? 'heart' : 'heart-outline'}
            type="material-community"
            color={data.user_has_liked ? 'red' : BLACK}
            size={27}
            onPress={props.likesPost}
          />
          <Icon
            name="comment-outline"
            type="material-community"
            color={BLACK}
            size={27}
            onPress={props.navigateToDetail}
          />
          <Icon
            name="share-outline"
            type="material-community"
            color={BLACK}
            size={27}
            onPress={props.share}
          />
        </View>
        <View style={{flex: 4, alignSelf: 'flex-end'}}>
          <TouchableOpacity
            onPress={props.savePost}
            style={{alignSelf: 'flex-end'}}>
            <Icon
              name={data.bookmarked ? 'bookmark' : 'bookmark-outline'}
              type="material-community"
              color={data.bookmarked ? PRIMARY : BLACK}
              size={27}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.likes}>{data.likes} likes</Text>
      <Caption username={data.type === 'search' ? data.username : data.user.username} text={data.type === 'search' ? data.caption : data.caption.text} />
      <Text style={styles.commentCount} onPress={props.navigateToDetail}>
        See {sortComments.length} comments
      </Text>
      <FlatList
        data={listComments}
        extraData={props.modified}
        renderItem={item => {
          return (
            <CommentElement
              username={item.item.from.username}
              comment={item.item.text}
            />
          );
        }}
        style={styles.listComment}
        keyExtractor={(item, index) => index}
      />
      <View style={styles.container_comment}>
        <Avatar
          size={25}
          rounded
          containerStyle={{backgroundColor: PRIMARY}}
          source={{uri: props.profile_picture}}
        />
        <TextInput
          placeholder="Add comment"
          style={styles.textInputComment}
          onChangeText={props.textComment}
          returnKeyType="send"
          onSubmitEditing={props.onSubmit}
          value={props.text}
        />
        <ActivityIndicator
          size={'small'}
          color={PRIMARY}
          style={styles.indicatorSend}
          animating={props.loadingSend}
        />
      </View>
      <Text style={styles.text_time}>{props.time}</Text>
    </View>
  );
});

function Home(props) {
  const [loading, setLoading] = useState(true);
  const [loadingSend, setLoadingSend] = useState(false);
  const [comment, setComment] = useState('');
  const [showStories, setShowStories] = useState(false);
  const [storyArr, setStoryArr] = useState([]);
  const [stories, setStories] = useState([]);
  const [textSearch, setTextSearch] = useState('');
  const [showModalProfile, setShowModalProfile] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

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

  function likePost(id) {
    props.likePost(id);
    axios
      .post(`https://dizzy-lime-tux.cyclic.app/like-post`, {
        postId: id,
      })
      .then(() => {
        console.log('You liked a post!');
      })
      .catch(error => {
        console.log('error', error);
        ToastAndroid.show('Something went wrong!', ToastAndroid.LONG);
      });
  }

  function dislikePost(id) {
    props.dislikePost(id);
    axios
      .post(`https://dizzy-lime-tux.cyclic.app/unlike-post`, {
        postId: id,
      })
      .then(() => {
        console.log('You unliked a post!');
      })
      .catch(error => {
        console.log('error', error);
        ToastAndroid.show('Something went wrong!', ToastAndroid.LONG);
      });
  }

  function bookmarkPost(id) {
    props.addToBookmark(id);
    axios
      .post(`https://dizzy-lime-tux.cyclic.app/bookmark-post`, {
        postId: id,
      })
      .then(() => {
        console.log('You bookmark a post!');
      })
      .catch(error => {
        console.log('error', error);
        ToastAndroid.show('Something went wrong!', ToastAndroid.LONG);
      });
  }
  function disbookmarkPost(id) {
    props.removeBookmark(id);
    axios
      .post(`https://dizzy-lime-tux.cyclic.app/disBookmark-post`, {
        postId: id,
      })
      .then(() => {
        console.log('You remove post from bookmark!');
      })
      .catch(error => {
        console.log('error', error);
        ToastAndroid.show('Something went wrong!', ToastAndroid.LONG);
      });
  }

  function _showStories(id) {
    let arrayStories = [];
    stories.map(element => {
      if (element.id >= id) {
        arrayStories.push(element);
      }
    });

    setStoryArr(arrayStories);
    setShowStories(true);
  }

  function search() {
    setLoading(true);
    axios.post(`https://dizzy-lime-tux.cyclic.app/search`, {
      username: textSearch.toLowerCase()
    })
    .then((result) => {
      if(result.data.message === 'success!') {
        let postsResult = [];

        result.data.data.forEach(e => {
          const element = {
            ...e,
            type: 'search'
          }
          postsResult.push(element);
        });
  
        props.addPost(postsResult);
        setTextSearch('');
        setLoading(false);
      } else {
        setTextSearch('');
        setLoading(false);
        ToastAndroid.show('User not found', ToastAndroid.SHORT);
      }

      
    })
    .catch(error => {
      setLoading(false);
      console.log('error', error);
      ToastAndroid.show('Something went wrong!', ToastAndroid.LONG);
    });
  }

  function share(message, url) {
    const options = {
      message,
      url,
    };

    Share.open(options)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  }

  useEffect(() => {
    const promises = new Promise(async (resolve, reject) => {
      await axios
        .get(`https://dizzy-lime-tux.cyclic.app/get-posts`)
        .then(response => {
          props.addPost(response.data.data);

          setLoading(false);
        })
        .catch(error => {
          setLoading(false);
          console.log('error', error);
          ToastAndroid.show('Something went wrong!', ToastAndroid.LONG);
        });

      await axios
        .get(`https://dizzy-lime-tux.cyclic.app/get-stories`)
        .then(response => {
          setStories(response.data.data);

          setLoading(false);
        })
        .catch(error => {
          setLoading(false);
          console.log('error', error);
          ToastAndroid.show('Something went wrong!', ToastAndroid.LONG);
        });
      
      await axios.get(`https://dizzy-lime-tux.cyclic.app/get-notification`)
        .then((result) => {
          Object.values(result.data.data).forEach(e => {
            props.addNotification(e);
          })
        })
        .catch(error => {
          setLoading(false);
          console.log('error', error);
          ToastAndroid.show('Something went wrong!', ToastAndroid.LONG);
        })

        await axios.get(`https://dizzy-lime-tux.cyclic.app/get-user-profile`)
        .then((result) => {
          const data = {
            username: result.data.data.username,
            profile_picture: result.data.data.userProfile
          }

          props.addUser(data);
        })
        .catch(error => {
          setLoading(false);
          console.log('error', error);
          ToastAndroid.show('Something went wrong!', ToastAndroid.LONG);
        })

      resolve('success');
    });

    promises
      .then(() => {
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading isModalVisible={loading} />;
  }

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <Header
          textSearch={text => setTextSearch(text)}
          search={search}
          text={textSearch}
          showProfile={() => setShowModalProfile(true)}
          userProfile={{uri: props.user.profile_picture}}
          showNotif={() => setShowNotif(true)}
          navigateMessages={() => props.navigation.navigate('Messages')}
        />
        <FlatList
          data={props.posts}
          extraData={props.modified}
          renderItem={item => (
            <PostElement
              data={item.item}
              likesPost={() =>
                item.item.user_has_liked
                  ? dislikePost(item.item.id)
                  : likePost(item.item.id)
              }
              textComment={val => setComment(val)}
              onSubmit={() => commentPost(item.item.id)}
              loadingSend={loadingSend}
              text={comment}
              navigateToDetail={() =>
                props.navigation.navigate('DetailPost', {id: item.item.id})
              }
              time={formatDistanceToNow(parseInt(item.item.created_time))}
              savePost={() => {
                console.log('item bookmark', item.item.bookmarked)
                if (!item.item.bookmarked) {
                  bookmarkPost(item.item.id);
                } else {
                  disbookmarkPost(item.item.id);
                }
              }}
              profile_picture={props.user.profile_picture}
              share={() =>
                share(item.item.caption.text, item.item.images.image)
              }
            />
          )}
          ListHeaderComponent={() => {
            return (
              <FlatList
                data={stories}
                renderItem={item => (
                  <StoriesElement
                    username={item.item.username}
                    profil_picture={item.item.profil_picture}
                    showStories={() => _showStories(item.item.id)}
                  />
                )}
                horizontal
                ListHeaderComponent={() => {
                  return (
                    <View style={styles.containerCardStory}>
                      <Avatar
                        size={55}
                        rounded
                        containerStyle={styles.styleAvatarStory}
                        source={{
                          uri: props.user.profile_picture,
                        }}
                      />
                      <View style={styles.container_plus}>
                        <Icon
                          name="plus"
                          type="material-community"
                          color={WHITE}
                          size={14}
                        />
                      </View>
                      <Text style={styles.textUsernameStory} numberOfLines={1}>
                        Your Story
                      </Text>
                    </View>
                  );
                }}
                showsHorizontalScrollIndicator={false}
                ListHeaderComponentStyle={{marginLeft: PADDING_APP}}
                contentContainerStyle={{alignItems: 'center'}}
              />
            );
          }}
          ListHeaderComponentStyle={{marginBottom: heightPercentage(2)}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: heightPercentage(13)}}
        />
        <Loading isModalVisible={loading} />
        <Story
          data={storyArr}
          isModalVisible={showStories}
          closeModal={() => setShowStories(false)}
        />
        <Profil
          isModalVisible={showModalProfile}
          closeModal={() => setShowModalProfile(false)}
          username={props.user.username}
          profile_picture={props.user.profile_picture}
        />
        <NotificationModal
          data={props.notification}
          isModalVisible={showNotif}
          extraData={props.modifiedNotif}
          closeModal={() => setShowNotif(false)}
        />
      </View>
    </GestureHandlerRootView>
  );
}

const mapStateToProps = (state = State) => ({
  posts: state.post.posts,
  modified: state.post.modifiedTime,
  user: state.user.user,
  notification: state.notification.notification,
  modifiedNotif: state.notification.modified,
});

export default connect(mapStateToProps, {
  likePost,
  commentPost,
  addPost,
  addToBookmark,
  removeBookmark,
  addNotification,
  dislikePost,
  addUser
})(Home);
