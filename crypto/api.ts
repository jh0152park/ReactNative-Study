export interface ICoin {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
}

const BASE_URL = "https://api.coinpaprika.com/v1/";
const COINS_URL = `${BASE_URL}/coins`;

export function getCoins() {
    return fetch(COINS_URL).then(response => response.json());
}
