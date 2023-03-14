import { memo } from "react";
import { Text } from "react-native";
import HorizontalNewsPopular from "./HorizontalNewsPopular";
import HorizontalSubscriptions from "./HorizontalSubscriptions";
import CardOfDay from "./CardOfDay";
import Recorder from "./Recorder";

const DynamicFeed = memo(({item, navigation}) => {
  switch (item.type) {
    case 'news':
      return <HorizontalNewsPopular data={item} navigation={navigation}/>;
    case 'track_of_day':
      return <CardOfDay data={item} navigation={navigation}/>;
    case 'subscriptions':
      return <HorizontalSubscriptions data={item} navigation={navigation}/>;
    case 'popular':
      return <HorizontalNewsPopular data={item} navigation={navigation}/>;
      case 'recorder':
      return <Recorder data={item} navigation={navigation}/>;
    default:
      return <Text>Nothing</Text>;
  }
});
export default DynamicFeed;
