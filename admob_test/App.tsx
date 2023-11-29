import React from "react";
import styled from "styled-components/native";
import {
    BannerAd,
    RewardedAd,
    InterstitialAd,
    TestIds,
    AdEventType,
    RewardedAdEventType,
    BannerAdSize,
} from "react-native-google-mobile-ads";
import {Platform, UIManager} from "react-native";

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const Header = styled.Text`
    font-weight: bold;
    font-size: 38px;
`;

// if (
//     Platform.OS === "android" &&
//     UIManager.setLayoutAnimationEnabledExperimental
// ) {
//     UIManager.setLayoutAnimationEnabledExperimental(true);
// }

function App(): JSX.Element {
    return (
        <Container>
            <Header>TEST</Header>
            <Header>Hello World!</Header>
            <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.FULL_BANNER} />
            <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.FULL_BANNER} />
        </Container>
    );
}

export default App;
