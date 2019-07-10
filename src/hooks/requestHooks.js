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
        if (Array.isArray(res.data.errors)) {
          throw new Error(res.data.errors);
        }

        setData(res.data.data);
        setError(undefined);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  return [data, isLoading, error];
};
