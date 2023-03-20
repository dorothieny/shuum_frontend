import {
    FlatList,
    View,
    ActivityIndicator,
    RefreshControl,
  } from "react-native";
  const styles = require("../../../Styles");

const ListSounds = () => {
    return (
        <>
        
            <FlatList
              style={{...styles.app, backgroundColor: styles.mainColors.white}}
              data={[1,2,3]}
              renderItem={({ item, i }) => {
                return (
                    <View
                    style={{
                      backgroundColor: "red",
                      width: "100%",
                      height: 200,
                      marginBottom: 12,
                    }}
                  />
                );
              }}
            />
        </>
      );
}
export default ListSounds;