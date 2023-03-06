import {
    StyleSheet
} from "react-native";

const green = "#043227";
const yellow = "yellow";
const white = "#F5F5F5";

module.exports = StyleSheet.create({
    mainColors: {
        green: green,
        yellow: yellow,
        white: white
    },
    app: {
        backgroundColor: white,
        borderRadius: '12px',
        overflow: 'hidden',
        zIndex: 10,
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
        width: 300,
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
        paddingTop: 52,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingRight: 16,
        paddingLeft: 16,
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