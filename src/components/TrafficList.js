import React from "react";
import { useRequest } from "../hooks/requestHooks";

const TrafficList = () => {
  const [{ traffics = [] }, trafficError] = useRequest({
    query: `
      {
        traffics(page: 1, pageSize: 5) {
          id,
          lhrs,
          hwyType,
          hwyNumber,
          locationDesc,
          secondaryDesc 
        }
      }
    `
  });

  return (
    <>
      <ul>
        {traffics.map(t => (
          <li key={t.id}>{t.locationDesc}</li>
        ))}
      </ul>
    </>
  );
};

export default TrafficList;
