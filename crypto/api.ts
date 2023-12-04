export interface ICoin {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
}

export interface ICoinPrice {
    timestamp: string;
    price: number;
    volume_24h: number;
    market_cap: number;
}

const BASE_URL = "https://api.coinpaprika.com/v1/";
const COINS_URL = `${BASE_URL}/coins`;

export function getCoins() {
    return fetch(COINS_URL).then(response => response.json());
}

export function coinInfo(coinId: string) {
    return fetch(`${COINS_URL}/${coinId}`).then(response => response.json());
}

export function coinPrices(coinId: string) {
    return fetch(
        `${BASE_URL}/tickers/${coinId}/historical?start=${
            new Date().toISOString().split("T")[0]
        }&interval=1h`,
    ).then(response => response.json());
}
