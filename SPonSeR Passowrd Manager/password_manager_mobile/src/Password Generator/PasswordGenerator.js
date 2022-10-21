import React, { useEffect, useState} from "react";
import {Text, View, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import NumericInput from "react-native-numeric-input";
import Clipboard from "@react-native-clipboard/clipboard";
import {ToastAndroid} from "react-native";
import {Icons} from "../Icons";


const lowercaseLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
    'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
    't', 'u', 'v', 'w', 'x', 'y', 'z']
const uppercaseLetters = ['A', 'B', 'C',
    'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W',
    'X', 'Y', 'Z']

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

const symbols = ['!', "@",'#', '$', '%', "^", '&', '(', ')', '*', '+',"-",
    "_","+","/","|","?",">","<",";",":"]

export const PasswordGenerator = () => {
    const [password, setPassword] = useState("")

    const [includeLowerCaseLetters, setIncludeLowerCaseLetters] = useState({
        status: false,
        quantity: 0,
    })
    const [includeUpperCaseLetters, setIncludeUpperCaseLetters] = useState({
        status: false,
        quantity: 0,
    })
    const [includeNumbers, setIncludeNumbers] = useState({
        status: false,
        quantity: 0,
    })
    const [includeSymbols, setIncludeSymbols] = useState({
        status: false,
        quantity: 0,
    })



    const lowercaseLettersLengthHandler = (quantity) => {
        console.log(quantity)
        setIncludeLowerCaseLetters((prevState) => {
            return {...prevState, quantity: quantity}
        })
    }
    const uppercaseLettersLengthHandler = (quantity) => {
        console.log(quantity)

        setIncludeUpperCaseLetters((prevState) => {
            return {...prevState, quantity: quantity}
        })
    }
    const numbersLengthHandler = (quantity) => {
        console.log(quantity)

        setIncludeNumbers((prevState) => {
            return {...prevState, quantity: quantity}
        })
    }
    const symbolsLengthHandler = (quantity) => {
        console.log(quantity)

        setIncludeSymbols((prevState) => {
            return {...prevState, quantity: quantity}
        })
    }

    const onLowLetterCheck = () => {
        setIncludeLowerCaseLetters((prevState) => {
            return {...prevState, status: !prevState.status}
        })
    }
    const onUpperLetterCheck = () => {
        setIncludeUpperCaseLetters((prevState) => {
            return {...prevState, status: !prevState.status}
        })
    }
    const onNumbersCheck = () => {
        setIncludeNumbers((prevState) => {
            return {...prevState, status: !prevState.status}
        })
    }
    const onSymbolsCheck = () => {
        setIncludeSymbols((prevState) => {
            return {...prevState, status: !prevState.status}
        })
    }




    const generatePassword = (count) => {
        let password = "";
        if(!count){
            if(includeLowerCaseLetters.quantity > 0){
                console.log("lowercase quantity is 4")
                for(let i=0; i < includeLowerCaseLetters.quantity; i++){
                    password = password.concat(lowercaseLetters[Math.floor(Math.random()*lowercaseLetters.length)])
                }
            }
            if(includeUpperCaseLetters.quantity > 0){
                console.log("uppercase quantity is 4")

                for(let i=0; i < includeUpperCaseLetters.quantity; i++){
                    password = password.concat(uppercaseLetters[Math.floor(Math.random()*uppercaseLetters.length)])
                }
            }
            if(includeNumbers.quantity > 0){
                console.log("numbers quantity is 4")

                for(let i=0; i < includeNumbers.quantity; i++){
                    password = password.concat(numbers[Math.floor(Math.random()*numbers.length)])
                }
            }
            if(includeSymbols.quantity > 0){
                console.log("symbols quantity is 4")

                for(let i=0; i < includeSymbols.quantity; i++){
                    password = password.concat(symbols[Math.floor(Math.random()*symbols.length)])
                }
            }
        } else{
            for(let i=0; i < count; i++){
                password = password.concat(lowercaseLetters[Math.floor(Math.random()*lowercaseLetters.length)])
            }
            for(let i=0; i < count; i++){
                password = password.concat(uppercaseLetters[Math.floor(Math.random()*uppercaseLetters.length)])
            }
            for(let i=0; i < count; i++){
                password = password.concat(numbers[Math.floor(Math.random()*numbers.length)])
            }
            for(let i=0; i < count; i++){
                password = password.concat(symbols[Math.floor(Math.random()*symbols.length)])
            }
        }

        console.log(password)
        const shuffle = str => [...str].sort(()=>Math.random()-0.5).join('');
        password = shuffle(password);
        console.log(`Sampled Password: ${password}`)
        return password;
    }
    useEffect(() => {
        const newPassword = generatePassword(4);
        setPassword(newPassword);
    }, [])


    useEffect(() => {
        if(!includeLowerCaseLetters.status && !includeUpperCaseLetters.status && !includeNumbers.status && !includeSymbols.status){
            setIncludeLowerCaseLetters((prevState) => {
                return {...prevState, quantity:0}
            })
            setIncludeUpperCaseLetters((prevState) => {
                return {...prevState, quantity:0}
            })
            setIncludeNumbers((prevState) => {
                return {...prevState, quantity:0}
            })
            setIncludeSymbols((prevState) => {
                return {...prevState, quantity:0}
            })
        }
    }, [includeLowerCaseLetters.status, includeUpperCaseLetters.status, includeNumbers.status, includeSymbols.status])

    const contents = [
        {id: "1", title: "Include lowercase letters:", numInputFunc: lowercaseLettersLengthHandler, numInputVal: includeLowerCaseLetters.quantity, numInputStat: includeLowerCaseLetters.status, onCheck: onLowLetterCheck},
        {id: "2", title: "Include uppercase letters:", numInputFunc: uppercaseLettersLengthHandler, numInputVal: includeUpperCaseLetters.quantity, numInputStat: includeUpperCaseLetters.status, onCheck: onUpperLetterCheck},
        {id: "3", title: "Include numbers:                ", numInputFunc: numbersLengthHandler, numInputVal: includeNumbers.quantity, numInputStat: includeNumbers.status, onCheck: onNumbersCheck},
        {id: "4", title: "Include symbols:                ", numInputFunc: symbolsLengthHandler, numInputVal: includeSymbols.quantity, numInputStat: includeSymbols.status, onCheck: onSymbolsCheck},
    ]

    const onPasswordRefresh = () => {
        if(!includeLowerCaseLetters.status && !includeUpperCaseLetters.status && !includeNumbers.status && !includeSymbols.status){
            const password = generatePassword(4);
            setPassword(password)
        }
        if(includeLowerCaseLetters.status || includeUpperCaseLetters.status || includeNumbers.status || includeSymbols.status){
            const password = generatePassword();
            setPassword(password)
        }
    }
    const onPasswordCopy = (password) => {
        Clipboard.setString(password)
        ToastAndroid.show("Copied to clipboard", ToastAndroid.SHORT)

    }

    return (
        <ScrollView
            style={styles.rootContainer}
        >
                <View style={styles.passwordContainer}>
                    {
                        password && (
                            <View>

                                <Text style={styles.password} onLongPress={() => onPasswordCopy(password)}>{password}</Text>
                                <View style={styles.iconBtns}>
                                    <TouchableOpacity onPress={onPasswordRefresh}>
                                        <Icons.SimpleLineIcons name="refresh" size={30} color={"#ff5032"} />
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.copyBtn}
                                        onPress={() => onPasswordCopy(password)}
                                    >
                                        <Icons.MaterialIcon name="content-copy" size={30} color={"#ff5032"} />
                                    </TouchableOpacity>
                                </View>

                            </View>
                        )
                    }
                    {!password && (
                        <View>
                            <Text style={styles.noPassword}>No Password</Text>
                            <TouchableOpacity onPress={onPasswordRefresh} style={{alignSelf: "center", marginTop: "5%"}}>
                                <Icons.SimpleLineIcons name="refresh" size={30} color={"#ff5032"} />
                            </TouchableOpacity>
                        </View>
                    )}


                </View>
                <View style={styles.passwordPropsContainer}>

                    {
                        contents.slice().map((data) => {
                            return (
                                <View style={styles.passwordProp} key={data.id}>
                                    <Text style={styles.passwordPropTitle}>{data.title}</Text>
                                    {
                                        data.numInputStat && (
                                            <NumericInput
                                                value={data.numInputVal}
                                                type={"up-down"}
                                                onChange={data.numInputFunc}
                                                totalHeight={40}
                                                totalWidth={60}
                                                minValue={0}
                                                maxValue={10}
                                                step={1}
                                                inputStyle={{
                                                    color: "#ff5032",
                                                    backgroundColor: "white",
                                                }}
                                                upDownButtonsBackgroundColor="#ff5032"
                                                iconStyle={{
                                                    color: "white",
                                                }}
                                            />
                                        )
                                    }

                                    <BouncyCheckbox
                                        onPress={data.onCheck}
                                        size={20}
                                        fillColor={"#ff5032"}
                                        unfillColor={"#FFFFFF"}
                                        isChecked={data.numInputStat}
                                        iconStyle={{
                                            borderRadius: 0,
                                        }}
                                        textStyle={{
                                            textDecorationLine: "none",
                                        }}
                                    />
                                </View>
                            )
                        })
                    }
                </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#ffeee7",
    },
    passwordContainer: {
        // height: "50%",
        alignItems: "center",
        marginTop: "15%",
        marginBottom: "15%"
    },
    password: {
        color: "#ff5032",
        fontSize: 25,
        fontWeight: "bold",
        alignSelf: "center"
    },
    noPassword: {
        color: "#ff5032",
        fontSize: 25,
        fontWeight: "bold",
        alignSelf: "center",
    },
    iconBtns: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: "5%"
    },
    copyBtn: {
        marginLeft: "10%"
    },
    passwordLengthTextContainer:{
        flexDirection: "column",
        margin: "5%",
    },
    passwordLengthText: {
        alignSelf: "center",
        color: "#32324E",
        fontWeight: "bold",
        fontSize: 15,
    },
    passwordPropsContainer: {
        height: "50%",
    },
    passwordProp:{
        flexDirection: "row",
        justifyContent: "space-evenly",
        padding: 10,
    },
    passwordPropTitle: {
        alignSelf: "center",
        fontWeight: "bold",
        fontSize: 20,
        color: "black",
    },
})