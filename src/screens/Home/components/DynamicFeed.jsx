import { memo } from "react";
import { Text } from "react-native";
import HorizontalNewsPopular from "./HorizontalNewsPopular";
import HorizontalSubscriptions from "./HorizontalSubscriptions";
import CardOfDay from "./CardOfDay";

const DynamicFeed = memo(({item}) => {
  switch (item.type) {
    case 'news':
      return <HorizontalNewsPopular data={item} />;
    case 'track_of_day':
      return <CardOfDay data={item} />;
    case 'subscriptions':
      return <HorizontalSubscriptions data={item} />;
    case 'popular':
      return <HorizontalNewsPopular data={item} />;
    default:
      return <Text>Nothing</Text>;
  }
});
export default DynamicFeed;
