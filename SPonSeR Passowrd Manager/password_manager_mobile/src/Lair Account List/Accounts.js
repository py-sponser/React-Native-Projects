import React, {useContext, useState} from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import Store from "../context/Store";
import {CreateWebsiteModal} from "./CreateWebsiteModal";
import {AccountsListing} from "./AccountsListing";
import {EditWebsiteModal} from "./EditWebsiteModal";
import {Icons} from "../Icons";




export const Accounts = () => {
    const storeCtx = useContext(Store)
    const [showModal, setShowModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState({
        websiteToEdit: null,
        status: false,
    })



    const showModalHandler = () => {
        setShowModal(true)
    }



    return (
        <View style={styles.container}>
            {showModal && <CreateWebsiteModal setShowModal={setShowModal} showModal={showModal} />}
            {showEditModal.status && <EditWebsiteModal
                showEditModal={showEditModal}
                setShowEditModal={setShowEditModal}
                storedAccounts={storeCtx.storedAccounts}
            />}

            <AccountsListing
                websites={storeCtx.filteredWebsites.filtered === true ? storeCtx.filteredWebsites.accounts : storeCtx.storedWebsites}
                setShowEditModal={setShowEditModal}
            />
                {/*<Text style={styles.header}>Lair Account List</Text>*/}
            {
                !showModal && (
                    <TouchableOpacity onPress={showModalHandler} style={styles.plusBtn}>
                        <Icons.MaterialCommunityIcons name="plus" size={20} color="white" style={styles.plusIcon} />
                    </TouchableOpacity>
                )
            }



        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: "#ffeee7",
    },
    header: {
        fontSize: 22,
    },
    plusBtn: {
        backgroundColor: '#ff5032',
        position: 'absolute',
        bottom: 15,
        right: 15,
        padding: "1%",
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    plusIcon: {
        fontSize: 50,
    },

})