import React from "react";
import { SafeAreaView, Text, View, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/core";
import { useSelector, useDispatch } from "react-redux";
import { getLikedEvents } from "../../common/redux/actions";
import auth from '../../../api/firebase/services/AuthService';

export default function Profile() {
  const user = useSelector((state) => state.isLogged);
  const likedEvents = useSelector(state => state.likedEvents);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  if (likedEvents) {
    console.log('LIKED EVENTS', likedEvents);
  }

  function handleLikedPress () {
    dispatch(getLikedEvents(auth.currentUser.uid));
  }

  

  return (
    <SafeAreaView>
      <View style={styles.profileInfo}>
        <Image style={styles.image} source={{ uri: "https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg" }} />
        <View style={styles.info}>
          <Text>{user.username}</Text>
          <Text style={{ color: "lightgrey" }}>{user.email}</Text>
        </View>
      </View>
      <View>
        <TouchableOpacity onPress={handleLikedPress}>
          <Text>EVENTOS LIKEADOS</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
