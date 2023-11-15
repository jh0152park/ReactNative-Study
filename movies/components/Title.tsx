import { styled } from "styled-components/native";

const ListTitle = styled.Text`
    color: ${(props) => props.theme.textColor};
    font-size: 18px;
    font-weight: bold;
    margin-left: 30px;
    margin-bottom: 20px;
    margin-top: 30px;
`;

interface IProps {
    title: string;
}

export default function Title({ title }: IProps) {
    return <ListTitle>{title}</ListTitle>;
}
