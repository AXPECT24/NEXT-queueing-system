import axios from "axios";
import { useState, useEffect } from "react";

// change api key and path when connecting to local machine
const EndPoints = {
    LOCAL: "http://127.0.0.1:8000",
    TOKEN: "token f25fe37566d2c8c:f074d5e5a56f70f",
    METHOD: "method",
    RESOURCE: "resource",
    QUERY: "generic_queueing_system.api.search.get_query"
}

export const useFetchData = () => {
    const [error, setError] = useState(null)
    
    const fetchData = async (endpointkey, validation, variable ) => {
        try {
            const res = await axios.request({
                method: 'GET',
                url: `${EndPoints[endpointkey]}/api/${EndPoints[validation]}/${variable}`,
                headers: {
                    Authorization: `${EndPoints.TOKEN}`
                }
            }); 

            const data = res.data.data
            return data
        } catch (e) {
            setError(e)
        }
    };
    return { error, fetchData };
}

export const fetchQuery = () => {
    const [error, setError] = useState(null)

    const searchData = async ( endpointkey, validation, variable, doctype, params ) => {
        try {
            const res = await axios.request({
                method: 'GET',
                url: `${EndPoints[endpointkey]}/api/${EndPoints[validation]}/${EndPoints[variable]}`,
                headers: {
                    Authorization: `${EndPoints.TOKEN}`
                },
                params: {
                    doctype: doctype,
                    filters: params
                }
            }); const data = res.data.message
            return data
        } catch (e) {
            setError(e)
        }
    };

    const filterData = async ( endpointkey, validation, variable, params ) => {
        try {
            const res = await axios.request({
                method: 'GET',
                url: `${EndPoints[endpointkey]}/api/${EndPoints[validation]}/${variable}`,
                headers: {
                    Authorization: `${EndPoints.TOKEN}`
                },
                params: {
                    filters: params
                }
            }); const data = res.data.data
            return data
        } catch (e) {
            setError(e)
        }
    };
    return { error, filterData, searchData };
}

export const usePostData = () => {
    const [isLoading, setIsLoading] = useState(true);

    const postData = async (endpointkey, payload, variable) => {
        setIsLoading(true)
        try {
            const res = await axios.request({
                method: 'POST',
                url: `${EndPoints[endpointkey]}/api/resource/${variable}`,
                data: JSON.stringify(payload),
                headers: {
                    Authorization: `${EndPoints.TOKEN}`
                }
            });
            const data = res.data.data
            return data
        } catch (e) {
            return e
        } finally {
            setIsLoading(false)
        }
    };

    return { isLoading, postData }
}