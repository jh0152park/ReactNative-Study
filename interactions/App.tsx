import {Animated, PanResponder} from "react-native";
import styled from "styled-components/native";

const BLACK = "#1e272e";
const GREY = "#485460";
const GREEN = "#2ecc71";
const RED = "#e74c3c";

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${BLACK};
`;

export default function App() {
    return <Container></Container>;
}
