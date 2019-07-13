import React from "react";
import { useRequest } from "../hooks/requestHooks";
import "./traffic-list.less";
import Title from "./Title";

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
          avgAadt 
        }
      }
    `
  });

  return (
    <>
      <Title>Traffic Volume</Title>
      <ul className="traffic-list">
        <li>
          <span title="Linear Highway Referencing System">LHRS</span>
          <span>Hwy #</span>
          <span>Hwy Type</span>
          <span>Description</span>
          <span title="Average Annual Average Daily Traffic">Avg. AADT</span>
        </li>
        {traffics.map(t => (
          <li
            key={t.id}
            onClick={() => {
              props.history.push(t.id);
            }}
          >
            <span>{t.lhrs}</span>
            <span>{t.hwyNumber}</span>
            <span>{t.hwyType}</span>
            <span>{t.locationDesc}</span>
            <span>{t.avgAadt}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TrafficList;
