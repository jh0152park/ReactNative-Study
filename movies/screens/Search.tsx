import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components/native";
import { SearchMovie, SearchTV } from "../api";
import Loader from "../components/Loader";
import HList from "../components/HList";

const Container = styled.ScrollView``;

const SearchBar = styled.TextInput`
    color: black;
    background-color: whitesmoke;
    padding: 10px 15px;
    border-radius: 15px;
    width: 90%;
    margin: 30px auto;
`;

export default function Search() {
    const [query, setQuery] = useState("");
    const [keyword, setKeyword] = useState("");

    const {
        isLoading: movieLoading,
        data: movieData,
        refetch: movieRefetch,
    } = useQuery("serarchMovie", () => SearchMovie(query, 1), {
        enabled: false,
    });

    const {
        isLoading: tvLoading,
        data: tvData,
        refetch: tvRefetch,
    } = useQuery("serarchTV", () => SearchTV(query, 1), {
        enabled: false,
    });

    function onChangeText(text: string) {
        setQuery(text);
    }

    function onSubmit() {
        if (query === "") {
            return;
        }
        movieRefetch();
        tvRefetch();
        setKeyword(query);
    }

    const isLoading = movieLoading || tvLoading;

    return (
        <Container>
            <SearchBar
                placeholder="Search for Movie or TV Show"
                placeholderTextColor="gray"
                returnKeyType="search"
                onChangeText={onChangeText}
                onSubmitEditing={onSubmit}
            />

            {isLoading ? <Loader /> : null}
            {movieData ? (
                <HList
                    title={`Result for ${keyword} Movie`}
                    data={movieData.results}
                />
            ) : null}
            {tvData ? (
                <HList
                    title={`Result for ${keyword} TV`}
                    data={tvData.results}
                />
            ) : null}
        </Container>
    );
}
