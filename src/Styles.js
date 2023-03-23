import {
    StyleSheet
} from "react-native";

const green = "#043227";
const yellow = "yellow";
const white = "#F5F5F5";
const black = "#1D1F1F";
const gray = "#C0C0C0";
const lightGreen = "#247C5D";

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
        // backgroundColor: white,
        borderRadius: '12px',
        overflow: 'hidden',
        zIndex: 10,
        // paddingTop: 16,
        // paddingLeft: 16,
        // paddingRight: 16,
        flex: 1,
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
            backgroundColor: white,
            width: 107,
            height: 107,
            borderRadius: "100%",
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
            borderColor: "solid rgba(36, 124, 93, 0.2)",
            borderWidth: 2,
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
                marginLeft: 10,
                width: "90%",
                borderBottomColor: black,
                borderBottomWidth: 2,
            },
        },

        darkTheme: {
            container: {
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "row",
                width: "100%",
                paddingTop: 16,
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
                marginLeft: 10,
                width: "90%",
                color: white,
                borderBottomColor: white,
                borderBottomWidth: 2,
            },
        },
    }

}
);