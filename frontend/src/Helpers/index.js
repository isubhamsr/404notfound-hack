import Storage from "../utlity/Storage";
import HttpClient from "../utlity/HttpClient";

export const authenticate = (name, data, next) => {
  if (typeof window !== undefined) {
    Storage.set(name, data);
    next();
  }
};

export const isAuthenticated = async () => {
  if (typeof window === undefined) {
    return false;
  }
  if (Storage.get("token")) {
    const decodedToken = Storage.decodeToken("token");
    const _id = decodedToken._id;
    const response = await HttpClient.get(`verifytoken/${_id}`);
    // console.log(response);
    if (response.error) {
      return false;
    }
    if (response.data.token === Storage.get("token")) {
      return true
    }
    return false
    // TODO - compare jwt (localStorage vallue) with the database session storage value
  } else {
    return false;
  }
};

export const isSignUp = () => {
  if (typeof window === undefined) {
    return false;
  }
  if (Storage.get("_token")) {
    return true
  } else {
    return false;
  }
}

export const isSignIn = () => {
  if (typeof window === undefined) {
    return false;
  }
  if (Storage.get("token")) {
    return true
  } else {
    return false;
  }
}