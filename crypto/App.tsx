import React from "react";
import {GluestackUIProvider, Heading} from "@gluestack-ui/themed";
import {config} from "@gluestack-ui/config";
import {ToastProvider} from "@gluestack-ui/toast";
import {OverlayProvider} from "@gluestack-ui/overlay";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {Text, View} from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

function App(): JSX.Element {
    return (
        <GluestackUIProvider config={config}>
            <SafeAreaProvider>
                <ToastProvider>
                    <OverlayProvider>
                        <Container
                            style={{
                                flex: 1,
                                width: "100%",
                                justifyContent: "center",
                                alignContent: "center",
                            }}>
                            <Heading>TEST</Heading>
                            <Heading>YES DONE!</Heading>
                        </Container>
                    </OverlayProvider>
                </ToastProvider>
            </SafeAreaProvider>
        </GluestackUIProvider>
    );
}

export default App;
