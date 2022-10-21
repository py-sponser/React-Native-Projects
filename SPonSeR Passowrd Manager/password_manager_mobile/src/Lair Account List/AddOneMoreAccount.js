import React, {useRef, useState} from "react";
import {StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import {Icons} from "../Icons";

export const AddOneMoreAccount = (props) => {
    const [showPassword, setShowPassword] = useState(false)
    const inputRef = useRef()

    const [newAccount, setNewAccount] = useState({
        loginName: "",
        password: "",
        invisiblePassword: "",
        showPassword: false,
        id: props.id,
        focus: false,
        webId: "",
    })
    const onLoginNameChangeHandler = (loginName) => {
        setNewAccount((prevState) => {
            return {...prevState, loginName: loginName}
        })
    }
    const onPasswordChangeHandler = (password) => {
        setNewAccount((prevState) => {
            return {...prevState, password: password}
        })
    }
    const showPasswordHandler = () => {
        setShowPassword(prevState => !prevState)
    }

    const onLoginNameBlurHandler = () => {
        if(props.newAccounts.length === 0){
            console.log("New Accound is added: ", newAccount)
            props.setNewAccounts((prevState) => {
                return [...prevState, newAccount]
            })
        }
        for(let account of props.newAccounts){
            if(account.id === newAccount.id){
                const filteredNewAccounts = props.newAccounts.map((account) => {
                    if(account.id === newAccount.id){
                        account.loginName = newAccount.loginName
                    }
                    console.log("Account LoginName is modifed: ", account)

                    return account;
                })
                props.setNewAccounts(filteredNewAccounts)
            } else{
                console.log("New Accound is added: ", newAccount)

                props.setNewAccounts((prevState) => {
                    return [...prevState, newAccount]
                })
            }
        }
    }
    const onPasswordBlurHandler = () => {
        if(props.newAccounts.length === 0){
            console.log("New Accound is added: ", newAccount)
            props.setNewAccounts((prevState) => {
                return [...prevState, newAccount]
            })
        }
        for(let account of props.newAccounts){
            if(account.id === newAccount.id){
                const filteredNewAccounts = props.newAccounts.map((account) => {
                    if(account.id === newAccount.id){
                        account.password = newAccount.password
                    }
                    console.log("Account Password is modifed: ", account)

                    return account;
                })
                props.setNewAccounts(filteredNewAccounts)
            } else{
                console.log("New Accound is added: ", newAccount)
                props.setNewAccounts((prevState) => {
                    return [...prevState, newAccount]
                })
            }
        }
    }

    const removeOneMoreAccount = () => {
        const filteredMoreAccounts = props.showOneMoreAccountForm.quantity.filter((item) => {
            return item.id !== props.id
        })
        const newAccounts = props.newAccounts.filter((account) => {
            return account.id !== newAccount.id;
        })
        console.log("New Accounts after filtering: ", newAccounts)
        props.setNewAccounts(newAccounts)
        props.setShowOneMoreAccountForm((prevState) => {
            return {...prevState, quantity: filteredMoreAccounts}
        })

        console.log(props.newAccounts)

    }

    return (
        <View style={styles.formContainer}>
            <View style={styles.textInputContainer}>
                <View
                    style={{
                        borderBottomColor: '#ff5032',
                        borderBottomWidth: 3,
                    }}
                />
            </View>


            <View style={styles.modalBtnContainer}>
                <TouchableOpacity
                    onPress={removeOneMoreAccount}
                >
                    <Icons.MaterialIcon name={"close"} size={50} color={"#ff5032"} />
                </TouchableOpacity>
            </View>


            <View style={styles.textInputContainer}>
                <TextInput
                    onChangeText={onLoginNameChangeHandler}
                    style={styles.textInput}
                    placeholderTextColor={"#ffeee7"}
                    selectionColor={"#32324E"}
                    placeholder="Login name: "
                    onBlur={onLoginNameBlurHandler}
                    autoFocus={true}
                    ref={inputRef}
                    onLayout={() => props.mode === "edit" && inputRef.current.focus()}
                />
            </View>
            <View style={styles.textInputContainer}>
                <TextInput
                    onChangeText={onPasswordChangeHandler}
                    style={styles.textInput}
                    placeholderTextColor={"#ffeee7"}
                    selectionColor={"#32324E"}
                    placeholder="Password: "
                    secureTextEntry={!showPassword}
                    onBlur={onPasswordBlurHandler}
                />
                <TouchableOpacity onPress={showPasswordHandler}>
                    {!showPassword && <Icons.MaterialIcon name={"visibility"} size={30} color={"white"} style={styles.visibilityIcon} />}
                    {showPassword && <Icons.MaterialIcon name={"visibility-off"} size={30} color={"white"} style={styles.visibilityIcon} />}
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    formContainer: {
       justifyContent: "center",
    },
    textInputContainer: {
        flexDirection: 'row',
        backgroundColor: '#ff5032',
        margin: "4%",
        borderRadius: 10,

    },
    textInput: {
        color: 'white',
        fontSize: 17.5,
        padding: "3%",
        borderRadius: 10,
        flex: 9
    },
    visibilityIcon: {
        flex: 1,
        padding: "3%",
    },
    modalBtnContainer: {
        alignSelf: "flex-end",
        margin: "1%"
    },
    closeIcon: {
    },
})