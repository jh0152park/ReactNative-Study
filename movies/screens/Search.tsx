import { useState } from "react";
import styled from "styled-components/native";

const Container = styled.ScrollView``;

const SearchBar = styled.TextInput`
    color: black;
    background-color: whitesmoke;
    padding: 10px 15px;
    border-radius: 15px;
    width: 90%;
    margin: 10px auto;
`;

export default function Search() {
    const [query, setQuery] = useState("");

    function onChangeText(text: string) {
        setQuery(text);
    }

    return (
        <Container>
            <SearchBar
                placeholder="Search for Movie or TV Show"
                placeholderTextColor="gray"
                returnKeyType="search"
                onChangeText={onChangeText}
            />
        </Container>
    );
}
