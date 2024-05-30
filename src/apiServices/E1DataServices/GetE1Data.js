import axios from "axios";
const url = "http://localhost:8083/e1Data";

const E1DataServices = {
  fetchE1Data: async ()=>{
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching roles:", error);
      throw error;
    }
  }
}

export default E1DataServices;
