import { Text, View, Image, TouchableOpacity } from "react-native";
const styles = require("../../../../Styles");

const RoundSound = ({ item, style }) => {
  return (
    <View style={{ ...styles.round, ...style }}>
      <View style={{ marginBottom: 8 }}>
        <Image
          style={
            item?.image?.url
              ? { ...styles.round.circle }
              : {
                  ...styles.round.circle,
                  borderColor: styles.mainColors.green,
                  borderWidth: 2,
                  position: "relative",
                }
          }
          source={{ uri: `http://localhost:3000${item?.image?.url}` }}
        />
        {item?.image?.url && (
          <View
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              borderRadius: "500%",
              backgroundColor: styles.mainColors.black,
              opacity: 0.2,
            }}
          />
        )}
      </View>
      <Text style={styles.round.text}>{item.name}</Text>
      <Text style={styles.round.subText}>{item.location}</Text>
    </View>
  );
};

export default RoundSound;
