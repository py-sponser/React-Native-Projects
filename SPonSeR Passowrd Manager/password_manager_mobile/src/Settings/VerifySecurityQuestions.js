import React, {useCallback, useEffect, useState} from "react";
import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Icons} from "../Icons";

export const VerifySecurityQuestions = (props) => {
    const [isVerified, setIsVerified] = useState(false)
    const [firstQuestion, setFirstQuestion] = useState({
        question: "",
        answer: "",
        isValid: false,
        rightAnswer: "",
    });
    const [secondQuestion, setSecondQuestion] = useState({
        question: "",
        answer: "",
        isValid: false,
        rightAnswer: "",
    });
    const [thirdQuestion, setThirdQuestion] = useState({
        question: "",
        answer: "",
        isValid: false,
        rightAnswer: "",
    });



    // Answer Text Inputs Handling
    const onFirstQuestionAnswerChange = (firstAnswer) => {

        setFirstQuestion((prevState) => {
            return {...prevState, answer: firstAnswer, isValid: firstQuestion.rightAnswer === firstAnswer}
        })
        console.log("First Answer: ", firstAnswer)
    }

    const onSecondQuestionAnswerChange = (secondAnswer) => {

        setSecondQuestion((prevState) => {
            return {...prevState, answer: secondAnswer, isValid: secondQuestion.rightAnswer === secondAnswer}
        })
        console.log("Second Answer: ", secondAnswer)

    }
    const onThirdQuestionAnswerChange = (thirdAnswer) => {

        setThirdQuestion((prevState) => {
            return {...prevState, answer: thirdAnswer, isValid: thirdQuestion.rightAnswer === thirdAnswer}
        })
        console.log("Third Answer: ", thirdAnswer)

    }



    const getStoredQuestions = useCallback(async () => {
        const secretQuestions = await AsyncStorage.getItem("securitySecretQuestions")
        const queriedQuestions = JSON.parse(secretQuestions)
        console.log("===============================")
        console.log(queriedQuestions)
        console.log("===============================")

        setFirstQuestion((prevState) => {
            return {...prevState, question: queriedQuestions[0].question, rightAnswer: queriedQuestions[0].answer}
        })
        setSecondQuestion((prevState) => {
            return {...prevState, question: queriedQuestions[1].question, rightAnswer: queriedQuestions[1].answer}
        })
        setThirdQuestion((prevState) => {
            return {...prevState, question: queriedQuestions[2].question, rightAnswer: queriedQuestions[2].answer}
        })
        console.log(queriedQuestions)

    }, [])

    useEffect(() => {
        getStoredQuestions()
    }, [])


    useEffect(() => {
        setIsVerified(firstQuestion.isValid && secondQuestion.isValid && thirdQuestion.isValid)
        console.log(firstQuestion.isValid, secondQuestion.isValid, thirdQuestion.isValid)
    }, [firstQuestion.isValid, secondQuestion.isValid, thirdQuestion.isValid])


    const onResetPressHandler = () => {
        props.setSecretQuestionsVerified(true)
        props.setRootPasswordIsOk(false)
    }

    const onCancelPressHandler = () => {
        props.setSecretQuestionsVerified(true)
        props.setRootPasswordIsOk(true)
    }
    return (
        <ScrollView style={styles.container}>
            <View style={styles.formContainer}>
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.headerTitleText}>Verify Security Questions</Text>
                </View>

                <View style={styles.textInputContainer}>
                    <View style={styles.pickerArea}>
                        <Text style={styles.question}>{firstQuestion.question}</Text>
                    </View>
                    <View
                        style={{
                            height: 20,
                        }}
                    ></View>
                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>

                        <TextInput
                            onChangeText={onFirstQuestionAnswerChange}
                            style={styles.rootPasswordTextInput}
                            placeholderTextColor={"#ffeee7"}
                            selectionColor={"#32324E"}
                            placeholder="Type first question answer"
                        />
                        {
                            firstQuestion.isValid && (
                                <Icons.MaterialIcon
                                    name={"check-circle"}
                                    color={"gold"}
                                    size={30}
                                    style={styles.checkIcon}
                                />
                            )
                        }

                    </View>
                </View>
                <View style={styles.textInputContainer}>
                    <View style={styles.pickerArea}>
                        <Text style={styles.question}>{secondQuestion.question}</Text>
                    </View>
                    <View
                        style={{
                            height: 20,
                        }}
                    ></View>
                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                        <TextInput
                            onChangeText={onSecondQuestionAnswerChange}
                            style={styles.rootPasswordTextInput}
                            placeholderTextColor={"#ffeee7"}
                            selectionColor={"#32324E"}
                            placeholder="Type first question answer"
                        />
                        {
                            secondQuestion.isValid && (
                                <Icons.MaterialIcon
                                    name={"check-circle"}
                                    color={"gold"}
                                    size={30}
                                    style={styles.checkIcon}
                                />
                            )
                        }

                    </View>
                </View>
                <View style={styles.textInputContainer}>
                    <View style={styles.pickerArea}>
                        <Text style={styles.question}>{thirdQuestion.question}</Text>
                    </View>
                    <View
                        style={{
                            height: 20,
                        }}
                    ></View>
                    <View style={styles.textInputArea}>

                        <TextInput
                            onChangeText={onThirdQuestionAnswerChange}
                            style={styles.rootPasswordTextInput}
                            placeholderTextColor={"#ffeee7"}
                            selectionColor={"#32324E"}
                            placeholder="Type first question answer"
                        />
                        {
                            thirdQuestion.isValid && (
                                <Icons.MaterialIcon
                                    name={"check-circle"}
                                    color={"gold"}
                                    size={30}
                                    style={styles.checkIcon}
                                />
                            )
                        }

                    </View>
                </View>
                <View style={styles.actionBtnsContainer}>
                    <TouchableOpacity
                        style={styles.cancelBtn}
                        onPress={onCancelPressHandler}
                    >
                        <Text
                            style={styles.cancelBtnText}
                        >
                            Cancel
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.resetBtn, !isVerified && styles.applyBtnDisabled]}
                        onPress={onResetPressHandler}
                        autoFocus={true}
                        disabled={!isVerified}
                    >
                        <Text
                            style={[styles.resetBtnText, !isVerified && styles.applyBtnTextDisabled]}
                        >
                            Reset root password
                        </Text>
                    </TouchableOpacity>
                </View>



            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: "#ffeee7",
        display: "flex",
        flexDirection: "column",
    },
    formContainer: {
        display: "flex",
    },
    headerTitleContainer: {

    },
    headerTitleText: {
        textAlign: "center",
        color: "#ff5032",
        fontWeight: "bold",
        fontSize: 25,
        padding: "3%",
    },
    textInputContainer: {
        flexDirection: 'column',
        backgroundColor: '#ff5032',
        margin: "4%",
        borderRadius: 10,
        padding: "4%",
    },
    textInputArea: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    pickerArea: {
        width: "100%",
    },
    question: {
        color: "white",
        fontSize: 17,
        fontWeight: "bold",
    },
    rootPasswordTextInput: {
        fontSize: 16,
        padding: 15,
        borderRadius: 10,
        color: "white",
        borderWidth: 3,
        borderColor: "white",
        flex: 6,
    },
    checkIcon: {
        flex: 1,
        alignSelf: "center",
        textAlign: "center",
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

    applyBtnDisabled: {
        backgroundColor: "#ccc",
        borderColor: "#ccc",
        cursor: "not-allowed",
    },
    applyBtnTextDisabled: {
        color: "#666666",
        textAlign: "center",
    },
    resetBtn: {
        alignSelf: "center",
        borderWidth: 2,
        borderColor: "#ff5032",
        padding: 10,
        borderRadius: 15,
    },
    resetBtnText: {
        fontSize: 20,
        color: "#ff5032",
        textAlign: "center",
    },
    cancelBtn: {
        alignSelf: "center",
        backgroundColor: "brown",
        padding: 10,
        borderRadius: 15,
    },
    cancelBtnText: {
        fontSize: 20,
        color: "white",
        textAlign: "center",
    },
    actionBtnsContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
})