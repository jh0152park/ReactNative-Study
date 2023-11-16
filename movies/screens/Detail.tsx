import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import styled from "styled-components/native";
import Poster from "../components/Poster";

const Container = styled.ScrollView`
    background-color: ${(props) => props.theme.mainBackgroundColor};
`;

export default function Detail({
    navigation: { setOptions },
    route: { params },
}: any) {
    const title = params.original_title ?? params.original_name;

    useEffect(() => {
        setOptions({
            title: title,
        });
    }, []);

    return (
        <Container>
            <Poster poster_path={params.poster_path || ""} />
        </Container>
    );
}
