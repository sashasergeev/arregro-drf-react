import axios from "axios";

const api = axios.create({
  baseURL: `${window.location.origin}/api/auth`,
});

export const loginUser = async ({ username, password }) => {
  try {
    const { data } = await api.post("/login", { username, password });
    return data;
  } catch (error) {
    throw Error(error.response.data.message);
  }
};

export const registerUser = async ({ username, email, password }) => {
  try {
    const { data } = await api.post("/register", { username, email, password });
    return data;
  } catch (error) {
    throw Error(error.response.data.message);
  }
};

export const logoutUser = async ({ token }) => {
  try {
    const { data } = await api.post("/logout", null, {
      headers: { Authorization: `Token ${token}` },
    });
    return data;
  } catch (error) {
    throw Error(error.response.data.message);
  }
};
export const getUser = async ({ token }) => {
  try {
    const { data } = await api.get("/user", {
      headers: { Authorization: `Token ${token}` },
    });
    return data;
  } catch (error) {
    throw Error(error.response.data.message);
  }
};
