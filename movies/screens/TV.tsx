import { View, Text, ScrollView, FlatList } from "react-native";
import { useQuery } from "react-query";
import { getAiringTodayTV, getPopularTV, getTopRatedTV } from "../api";
import Loader from "../components/Loader";
import HList from "../components/HList";

export default function TV() {
    const { isLoading: aringLaoding, data: aringData } = useQuery(
        ["tv", "today"],
        () => getAiringTodayTV(1)
    );
    const { isLoading: topLaoding, data: topData } = useQuery(
        ["tv", "top"],
        () => getTopRatedTV(1)
    );
    const { isLoading: popularLaoding, data: popularData } = useQuery(
        ["tv", "today"],
        () => getPopularTV(1)
    );

    const isLoading = aringLaoding || topLaoding || popularLaoding;

    if (isLoading) {
        return <Loader />;
    }

    return (
        <ScrollView>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={aringData.results}
                renderItem={({ item }) => (
                    <HList
                        poster_path={item.poster_path}
                        original_title={item.original_name}
                        vote_average={item.vote_average}
                    />
                )}
            />

            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={popularData.results}
                renderItem={({ item }) => (
                    <HList
                        poster_path={item.poster_path}
                        original_title={item.original_name}
                        vote_average={item.vote_average}
                    />
                )}
            />
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={topData.results}
                renderItem={({ item }) => (
                    <HList
                        poster_path={item.poster_path}
                        original_title={item.original_name}
                        vote_average={item.vote_average}
                    />
                )}
            />
        </ScrollView>
    );
}
