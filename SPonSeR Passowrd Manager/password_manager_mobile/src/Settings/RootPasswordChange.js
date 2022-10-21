import React, {useCallback, useContext, useEffect, useReducer, useState} from "react";
import Store from "../context/Store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View} from "react-native";
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
    else if(action.id === "reset"){
        return {value: "", isValid: null, isMatch: null, confirm_password: "",}
    }
    return {value:"", isValid: null, isMatch: null};
}

export const RootPasswordChange = ({navigation}) => {
    const storeCtx = useContext(Store)
    const [currentStoredRootPassword, setCurrentStoredRootPassword] = useState("")
    const [currentRootPassword, setCurrentRootPassword] = useState({
        value: "",
        isValid: false,
    })
    const [rootPassword, rootPasswordDispatcher] = useReducer(rootPassReducer, {
        value: "",
        isValid: null,
        isMatch: null,
        confirm_password: "",
    })


    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [isFormValid, setIsFormValid] = useState(false)

    const [changeCurrentRootPasswordStyle, setChangeCurrentRootPasswordStyle] = useState(false)
    const [changeRootPasswordStyle, setChangeRootPasswordStyle] = useState(false)
    const [changeRootPasswordConfirmStyle, setChangeRootPasswordConfirmStyle] = useState(false)


    const showCurrentPasswordHandler = () => {
        setShowCurrentPassword(prevState => !prevState)
    }
    const showPasswordHandler = () => {
        setShowPassword(prevState => !prevState)
    }
    const showConfirmPasswordHandler = () => {
        setShowConfirmPassword(prevState => !prevState)
    }



    // Current Root Password Text Input Functions
    const onChangeCurrentRootPasswordHandler = (rootPassword) => {
        setCurrentRootPassword((prevState) => {
            return {value: rootPassword, isValid: rootPassword === currentStoredRootPassword}
        })
    }

    const styleCurrentRootPasswordOnFocus = () => {
        setChangeCurrentRootPasswordStyle(true)
    }
    const validateCurrentRootPassword = () => {
        setCurrentRootPassword((prevState) => {
            return {value: prevState.value, isValid: prevState.value === currentStoredRootPassword}
        })
        setChangeCurrentRootPasswordStyle(false)
    }


    // New Root Password Text Input Functions
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


    // Confirm new Root Password Text Input Functions
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

    const onChangeRootPasswordPress = async () => {
        await AsyncStorage.setItem("root_password", rootPassword.value)
        ToastAndroid.show("New root password is set", ToastAndroid.SHORT)
        setTimeout(() => {
            storeCtx.setLockApp(true);
        }, 2000)
        ToastAndroid.show("Locking app!", ToastAndroid.SHORT)
        setCurrentRootPassword((prevState) => {
            return {value: "", isValid: false}
        })
        rootPasswordDispatcher({id:"reset"})
        setShowCurrentPassword(false)
        setShowPassword(false)
        setShowConfirmPassword(false)
    }

    const getCurrentStoredRootPassword = useCallback(async () => {
        const root_password = await AsyncStorage.getItem("root_password")
        setCurrentStoredRootPassword(root_password)
        // root_password === rootPassword.current_password && setCurrentRootPasswordIsValid(true)
    }, [])

    useEffect(() => {
        getCurrentStoredRootPassword();
    }, [])

    useEffect(() => {
        const timeHandler = setTimeout(() => {
            setIsFormValid(rootPassword.isValid && rootPassword.isMatch && currentRootPassword.isValid)
        }, 0)
        return () => {
            clearTimeout(timeHandler);
        };
    }, [rootPassword.isValid, rootPassword.isMatch]) // timout is 0


    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>

                <View style={styles.textInputContainer}>
                    <TextInput
                        onChangeText={onChangeCurrentRootPasswordHandler}
                        onFocus={styleCurrentRootPasswordOnFocus}
                        onBlur={validateCurrentRootPassword}
                        style={[styles.rootPasswordTextInput, !currentRootPassword.isValid && changeCurrentRootPasswordStyle && styles.textInputInValid]}
                        placeholderTextColor={"white"}
                        selectionColor={"#32324E"}
                        placeholder="Type current root password"
                        secureTextEntry={!showCurrentPassword}
                        value={currentRootPassword.value}
                    />
                    <TouchableOpacity onPress={showCurrentPasswordHandler}>
                        {!showCurrentPassword && <Icons.MaterialIcon name={"visibility"} size={30} color={"white"} style={styles.visibilityIcon} />}
                        {showCurrentPassword && <Icons.MaterialIcon name={"visibility-off"} size={30} color={"white"} style={styles.visibilityIcon} />}
                    </TouchableOpacity>

                </View>
                {
                    currentRootPassword.isValid && (
                        <>
                            <View style={styles.textInputContainer}>
                                <TextInput
                                    onChangeText={onChangeRootPasswordHandler}
                                    onFocus={styleRootPasswordOnFocus}
                                    onBlur={validateRootPassword}
                                    style={[styles.rootPasswordTextInput, !rootPassword.isValid && changeRootPasswordStyle && styles.textInputInValid]}
                                    placeholderTextColor={"white"}
                                    selectionColor={"#32324E"}
                                    placeholder="Type new root password"
                                    secureTextEntry={!showPassword}
                                    value={rootPassword.value}
                                />
                                <TouchableOpacity onPress={showPasswordHandler}>
                                    {!showPassword && <Icons.MaterialIcon name={"visibility"} size={30} color={"white"} style={styles.visibilityIcon} />}
                                    {showPassword && <Icons.MaterialIcon name={"visibility-off"} size={30} color={"white"} style={styles.visibilityIcon} />}
                                </TouchableOpacity>

                            </View>
                            <View style={styles.textInputContainer}>
                                <TextInput
                                    onChangeText={onChangeRootPasswordConfirmHandler}
                                    onFocus={styleRootPasswordConfirmOnFocus}
                                    onBlur={validateRootPasswordConfirm}
                                    style={[styles.rootPasswordTextInput, !rootPassword.isMatch && changeRootPasswordConfirmStyle && styles.textInputInValid]}
                                    placeholderTextColor={"white"}
                                    selectionColor={"#32324E"}
                                    placeholder="Confirm new root password"
                                    secureTextEntry={!showConfirmPassword}
                                    value={rootPassword.confirm_password}
                                />
                                <TouchableOpacity onPress={showConfirmPasswordHandler}>
                                    {!showConfirmPassword && <Icons.MaterialIcon name={"visibility"} size={30} color={"white"} style={styles.visibilityIcon} />}
                                    {showConfirmPassword && <Icons.MaterialIcon name={"visibility-off"} size={30} color={"white"} style={styles.visibilityIcon} />}

                                </TouchableOpacity>

                            </View>
                            <View>
                                <TouchableOpacity
                                    style={[styles.setBtn, !isFormValid && styles.applyBtnDisabled]}
                                    onPress={onChangeRootPasswordPress}
                                    disabled={!isFormValid}
                                >
                                    <Text
                                        style={[styles.setBtnText, !isFormValid && styles.applyBtnTextDisabled]}
                                    >Change</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )
                }

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: "#ffeee7",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    logo: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    logoRestWord: {
        color: "#ff5032",
        fontSize: 30,
        padding: 10,
    },
    formContainer: {
        display: "flex",
        justifyContent: "center",
    },
    textInputContainer: {
        flexDirection: 'row',
        backgroundColor: '#ff5032',
        margin: "5%",
        borderRadius: 10,
    },
    visibilityIcon: {
        flex: 1,
        padding: 15,
    },
    rootPasswordTextInput: {
        flex: 9,
        fontSize: 17.5,
        padding: 15,
        borderRadius: 10,
        color: "white",
    },
    setBtn: {
        backgroundColor: "#ff5032",
        padding: 15,
        alignSelf: "center",
        borderRadius: 10,
        width: "40%",
    },
    setBtnText: {
        fontWeight: "bold",
        fontSize: 15,
        color: "white",
        textAlign: "center",
    },
    textInputInValid: {
        borderColor: "#fbdada",
        backgroundColor: "#fbdada",
        color: "brown",
    },
    applyBtnDisabled: {
        backgroundColor: "#ccc",
        borderColor: "#ccc",
        cursor: "not-allowed",
        width: "40%",
    },
    applyBtnTextDisabled: {
        color: "#666666",
        textAlign: "center",
    },

})