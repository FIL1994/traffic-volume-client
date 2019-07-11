import React, { useEffect, useState } from "react";
import { useRequest } from "../hooks/requestHooks";
import "./traffic.less";

const Traffic = props => {
  const [pattern, setPattern] = useState();
  const { id } = props.match.params;
  const [{ traffic = {} }, isLoading, error] = useRequest({
    query: `
          {
            traffic(id: "${id}") {
              id,
              lhrs,
              hwyNumber,
              locationDesc,
              secondaryDesc,
              sectionLength,
              connectingLinkLength,
              travelPatterns {
                pattern,
                years {
                  year,
                  dhv,
                  directionalSplit,
                  aadt,
                  sadt,
                  sawdt,
                  wadt
                }
              }
            }
          }
        `
  });

  useEffect(
    function setInitialPattern() {
      if (traffic.travelPatterns) {
        setPattern(traffic.travelPatterns[0].pattern);
      }
    },
    [traffic]
  );

  const years =
    traffic.travelPatterns && pattern
      ? traffic.travelPatterns.find(t => t.pattern === pattern).years
      : [];

  console.log(years);

  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <h3>
        {traffic.hwyNumber} - {traffic.locationDesc}
        <br />
        {traffic.secondaryDesc}
      </h3>
      <div className="traffic-grid">
        <div>
          <div>LHRS: {traffic.lhrs}</div>
          <div>Section Length: {traffic.sectionLength}</div>
          <div>Connecting Link Length: {traffic.connectingLinkLength}</div>
        </div>
        <div />
      </div>
      <div>
        <div className="travel-patterns">
          {traffic.travelPatterns.map(t => (
            <span
              key={t.pattern}
              className={`${t.pattern === pattern ? "selected" : ""}`}
              onClick={() => setPattern(t.pattern)}
            >
              {t.pattern}
            </span>
          ))}
        </div>

      </div>
    </>
  );
};

export default Traffic;
