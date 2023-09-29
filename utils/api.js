import { API_URL, STRAPI_API } from "./urls";

// This is generic data fetching method
export const fetchData = async (endpoint, localhost) => {
    const options = {
        method: "GET",
        headers: {
            Authorization: "Bearer " + STRAPI_API,
        },
    };
    const res = await fetch(`${API_URL}${endpoint}`, options);
    const data = await res.json();

    return data;
};

// This is post method for making stripe payment request
export const makePaymentRequest = async (endpoint, payload) => {
    const res = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: {
            Authorization: "Bearer " + STRAPI_API,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    // Log the response
    console.log("Response from server:", res);

    const data = await res.json();
    console.log("Parsed JSON data:", data);

    return data;
};
