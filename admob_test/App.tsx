import React, {useEffect, useState} from "react";
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
import {Button, Platform, UIManager} from "react-native";

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

const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ["fashion", "clothing"],
});

function App() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const unsubscribe = interstitial.addAdEventListener(
            AdEventType.LOADED,
            () => {
                setLoaded(true);
            },
        );

        // Start loading the interstitial straight away
        interstitial.load();

        // Unsubscribe from events on unmount
        return unsubscribe;
    }, []);

    if (!loaded) {
        return null;
    }

    return (
        <Container>
            <Header>TEST</Header>
            <Header>Hello World!</Header>
            <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.FULL_BANNER} />
            <Button
                title="Show Interstitial"
                onPress={() => {
                    interstitial.show();
                }}
            />
        </Container>
    );
}

export default App;
