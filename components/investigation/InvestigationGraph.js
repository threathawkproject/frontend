import React, { useEffect, useRef, useState } from "react";

import { Graph } from "react-d3-graph";
import ReactCountryFlag from "react-country-flag";
// import { graphData } from "../../utils/graphData";
import CountryNode from "../graph-nodes/EnrichmentNode";
import dummydata from "../../dummydata.json";
import InvestigationNode from "../graph-nodes/InvestigationNode";
export const InvestigationGraph = (props) => {
  const { graphData, selectedIoc } = props;
  const flagRef = useRef();
  const centerX = 400;
  const centerY = 300;
  const radius = 250;
  const numPoints = 30;
  const angleIncrement = (2 * Math.PI) / numPoints;
  const [data, setData] = useState({
    nodes: [],
    links: [],
  });

  useEffect(() => {
    setData(() => {
      let nodeNumber = 1;
      //initialize new data var
      let newData = {
        nodes: [],
        links: [],
      };
      graphData?.forEach((object, index) => {
        if (object.type !== "relationship") {
          const x =
            object.name === selectedIoc
              ? centerX
              : centerX + radius * Math.cos(angleIncrement * nodeNumber);
          const y =
            object.name === selectedIoc
              ? centerY
              : centerY + radius * Math.sin(angleIncrement * nodeNumber);
          newData.nodes.push({
            ...object,
            x,
            y,
            color: index % 2 ? "blue" : "red",
            viewGenerator: (node) => <InvestigationNode type={object.type} />,
          });
          nodeNumber++;
        } else {
          newData.links.push({
            ...object,
            source: object.source_ref,
            target: object.target_ref,
            label: object.relationship_type,
            color: "#BFC3CB",
          });
        }
      });

      //set data to new data
      return newData;
    });
  }, [graphData]);

  // the graph configuration, just override the ones you need
  const myConfig = {
    automaticRearrangeAfterDropNode: false,
    collapsible: false,
    directed: true,
    focusAnimationDuration: 0.75,
    focusZoom: 1,
    freezeAllDragEvents: false,
    height: 800,
    width: 900,

    highlightDegree: 1,
    highlightOpacity: 1,
    linkHighlightBehavior: true,
    maxZoom: 2,
    minZoom: 1,
    initialZoom: 1,
    nodeHighlightBehavior: false,
    panAndZoom: false,
    staticGraphWithDragAndDrop: true,
    d3: {
      alphaTarget: 0.05,
      gravity: -100,
      linkLength: 304,
      disableLinkForce: false,
    },
    node: {
      color: "#d3d3d3",
      fontColor: "black",
      fontSize: 8,
      fontWeight: "normal",
      highlightColor: "SAME",
      highlightFontSize: 8,
      highlightFontWeight: "normal",
      highlightStrokeColor: "SAME",
      highlightStrokeWidth: "SAME",
      labelProperty: "name",
      mouseCursor: "pointer",
      opacity: 1,
      renderLabel: true,
      size: 400,
      strokeColor: "none",
      strokeWidth: 1.5,
      svg: "",
      symbolType: "circle",
    },
    link: {
      color: "black",
      fontColor: "lightgray",
      fontSize: 10,
      fontColor: "black",
      fontWeight: "normal",
      highlightColor: "SAME",
      highlightFontSize: 8,
      highlightFontWeight: "normal",
      labelProperty: "label",
      mouseCursor: "pointer",
      opacity: 0.4,
      renderLabel: false,
      semanticStrokeWidth: false,
      strokeWidth: 1.3,
      markerHeight: 6,
      markerWidth: 6,
      strokeDasharray: 0,
      strokeDashoffset: 0,
      strokeLinecap: "butt",
      renderLabel: true,
    },
  };

  const onClickNode = function (nodeId) {
    window.alert(`Clicked node ${nodeId}`);
  };

  const onClickLink = function (source, target) {
    window.alert(`Clicked link between ${source} and ${target}`);
  };
  return (
    <Graph
      id="graph-id" // id is mandatory
      data={data}
      config={myConfig}
      onClickNode={onClickNode}
      onClickLink={onClickLink}
    />
  );
};
