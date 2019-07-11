import React from "react";
import { useRequest } from "../hooks/requestHooks";
import "./traffic-list.less";

const TrafficList = props => {
  const [{ traffics = [] }, isLoading, error] = useRequest({
    query: `
      {
        traffics(page: 1, pageSize: 20) {
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
      <ul className="traffic-list">
        <li>
          <span>Hwy #</span>
          <span>Description</span>
        </li>
        {traffics.map(t => (
          <li
            key={t.id}
            onClick={() => {
              props.history.push(t.id);
            }}
          >
            <span>{t.hwyNumber}</span>
            <span>{t.locationDesc}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TrafficList;
