import { useState, useEffect } from "react";
import axios from "axios";

export const useRequest = ({ query, variables = null }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    axios
      .post(
        `${process.env.HOST_URL}/graphql`,
        {
          query,
          variables
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then(res => {
        setIsLoading(false);
        setData(res.data.data);
        setError(undefined);
      })
      .catch(error => {
        setIsLoading(false);
        setError(error);
      });
  }, []);

  return [data, isLoading, error];
};
