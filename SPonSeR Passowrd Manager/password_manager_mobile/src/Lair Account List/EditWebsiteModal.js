import React, {useContext, useEffect, useRef, useState} from "react";
import {Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import Store from "../context/Store";
import {Icons} from "../Icons";
import {AddOneMoreAccount} from "./AddOneMoreAccount";


export const EditWebsiteModal = (props) => {
    const storeCtx = useContext(Store)
    const inputRef = useRef()
    const [webName, setWebName] = useState("")


    const [newAccounts, setNewAccounts] = useState([])
    const [newAccountsToCreate, setNewAccountsToCreate] = useState([])


    const [websiteAccounts, setWebsiteAccounts] = useState([])


    const closeModalHandler = () => {

        props.setShowEditModal((prevState) => {
            return {status: false, websiteToEdit: null}
        })
    }

    useEffect(() => {


        const filteredWebsiteAccounts = props.storedAccounts.filter((account) => {
            if(account.webId === props.showEditModal.websiteToEdit.id){
                account.showPassword = false
                console.log("Hello World")
                return account;
            }
        })
        setWebsiteAccounts((prevState) => {
            return [...filteredWebsiteAccounts]
        })
    }, [storeCtx.storedAccounts])




    const onWebNameChangeHandler = (websiteName) => {
        console.log("New Website Name: ", websiteName)
        setWebName(websiteName)
    }

    const onDeleteAccountHandler = (accId) => {
        setWebsiteAccounts((prevState) => {
            return prevState.filter((account) => {
                return account.id !== accId
            })
        })
        const newAccountsAfterDeletion = storeCtx.storedAccounts.filter((account) => {
            if(account.id !== accId){
                return account
            }
        })
        console.log("New Accounts after Deletion: ", newAccountsAfterDeletion)
        storeCtx.setStoredAccounts((prevState) => {
            return [...newAccountsAfterDeletion]
        })
    }

    const onNewWebsiteDataSaveHandler = async () => {
        // setting new edit of accounts of current websiteToEdit
        let newStoredAccounts;
        if(newAccounts.length > 0){
            console.log("Hello New Accounts", newAccounts)
            newStoredAccounts = storeCtx.storedAccounts.filter((account) => {
                for(let acc of newAccounts){
                    if(acc.id === account.id) {
                        acc.password = acc.password ? acc.password : account.password
                        acc.loginName = acc.loginName ? acc.loginName : account.loginName
                        let hiddenPassword = "";
                        for (let i = 0; i < acc.password.length; i++) {
                            hiddenPassword = hiddenPassword.concat("*")
                        }
                        account.invisiblePassword = hiddenPassword;
                        account.loginName = acc.loginName;
                        account.password = acc.password;
                        account.showPassword = false;
                        return account;
                    }

                }
                return account
            })
        }
        let editedAccounts;
        if(newAccountsToCreate.length > 0){
            editedAccounts = newAccountsToCreate.map((acc) => {
                let hiddenPassword = "";
                if(acc.password)
                    for(let i=0; i<acc.password.length; i++){
                        hiddenPassword = hiddenPassword.concat("*")
                    }
                acc.invisiblePassword = hiddenPassword
                acc.webId = props.showEditModal.websiteToEdit.id
                acc.showPassword = false;
                return acc
            })
            console.log("Edited Accounts: ", editedAccounts)
        }
        storeCtx.setStoredAccounts((prevState) => {
            if(newStoredAccounts && editedAccounts){
                return [...newStoredAccounts, ...editedAccounts]
            } else if(newStoredAccounts){
                return [...newStoredAccounts]
            } else if(editedAccounts){
                return [...prevState, ...editedAccounts]
            } else{
                return [...prevState]
            }
        })


        const newStoredWebsites = storeCtx.storedWebsites.filter((website) => {
            if(website.id === props.showEditModal.websiteToEdit.id){
                if(webName){
                    website.name = webName
                }
            }
            return website
        })
        console.log("New Stored Websites: ", newStoredWebsites)
        storeCtx.setStoredWebsites((prevState) => {
            return [...newStoredWebsites]
        })

        closeModalHandler()

    }


    const onChangeEditableLoginNameHandler = (accountId, editedLoginName) => {
        console.log("Account ID: ", accountId)
        console.log("Written Text: ", editedLoginName)

        if (newAccounts.length === 0) {
            setNewAccounts((prevState) => {
                return [...prevState, {id: accountId, loginName: editedLoginName}]
            })
        }
        for (let account of newAccounts) {
            if (account.id === accountId) {
                const filteredNewAccounts = newAccounts.map((account) => {
                    if (account.id === accountId) {
                        account.loginName = editedLoginName
                    }
                    console.log("Account LoginName is modifed: ", account)

                    return account;
                })
                console.log("Filtered Accounts after editing loginName: ", filteredNewAccounts)

                setNewAccounts(filteredNewAccounts)
            } else {

                setNewAccounts((prevState) => {
                    return [...prevState, {id: accountId, loginName: editedLoginName}]
                })
            }
        }
    }

    const onChangeEditablePasswordHandler = (accountId, editedPassword, oldPassword, invisiblePassword) => {
        console.log("Account ID: ", accountId)
        console.log("Written Text: ", editedPassword)
        let newPassword = "";
        if(editedPassword.includes(invisiblePassword)){
            editedPassword = editedPassword.substring(invisiblePassword.length);
            editedPassword = `${oldPassword}${editedPassword}`
            console.log("New Password: ", newPassword)
        }
        if(newAccounts.length === 0){
            setNewAccounts((prevState) => {
                return [...prevState, {id: accountId, password: editedPassword}]
            })
        }
        for(let account of newAccounts) {
            if(account.id === accountId) {
                const filteredNewAccounts = newAccounts.map((account) => {
                    if (account.id === accountId) {
                        account.password = editedPassword
                    }
                    console.log("Account Password is modifed: ", account)

                    return account;
                })
                console.log("Filtered Accounts after editing password: ", filteredNewAccounts)
                setNewAccounts(filteredNewAccounts)
            } else {
                setNewAccounts((prevState) => {
                    return [...prevState, {id: accountId, password: editedPassword}]
                })
            }
        }
    }
    const onShowPasswordHandler = (accountId) => {
        console.log("Accounts ID== ", accountId)


        const showPasswordEditedAccounts = websiteAccounts.map((account) => {
            console.log("Stored Account ID: ", account.id)
            if(account.id === accountId){
                account.showPassword = !account.showPassword
            }
            return account
        })
        console.log("Account After Showing Password: ", showPasswordEditedAccounts)
        setWebsiteAccounts(showPasswordEditedAccounts)
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
        console.log("New Accounts: ", newAccounts)
    }, [newAccounts])
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
                onRequestClose={() => closeModalHandler()}
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
                                    onChangeText={onWebNameChangeHandler}
                                    // onFocus={styleRootPasswordConfirmOnFocus}
                                    // onBlur={validateRootPasswordConfirm}
                                    // style={[styles.rootPasswordTextInput, !rootPassword.isMatch && changeRootPasswordConfirmStyle && styles.textInputInValid]}
                                    style={styles.textInput}
                                    placeholderTextColor={"#ffeee7"}
                                    selectionColor={"#32324E"}
                                    placeholder="Website name: "
                                    ref={inputRef}
                                    onLayout={() => inputRef.current.focus()}
                                    defaultValue={props.showEditModal.websiteToEdit.name}
                                />
                            </View>

                            {
                                websiteAccounts.map((account) => {
                                    return (
                                        <View key={account.loginName}>
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
                                                    style={styles.deleteAccountBtn}
                                                    onPress={() => onDeleteAccountHandler(account.id)}
                                                >
                                                    <Icons.MaterialIcon name={"close"} size={50} color={"#ff5032"} />
                                                </TouchableOpacity>
                                            </View>
                                            <View style={styles.textInputContainer}>
                                                <TextInput
                                                    onChangeText={(text) => onChangeEditableLoginNameHandler(account.id, text)}
                                                    style={styles.textInput}
                                                    placeholderTextColor={"#ffeee7"}
                                                    selectionColor={"#32324E"}
                                                    placeholder="Login name: "
                                                    defaultValue={account.loginName}
                                                />
                                            </View>
                                            <View style={styles.textInputContainer}>
                                                <TextInput
                                                    onChangeText={(text) => onChangeEditablePasswordHandler(account.id, text, account.password, account.invisiblePassword)}
                                                    style={styles.textInput}
                                                    placeholderTextColor={"#ffeee7"}
                                                    selectionColor={"#32324E"}
                                                    placeholder="Password: "
                                                    secureTextEntry={!account.showPassword}
                                                    defaultValue={account.showPassword ? account.password : account.invisiblePassword}
                                                />
                                                <TouchableOpacity onPress={() => onShowPasswordHandler(account.id)}>
                                                    {!account.showPassword && <Icons.MaterialIcon name={"visibility"} size={30} color={"white"} style={styles.visibilityIcon} />}
                                                    {account.showPassword && <Icons.MaterialIcon name={"visibility-off"} size={30} color={"white"} style={styles.visibilityIcon} />}
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    )
                                })
                            }
                            {
                                showOneMoreAccountForm.status && showOneMoreAccountForm.quantity.map((item) => {
                                    return (
                                        <AddOneMoreAccount
                                            key={item.id}
                                            setNewAccounts={setNewAccountsToCreate}
                                            newAccounts={newAccountsToCreate}
                                            showOneMoreAccountForm={showOneMoreAccountForm}
                                            setShowOneMoreAccountForm={setShowOneMoreAccountForm}
                                            id={item.id}
                                            item={item}
                                            mode={"edit"}
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
                                    style={styles.setBtn}
                                    onPress={onNewWebsiteDataSaveHandler}

                                >
                                    <Text
                                        style={styles.setBtnText}
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
    deleteAccountBtn: {
        alignSelf: "flex-end",
        marginRight: "1%",
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