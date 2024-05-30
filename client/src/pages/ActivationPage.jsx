import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { server } from "../server";

function ActivationPage() {
  const { activation_token } = useParams();
  const [ error, setError ] = useState(false);
  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        await axios
          .post(`${server}/user/activation`, {
            activation_token,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            setError(true);
          });
      };
      sendRequest();
    }
  }, []);
  return (
    <div className="w-full h-[100vh] flex justify-center align-middle">
      {error ? (
        <p>Your token is expired!</p>
      ) : (
        <p>Your account has been created successfully</p>
      )}
    </div>
  );
}

export default ActivationPage;
