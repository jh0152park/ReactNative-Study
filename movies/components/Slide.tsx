import React from "react";
import { StyleSheet, View } from "react-native";
import styled from "styled-components/native";
import { createImagePath } from "../api";
import { BlurView } from "expo-blur";
import Poster from "./Poster";
import Vote from "./Vote";

const Image = styled.Image`
    width: 100%;
    height: 100%;
    position: absolute;
`;

const Title = styled.Text`
    color: ${(props) => props.theme.textColor};
    font-size: 16px;
    font-weight: 600;
`;

const Wrapper = styled.View`
    flex-direction: row;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

const Column = styled.View`
    width: 50%;
    margin-left: 15px;
`;

const Overview = styled.Text`
    color: rgba(255, 255, 255, 0.5);
    margin-top: 10px;
`;

interface IProps {
    backdrop_path: string;
    poster_path: string;
    original_title: string;
    vote_average: number;
    overview: string;
}

export default function Slide({
    backdrop_path,
    poster_path,
    original_title,
    vote_average,
    overview,
}: IProps) {
    return (
        <View style={{ flex: 1 }}>
            <Image
                source={{
                    uri: createImagePath(backdrop_path, 500),
                }}
                // blurRadius={1.1}
            />
            <BlurView style={StyleSheet.absoluteFill}>
                <Wrapper>
                    <Poster poster_path={poster_path} />
                    <Column>
                        <Title>{original_title}</Title>
                        <Vote vote_average={vote_average} />
                        <Overview>{overview.slice(0, 100) + "..."}</Overview>
                    </Column>
                </Wrapper>
            </BlurView>
        </View>
    );
}
