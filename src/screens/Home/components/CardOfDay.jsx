import { View, Text, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
const styles = require("../../../Styles");
import axios from "axios";
import RandomSound from "./subcomponents/RandomSound";
import GoIcon from "../../../icons/A_GoIcon";

const CardOfDay = (props) => {
  const { title, type } = props.data;
  const [isLoading, setIsLoading] = useState(true);
  const [state, setState] = useState();

  const fetchRandomCard = () => {
    axios
      .get("http://localhost:3000/api/v1/random/")
      .then((r) => {
        setState(r.data);
        // alert(JSON.stringify(r.data));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchRandomCard();
  }, []);

  return (
    <>
      {isLoading ? (
        <View>
          <ActivityIndicator size="large" />
        </View>
      ) : (
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
                {state.length}
              </Text>
            </View>

            <GoIcon />
          </View>
          <RandomSound data={state} />
        </>
      )}
    </>
  );
};
export default CardOfDay;
