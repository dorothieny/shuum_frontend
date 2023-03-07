import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import GoIcon from "../../../icons/A_GoIcon";
const styles = require("../../../Styles");

const HorizontalSubscriptions = (props) => {
  const [state, setState] = useState();
  const { title, type } = props.data;
  return (
    <>
      <View
        style={{
          ...styles.flexRow,
          marginBottom: styles.feedBlock.blockGap,
          ...styles.feedBlock.titleRow,
        }}
      >
        <View style={{ ...styles.flexRow }}>
          <Text style={styles.feedBlock.title}>{title}</Text>
          <Text
            style={{
              ...styles.feedBlock.title,
              color: styles.mainColors.gray,
              marginLeft: 8,
            }}
          >
            {state?.length}
          </Text>
        </View>

        <GoIcon />
      </View>
    </>
  );
};
export default HorizontalSubscriptions;
