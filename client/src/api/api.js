import axios from "axios";
const baseUrl = "https://e1fe-131-179-60-246.ngrok.io";

// Passing configuration object to axios
axios({
    method: "get",
    url: `${baseUrl}/register`,
}).then((response) => {
    console.log(response.data);
});

// Invoking get method to perform a GET request
axios.get(`${baseUrl}`).then((response) => {
    console.log(response.data);
});
