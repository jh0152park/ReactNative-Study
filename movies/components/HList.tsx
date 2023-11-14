import styled from "styled-components/native";
import Poster from "./Poster";
import Vote from "./Vote";

const Movie = styled.View`
    align-items: center;
`;

const Title = styled.Text`
    margin-top: 10px;
    margin-bottom: 5px;
    color: ${(props) => props.theme.textColor};
    font-weight: bold;
`;

interface IProps {
    poster_path: string;
    original_title: string;
    vote_average: number;
}

export default function HList({
    poster_path,
    original_title,
    vote_average,
}: IProps) {
    return (
        <Movie>
            <Poster poster_path={poster_path} />
            <Title>
                {original_title.slice(0, 13)}
                {original_title.length > 13 ? "..." : null}
            </Title>
            <Vote vote_average={vote_average} />
        </Movie>
    );
}
