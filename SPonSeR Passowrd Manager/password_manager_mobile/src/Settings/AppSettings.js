import React, {useCallback, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";


export const AppSettings = ({navigation}) => {
    const [storedQuestionsExist, setStoredQuestionsExist] = useState(false)

    const checkForStoredQuestions = useCallback(async () => {
        const storedQuestions = await AsyncStorage.getItem("securitySecretQuestions")
        storedQuestions ? setStoredQuestionsExist(true) : setStoredQuestionsExist(false)
    })

    useEffect(() => {
        checkForStoredQuestions()
    }, [])
    return (
        <View style={styles.settingsContainer}>
            <TouchableOpacity
                style={styles.settingChoice}
                onPress={() => navigation.navigate("RootPasswordChange")}
            >
                <Text style={styles.settingChoiceText}>Change Root Password</Text>
            </TouchableOpacity>

            {
                !storedQuestionsExist && (
                    <TouchableOpacity
                        style={styles.settingChoice}
                        onPress={() => navigation.navigate("SecurityQuestionSetup")}
                    >
                        <Text style={styles.settingChoiceText}>Set Security Questions</Text>
                    </TouchableOpacity>
                )
            }

        </View>
    )
}


const styles = StyleSheet.create({
    settingsContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#ffeee7",
    },
    settingChoice: {
        backgroundColor: "#ff5032",
        padding: 20,
        borderRadius: 10,
        width: "70%"
    },
    settingChoiceText: {
        color: "white",
        textAlign: "center",
        fontSize: 20,
    }
})