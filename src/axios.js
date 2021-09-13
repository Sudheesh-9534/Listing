import axios from 'axios';

const testurl="https://ddbhnfigh3.execute-api.us-west-2.amazonaws.com/dev"
const end= testurl+"/myyshopp"

export default function reports(dataTable){
    return axios.post(end,dataTable)
    .then ((data)=>data)    
    .then((response)=>response)

}