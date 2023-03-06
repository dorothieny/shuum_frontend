import React, {useState, useEffect} from 'react';
import { StyleSheet, TextInput, View, Keyboard, Button } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';



const SearchInput = ({clicked, searchPhrase, setSearchPhrase, setClicked}) => {  
    return (
      <View style={styles.container}>
        <View
          style={
            clicked
              ? styles.searchInput__clicked
              : styles.searchInput__unclicked
          }
        >
          {/* search Icon */}
          <Ionicons name="search" size={24} />
          {/* Input field */}
          <TextInput
            style={styles.input}
            placeholder="Search"
            value={searchPhrase}
            onChangeText={setSearchPhrase}
            onFocus={() => {
              setClicked(true);
            }}
          />
          {/* cross Icon, depending on whether the search bar is clicked or not */}
          {clicked && (
             <Ionicons name="close" size={24} onPress={() => {setSearchPhrase("")}}/>
          )}
        </View>
        {/* cancel button, depending on whether the search bar is clicked or not */}
        {clicked && (
          <View>
            <Button
              title="Cancel"
              onPress={() => {
                Keyboard.dismiss();
                setClicked(false);
              }}
            ></Button>
          </View>
        )}
      </View>
    );
  };
  export default SearchInput;
  
  // styles
  const styles = StyleSheet.create({
    container: {
      margin: 15,
      justifyContent: "flex-start",
      alignItems: "center",
      flexDirection: "row",
      width: "90%",
  
    },
    searchInput__unclicked: {
      padding: 10,
      flexDirection: "row",
      width: "95%",
      backgroundColor: "#d9dbda",
      borderRadius: 15,
      alignItems: "center",
    },
    searchInput__clicked: {
      padding: 10,
      flexDirection: "row",
      width: "80%",
      backgroundColor: "#d9dbda",
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "space-evenly",
    },
    input: {
      fontSize: 20,
      marginLeft: 10,
      width: "90%",
    },
  });