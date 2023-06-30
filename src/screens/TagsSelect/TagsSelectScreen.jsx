import SearchInput from "../../components/SearchInput"
import { TagList } from "../Search/components/TagsLits"
import React, {useState} from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import styles from '../../Styles';
import { Tag } from "../../components/Tag";
import {
    FlatList,
    View,
    TouchableOpacity,
  } from "react-native";
import { useDispatch } from "react-redux";
import { processStringArray } from "../../helpers/processStringArray";

export const TagsSelectScreen = () => {
    const { tags } = useSelector((state) => state.main);
    const [clicked, setClicked] = useState(false);
    const [searchPhrase, setSearchPhrase] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
          dispatch({
            type: "SET_MAIN_REDUCER",
            payload: { search: searchPhrase },
            })
        }, 1000)
    
        return () => clearTimeout(delayDebounceFn)
      }, [searchPhrase])

    useEffect(() => {
    console.log(tags);
    }, [tags])

    return (
        <>
        <SearchInput
          clicked={clicked}
          setClicked={setClicked}
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
          isLight={false}
        />
        <View style={styles.tagsView}>
            {tags?.map((item, i) => {
                return (
                    <TouchableOpacity 
                    accessibilityRole="button" 
                    onPress={() => {
                        dispatch({
                            type: "SET_MAIN_REDUCER",
                            payload: { tags: processStringArray(item, tags) },
                          });
                    }}>
                        <Tag key={i} name={item} />
                    </TouchableOpacity>
                )
            })}
        </View>
        <TagList isSelect={true} />
        </>
    )
}