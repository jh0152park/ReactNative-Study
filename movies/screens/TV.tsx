import { View, Text, ScrollView, FlatList } from "react-native";
import { useQuery, useQueryClient } from "react-query";
import { getAiringTodayTV, getPopularTV, getTopRatedTV } from "../api";
import Loader from "../components/Loader";
import Title from "../components/Title";
import HList from "../components/HList";
import { RefreshControl } from "react-native";
import { useState } from "react";

export default function TV() {
    const queryClient = useQueryClient();
    const [isRefreshing, setIsRefreshing] = useState(false);

    const { isLoading: aringLaoding, data: aringData } = useQuery(
        ["tv", "today"],
        () => getAiringTodayTV(1)
    );
    const { isLoading: topLaoding, data: topData } = useQuery(
        ["tv", "top"],
        () => getTopRatedTV(1)
    );
    const { isLoading: popularLaoding, data: popularData } = useQuery(
        ["tv", "popular"],
        () => getPopularTV(1)
    );

    const isLoading = aringLaoding || topLaoding || popularLaoding;

    async function onRefresh() {
        setIsRefreshing(true);
        await queryClient.refetchQueries(["tv"]);
        setIsRefreshing(false);
    }

    if (isLoading) {
        return <Loader />;
    }

    return (
        <ScrollView
            contentContainerStyle={{
                paddingBottom: 30,
            }}
            refreshControl={
                <RefreshControl
                    refreshing={isRefreshing}
                    onRefresh={onRefresh}
                />
            }
        >
            <HList title={"Aring Today"} data={aringData.results} />
            <HList title={"Popular TV"} data={popularData.results} />
            <HList title={"Top Rated TV"} data={topData.results} />
        </ScrollView>
    );
}
