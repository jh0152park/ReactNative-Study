import styled from "styled-components/native";

const Score = styled.Text`
    color: ${(props) => props.theme.hazyColor};
    font-size: 13px;
`;

export default function Vote({ vote_average }: { vote_average: number }) {
    return (
        <Score>
            {vote_average > 0
                ? `⭐️ ${vote_average.toFixed(1)} / 10`
                : "Comming soon"}
        </Score>
    );
}
