import react from "react";
import Swiper from "react-native-web-swiper";
import styled from "styled-components/native";
import { Dimensions } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const ScrollContainer = styled.ScrollView`
    background-color: ${(props) => props.theme.mainBackgroundColor};
`;

const View = styled.View`
    flex: 1;
`;

export default function Movies({ navigation: { navigate } }: any) {
    return (
        <ScrollContainer>
            <Swiper
                loop
                timeout={5}
                controlsEnabled={false}
                containerStyle={{
                    width: "100%",
                    height: SCREEN_HEIGHT * 0.4,
                }}
            >
                <View style={{ backgroundColor: "pink" }} />
                <View style={{ backgroundColor: "skyblue" }} />
                <View style={{ backgroundColor: "teal" }} />
                <View style={{ backgroundColor: "blue" }} />
            </Swiper>
        </ScrollContainer>
    );
}
