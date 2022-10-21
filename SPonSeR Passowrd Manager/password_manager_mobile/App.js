import "react-native-gesture-handler";
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {SetRootPassword} from "./src/SetRootPassword";
import {AppState} from "react-native";
import {UnlockApp} from "./src/UnlockApp";
import Store from "./src/context/Store";
import {SplashScreen} from "./src/SplashScreen";
import {createStackNavigator} from "@react-navigation/stack";
import {BottomTabs} from "./src/Navigation/BottomTabs";
import {RootPasswordChange} from "./src/Settings/RootPasswordChange";
import {SecurityQuestions} from "./src/Settings/SecurityQuestions";

const Stack = createStackNavigator()

const App = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [storedWebsites, setStoredWebsites] = useState([])
    const [storedAccounts, setStoredAccounts] = useState([])
    const [showRootPasswordCreationForm, setShowRootCreationPasswordForm] = useState(false)
    const [lockApp, setLockApp] = useState(false)
    const appState = useRef(AppState.currentState)
    const [appStateVisible, setAppStateVisible] = useState(appState.current)
    const [filteredWebsites, setFilteredWebsites] = useState({
        filtered: false,
        accounts: [],
    })
    const checkRootPassword = useCallback(async () => {
        const rootPassword = await AsyncStorage.getItem("root_password")
        console.log("Root Password: ", rootPassword)
        !rootPassword && setShowRootCreationPasswordForm(true);
        rootPassword && setLockApp(true)
    }, [])

    useEffect(() => {
        checkRootPassword();
    }, [])

    useEffect(() => {
        console.log(appStateVisible)
        const subscription = AppState.addEventListener("change", async (nextAppState) => {
            if (
                appState.current.match(/background|inactive/) &&
                nextAppState === "active"
            ) {

                setTimeout(() => {
                    setLockApp(true)
                    console.log("App is locked")
                }, 60000)
            }

            appState.current = nextAppState;
            setAppStateVisible(appState.current);
            console.log("AppState", appState.current);
        });

        return () => {
            subscription.remove();
        };
    }, [])


    const checkStoredAccounts = useCallback(async () => {
        const websites = await AsyncStorage.getItem("websites");
        const accounts = await AsyncStorage.getItem("accounts");
        let restoredWebsitesArray = JSON.parse(websites)
        let restoredAccountsArray = JSON.parse(accounts)
        if(restoredWebsitesArray === null){
            restoredWebsitesArray = []
        }
        if(restoredAccountsArray === null){
            restoredAccountsArray = []
        }
        console.log("Restored Websites Array: ", restoredWebsitesArray)
        console.log("Restored Accounts Array: ", restoredAccountsArray)
        setStoredWebsites(restoredWebsitesArray)
        setStoredAccounts(restoredAccountsArray)
    }, [])


    useEffect(() => {
        checkStoredAccounts()
    }, [])


    useEffect(() => {
        setIsLoading(true)
        const logoTimout = setTimeout(() => {
            setIsLoading(false)
        }, 2000)

        return () => {
            clearTimeout(logoTimout)
        }
    }, [])

    const refreshAsyncStorage = async () => {
        const websites = JSON.stringify(storedWebsites)
        const accounts = JSON.stringify(storedAccounts)
        await AsyncStorage.setItem("websites", websites)
        await AsyncStorage.setItem("accounts", accounts)

    }

    useEffect(() => {
        refreshAsyncStorage()
    }, [storedWebsites, storedAccounts])

    return (
      <Store.Provider value={{
          lockApp: lockApp,
          setLockApp: setLockApp,
          storedWebsites: storedWebsites,
          setStoredWebsites: setStoredWebsites,
          storedAccounts: storedAccounts,
          setStoredAccounts: setStoredAccounts,
          filteredWebsites: filteredWebsites,
          setFilteredWebsites: setFilteredWebsites,
      }}>
          {
              isLoading ? <SplashScreen /> : (
                  <>
                      {showRootPasswordCreationForm && <SetRootPassword setShowRootCreationPasswordForm={setShowRootCreationPasswordForm} />}
                      {lockApp && <UnlockApp setLockApp={setLockApp} />}
                          <NavigationContainer>
                              {/*<Drawer.Navigator initialRouteName="Lair Account List">*/}
                              {/*    <Drawer.Screen name="Lair Account List" component={Lair Account List} />*/}
                              {/*    <Drawer.Screen name="Generate Password" component={PasswordGenerator} />*/}
                              {/*</Drawer.Navigator>*/}
                              <Stack.Navigator>
                                  <Stack.Group>
                                      <Stack.Screen
                                          name={"BottomTabs"}
                                          component={BottomTabs}
                                          options={{
                                              headerShown: false,
                                          }}
                                      />
                                      <Stack.Screen
                                          name={"RootPasswordChange"}
                                          component={RootPasswordChange}
                                          options={{
                                              headerShown: true,
                                              headerTitle: "Root Password Change",
                                              headerMode: "float",
                                              headerStyle: {
                                                  backgroundColor: "#ff5032",
                                              },
                                              headerTintColor: "white",
                                          }}
                                      />
                                      <Stack.Screen
                                          name={"SecurityQuestionSetup"}
                                          component={SecurityQuestions}
                                          options={{
                                              headerShown: true,
                                              headerTitle: "Security Question Setup",
                                              headerMode: "float",
                                              headerStyle: {
                                                  backgroundColor: "#ff5032",
                                              },
                                              headerTintColor: "white",
                                          }}
                                      />

                                  </Stack.Group>
                              </Stack.Navigator>

                          </NavigationContainer>
                  </>
              )
          }

      </Store.Provider>

  );
};

export default App;

