import axios from "axios";
import { useState } from "react";

// custom hook to handle http request

// sample declaration]
// const { data, getData, createData, editData, deleteData } = useFetch();

export default function useFetch() {
    const [data, setData] = useState();

    // retrive data from db
    // must provide an id (ex. `/api/item/${id}`) when retrieving specific data
    function getData(url) {
        axios.get(url)
        .then(res => {
            setData(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }

    // create new data
    function createData(url, info) {
        axios.post(url, info)
        .then(res => {
            setData(res.data);
        })
        .catch(err => {
            console.log(err);
        }) 
    }

    // modify specific data -> must provide an id (ex. `/api/item/${id}`)
    function editData(url, info) {
        axios.put(url, info)
        .then(res => {
            setData(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }

    // delete specific data -> must provide an id (ex. `/api/item/${id}`)
    function deleteData(url) {
        axios.delete(url)
        .then(res => {
            // not sure if setting the data state is necessary in delete
            // maybe we can consider console.log/alert
            // for the meantime, I just set the state of the data when promise is returned if we decided to make a modal
            setData(res.data);
        })
        .catch(err => {
            console.log(err)
        })
    }

    return { data, getData, createData, editData, deleteData };
}