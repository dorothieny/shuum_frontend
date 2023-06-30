import { Text, View, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import useAudioPlayer from "../../../../hooks/useAudioPlayer";
const styles = require("../../../../Styles");
import Ionicons from '@expo/vector-icons/Ionicons';

const RoundSound = ({ item, style }) => {
  const {isPlaying, playAudio, pauseAudio, loading} = useAudioPlayer(`http://localhost:3000${item?.audiofile?.url}`);
  return (
    <View style={{ ...styles.round, ...style }}>
      <View style={{ ...styles.round.circle, position:'relative', marginBottom: 8, display:'flex', flexDirection: 'column', alignItems:'center', justifyContent:'center' }}>
        <Image
          style={
            item?.image?.url
              ? { ...styles.round.circle, position:'absolute' }
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
        {!loading ?
                        (<View style={styles.round.player}>
                           {isPlaying ? <Ionicons name="pause" size={24} color={styles.mainColors.white} onPress={pauseAudio}/> : <Ionicons name="play" size={24}  color={styles.mainColors.white} onPress={playAudio}/> }
                            </View>) : (
                                <>
                                <ActivityIndicator />
                                
                            </>
                            )
                            }
      </View>
      <Text style={styles.round.text}>{item.name}</Text>
      <Text style={styles.round.subText}>{item.location}</Text>
    </View>
  );
};

export default RoundSound;
