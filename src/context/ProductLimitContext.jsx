import {createContext, useCallback, useContext, useMemo, useState} from "react";

    const ProductLimitContext = createContext(null)

    export const useLimitContext = ()=> {
        const context = useContext(ProductLimitContext);
        if(context === null) {
            console.log("useLimitContext Must be used within Provider")
        }
        return context
    }

    export const ProductLimitProvider = ({children}) => {
        const [productLimit, setProductLimit] = useState('30');
        const handleLimitChange = useCallback((newValue) => {
            setProductLimit(newValue);
        },[])
        const contextValue = useMemo(() => ({
            productLimit,
            setProductLimit: handleLimitChange
        }),[productLimit,handleLimitChange]);

        return (
            <ProductLimitContext.Provider value={contextValue}>
                {children}
            </ProductLimitContext.Provider>
        )

    }