import { Text, View, TouchableOpacity } from "react-native";
const styles = require("../../../../Styles");

const RoundSound = ({ item }) => {
  return (
    <View style={styles.round}>
      <View style={styles.round.circle} />
      <Text style={styles.round.text}>{item.name}</Text>
      <Text style={styles.round.subText}>{item.location}</Text>
    </View>
  );
};

export default RoundSound;
