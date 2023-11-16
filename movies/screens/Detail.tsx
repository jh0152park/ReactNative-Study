import { useEffect } from "react";
import styled from "styled-components/native";

const Container = styled.ScrollView`
    background-color: ${(props) => props.theme.mainBackgroundColor};
`;

export default function Detail({
    navigation: { setOptions },
    route: { params },
}: any) {
    const title = params.original_title;

    useEffect(() => {
        setOptions({
            title: title,
        });
    }, []);

    return <Container></Container>;
}
