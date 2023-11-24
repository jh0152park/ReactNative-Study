import styled from "styled-components/native";
import Icon from "react-native-vector-icons/Ionicons";
import {COLORS} from "../colors";
import {DBContext} from "../context";
import {useContext, useEffect, useState} from "react";
import {FlatList} from "react-native";

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

const Record = styled.View`
    background-color: ${COLORS.cardColor};
    padding: 10px 20px;
    border-radius: 10px;
    flex-direction: row;
    align-items: center;
`;

const Message = styled.Text`
    font-size: 18px;
`;

const Separator = styled.View`
    height: 10px;
`;
export default function Home({navigation: {navigate}}: any) {
    const realm = useContext<any>(DBContext);
    const [feelings, setFeelings] = useState();

    useEffect(() => {
        const feel = realm.objects("Feeling");
        setFeelings(feel);
        feel.addListener(() => {
            console.log("new feeling change");
        });

        return () => {
            feel.removeAllListener();
        };
    }, []);

    return (
        <View>
            <Title>My Diary</Title>

            <FlatList
                data={feelings}
                keyExtractor={feeling => feeling._id + ""}
                ItemSeparatorComponent={Separator}
                contentContainerStyle={{paddingVertical: 10}}
                renderItem={({item}) => (
                    <Record>
                        <Message>{item.message}</Message>
                    </Record>
                )}
            />

            <Button onPress={() => navigate("Write")}>
                <Icon name="add" size={30} color={"white"} />
            </Button>
        </View>
    );
}
