import React, {useEffect, useState} from "react";
import {Image, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import icon from "../src/assets/icons/eagleIcon.png"
import {VerifySecurityQuestions} from "./Settings/VerifySecurityQuestions";
import {ResetRootPassword} from "./Settings/ResetRootPassword";
import {Icons} from "./Icons";


export const UnlockApp = (props) => {
    const [rootPassword, setRootPassword] = useState({
        value: "",
        isValid: null,
    })
    const [isFormValid, setIsFormValid] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [changeRootPasswordStyle, setChangeRootPasswordStyle] = useState(false)
    const [showErrMsg, setShowErrMsg] = useState(false)
    const [secretQuestionsVerified, setSecretQuestionsVerified] = useState(true)
    const [rootPasswordIsOk, setRootPasswordIsOk] = useState(true)
    const [showForgotPasswordBtn, setShowForgotPasswordBtn] = useState(false)

    const showPasswordHandler = () => {
        setShowPassword(prevState => !prevState)
    }
    const onChangeRootPasswordHandler = async (root_password) => {
        console.log(root_password)
        const currentRootPassword = await AsyncStorage.getItem("root_password")


        setRootPassword((prevState) => {
            return {value: root_password, isValid: root_password === currentRootPassword}
        })
    }

    const styleRootPasswordOnFocus = () => {
        setChangeRootPasswordStyle(true)
    }
    const validateRootPassword = async () => {
        const currentRootPassword = await AsyncStorage.getItem("root_password")
        setRootPassword((prevState) => {
            return {value: prevState.value, isValid: prevState.value === currentRootPassword}
        })
        setChangeRootPasswordStyle(false)
    }

    const unlock = async () => {
        const root_password = await AsyncStorage.getItem("root_password");
        console.log(root_password)
        console.log(rootPassword)
        if(root_password === rootPassword.value){
            ToastAndroid.show("App Unlocked", ToastAndroid.SHORT)
            props.setLockApp(false)
        } else{
            setShowErrMsg(true)
        }
    }

    useEffect(() => {
        const timeHandler = setTimeout(() => {
            setIsFormValid(rootPassword.isValid)
        }, 0)
        return () => {
            clearTimeout(timeHandler);
        };
    }, [rootPassword.isValid]) // timout is 0


    useEffect(() => {
        if(isFormValid){
            unlock()
        }
    }, [isFormValid])



    const forgotPasswordHandler = async () => {
        setSecretQuestionsVerified(false)
    }

    const checkSecurityQuestionSetupHandler = async () => {
        const securityQuestions = await AsyncStorage.getItem("securitySecretQuestions")
        securityQuestions && setShowForgotPasswordBtn(true)
    }

    useEffect(() => {
        checkSecurityQuestionSetupHandler()
    }, [])
    return (
        <>
            {!secretQuestionsVerified && <VerifySecurityQuestions setSecretQuestionsVerified={setSecretQuestionsVerified} setRootPasswordIsOk={setRootPasswordIsOk}  />}
            {!rootPasswordIsOk && <ResetRootPassword setRootPasswordIsOk={setRootPasswordIsOk} />}
            {
                secretQuestionsVerified && rootPasswordIsOk && (
                    <ScrollView style={styles.container}>
                        <View style={styles.logoContainer}>
                            <Image source={icon} style={styles.logo} resizeMode={"cover"} />
                        </View>
                        <View style={styles.formContainer}>
                            <View style={styles.formSection}>
                                <TextInput
                                    onChangeText={onChangeRootPasswordHandler}
                                    onFocus={styleRootPasswordOnFocus}
                                    onBlur={validateRootPassword}
                                    style={[styles.rootPasswordTextInput, !rootPassword.isValid && changeRootPasswordStyle && styles.textInputInValid]}
                                    placeholderTextColor={"#32324E"}
                                    selectionColor={"#32324E"}
                                    placeholder="Type root password"
                                    secureTextEntry={!showPassword}
                                />
                                <TouchableOpacity onPress={showPasswordHandler}>
                                    {!showPassword && <Icons.MaterialIcon name={"visibility"} size={30} color={"#ff5032"} style={styles.visibilityIcon} />}
                                    {showPassword && <Icons.MaterialIcon name={"visibility-off"} size={30} color={"#ff5032"} style={styles.visibilityIcon} />}
                                </TouchableOpacity>

                            </View>
                            {
                                showForgotPasswordBtn && (
                                    <TouchableOpacity style={styles.passwordActionArea} onPress={forgotPasswordHandler}>
                                        <Text style={styles.forgotBtn}>Forgot root password?</Text>
                                    </TouchableOpacity>
                                )
                            }

                            {
                                showErrMsg && (
                                    <View style={styles.errorMsgContainer}>
                                        <Text style={styles.errorMsg}>Root Password is incorrect.</Text>
                                    </View>
                                )
                            }

                        </View>
                    </ScrollView>
                )
            }

        </>
    )
}

const styles = StyleSheet.create({
    container: {

        height: "100%",
        backgroundColor: "#ff5032",
        display: "flex",
        flexDirection: "column",
    },
    logoContainer: {
        alignItems: "center",

    },
    logo: {

        height: 350,

    },
    formContainer: {
        display: "flex",
        justifyContent: "center",
    },
    formSection: {
        flexDirection: 'row',
        backgroundColor: 'white',
        margin: "5%",
        borderRadius: 10,
    },
    visibilityIcon: {
        flex: 1,
        padding: 15,
    },
    rootPasswordTextInput: {
        flex: 9,
        color: '#424242',
        fontSize: 17.5,
        padding: 15,
        borderRadius: 10,
    },
    unlockBtn: {
        backgroundColor: "white",
        padding: 15,
        alignSelf: "center",
        borderRadius: 10,
    },
    unlockBtnText: {
        fontWeight: "bold",
        fontSize: 15,
        color: "#424242",
    },
    passwordActionArea: {
    },
    forgotBtn: {
        color: "gold",
        fontSize: 17.5,
        textAlign: "center",
        padding: 10,
        fontWeight: "bold",
    },
    textInputInValid: {
        borderColor: "red",
        backgroundColor: "#fbdada",
    },
    applyBtnDisabled: {
        backgroundColor: "#ccc",
        borderColor: "#ccc",
        cursor: "not-allowed"
    },
    applyBtnTextDisabled: {
        color: "#666666",
    },
    errorMsgContainer: {
        margin: "5%"
    },
    errorMsg: {
        fontWeight: "bold",
        fontSize: 20,
        color: "white",
        textAlign: "center",
    }
})