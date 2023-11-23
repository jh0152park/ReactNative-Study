import styled from "styled-components/native";
import Icon from "react-native-vector-icons/Ionicons";
import {COLORS} from "../colors";

const View = styled.View`
    flex: 1;
    background-color: ${COLORS.BGColor};
    padding-top: 100px;
    padding-left: 30px;
    padding-right: 30px;
`;

const Title = styled.Text`
    color: ${COLORS.textColor};
    font-size: 38px;
    margin-bottom: 100px;
`;

const Button = styled.TouchableOpacity`
    position: absolute;
    bottom: 50px;
    right: 20px;
    background-color: ${COLORS.buttonColor};
    width: 50px;
    height: 50px;
    border-radius: 25px;
    justify-content: center;
    align-items: center;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0, 3);
`;

export default function Home({navigation: {navigate}}: any) {
    return (
        <View>
            <Title>My Diary</Title>
            <Button onPress={() => navigate("Write")}>
                <Icon name="add" size={30} color={"white"} />
            </Button>
        </View>
    );
}
