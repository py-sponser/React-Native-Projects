import React, {useContext, useEffect, useState} from "react";
import {ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View} from "react-native";
import {Collapse, CollapseBody, CollapseHeader} from "accordion-collapse-react-native";
import {Icons} from "../Icons";
import Clipboard from "@react-native-clipboard/clipboard";
import Store from "../context/Store";
import AwesomeAlert from 'react-native-awesome-alerts';


export const AccountsListing = (props) => {
    const [showAlert, setShowAlert] = useState(false)
    const storeCtx = useContext(Store)
    const [websiteToDelete, setWebsiteToDelete] = useState({})


    const showEditModalHandler = (website) => {
        props.setShowEditModal((prevState) => {
            return {status: true, websiteToEdit: website}
        })
    }

    const onWebsiteDeleteClick = (website) => {
        setWebsiteToDelete({...website})
        setShowAlert(true)
    }
    const deleteWebsiteHandler = (websiteId) => {
        const newWebsites = storeCtx.storedWebsites.filter((website) => {
            return website.id !== websiteId;
        })
        const newAccountsAfterWebDeletion = storeCtx.storedAccounts.filter((account) => {
            return account.webId !== websiteId;
        })

        storeCtx.setStoredWebsites(newWebsites);
        storeCtx.setStoredAccounts(newAccountsAfterWebDeletion)
        setShowAlert(false)
        console.log("Website is deleted")
    }

    const onWebsiteToggle = async (websiteId) => {
        const filteredWebsites = storeCtx.storedWebsites.map((website) => {
            if(website.id === websiteId){
                website.expanded = !website.expanded;
            }
            return website
        })
        const currentWebsite = storeCtx.storedWebsites.find((website) => {
            if(website.id === websiteId){
                return website
            }
        })
        const filteredAccounts = storeCtx.storedAccounts.map((account) => {
            if((account.webId === websiteId) && currentWebsite.expanded === true){
                account.showPassword = false
            }
            return account
        })

        storeCtx.setStoredWebsites(filteredWebsites);
        storeCtx.setStoredAccounts(filteredAccounts);
    }

    const showPasswordHandler = async (accountId) => {
        const filteredAccounts = storeCtx.storedAccounts.map((account) => {
            if(account.id === accountId){
                account.showPassword = !account.showPassword;
            }
            return account;
        })

        storeCtx.setStoredAccounts(filteredAccounts);
    }

    const onLoginNameCopy = (loginName) => {
        Clipboard.setString(loginName)
        ToastAndroid.show("Copied to clipboard", ToastAndroid.SHORT)
    }

    const onPasswordCopy = (password) => {
        Clipboard.setString(password)
        ToastAndroid.show("Copied to clipboard", ToastAndroid.SHORT)
    }

    useEffect(() => {
        if(storeCtx.storedAccounts && storeCtx.storedWebsites){
            console.log("Websites to render: ", props.websites)
            storeCtx.setStoredWebsites((prevState) => {
                return prevState.map((website) => {
                    website.expanded = false;
                    return website
                })
            })
            storeCtx.setStoredAccounts((prevState) => {
                return prevState.map((account) => {
                    account.showPassword = false;
                    return account;
                })
            })
        }

    }, [])

    return (
        <>
            {
                props.websites.length > 0 ? (
                    <ScrollView>
                        {
                            props.websites.map((website) => {
                                return (
                                    <Collapse key={website.id} style={styles.account} onToggle={() => onWebsiteToggle(website.id)} isExpanded={website.expanded} accordion>
                                        <CollapseHeader style={styles.accordionHeaderContainer} >
                                            <View style={styles.headerLeftSide}>
                                                {website.expanded && <Icons.MaterialIcon name={"keyboard-arrow-up"} size={40} color={"#ff5032"} style={styles.arrowDownIcon} /> }
                                                {!website.expanded && <Icons.MaterialIcon name={"keyboard-arrow-down"} size={40} color={"#ff5032"} style={styles.arrowDownIcon} /> }

                                                <Text style={styles.accordionHeader}>{website.name}</Text>
                                            </View>
                                            <View style={styles.actionArea}>
                                                <TouchableOpacity style={styles.deleteIcon} onPress={() => showEditModalHandler(website)}>
                                                    <Icons.Feather name={"edit"} size={30} color={"#ff5032"}  />
                                                </TouchableOpacity>
                                                <TouchableOpacity style={styles.deleteIcon} onPress={() => onWebsiteDeleteClick(website)}>
                                                    <Icons.MaterialCommunityIcons name={"delete"} size={30} color={"#ff5032"}  />
                                                    <AwesomeAlert
                                                        show={showAlert}
                                                        showProgress={false}
                                                        message={`Are you sure you want to delete ${websiteToDelete.name}?`}
                                                        closeOnTouchOutside={true}
                                                        showCancelButton={true}
                                                        showConfirmButton={true}
                                                        cancelText={"Cancel"}
                                                        confirmText={"Delete"}
                                                        confirmButtonColor={"#ff5032"}
                                                        confirmButtonTextStyle={{
                                                            fontSize: 17.5,
                                                        }}
                                                        cancelButtonColor={"white"}
                                                        cancelButtonTextStyle={{
                                                            color: "#007bff",
                                                            fontSize: 17.5,
                                                        }}
                                                        messageStyle={{
                                                            fontSize: 22,
                                                            color: "#ff5032"
                                                        }}
                                                        contentStyle={{
                                                            padding: "5%",
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            width: "100%",
                                                        }}
                                                        actionContainerStyle={{
                                                            alignSelf: "flex-end",
                                                        }}
                                                        onCancelPressed={() => setShowAlert(false)}
                                                        onConfirmPressed={() => deleteWebsiteHandler(websiteToDelete.id) }
                                                    />
                                                </TouchableOpacity>
                                            </View>

                                        </CollapseHeader>
                                        <CollapseBody style={styles.accordionBody}>
                                            {
                                                storeCtx.storedAccounts.map((account) => {
                                                    if(account.webId === website.id){
                                                        return (
                                                            <View key={account.id} >
                                                                <Text style={styles.loginNameTitle}>Login: </Text>
                                                                <View style={styles.loginNameContainer}>
                                                                    <Text
                                                                        style={styles.accountLoginName}
                                                                        onLongPress={() => onLoginNameCopy(account.loginName)}
                                                                    >
                                                                        {account.loginName}
                                                                    </Text>
                                                                    <TouchableOpacity
                                                                        style={styles.copyBtn}
                                                                        onPress={() => onLoginNameCopy(account.loginName)}
                                                                    >
                                                                        <Icons.MaterialIcon name="content-copy" size={30} color={"#ff5032"} />
                                                                    </TouchableOpacity>
                                                                </View>
                                                                <Text style={styles.passwordTitle}>Password: </Text>
                                                                <View style={styles.passwordTextContainer}>

                                                                    {
                                                                        !account.showPassword ? (
                                                                            <Text
                                                                                style={styles.accountPassword}
                                                                                onLongPress={() => onPasswordCopy(account.password)}
                                                                            >
                                                                                {account.invisiblePassword}
                                                                            </Text>
                                                                        ) : (
                                                                            <Text
                                                                                style={styles.accountPassword}
                                                                                onLongPress={() => onPasswordCopy(account.password)}

                                                                            >
                                                                                {account.password}
                                                                            </Text>
                                                                        )
                                                                    }
                                                                    <View style={styles.passwordIconsContainer}>
                                                                        <TouchableOpacity onPress={() => {
                                                                            showPasswordHandler(account.id)
                                                                        }}>
                                                                            {!account.showPassword && <Icons.MaterialIcon name={"visibility"} size={30} color={"#ff5032"} style={styles.visibilityIcon} />}
                                                                            {account.showPassword && <Icons.MaterialIcon name={"visibility-off"} size={30} color={"#ff5032"} style={styles.visibilityIcon} />}
                                                                        </TouchableOpacity>
                                                                        <TouchableOpacity
                                                                            onPress={() => onPasswordCopy(account.password)}
                                                                        >
                                                                            <Icons.MaterialIcon name="content-copy" size={30} color={"#ff5032"} />
                                                                        </TouchableOpacity>
                                                                    </View>
                                                                </View>
                                                            </View>

                                                        )
                                                    }
                                                })
                                            }
                                        </CollapseBody>


                                    </Collapse>
                                )
                            })
                        }
                    </ScrollView>
                ) : (
                    <View style={styles.noAccMsgContainer}>
                        <Text style={styles.noAccMsg}>No accounts added</Text>
                    </View>
                )
            }
        </>
    )
}

const styles = StyleSheet.create({
    account: {
        padding: "3%",
        borderWidth: 2,
        borderColor: "#ff5032",
        margin: "3%",
    },
    accordionHeaderContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    headerLeftSide: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flex: 12,
    },
    arrowDownIcon: {
    },
    accordionHeader: {
        color: "#ff5032",
        fontWeight: "bold",
        fontSize: 25,
        alignSelf: "center",
    },
    actionArea:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",

        flex: 4,
    },
    editICon: {
        alignSelf: "center",
    },
    deleteIcon: {
        alignSelf: "center",
    },
    accordionBody: {
        flexDirection: "column",
        padding: "2%",
    },
    loginNameTitle: {
        fontWeight: "bold",
        color: "black",
        fontSize: 15,

    },
    accountLoginName: {
        color: "#ff5032",
        fontSize: 20,
        margin: "2%",
    },
    loginNameContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    copyBtn: {
        alignSelf: "center",
    },
    passwordTitle: {
        fontWeight: "bold",
        color: "black",
        fontSize: 15,
    },
    passwordTextContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    accountPassword: {
        color: "#ff5032",
        fontSize: 20,
        margin: "2%",
        flex: 7,
    },
    passwordIconsContainer:{
        flexDirection: "row",
        justifyContent: "space-between",
        flex: 2,
    },

    noAccMsgContainer: {
        justifyContent: "center",
        alignItems: "center",
        height: "100%"
    },
    noAccMsg:{
        color: "#ff5032",
        fontWeight: "bold",
        fontSize: 25,

    },
})