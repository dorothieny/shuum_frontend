import { View, Text, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import GoIcon from "../../../icons/A_GoIcon";
import axios from "axios";
import {useSelector} from "react-redux";
const styles = require("../../../Styles");

const HorizontalSubscriptions = (props) => {
  const [state, setState] = useState([]);
  const { title, type } = props.data;
  const [isLoading, setIsLoading] = useState(true);
  const { userId } = useSelector((state) => state.main);

  const fetchFeed = (id) => {
    if(id) {
        axios
        //TODO:this is hardcode
          .get(`http://localhost:3000/api/v1/users/${id}/feed`)
          .then((r) => {
            setState(r.data);
            // alert(JSON.stringify(r.data));
          })
          .finally(() => {
            setIsLoading(false);
          });
    }
  };

  useEffect(() => {
    fetchFeed(userId);
  }, [userId]);

  return (
    <>
      {isLoading ? (
        <View>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View>
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
          {state?.map((user, index) => {
            return (
              <View
              key={index}
                style={{
                  width: 200,
                  height: 144,
                  borderWidth: 2,
                  borderColor: styles.mainColors.green,
                  padding: 8,
                  borderRadius: 4,
                }}
              >
                <Text>@{user.name}</Text>
                <Text>
                  + {user.sounds?.length}{" "}
                  {user.sounds?.length > 1 ? "саундскейпа" : "саундскейп"}
                </Text>
              </View>
            );
          })}
        </View>
      )}
    </>
  );
};
export default HorizontalSubscriptions;
