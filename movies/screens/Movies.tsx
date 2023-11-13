import react, { useState } from "react";
import Swiper from "react-native-web-swiper";
import styled from "styled-components/native";
import { ActivityIndicator, Dimensions, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuery } from "react-query";
import { createImagePath, getNowPlayingMovieList } from "../api";
import { BlurView } from "expo-blur";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const ScrollContainer = styled.ScrollView`
    background-color: ${(props) => props.theme.mainBackgroundColor};
`;

const View = styled.View`
    flex: 1;
`;

const Loading = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    /* background-color: ${(props) => props.theme.mainBackgroundColor}; */
`;

const Image = styled.Image`
    width: 100%;
    height: 100%;
    position: absolute;
`;

const Title = styled.Text`
    color: ${(props) => props.theme.textColor};
`;

type MoviesProps = NativeStackScreenProps<any, "Movies">;

export default function Movies({ navigation }: MoviesProps) {
    const { isLoading, data } = useQuery(["nowPlaying"], () =>
        getNowPlayingMovieList(1)
    );

    // console.log(createImagePath(data?.results[0].backdrop_path, 500));
    // console.log(data);

    return isLoading ? (
        <Loading>
            <ActivityIndicator />
        </Loading>
    ) : (
        <ScrollContainer>
            <Swiper
                loop
                timeout={5}
                controlsEnabled={false}
                containerStyle={{
                    width: "100%",
                    height: SCREEN_HEIGHT * 0.25,
                }}
            >
                {data?.results.map((movie: any) => (
                    <View key={movie.id}>
                        <Image
                            source={{
                                uri: createImagePath(movie.backdrop_path, 500),
                            }}
                            blurRadius={1.2}
                        />
                        <BlurView style={StyleSheet.absoluteFill}>
                            <Title>{movie.original_title}</Title>
                        </BlurView>
                    </View>
                ))}
            </Swiper>
        </ScrollContainer>
    );
}
