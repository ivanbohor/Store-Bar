import axios from "axios";
import {Product} from "./types";
import Papa from "papaparse";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    list: async (): Promise<Product []> => {
        return axios
        .get('https://docs.google.com/spreadsheets/d/e/2PACX-1vSa0okVHzVtXARpqReemHdJ4tgz0TUT6pzNHaWhMXy2vfoq6i0mtT87qszKK6LTBoSFBJ42O5Fdo8u8/pub?output=csv',
        { 
            responseType: "blob",
         },
        )
        .then(
        (response) => 
         new Promise<Product[]>((resolve, reject)=> {
            Papa.parse(response.data, {
                header: true,
                complete: (results) => {
                    const products = results.data as Product[];
                    return resolve (
                        products.map((product) => ({
                            ...product,
                        price: Number(product.price),
                    })),
                 );
                },
                error: (error) => reject(error.message),
            });
        }),   
        );
    }
    }        