import { useState, useEffect } from "react";
import axios from "axios";

export const useRequest = ({ query, variables = null }, deps = []) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  useEffect(() => {
    const source = axios.CancelToken.source();
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
          },
          cancelToken: source.token
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
        if (axios.isCancel(error)) return;

        setError(error);
        setIsLoading(false);
      });

    return () => source.cancel();
  }, deps);

  return [data, isLoading, error];
};
