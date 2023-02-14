import React, {
  useState,
  useEffect,
  forwardRef,
} from 'react';
import {
  View,
  Text,
  Dimensions,
  FlatList,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import styles from './style';
import {Avatar, Icon} from '@rneui/themed';
import {Image} from '@rneui/base';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import {
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
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
} from '../../redux/postSlice';

const {width, height} = Dimensions.get('window');

const stories = [
  {
    username: 'itsgoodman',
    stories: `https://picsum.photos/${width}/${height}?random=30`,
    profil_picture: `https://randomuser.me/api/portraits/men/12.jpg`,
    id: 0,
  },
  {
    username: 'samofficial',
    stories: `https://picsum.photos/${width}/${height}?random=12`,
    profil_picture: `https://randomuser.me/api/portraits/men/60.jpg`,
    id: 1,
  },
  {
    username: 'thisisjohn',
    stories: `https://picsum.photos/${width}/${height}?random=100`,
    profil_picture: `https://randomuser.me/api/portraits/men/4.jpg`,
    id: 2,
  },
  {
    username: 'mike',
    stories: `https://picsum.photos/${width}/${height}?random=151`,
    profil_picture: `https://randomuser.me/api/portraits/men/8.jpg`,
    id: 3,
  },
  {
    username: 'tommy',
    stories: `https://picsum.photos/${width}/${height}?random=123`,
    profil_picture: `https://randomuser.me/api/portraits/men/1.jpg`,
    id: 4,
  },
  {
    username: 'therealdavid',
    stories: `https://picsum.photos/${width}/${height}?random=67`,
    profil_picture: `https://randomuser.me/api/portraits/men/55.jpg`,
    id: 5,
  },
];

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
  let sortComments = [...comments];
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
            source={{uri: data.user.profile_picture_new}}
          />
          <Text style={styles.textUsernamePost}>{data.user.username}</Text>
        </View>
      </View>
      <View>
        <Image
          source={{
            uri: data.images.image,
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
      <Caption username={data.user.username} text={data.caption.text} />
      <Text style={styles.commentCount} onPress={props.navigateToDetail}>
        See {comments.length} comments
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
      </View>
      <Text style={styles.text_time}>{props.time}</Text>
    </View>
  );
});

function Home(props) {
  const [posts, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [showStories, setShowStories] = useState(false);
  const [storyArr, setStoryArr] = useState([]);
  const [textSearch, setTextSearch] = useState('');
  const [showModalProfile, setShowModalProfile] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  function commentPost(id) {
    if (comment !== '') {
      const userComment = {
        created_time: new Date().getTime(),
        text: comment,
        from: {
          username: 'anan',
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

      setComment('');

      props.commentPost(payload);
    } else {
      ToastAndroid.show('Please type something first!', ToastAndroid.SHORT);
    }
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
    const posts = props.posts;

    const result = posts.find(
      item => item.user.username === textSearch.toLowerCase(),
    );
    props.addPost([result]);
    setTextSearch('');
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
    // get posts
    const fetchPosts = async () => {
      await axios
        .get(`https://api.jsonbin.io/v3/b/63bd23fe15ab31599e3290c1`)
        .then(response => {
          const data = response.data.record.data;
          let dataPosts = [];
          data.map(element => {
            const numberPost = Math.floor(Math.random() * (90 - 1) + 1);
            const likes = Math.floor(Math.random() * (200 - 1) + 1);
            const data = {
              ...element,
              comments: [
                {
                  created_time: '1440501087',
                  text: 'woow...! good',
                  from: {
                    username: 'itsgoodman',
                    profile_picture: `https://randomuser.me/api/portraits/men/${numberPost}.jpg`,
                    id: '1547627005',
                    full_name: 'Good Man',
                  },
                  id: 0,
                },
                {
                  created_time: '1440501087',
                  text: 'its amazing...!',
                  from: {
                    username: 'jane',
                    profile_picture: `https://randomuser.me/api/portraits/men/${numberPost}.jpg`,
                    id: '1547627005',
                    full_name: 'Jane',
                  },
                  id: 1,
                },
                {
                  created_time: '1440501087',
                  text: 'great! keep working...',
                  from: {
                    username: 'thisisjohn',
                    profile_picture: `https://randomuser.me/api/portraits/men/${numberPost}.jpg`,
                    id: '1547627005',
                    full_name: 'John',
                  },
                  id: 2,
                },
              ],
              images: {
                ...element.images,
                image: `https://picsum.photos/${width}/${height}?random=${numberPost}`,
              },
              user: {
                ...element.user,
                profile_picture_new: `https://randomuser.me/api/portraits/men/${numberPost}.jpg`,
              },
              likes,
              bookmarked: false,
            };
            dataPosts.push(data);
          });

          if (posts === null) {
            setPost(dataPosts);
          }

          props.addPost(dataPosts);

          setLoading(false);
        })
        .catch(error => {
          setLoading(false);
          return error.response.data;
        });
    };

    fetchPosts();
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
              likesPost={() => props.likePost(item.item.id)}
              textComment={val => setComment(val)}
              onSubmit={() => commentPost(item.item.id)}
              text={comment}
              navigateToDetail={() =>
                props.navigation.navigate('DetailPost', {id: item.item.id})
              }
              time={formatDistanceToNow(parseInt(item.item.created_time))}
              savePost={() => {
                if (item.item.bookmarked) {
                  props.removeBookmark(item.item.id);
                } else {
                  props.addToBookmark(item.item.id);
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
})(Home);
