import React, {useContext, useState} from "react";
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import Store from "../context/Store";
import {Icons} from "../Icons";

export const SearchBar = (props) => {
    const storeCtx = useContext(Store)
    const [showSearchBar, setShowSearchBar] = useState(false)
    const [textToSearch, setTextToSearch] = useState("")

    const showSearchBarHandler = () => {
        setShowSearchBar(true)
    }

    const vanishSearchBarHandler = () => {
        setTextToSearch("")
        props.setWebsites((prevState) => {
            return {filtered: false, accounts: []}
        })
        setShowSearchBar(false)
    }

    const clearSearchBarValue = () => {
        setTextToSearch("")
        props.setWebsites((prevState) => {
            return {filtered: false, accounts: []}
        })
    }

    const onSearchTextChange = (text) => {
        setTextToSearch(text)
        if(text.length > 0){
            const filteredWebsites = storeCtx.storedWebsites.filter((website) => {
                if(website.name.toLowerCase().includes(text)){
                    return website;
                }
            })
            console.log("Text: ", text)
            console.log("Filtered Accounts: ", filteredWebsites)

            props.setWebsites((prevState) => {
                return {filtered: true, accounts: filteredWebsites}
            })
        } else{
            props.setWebsites((prevState) => {
                return {filtered: false, accounts: []}
            })
        }

    }

    return (
        <View style={styles.searchSection}>


            {
                showSearchBar ? (
                    <>
                        <TouchableOpacity
                            onPress={vanishSearchBarHandler}
                        >
                            <Icons.MaterialIcon name={"keyboard-arrow-left"} size={40} color={"white"} style={styles.arrowDownIcon} />
                        </TouchableOpacity>
                        <TextInput
                            style={styles.input}
                            placeholder="Search"
                            placeholderTextColor={"white"}
                            underlineColorAndroid="transparent"
                            autoFocus={true}
                            onChangeText={onSearchTextChange}
                            value={textToSearch}
                        />
                        <TouchableOpacity
                            onPress={clearSearchBarValue}
                            style={styles.clearBtn}
                        >
                            <Icons.MaterialIcon name={"cleaning-services"} size={20} color={"white"} style={styles.clearIcon} />
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        <Text
                            style={styles.headerTitle}
                        >
                            Accounts
                        </Text>
                        <TouchableOpacity
                            style={styles.headerSearchBtn}
                            onPress={showSearchBarHandler}
                        >
                            <Icons.Octicons style={styles.searchIcon} name="search" size={30} color="white"/>
                        </TouchableOpacity>
                    </>

                )
            }


        </View>
    )
}

const styles = StyleSheet.create({

    searchSection: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ff5032',
        height: 55,
        justifyContent: "space-between",
    },
    headerTitle: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        padding: 15,
    },
    headerSearchBtn: {
        alignSelf: "center",
    },
    searchIcon: {
        padding: 10,
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        backgroundColor: '#ff5032',
        color: 'white',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: "white",
        fontSize: 20,
    },
    clearBtn: {
        padding: "2%",
    },
    clearIcon: {
        fontSize: 30,
    }
})