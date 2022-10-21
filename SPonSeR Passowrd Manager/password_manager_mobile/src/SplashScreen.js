import React from "react";
import {StyleSheet, View, Image} from "react-native";
import icon from "../src/assets/icons/eagleIcon.png"

export const SplashScreen = () => {

    // check for necessary stuff.

    return (
        <View style={styles.container}>
            <Image source={icon} style={styles.logo} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: "#ff5032",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    logo: {
        alignSelf: "center",
    },
    logoLetter: {
        color: "white",
        fontSize: 80,
        borderWidth: 5,
        borderColor: "white",
        borderRadius: 15,
        textAlign: "center",
        padding: 10,
    },
    logoRestWord: {
        color: "white",
        fontSize: 80,
        padding: 10,
    },
})