
import {VignetteReducer} from "../global/vignetteReducer";
import {createContext, useEffect, useReducer} from "react";
import { useVignettes } from "../services/query";

export const VignetteContext = createContext();

const VignetteContextProvider = ({children}) => {
    const [vignettes, dispatch] = useReducer(VignetteReducer, [], () => {
        useVignettes()
        .then((res) => {
          return [...res.data];
        })
        .catch((e) => {
          console.log(e);
          return [];
        });
    });

    const fetchVignettes = () => {
        dispatch({type: "FETCH_VIGNETTES"});
    }
    const addVignette = payload => {
        dispatch({type: "ADD_VIGNETTE", payload});
    }

    const updateVignette = payload => {
        dispatch({type: "UPDATE_VIGNETTE", payload});
    }

    const deleteVignette = payload => {
        dispatch({type: "DELETE_VIGNETTE", payload});
    }


    const contextValues = {
        fetchVignettes,
        addVignette,
        updateVignette,
        deleteVignette,
        vignetteList: vignettes
    }

    // useEffect(() => {
    //     lscache.set(PREFIX + "-cart", cart);
    // }, [cart]);

    return (
        <VignetteContext.Provider value={contextValues}>
            {children}
        </VignetteContext.Provider>
    );
};

export default VignetteContextProvider;