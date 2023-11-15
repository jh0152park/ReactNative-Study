import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";

const Loading = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    /* background-color: ${(props) => props.theme.mainBackgroundColor}; */
`;

export default function Loader() {
    return (
        <Loading>
            <ActivityIndicator />
        </Loading>
    );
}
