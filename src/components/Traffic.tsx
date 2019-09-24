import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { useRequest } from "../hooks/requestHooks";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import "./traffic.less";
import Title from "./Title";

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

  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <Title>
        {traffic.locationDesc}
        {traffic.secondaryDesc && (
          <div className="secondary">{traffic.secondaryDesc}</div>
        )}
      </Title>
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
        <div
          className="ag-theme-material"
          style={{
            marginTop: 15
          }}
        >
          <AgGridReact
            onGridReady={({ api }) => {
              api.sizeColumnsToFit();
            }}
            domLayout="autoHeight"
            columnDefs={[
              {
                headerName: "Year",
                field: "year",
                minWidth: 60,
                maxWidth: 78
              },
              {
                headerName: "AADT (Annual Average Daily Traffic)",
                field: "aadt"
              },
              {
                headerName: "SADT (Summer Average Daily Traffic)",
                field: "sadt"
              },
              {
                headerName: "SAWDT (Summer Average Weekday Traffic)",
                field: "sawdt"
              },
              {
                headerName: "WADT (Winter Average Daily Traffic)",
                field: "wadt"
              },
              {
                headerName: "DHV (Design Hourly Volume)",
                field: "dhv"
              },
              {
                headerName: "Directional Split",
                field: "directionalSplit"
              }
            ]}
            rowData={years}
            defaultColDef={{
              sortable: true,
              resizable: true
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Traffic;
