import axios from "axios";

const API_KEY = `AIzaSyALDLzbcTVeWScQ26pQKOUrhO8GqYZboXA`;

const creteUer = async ({ email, password }) => {
  const res = await axios.post(
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + API_KEY,
    {
      email: email,
      password: password,
      returnSecureToken: true,
    }
  );
};
