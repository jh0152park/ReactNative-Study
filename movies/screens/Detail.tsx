import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import styled from "styled-components/native";
import Poster from "../components/Poster";
import { Dimensions, StyleSheet, Linking } from "react-native";
import { createImagePath, getMovieVideoInfo, getTVVideoInfo } from "../api";
import { useQuery } from "react-query";
import Loader from "../components/Loader";
import { Ionicons } from "@expo/vector-icons";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Container = styled.ScrollView`
    background-color: ${(props) => props.theme.mainBackgroundColor};
`;

const Header = styled.View`
    height: ${SCREEN_HEIGHT * 0.25}px;
    justify-content: flex-end;
    padding: 0px 20px;
`;

const Background = styled.Image``;

const Column = styled.View`
    flex-direction: row;
    width: 80%;
`;

const Title = styled.Text`
    color: ${(props) => props.theme.textColor};
    font-size: 30px;
    align-self: flex-end;
    margin-left: 15px;
    font-weight: bold;
`;

const Data = styled.View`
    padding: 0px 20px;
`;

const Overview = styled.Text`
    color: ${(props) => props.theme.textColor};
    margin: 20px 0px;
`;

const VideoButton = styled.TouchableOpacity`
    color: ${(props) => props.theme.textColor};
    flex-direction: row;
`;

const TestButton = styled.Text`
    color: ${(props) => props.theme.textColor};
    font-weight: bold;
    margin-bottom: 10px;
    line-height: 25px;
    margin-left: 10px;
`;

export default function Detail({
    navigation: { setOptions },
    route: { params },
}: any) {
    const title = params.original_title ?? params.original_name;
    const isMovie = "original_title" in params;

    const { isLoading, data } = useQuery(
        [isMovie ? "movies_detail" : "tv_detail", params.id],
        () =>
            isMovie ? getMovieVideoInfo(params.id) : getTVVideoInfo(params.id)
    );

    async function openYoutubeLink(id: string | number) {
        const baseURL = `https://www.youtube.com/watch?v=${id}`;
        await Linking.openURL(baseURL);
    }

    useEffect(() => {
        setOptions({
            title: "original_title" in params ? "Movie" : "TV Show",
        });
    }, []);

    return (
        <Container>
            <Header>
                <Background
                    style={StyleSheet.absoluteFill}
                    source={{
                        uri: createImagePath(params.backdrop_path || ""),
                    }}
                />

                <Column>
                    <Poster poster_path={params.poster_path || ""} />
                    <Title>{title}</Title>
                </Column>
            </Header>

            <Data>
                <Overview>{params.overview}</Overview>
                {isLoading ? <Loader /> : null}
                {data?.results?.map((video: any) => (
                    <VideoButton
                        key={video.key}
                        onPress={() => openYoutubeLink(video.key)}
                    >
                        <Ionicons name="logo-youtube" color="red" size={25} />
                        <TestButton>{video.name}</TestButton>
                    </VideoButton>
                ))}
            </Data>
        </Container>
    );
}
