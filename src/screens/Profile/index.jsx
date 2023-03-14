import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  Image,
} from "react-native";
import axios from "axios";
import { useSelector } from "react-redux";
import styled from "styled-components/native";

const StyledAvatar = styled.Image`
  height: 144px;
  width: 144px;
  border-radius: 100%;
  margin-bottom: 16px;
`;

const ProfileCard = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  background-color: white;
  border-radius: 24px;
  height: 272px;
`;

const ProfileScreen = ({ navigator }) => {
  const { userId } = useSelector((state) => state.main);
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/users/${userId}`)
      .then((response) => {
        setProfile(response.data);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  return (
    <ProfileCard>
      <StyledAvatar
        source={{ uri: `http://localhost:3000${profile?.avatar?.url}` }}
      />
      <Text>@{profile?.name}</Text>
      <Text>Подписчики {profile?.followed_users?.length}</Text>
      <Text>Подписки {profile?.following_users?.length}</Text>
    </ProfileCard>
  );
};

export default ProfileScreen;
