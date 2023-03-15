import React from "react";

import config from "./config";
import { Graph } from "react-d3-graph";

export const InvestigationGraph = () => {
  const data = {
    nodes: [
      { id: "192.167.23.2" },
      { id: "192.167.53.6" },
      { id: "192.167.2.7" },
      { id: "192.167.4.5" },
    ],
    links: [
      { source: "192.167.23.2", target: "192.167.53.6" },
      { source: "192.167.23.2", target: "192.167.2.7" },
      { source: "192.167.2.7", target: "192.167.4.5" },
    ],
  };

  // the graph configuration, just override the ones you need
  const myConfig = {
    nodeHighlightBehavior: true,
    highlightDegree: 0,
    height: 500,
    width: 1000,

    directed: true,
    linkLength: 200,
    initialZoom: 2,
    node: {
      color: "#0070f3",
      size: 20,
      labelProperty: "id",
      highlightStrokeColor: "blue",
    },
    d3: {
      linkLength: 200,
      mouseCursor: "pointer",
    },
    link: {
      highlightColor: "lightblue",
    },
  };

  const onClickNode = function (nodeId) {
    window.alert(`Clicked node ${nodeId}`);
  };

  const onClickLink = function (source, target) {
    window.alert(`Clicked link between ${source} and ${target}`);
  };
  return (
    <React.Fragment>
      <Graph
        id="graph-id" // id is mandatory
        data={data}
        config={myConfig}
        onClickNode={onClickNode}
        onClickLink={onClickLink}
      />
    </React.Fragment>
  );
};
