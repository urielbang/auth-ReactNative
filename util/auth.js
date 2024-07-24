import axios from "axios";

const API_KEY = `AIzaSyALDLzbcTVeWScQ26pQKOUrhO8GqYZboXA`;

export const createUser = async (email, password) => {
  try {
    const res = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
      {
        email: email,
        password: password,
        returnSecureToken: true,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const token = res.data.idToken;

    console.log("User created successfully:", res.data);
    return token;
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (email, password) => {
  const res = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
    {
      email: email,
      password: password,
      returnSecureToken: true,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const token = res.data.idToken;
  console.log("User login successfully:", res.data);
  return token;
};
