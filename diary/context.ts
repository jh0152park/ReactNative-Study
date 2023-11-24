import React, {useContext} from "react";

export const DBContext = React.createContext<any>({} as any);

export function useDB() {
    return useContext(DBContext);
}
