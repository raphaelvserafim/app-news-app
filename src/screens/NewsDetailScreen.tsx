import React, { useState } from 'react';
import { View, Image, ScrollView, StyleSheet, Text, Dimensions, Share, TouchableOpacity, Modal } from 'react-native';
import { useRoute } from '@react-navigation/native';
import RenderHtml from 'react-native-render-html';
import { getPostById } from '@/services/posts';
import { usePosts } from '@/contexts/PostsContext';
import { FormattedPost } from '@/model';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '@/components';
import environment from '@/configs/environment';
import { dateTime } from '@/utils';
import ImageViewer from 'react-native-image-zoom-viewer';

export function NewsDetailScreen() {
  const { width } = Dimensions.get('window');
  const { posts } = usePosts();
  const route = useRoute();
  const { id }: any = route.params;
  const [postagem, setPostagem] = React.useState<FormattedPost | null>(null);
  const [isImageViewerVisible, setImageViewerVisible] = useState(false);

  React.useEffect(() => {
    if (id) {
      const post = posts.find((_post: FormattedPost) => Number(_post.id) === Number(id));
      if (!post) {
        getPostById(id).then((response) => {
          setPostagem(response);
          return;
        }).catch(console.error);
      }
      setPostagem(post);
    }
  }, [id]);

  const sharePost = async () => {
    try {
      await Share.share({
        message: postagem?.title || 'Veja este post!',
        url: postagem?.link || '',
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title={environment.NAME}
        setSearchVisible={() => console.log}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          <Text style={styles.title}>{postagem?.title}</Text>
          <Text style={styles.date}>Postado: {dateTime(postagem?.date)}</Text>
          <TouchableOpacity onPress={() => setImageViewerVisible(true)}>
            <Image source={{ uri: postagem?.fullImageUrl }} style={styles.image} resizeMode="cover" />
          </TouchableOpacity>
          <RenderHtml
            contentWidth={width}
            source={{ html: postagem?.content || "" }}
            baseStyle={styles.htmlContent}
          />
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.floatingButton} onPress={sharePost}>
        <Ionicons name="share-social" size={24} color="#FFFFFF" />
      </TouchableOpacity>


      <Modal visible={isImageViewerVisible} transparent={true} onRequestClose={() => setImageViewerVisible(false)}>
        <ImageViewer
          imageUrls={[{ url: postagem?.fullImageUrl || '' }]}
          onClick={() => setImageViewerVisible(false)}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    paddingBottom: 90,
  },
  content: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 5,
  },
  date: {
    fontSize: 13,
    color: '#888888',
    marginBottom: 10,
  },
  title: {
    textAlign: "left",
    fontSize: 20,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 15,
    marginBottom: 20,
  },
  htmlContent: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333333',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007BFF',
    borderRadius: 50,
    padding: 15,
    elevation: 5,
  },
});
