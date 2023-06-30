import { FlatList, StyleSheet, Text, View, ActivityIndicator, RefreshControl, TouchableOpacity, Image, Button } from 'react-native';
import styles from '../Styles';

export const TagLarge = ({name}) => {
    return (
        <View style={{ flexDirection: 'row' }}>
        <View style={{ ...styles.tagStyle,flexGrow: 0, flexShrink: 0, alignSelf: 'flex-start' }}>
            <Text style={styles.tagStyle.textLarge} >{name}</Text>
        </View>
      </View>
    )
}
