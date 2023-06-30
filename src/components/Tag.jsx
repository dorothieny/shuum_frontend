import { FlatList, StyleSheet, Text, View, ActivityIndicator, RefreshControl, TouchableOpacity, Image, Button } from 'react-native';
import styles from '../Styles';

export const Tag = ({name}) => {
    return (
        <View style={styles.tagStyle}>
            <Text style={styles.tagStyle.text}>{name}</Text>
        </View>
    )
}
