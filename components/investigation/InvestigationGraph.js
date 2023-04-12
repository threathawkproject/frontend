import React, { useEffect, useRef, useState } from "react";

import { Graph } from "react-d3-graph";
import ReactCountryFlag from "react-country-flag";
// import { graphData } from "../../utils/graphData";
import CountryNode from "../graph-nodes/CountryNode";
import dummydata from "../../dummydata.json";
export const InvestigationGraph = (props) => {
  const graphData = dummydata.objects;
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
  const [selectedCenter, setSelectedCenter] = useState("1.179.185.50");

  useEffect(() => {
    setData(() => {
      let nodeNumber = 1;
      //initialize new data var
      let newData = {
        nodes: [],
        links: [],
      };
      graphData.forEach((object, index) => {
        if (object.type !== "relationship") {
          const x =
            object.name === selectedCenter
              ? centerX
              : centerX + radius * Math.cos(angleIncrement * nodeNumber);
          const y =
            object.name === selectedCenter
              ? centerY
              : centerY + radius * Math.sin(angleIncrement * nodeNumber);
          newData.nodes.push({
            ...object,
            x,
            y,
            color: index % 2 ? "blue" : "red",
          });
          nodeNumber++;
        } else {
          newData.links.push({
            ...object,
            source: object.source_ref,
            target: object.target_ref,
            label: object.relationship_type,
            color: index % 2 ? "blue" : "yellow",
          });
        }
      });

      //set data to new data
      return newData;
    });
  }, [graphData]);

  const d = {
    nodes: [
      {
        id: "192.167.23.2",
        size: 300,
        color: "red",
        x: centerX + radius * Math.cos(angleIncrement * 3),
        y: centerY + radius * Math.sin(angleIncrement * 3),
        renderLabel: false,
      },
      {
        id: "192.167.53.6",
        x: centerX + radius * Math.cos(angleIncrement * 2),
        y: centerY + radius * Math.sin(angleIncrement * 2),
      },
      {
        id: "192.167.2.7",

        x: centerX,
        y: centerY,
      },
      {
        id: "192.167.4.5",
        x: centerX + radius * Math.cos(angleIncrement * 4),
        y: centerY + radius * Math.sin(angleIncrement * 4),
        size: 300,
        viewGenerator: (node) => (
          <CountryNode countryCode={graphData.geoIP2.country.iso_code} />
        ),
      },
    ],
    links: [
      {
        label: "Belongs To",
        source: "192.167.23.2",
        target: "192.167.53.6",
      },
      {
        label: "My Label",
        source: "192.167.23.2",
        target: "192.167.2.7",
      },
      {
        label: "Belongs To",
        source: "192.167.2.7",
        target: "192.167.4.5",

        renderLabel: true,
      },
    ],
  };

  // the graph configuration, just override the ones you need
  const myConfig = {
    automaticRearrangeAfterDropNode: false,
    collapsible: false,
    directed: false,
    focusAnimationDuration: 0.75,
    focusZoom: 1,
    freezeAllDragEvents: false,
    height: 800,
    width: 900,

    highlightDegree: 1,
    highlightOpacity: 1,
    linkHighlightBehavior: false,
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
      strokeWidth: 1.5,
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
