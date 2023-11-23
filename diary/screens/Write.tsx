import styled from "styled-components/native";
import {COLORS} from "../colors";
import {useContext, useEffect, useState} from "react";
import {Alert} from "react-native";
import {DBContext} from "../context";

const View = styled.View`
    flex: 1;
    background-color: ${COLORS.BGColor};
    padding: 0px 30px;
`;

const Title = styled.Text`
    color: ${COLORS.textColor};
    margin: 50px 0px;
    text-align: center;
    font-size: 28px;
    font-weight: bold;
`;

const TextInput = styled.TextInput`
    background-color: white;
    border-radius: 20px;
    padding: 10px 20px;
    font-size: 18px;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
`;

const Button = styled.TouchableOpacity`
    width: 100%;
    margin-top: 30px;
    background-color: ${COLORS.buttonColor};
    padding: 10px 20px;
    align-items: center;
    border-radius: 20px;
`;

const ButtonText = styled.Text`
    color: white;
    font-size: 18px;
    font-weight: bold;
`;

const EmotionContainer = styled.View`
    flex-direction: row;
    margin-bottom: 20px;
    justify-content: space-between;
`;

const Emotion = styled.TouchableOpacity`
    background-color: white;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
    padding: 10px;
    border-radius: 10px;
`;

const EmotionText = styled.Text`
    font-size: 20px;
`;

const emotioons = ["😎", "😭", "😂", "🤤", "🥰", "🤬", "😱"];

export default function Write() {
    const realm = useContext(DBContext);

    const [feeling, setFeeling] = useState("");
    const [selectedEmotion, setEmotion] = useState("");

    useEffect(() => {
        console.log("realm", realm);
    }, []);

    function onChangeText(text: string) {
        setFeeling(text);
    }

    function onEmotionPress(emotion: string) {
        setEmotion(emotion);
        setFeeling(prev => prev + emotion);
    }

    function onSubmit() {
        if (feeling === "") {
            return Alert.alert("Please write down what your feel");
        }
    }

    return (
        <View>
            <Title>How do you fell today!?</Title>
            <EmotionContainer>
                {emotioons.map((emotion, index) => (
                    <Emotion
                        key={index}
                        onPress={() => onEmotionPress(emotion)}>
                        <EmotionText>{emotion}</EmotionText>
                    </Emotion>
                ))}
            </EmotionContainer>

            <TextInput
                onSubmitEditing={onSubmit}
                value={feeling}
                onChangeText={onChangeText}
                placeholder="Write down your feelings..."
            />

            <Button onPress={onSubmit}>
                <ButtonText>Save</ButtonText>
            </Button>
        </View>
    );
}
