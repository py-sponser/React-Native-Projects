import React, {useContext} from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Accounts} from "../Lair Account List/Accounts";
import {PasswordGenerator} from "../Password Generator/PasswordGenerator";
import {AppSettings} from "../Settings/AppSettings";
import {SearchBar} from "../Lair Account List/SearchBar";
import Store from "../context/Store";
import {Icons} from "../Icons";

const Tab = createBottomTabNavigator();

export const BottomTabs = () => {

    const storeCtx = useContext(Store)
    return (
        <Tab.Navigator
            initialRouteName={"Accounts"}
            screenOptions={{
                headerShown: false,
                headerStyle: {
                    backgroundColor: "#ff5032",
                },
                headerTintColor: "white",
                headerTitleAlign: "left",
                tabBarStyle: {
                    backgroundColor: "#ff5032",
                    height: 60,

                },
                tabBarActiveTintColor: "brown",
                tabBarInactiveTintColor: "white",
                tabBarHideOnKeyboard: true,
                tabBarLabelStyle: {
                    fontSize: 14,
                },
                tabBarShowLabel: false,

            }}
        >
            <Tab.Screen
                name="Accounts"
                component={Accounts}
                options={{
                    tabBarIcon: ({focused}) => {
                        return <Icons.AntDesign name="contacts" size={25} color={focused ? "brown" : "white"} />
                    },
                    headerShown: true,
                    unmountOnBlur: true,
                    header: () => (
                        <SearchBar setWebsites={storeCtx.setFilteredWebsites} />
                    )

                }}
            />
            <Tab.Screen
                name="Password Generator"
                component={PasswordGenerator}
                options={{
                    tabBarIcon: ({focused}) => {
                        return <Icons.MaterialCommunityIcons name="key-plus" size={25} color={focused ? "brown" : "white"} />
                    },
                    unmountOnBlur: true,
                    headerShown: true,

                }}
            />
            <Tab.Screen
                name="Settings"
                component={AppSettings}
                options={{
                    tabBarIcon: ({focused}) => {
                        return <Icons.Feather name="settings" size={25} color={focused ? "brown" : "white"} />
                    },
                    unmountOnBlur: true,
                    headerShown: true,
                }}
            />
        </Tab.Navigator>
    )
}