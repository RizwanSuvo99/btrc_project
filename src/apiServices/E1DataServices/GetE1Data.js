import axios from "axios";

// Define the URL you want to fetch data from
const url = "http://localhost:8083/e1Data";

// Function to fetch data
const fetchData = async () => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export default fetchData;
