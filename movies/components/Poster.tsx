import styled from "styled-components/native";
import { createImagePath } from "../api";

interface IPors {
    poster_path: string;
}

const PosterView = styled.Image`
    width: 100px;
    height: 160px;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.5);
`;

export default function Poster({ poster_path }: IPors) {
    return (
        <PosterView
            source={{
                uri: createImagePath(poster_path),
            }}
        />
    );
}
