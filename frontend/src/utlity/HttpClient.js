import Storage from "./Storage";

const HttpClient = {
  BASE_URL: "http://localhost:8000/api/v1/",
  // BASE_URL: "https://studynest.herokuapp.com/api/v1/",

  prepareUrl: (route) => {
    return HttpClient.BASE_URL + route;
  },

  get : (route) => { return HttpClient.requst(route, null, "GET") },

  post : (route, params) => { return HttpClient.requst(route, params, "POST") },

  put : (route, params) => { return HttpClient.requst(route, params, "PUT") },

  delete : (route, params) => { return HttpClient.requst(route, params, "DELETE") },

  requst: async (route, params = null, method = "GET") => {
    let response = null
    const token = Storage.get("token");

    const config = {
      method: method,
      headers: {
        // "Accept": "application/json",
        "Content-Type": "application/json",
        "token": token,
      },
    };

    if (method !== "GET") {
      config.body = JSON.stringify(params);
    }

    const url = HttpClient.prepareUrl(route);

    await fetch(url, config)
      .then((response) =>  response.json())
      .then((data)=>{
        // console.log(data);
        response = data
      })
      .catch((error) => {
        // console.error(error.message);
        response = error.message
      });
      return response
  },
};

export default HttpClient