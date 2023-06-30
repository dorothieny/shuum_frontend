import { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
const styles = require("../../../Styles");
import axios from "axios";
import RoundSound from "./subcomponents/RoundSound";
import GoIcon from "../../../icons/A_GoIcon";
import { TouchableOpacity } from "react-native-gesture-handler";

const HorizontalNewsPopular = (props) => {
  const { title, type } = props.data;
  const { navigation } = props;
  const [state, setState] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const fetchContent = (type) => {
    if (type === "popular") {
      axios
        .get("http://localhost:3000/api/v1/popular/")
        .then((r) => {
          setState(r.data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else if (type === "news") {
      axios
        .get("http://localhost:3000/api/v1/newest/")
        .then((r) => {
          setState(r.data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    fetchContent(type);
  }, [type]);

  return (
    <>
      {isLoading ? (
        <View>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View>
          <TouchableOpacity onPress={() => navigation.navigate(title)}>
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
          </TouchableOpacity>
          {state.lenght == 0 ? (
            <></>
          ) : (
            <FlatList
              horizontal
              pagingEnabled={false}
              showsHorizontalScrollIndicator={false}
              legacyImplementation={false}
              data={state}
              renderItem={({ item, index }) => {
                return <RoundSound key={index+Math.random(0, state.lenght)} item={item} style={{marginRight: 16}}/>;
              }}
              keyExtractor={(item) => item.id}
              style={{ width: "100%"}}
            />
          )}
        </View>
      )}
    </>
  );
};
export default HorizontalNewsPopular;
