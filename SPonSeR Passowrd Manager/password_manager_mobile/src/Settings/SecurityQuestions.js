import React, {useEffect, useState} from "react";
import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Picker} from "@react-native-picker/picker";

export const SecurityQuestions = ({navigation}) => {
    const securityQuestionsList = [
        "In what city were you born?",
        "What is the name of your favorite pet?",
        "What is your mother's maiden name?",
        "What high school did you attend?",
        "What was the name of your elementary school?",
        "What was the make of your first car?",
        "What was your favorite food as a child?",
        "Where did you meet your spouse?",
        "What year was your father (or mother) born?",
        "Select Question"
    ]
    const [securityQuestion, setSecurityQuestion] = useState(securityQuestionsList)

    const [firstSelectedQuestion, setFirstSelectedQuestion] = useState({
        question: "Select Question",
        answer: "",
    });
    const [secondSelectedQuestion, setSecondSelectedQuestion] = useState({
        question: "Select Question",
        answer: "",
    });
    const [thirdSelectedQuestion, setThirdSelectedQuestion] = useState({
        question: "Select Question",
        answer: "",
    });



    const [isFormValid, setIsFormValid] = useState(false)

    // Question Picker Selection Handling
    const onFirstQuestionPick = (question) => {
        console.log("First Question: ", question)
        setFirstSelectedQuestion((prevState) => {
            return {...prevState, question: question}
        });
    }
    const onSecondQuestionPick = (question) => {
        console.log("Second Question: ", question)
        setSecondSelectedQuestion((prevState) => {
            return {...prevState, question: question}
        });
    }
    const onThirdQuestionPick = (question) => {
        console.log("Third Question: ", question)
        setThirdSelectedQuestion((prevState) => {
            return {...prevState, question: question}
        });
    }


    // Answer Text Inputs Handling
    const onFirstQuestionAnswerChange = (firstAnswer) => {
        setFirstSelectedQuestion((prevState) => {
            return {...prevState, answer: firstAnswer}
        })
        console.log("First Answer: ", firstAnswer)
    }

    const onSecondQuestionAnswerChange = (secondAnswer) => {
        setSecondSelectedQuestion((prevState) => {
            return {...prevState, answer: secondAnswer}
        })
        console.log("Second Answer: ", secondAnswer)

    }
    const onThirdQuestionAnswerChange = (thirdAnswer) => {
        setThirdSelectedQuestion((prevState) => {
            return {...prevState, answer: thirdAnswer}
        })
        console.log("Third Answer: ", thirdAnswer)

    }

    // Submitting Button Handling
    const onSecurityQuestionSubmit = async () => {
        const securitySecretQuestions = [
            firstSelectedQuestion,
            secondSelectedQuestion,
            thirdSelectedQuestion,
        ]
        await AsyncStorage.setItem("securitySecretQuestions", JSON.stringify(securitySecretQuestions))
        navigation.navigate("Accounts")
    }


    useEffect(() => {
        setIsFormValid(
            firstSelectedQuestion.question && firstSelectedQuestion.answer &&
            secondSelectedQuestion.question && secondSelectedQuestion.answer &&
            thirdSelectedQuestion.question && thirdSelectedQuestion.answer
        )
    }, [firstSelectedQuestion, secondSelectedQuestion, thirdSelectedQuestion]) // timout is 0
    return (
        <ScrollView style={styles.container}>
            <View style={styles.formContainer}>

                <View style={styles.textInputContainer}>
                    <View style={styles.pickerArea}>
                        <Picker
                            selectedValue={firstSelectedQuestion.question}
                            mode={"dropdown"}
                            onValueChange={(itemValue, itemIndex) => {
                                onFirstQuestionPick(itemValue)
                            }}
                            style={styles.picker}
                            dropdownIconColor={"white"}
                        >
                            {
                                securityQuestion.map((ques) => {
                                    return (
                                        <Picker.Item key={ques} label={ques} value={ques} />
                                    )
                                })
                            }
                        </Picker>
                    </View>
                    <View
                        style={{
                            height: 20,
                        }}
                    ></View>
                    <TextInput
                        onChangeText={onFirstQuestionAnswerChange}
                        style={styles.rootPasswordTextInput}
                        placeholderTextColor={"#ffeee7"}
                        selectionColor={"#32324E"}
                        placeholder="Type first question answer"
                    />
                </View>
                <View style={styles.textInputContainer}>
                    <View style={styles.pickerArea}>
                        <Picker
                            selectedValue={secondSelectedQuestion.question}
                            mode={"dropdown"}
                            onValueChange={(itemValue, itemIndex) => {
                                onSecondQuestionPick(itemValue)
                            }}
                            style={styles.picker}
                            dropdownIconColor={"white"}
                        >
                            {
                                securityQuestionsList.map((ques) => {
                                    return (
                                        <Picker.Item key={ques} label={ques} value={ques} />
                                    )
                                })
                            }
                        </Picker>
                    </View>
                    <View
                        style={{
                            height: 20,
                        }}
                    ></View>
                    <TextInput
                        onChangeText={onSecondQuestionAnswerChange}
                        style={styles.rootPasswordTextInput}
                        placeholderTextColor={"#ffeee7"}
                        selectionColor={"#32324E"}
                        placeholder="Type first question answer"
                    />
                </View>
                <View style={styles.textInputContainer}>
                    <View style={styles.pickerArea}>
                        <Picker
                            selectedValue={thirdSelectedQuestion.question}
                            mode={"dropdown"}
                            onValueChange={(itemValue, itemIndex) => {
                                onThirdQuestionPick(itemValue)
                            }}
                            style={styles.picker}
                            dropdownIconColor={"white"}
                        >
                            {
                                securityQuestionsList.map((ques) => {
                                    return (
                                        <Picker.Item key={ques} label={ques} value={ques} />
                                    )
                                })
                            }
                        </Picker>
                    </View>
                    <View
                        style={{
                            height: 20,
                        }}
                    ></View>
                    <TextInput
                        onChangeText={onThirdQuestionAnswerChange}
                        style={styles.rootPasswordTextInput}
                        placeholderTextColor={"#ffeee7"}
                        selectionColor={"#32324E"}
                        placeholder="Type first question answer"
                    />
                </View>
                <View>
                    <TouchableOpacity
                        style={[styles.setBtn, !isFormValid && styles.applyBtnDisabled]}
                        onPress={onSecurityQuestionSubmit}
                        disabled={!isFormValid}
                    >
                        <Text
                            style={[styles.setBtnText, !isFormValid && styles.applyBtnTextDisabled]}
                        >Set</Text>
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

    textInputContainer: {
        flexDirection: 'column',
        backgroundColor: '#ff5032',
        margin: "5%",
        borderRadius: 10,
        padding: "5%",
    },
    pickerArea: {
        borderWidth: 3,
        borderColor: "white",
        borderRadius: 10,
        width: "100%",
    },
    picker: {
        color: "white",
        backgroundColor: "#ff5032",
    },
    rootPasswordTextInput: {
        fontSize: 16,
        padding: 15,
        borderRadius: 10,
        color: "white",
        borderWidth: 3,
        borderColor: "white",
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
        width: "40%",
    },
    applyBtnTextDisabled: {
        color: "#666666",
        textAlign: "center",
    },

})