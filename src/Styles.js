import {
    StyleSheet
} from "react-native";

const green = "#043227";
const yellow = "yellow";
const white = "#F5F5F5";
const black = "#1D1F1F";
const gray = "#C0C0C0";
const lightGreen = "#247C5D";
const alphaGreen = "#D7E3DE";
const alphaGreenText = "#739488";

module.exports = StyleSheet.create({
    mainColors: {
        green: green,
        yellow: yellow,
        white: white,
        black: black,
        gray: gray,
        lightGreen: lightGreen,
    },
    app: {
        // backgroundColor: yellow,
        borderRadius: '12px',
        overflow: 'hidden',
        zIndex: 10,
        // paddingBottom: 700,
        // paddingBottom: 500,
        // paddingLeft: 16,
        // paddingRight: 16,
        flex: 1,
    },
    textes: {
        h2: {
            color: black,
            fontWeight: "700",
            fontSize: "24px",
            textTransform: "uppercase",
            textAlign: "center",
        },
        h3: {
            fontSize: 16,
            fontWeight: "700",
            lineHeight: "20px",
            textTransform: 'uppercase',
            textAlign: "center",
        }
    },
    usersList: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        
    },
    tabBarContainer: {
        marginBottom: 34,
        position: "absolute",
        bottom: 0,
        elevation: 0,
        borderTopWidth: 0,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    tapBar: {
        backgroundColor: green,
        flexDirection: "row",
        justifyContent: "center",
        width: "auto",
        borderRadius: 88,
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 14,
        paddingBottom: 14,

        text: {
            textAlign: "center",
            color: white,
            colorNonAtive: "#4D6D65"
        }
    },
    topBar: {
        paddingTop: 56,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingRight: 16,
        paddingLeft: 16,
        paddingBottom: 20,
        text: {
            color: white,
            textTransform: "uppercase",
            fontWeight: "700",
            fontSize: 16,
        }
    },

    feedBlock: {
        betweenGap: 48,
        blockGap: 24,
        titleRow: {
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center"
        },
        title: {
            fontStyle: "normal",
            fontWeight: "700",
            fontSize: 36,
            textTransform: "uppercase",
        },
    },
    round: {
        width: 107,
        display: "flex",
        flexDirection: "column",
        circle: {
            backgroundColor: green,
            width: 107,
            height: 107,
            borderRadius: "100%",
        },
        player: {
            
        },
        text: {
            textAlign: "center",
            fontWeight: "700",
            fontSize: "12px",
            marginBottom: 4,
            textTransform: "uppercase",
        },
        subText: {
            textAlign: "center",
            fontWeight: "400",
            fontSize: "12px",
            color: gray,
        }
    },

    flexRow: {
        display: "flex",
        flexDirection: "row",
    },
    tagStyle: {
        backgroundColor: alphaGreen,
        paddingVertical: 2,
        borderRadius: 2,
        paddingHorizontal: 3,
        marginRight: 8,
        // width: "fit-content",
        flexGrow: 0, 
        flexShrink: 0,
        text: {
            color: alphaGreenText,
        },
        textLarge: {
            color: alphaGreenText,
            fontSize: 48,
            lineHeight: 48,
            letterSpacing: -2.4,
            textTransform: "lowercase",
    }
    },
    trackItemList: {
        display: 'flex',
        flexDirection: 'row',
        boxSizing: 'border-box',
        marginTop: 8,
        marginBottom: 8,
        alignItems: 'center',
        paddingHorizontal: 16,
        flexRow: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            /* background-color: white; */
            flex: 1,
            paddingVertical: 8,
            borderRadius: 16,
            paddingHorizontal: 16,
        }
    },
playerBar: {
        container: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "white",
          alignItems: "center",
          height: 155,
          zIndex:0,
          paddingHorizontal: 16,
          paddingBottom: 100,
          paddingTop: 16,
          shadowColor: "rgba(0, 0, 0, 0.11)",
          shadowOffset: { width: 0, height: -5 },
          shadowOpacity: 1,
          shadowRadius: 19,
          // Дополнительные стили для контейнера
        },
        row: {
            display: 'flex', 
            flexDirection: 'row', 
            flex: 1, 
            alignItems: 'center',
        },
        playIcon: {
          borderColor: green,
          borderWidth: 2,
          height: 40,
          width: 40,
          display: "flex", 
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "500%",
        },
        button: {
          flexDirection: "row",
          alignItems: "center",
        },
        // Дополнительные стили для иконок, текста и кнопок управления
    },
    tagsView: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 8,
    },
    roundSound: {
        width: 360,
        height: 360,
        borderRadius: "500%",
        backgroundColor: black,
        display: "flex",
        position: "relative",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        text: {
            color: white,
            fontWeight: "700",
            fontSize: "24px",
            textTransform: "uppercase",
            textAlign: "center",
            width: 200,
        }
    },
    recorder: {
        height: 448,
        width: "100%",
        backgroundColor: green,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        circle: {
            backgroundColor: lightGreen,
            height: 218,
            width: 218,
            borderRadius: "500%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        secondCircle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderColor: lightGreen,
            borderWidth: 2,
            height: 260,
            width: 260,
            borderRadius: "500%",
        },
        thirdCircle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 360,
            width: 360,
            borderRadius: "500%",
        },
        fontP1: {
            fontWeight: 400,
            fontSize: 16,
            lineHeight: 18,
        },
        fontP2: {
            fontWeight: 400,
            fontSize: 12,
            lineHeight: 14,
        }
    },
    profile: {
        avatar: {
            width: 70,
            height: 70,
            borderRadius: "100%",
        },
        card: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        }


    },
    searchInput: {
        lightTheme: {
            container: {
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "row",
                width: "100%",
                paddingTop: 16,
                // paddingHorizontal: 16,
                backgroundColor: white,
                paddingBottom: 16,
            },
            searchInput__unclicked: {
                flexDirection: "row",
                width: "95%",
                backgroundColor: "transparent",
                borderRadius: 15,
                alignItems: "center",
                borderBottomColor: "black",
            },
            searchInput__clicked: {
                flexDirection: "row",
                width: "95%",
                backgroundColor: "transparent",
                borderRadius: 15,
                alignItems: "center",
                justifyContent: "space-evenly",
                borderBottomColor: "black",
            },
            input: {
                fontSize: 20,
                marginLeft: 8,
                flex: 1,
                borderBottomColor: black,
                borderBottomWidth: 2,
            },
            placeholderStyle: {
                textTransform: "uppercase", // стиль плейсхолдера
              },
        },

        darkTheme: {
            container: {
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "row",
                width: "100%",
                paddingTop: 16,
                // paddingHorizontal: 16,
                backgroundColor: "transparent",
                paddingBottom: 16,
            },
            searchInput__unclicked: {
                flexDirection: "row",
                width: "95%",
                backgroundColor: "transparent",
                borderRadius: 15,
                color: white,
                alignItems: "center",
                borderBottomColor: "black",
            },
            searchInput__clicked: {
                flexDirection: "row",
                width: "95%",
                backgroundColor: "transparent",
                borderRadius: 15,
                color: white,
                alignItems: "center",
                justifyContent: "space-evenly",
                borderBottomColor: "black",
            },
            input: {
                fontSize: 20,
                marginLeft: 8,
                flex:1,
                color: white,
                borderBottomColor: white,
                borderBottomWidth: 2,
            },
            placeholderStyle: {
                textTransform: "uppercase", // стиль плейсхолдера
              },
        },

       
    },
    button: {
        color: white,
        fontSize: 24,
        fontWeight: "700",
        width: "100%",
        textTransform: "uppercase",
        // textAlign: "center",
    }

}
);