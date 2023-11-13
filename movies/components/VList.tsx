import { styled } from "styled-components/native";
import Poster from "./Poster";

const Title = styled.Text`
    margin-top: 10px;
    margin-bottom: 5px;
    color: ${(props) => props.theme.textColor};
    font-weight: bold;
`;

const HMovie = styled.View`
    padding: 0px 30px;
    flex-direction: row;
    margin-top: 30px;
`;

const HColumn = styled.View`
    margin-top: -10px;
    margin-left: 15px;
    width: 80%;
`;

const Overview = styled.Text`
    color: ${(props) => props.theme.textColor};
    width: 80%;
    font-size: 13px;
    margin-top: 20px;
`;

interface IProps {
    poster_path: string;
    original_title: string;
    overview: string;
}

export default function VList({
    poster_path,
    original_title,
    overview,
}: IProps) {
    return (
        <HMovie>
            <Poster poster_path={poster_path} />
            <HColumn>
                <Title>{original_title}</Title>
                <Overview>
                    {overview.slice(0, 150)}
                    {overview.length > 150
                        ? "..."
                        : overview.length === 0
                        ? "-"
                        : ""}
                </Overview>
            </HColumn>
        </HMovie>
    );
}
