import { FlatList } from "react-native";

import HMedia from "./HMedia";
import Title from "./Title";
import styled from "styled-components/native";

interface IProps {
    title: string;
    data: any[];
}

const HSeparator = styled.View`
    width: 30px;
`;

export default function HList({ title, data }: IProps) {
    return (
        <>
            <Title title={title} />
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 30,
                }}
                ItemSeparatorComponent={HSeparator}
                data={data}
                keyExtractor={(item) => item.id + ""}
                renderItem={({ item }) => (
                    <HMedia
                        poster_path={item.poster_path}
                        original_title={
                            item.original_name ?? item.original_title
                        }
                        vote_average={item.vote_average}
                        fullData={item}
                    />
                )}
            />
        </>
    );
}
