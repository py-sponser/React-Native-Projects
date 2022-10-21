import React, {useContext, useEffect, useRef, useState} from "react";
import {Modal, Text, View, StyleSheet, TextInput, TouchableOpacity, ScrollView} from "react-native";
import {AddOneMoreAccount} from "./AddOneMoreAccount";
import Store from "../context/Store";
import {Icons} from "../Icons";


export const CreateWebsiteModal = (props) => {
    const storeCtx = useContext(Store)
    const inputRef = useRef()
    const [website, setwebsite] = useState({
        expanded: false,
        id: Math.floor(Math.random()*10000),
        name: "",
        completed: false,
    })
    const [newAccounts, setNewAccounts] = useState([])

    const [isFormValid, setIsFormValid] = useState(false)


    const closeModalHandler = () => {
        setNewAccounts([])
        console.log("Clearing incoming accounts")
        props.setShowModal(false)
    }

    useEffect(() => {
        const timeHandler = setTimeout(() => {
            setIsFormValid(newAccounts.length > 0)
        }, 0)
        return () => {
            clearTimeout(timeHandler);
        };
    }, [newAccounts])


    const onWebsiteChangeHandler = (websiteName) => {
        setwebsite((prevState) => {
            return {...prevState, name: websiteName, completed: false}
        })
    }
    const onWebsiteBlurHandler = () => {
        setwebsite((prevState) => {
            return {...prevState, completed: true}
        })
    }

    const onAddAccountHandler = async () => {


        const editedAccounts = newAccounts.map((acc) => {
            let hiddenPassword = "";
            if(acc.password)
                for(let i=0; i<acc.password.length; i++){
                    hiddenPassword = hiddenPassword.concat("*")
                }
            acc.invisiblePassword = hiddenPassword
            acc.webId = website.id
            return acc
        })
        console.log("Accounts to store: ", editedAccounts)

        storeCtx.setStoredWebsites((prevState) => {
            return [...prevState, website]
        })

        storeCtx.setStoredAccounts((prevState) => {
            return [...prevState, ...editedAccounts]
        })

        props.setShowModal(false)

    }
    const [showOneMoreAccountForm, setShowOneMoreAccountForm] = useState({
        quantity: [],
        status: false,
    })
    const showOneMoreAccountFormHandler = () => {
        setShowOneMoreAccountForm((prevState) => {
            return {quantity: [...prevState.quantity, {id: Math.floor(Math.random()*10000)}], status: true}
        })
    }
    useEffect(() => {
        setShowOneMoreAccountForm((prevState) => {
            return {quantity: [...prevState.quantity, {id: Math.floor(Math.random()*10000)}], status: true}
        })
    }, [])



    return (
        <View style={styles.modal} >
            <Modal
                animationType="slide"
                transparent={true}
                visible={props.showModal}
                // onRequestClose={() => {
                //     Alert.alert("Modal has been closed.");
                //     setModalVisible(!modalVisible);
                // }}
                onRequestClose={() => props.setShowModal(false)}
            >
                <View style={styles.contentContainer}>
                    <ScrollView style={styles.modalContentContainer}>

                        <View style={styles.modalCloseBtnContainer}>

                            <TouchableOpacity
                                onPress={closeModalHandler}
                                style={styles.closeBtn}
                            >
                                <Icons.MaterialIcon name={"close"} size={50} color={"#ff5032"} style={styles.closeIcon} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.formContainer}>
                            <View style={styles.textInputContainer}>
                                <TextInput
                                    onChangeText={onWebsiteChangeHandler}
                                    onBlur={onWebsiteBlurHandler}
                                    // onFocus={styleRootPasswordConfirmOnFocus}
                                    // onBlur={validateRootPasswordConfirm}
                                    // style={[styles.rootPasswordTextInput, !rootPassword.isMatch && changeRootPasswordConfirmStyle && styles.textInputInValid]}
                                    style={styles.textInput}
                                    placeholderTextColor={"#ffeee7"}
                                    selectionColor={"#32324E"}
                                    placeholder="Website name: "
                                    ref={inputRef}
                                    onLayout={() => inputRef.current.focus()}
                                />
                            </View>


                            {
                                showOneMoreAccountForm.status && showOneMoreAccountForm.quantity.map((item) => {
                                    return (
                                        <AddOneMoreAccount
                                            key={item.id}
                                            setNewAccounts={setNewAccounts}
                                            newAccounts={newAccounts}
                                            showOneMoreAccountForm={showOneMoreAccountForm}
                                            setShowOneMoreAccountForm={setShowOneMoreAccountForm}
                                            id={item.id}
                                            item={item}
                                            mode={"create"}
                                        />
                                    )
                                })
                            }
                            <View style={styles.submissionArea}>
                                <TouchableOpacity style={styles.addMoreAccountBtn} onPress={showOneMoreAccountFormHandler}>
                                    <Text style={styles.addMoreAccountBtnText}>
                                        + Add one more account
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.setBtn, !isFormValid && styles.addBtnDisabled]}
                                    onPress={onAddAccountHandler}
                                    disabled={!isFormValid}
                                >
                                    <Text
                                        style={[styles.setBtnText, !isFormValid && styles.addBtnTextDisabled]}
                                    >
                                        Save
                                    </Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </ScrollView>

                </View>


            </Modal>
        </View>
    );
}


const styles = StyleSheet.create({

    contentContainer: {
       height: "100%",
    },
    modalContentContainer: {
        backgroundColor: "#ffeee7",
        height: "100%",
    },
    modalCloseBtnContainer: {
        flexDirection: "row",
        alignSelf: "flex-end",
    },
    closeBtn: {
        borderRadius: 50,
        borderWidth: 2,
        borderColor: "#ff5032",
        margin: "2.5%",

    },
    closeIcon: {
        alignSelf: "center",
    },
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
    submissionArea: {
        width: "100%",
        marginTop: "10%",
    },
    addMoreAccountBtn: {
        alignSelf: "center",
        padding: 15,
        backgroundColor: "#ffeee7",
        borderRadius: 15,
        width: "100%",
    },
    addMoreAccountBtnText: {
        fontWeight: "bold",
        fontSize: 17.5,
        color: "#ff5032",
        textAlign: "center"
    },
    setBtn: {
        backgroundColor: "#ff5032",
        padding: 15,
        alignSelf: "center",
        borderRadius: 15,
        width: "100%",
    },
    setBtnText: {
        fontWeight: "bold",
        fontSize: 17.5,
        color: "white",
        alignSelf: "center",
    },
    visibilityIcon: {
        flex: 1,
        padding: "3%",
    },
    addBtnDisabled: {
        backgroundColor: "#ccc",
        borderColor: "#ccc",
        cursor: "not-allowed"
    },
    addBtnTextDisabled: {
        color: "#666666",
    }
});