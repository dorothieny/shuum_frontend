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
            backgroundColor: black,
            borderRadius: "100%",
            width: 107,
            height: 107,
            marginBottom: 8,
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
        }
    }
    //   logo: {
    //     height: 80
    //   },
    //   header: {
    //     padding: 20
    //   },
    //   title: {
    //     fontWeight: "bold",
    //     fontSize: "1.5rem",
    //     marginVertical: "1em",
    //     textAlign: "center",
    //     color: yellow
    //   },
    //   text: {
    //     lineHeight: "1.5em",
    //     fontSize: "1.125rem",
    //     marginVertical: "1em",
    //     textAlign: "center"
    //   },
    //   link: {
    //     color: "yellow"
    //   },
    //   code: {
    //     fontFamily: "monospace, monospace"
    //   }
});