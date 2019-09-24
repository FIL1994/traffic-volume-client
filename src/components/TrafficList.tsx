import React, { useState, useEffect, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { useRequest } from "../hooks/requestHooks";
import "./traffic-list.less";
import Title from "./Title";
import isElementInViewport from "../utils/isElementInViewPort";

const TrafficList = props => {
  const [sortBy, setSortBy] = useState("LHRS");
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    setSortAsc(true);
  }, [sortBy]);

  useLayoutEffect(() => {
    function onScroll() {
      const lastItem = document.querySelector("ul.traffic-list li:last-child");
      const inView = isElementInViewport(lastItem);
      console.log(inView);
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  });

  const [{ traffics = [] }, isLoading, error] = useRequest(
    {
      query: `
      {
        traffics(page: 1, pageSize: 20, sortBy: ${sortBy ||
          null}, sortAsc: ${sortAsc}) {
          id,
          lhrs,
          hwyType,
          hwyNumber,
          locationDesc,
          avgAadt 
        }
      }
    `
    },
    [sortBy, sortAsc]
  );

  function getHeadingProps(heading) {
    return {
      role: "columnheader",
      tabIndex: 0,
      onClick: () => {
        setSortBy(heading);
        setSortAsc(sortOrder => !sortOrder);
      },
      ...(heading === sortBy
        ? {
            "aria-sort": sortAsc ? "ascending" : "descending"
          }
        : { "aria-sort": "none" })
    };
  }

  return (
    <>
      <Title>Traffic Volume</Title>
      <ul className="traffic-list">
        <li>
          <span
            {...getHeadingProps("LHRS")}
            title="Linear Highway Referencing System"
          >
            LHRS
          </span>
          <span {...getHeadingProps("HWY_NUMBER")}>Hwy #</span>
          <span {...getHeadingProps("HWY_TYPE")}>Hwy Type</span>
          <span {...getHeadingProps("LOCATION_DESC")}>Description</span>
          <span
            {...getHeadingProps("AVG_AADT")}
            title="Average Annual Average Daily Traffic"
          >
            Avg. AADT
          </span>
        </li>
        {traffics.map(t => (
          <li key={t.id}>
            <span>{t.lhrs}</span>
            <span>{t.hwyNumber}</span>
            <span>{t.hwyType}</span>
            <span>{t.locationDesc}</span>
            <span>{t.avgAadt.toLocaleString()}</span>
            <Link to={t.id} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default TrafficList;
