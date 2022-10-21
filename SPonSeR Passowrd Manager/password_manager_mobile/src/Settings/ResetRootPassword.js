import React, {useEffect, useReducer, useState} from "react";
import {Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import icon from "../assets/icons/eagleIcon.png";
import {Icons} from "../Icons";


const rootPassReducer = (prevPassState, action) => {
    if(action.id === "loginPass"){
        return {...prevPassState, value: action.value, isValid: action.value.trim().length > 4}
    }
    else if(action.id === "validatePass"){
        return {...prevPassState, value:prevPassState.value, isValid: prevPassState.value.trim().length > 4}
    }
    else if(action.id === "confirmLoginPass"){
        return {...prevPassState, isMatch: action.value === prevPassState.value, confirm_password: action.value}
    }
    else if(action.id === "verifyConfirmLoginPass"){
        return {...prevPassState, isMatch: prevPassState.value && prevPassState.confirm_password}
    }
    return {value:"", isValid: null, isMatch: null};
}

export const ResetRootPassword = (props) => {


    const [rootPassword, rootPasswordDispatcher] = useReducer(rootPassReducer, {
        value: "",
        isValid: null,
        isMatch: null,
        confirm_password: "",
    })

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isFormValid, setIsFormValid] = useState(false)

    const [changeRootPasswordStyle, setChangeRootPasswordStyle] = useState(false)
    const [changeRootPasswordConfirmStyle, setChangeRootPasswordConfirmStyle] = useState(false)

    const showPasswordHandler = () => {
        setShowPassword(prevState => !prevState)
    }
    const showConfirmPasswordHandler = () => {
        setShowConfirmPassword(prevState => !prevState)
    }

    const onChangeRootPasswordHandler = (rootPassword) => {
        rootPasswordDispatcher({id:"loginPass", value: rootPassword})
    }

    const styleRootPasswordOnFocus = () => {
        setChangeRootPasswordStyle(true)
    }
    const validateRootPassword = () => {
        rootPasswordDispatcher({id: "validatePass"})
        setChangeRootPasswordStyle(false)
    }



    const onChangeRootPasswordConfirmHandler = (confirmRootPassword) => {
        rootPasswordDispatcher({id:"confirmLoginPass", value: confirmRootPassword})
    }
    const styleRootPasswordConfirmOnFocus = () => {
        setChangeRootPasswordConfirmStyle(true)
    }
    const validateRootPasswordConfirm = () => {
        rootPasswordDispatcher({id: "validatePass"})
        setChangeRootPasswordConfirmStyle(false)
    }

    const onSetRootPasswordPress = async () => {
        await AsyncStorage.setItem("root_password", rootPassword.value)
        props.setRootPasswordIsOk(true)
    }


    useEffect(() => {
        const timeHandler = setTimeout(() => {
            setIsFormValid(rootPassword.isValid && rootPassword.isMatch)
        }, 0)
        return () => {
            clearTimeout(timeHandler);
        };
    }, [rootPassword.isValid, rootPassword.isMatch]) // timout is 0



    return (
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
                        placeholder="Enter new root password"
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity onPress={showPasswordHandler}>
                        {!showPassword && <Icons.MaterialIcon name={"visibility"} size={30} color={"#ff5032"} style={styles.visibilityIcon} />}
                        {showPassword && <Icons.MaterialIcon name={"visibility-off"} size={30} color={"#ff5032"} style={styles.visibilityIcon} />}
                    </TouchableOpacity>

                </View>
                <View style={styles.formSection}>
                    <TextInput
                        onChangeText={onChangeRootPasswordConfirmHandler}
                        onFocus={styleRootPasswordConfirmOnFocus}
                        onBlur={validateRootPasswordConfirm}
                        style={[styles.rootPasswordTextInput, !rootPassword.isMatch && changeRootPasswordConfirmStyle && styles.textInputInValid]}
                        placeholderTextColor={"#32324E"}
                        selectionColor={"#32324E"}
                        placeholder="Confirm root password"
                        secureTextEntry={!showConfirmPassword}
                    />
                    <TouchableOpacity onPress={showConfirmPasswordHandler}>
                        {!showConfirmPassword && <Icons.MaterialIcon name={"visibility"} size={30} color={"#ff5032"} style={styles.visibilityIcon} />}
                        {showConfirmPassword && <Icons.MaterialIcon name={"visibility-off"} size={30} color={"#ff5032"} style={styles.visibilityIcon} />}

                    </TouchableOpacity>

                </View>
                <View>
                    <TouchableOpacity
                        style={[styles.setBtn, !isFormValid && styles.applyBtnDisabled]}
                        onPress={onSetRootPasswordPress}
                        disabled={!isFormValid}
                    >
                        <Text
                            style={[styles.setBtnText, !isFormValid && styles.applyBtnTextDisabled]}
                        >
                            Set Password
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
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
    setBtn: {
        backgroundColor: "white",
        padding: 15,
        alignSelf: "center",
        borderRadius: 10,
    },
    setBtnText: {
        fontWeight: "bold",
        fontSize: 15,
        color: "#ff5032",
    },
    textInputInValid: {
        borderColor: "#fbdada",
        backgroundColor: "#fbdada",
    },
    applyBtnDisabled: {
        backgroundColor: "#ccc",
        borderColor: "#ccc",
        cursor: "not-allowed"
    },
    applyBtnTextDisabled: {
        color: "#666666",
    }
})