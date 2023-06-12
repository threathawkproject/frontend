import React, { useEffect, useRef, useState } from "react";

import config from "./config";
import { Graph } from "react-d3-graph";
import ReactCountryFlag from "react-country-flag";
// import { graphData } from "../../utils/graphData";
import EnrichmentNode from "../graph-nodes/EnrichmentNode";
import VpnLockIcon from "@mui/icons-material/VpnLock";
import RadarIcon from "@mui/icons-material/Radar";

export const EnrichmentGraph = (props) => {
  const { data: graphData, ioc } = props;
  const flagRef = useRef();
  const centerX = 500;
  const centerY = 250;
  const radius = 250;
  const numPoints = 20;
  const angleIncrement = (2 * Math.PI) / numPoints;
  const [data, setData] = useState({
    nodes: [],
    links: [],
  });

  useEffect(() => {
    setData((prevData) => {
      let nodeNumber = 1;
      //initialize new data var
      let newData = {
        nodes: [],
        links: [],
      };

      //Set Center Node To IOC Curr IOC
      newData.nodes.push({
        id: ioc || "No data",
        x: centerX,
        y: centerY,
        viewGenerator: (node) => <EnrichmentNode icon={"indicator.svg"} />,
      });
      //Add Geo IP Nodes
      if (graphData?.geoIP2?.country) {
        const countryCode = graphData.geoIP2.country.iso_code;
        newData.nodes.push({
          id: "Geoloaction:country",
          name: graphData.geoIP2.country.names.en,

          x: centerX + radius * Math.cos(angleIncrement * nodeNumber),
          y: centerY + radius * Math.sin(angleIncrement * nodeNumber),
          viewGenerator: (node) => <EnrichmentNode icon={"location.svg"} />,
        });
        newData.links.push({
          label: "Located In",
          source: ioc,
          target: "Geoloaction:country",
        });
        nodeNumber++;
      }

      //Add AbuseIPDB Nodes
      if (graphData?.abuseIPDB?.data) {
        newData.nodes.push({
          id: "AbuseIPDB:UsageType",
          name: graphData.abuseIPDB.data.usageType || "None",

          color: "green",
          x: centerX + radius * Math.cos(angleIncrement * nodeNumber),
          y: centerY + radius * Math.sin(angleIncrement * nodeNumber),
          viewGenerator: (node) => <EnrichmentNode icon={"report.svg"} />,
        });
        newData.links.push({
          label: "Usage Type",
          source: ioc,
          target: "AbuseIPDB:UsageType",
        });
        nodeNumber++;
        newData.nodes.push({
          id: "AbuseIPDB:Domain",
          name: graphData.abuseIPDB.data.domain,

          color: "lightgreen",
          x: centerX + radius * Math.cos(angleIncrement * nodeNumber),
          y: centerY + radius * Math.sin(angleIncrement * nodeNumber),
          viewGenerator: (node) => <EnrichmentNode icon={"domain-name.svg"} />,
        });
        newData.links.push({
          label: "Domain",
          source: ioc,
          target: "AbuseIPDB:Domain",
        });
        nodeNumber++;
        newData.nodes.push({
          id: "AbuseIPDB:IsWhiteListed",
          name: graphData.abuseIPDB.data.isWhitelisted ? "Yes" : "No",

          color: "red",
          x: centerX + radius * Math.cos(angleIncrement * nodeNumber),
          y: centerY + radius * Math.sin(angleIncrement * nodeNumber),
          viewGenerator: (node) => <EnrichmentNode icon={"sighting.svg"} />,
        });
        newData.links.push({
          label: "Is Whitelisted?",
          source: ioc,
          target: "AbuseIPDB:IsWhiteListed",
        });
        nodeNumber++;
        newData.nodes.push({
          id: "AbuseIPDB:ISP",
          name: graphData.abuseIPDB.data.isp,

          color: "purple",
          x: centerX + radius * Math.cos(angleIncrement * nodeNumber),
          y: centerY + radius * Math.sin(angleIncrement * nodeNumber),
          viewGenerator: (node) => (
            <EnrichmentNode icon={"identity-group.svg"} />
          ),
        });
        newData.links.push({
          label: "ISP",
          source: ioc,
          target: "AbuseIPDB:ISP",
        });
        nodeNumber++;
        newData.nodes.push({
          id: "AbuseIPDB:LastReported",
          name: graphData.abuseIPDB.data.lastReportedAt
            ? graphData.abuseIPDB.data.lastReportedAt
            : "Not Reported",

          color: "purple",
          x: centerX + radius * Math.cos(angleIncrement * nodeNumber),
          y: centerY + radius * Math.sin(angleIncrement * nodeNumber),
          viewGenerator: (node) => <EnrichmentNode icon={"report.svg"} />,
        });
        newData.links.push({
          label: "Last Reported At",
          source: ioc,
          target: "AbuseIPDB:LastReported",
        });
        nodeNumber++;
        newData.nodes.push({
          id: "AbuseIPDB:TotalReports",
          name: String(graphData.abuseIPDB.data.totalReports),

          color: "purple",
          x: centerX + radius * Math.cos(angleIncrement * nodeNumber),
          y: centerY + radius * Math.sin(angleIncrement * nodeNumber),
          viewGenerator: (node) => <EnrichmentNode icon={"report.svg"} />,
        });
        newData.links.push({
          label: "Total Reports",
          source: ioc,
          target: "AbuseIPDB:TotalReports",
        });
        nodeNumber++;
        newData.nodes.push({
          id: "AbuseIPDB:TotalUsers",
          name: String(graphData.abuseIPDB.data.numDistinctUsers),

          color: "purple",
          x: centerX + radius * Math.cos(angleIncrement * nodeNumber),
          y: centerY + radius * Math.sin(angleIncrement * nodeNumber),
          viewGenerator: (node) => (
            <EnrichmentNode icon={"identity-group.svg"} />
          ),
        });
        newData.links.push({
          label: "Total Users",
          source: ioc,
          target: "AbuseIPDB:TotalUsers",
        });
        nodeNumber++;
      }

      if (graphData?.ipQualityScore?.success) {
        newData.nodes.push({
          id: "IPQualityScore:FraudScore",
          name: String(graphData.ipQualityScore.fraud_score),

          color: "orange",
          x: centerX + radius * Math.cos(angleIncrement * nodeNumber),
          y: centerY + radius * Math.sin(angleIncrement * nodeNumber),
          viewGenerator: (node) => <EnrichmentNode icon={"threat-actor.svg"} />,
        });
        newData.links.push({
          label: "Fraud Score",
          source: ioc,
          target: "IPQualityScore:FraudScore",
        });
        nodeNumber++;
        newData.nodes.push({
          id: "IPQualityScore:City",
          name: String(graphData.ipQualityScore.city || "Not Available"),

          color: "orange",
          x: centerX + radius * Math.cos(angleIncrement * nodeNumber),
          y: centerY + radius * Math.sin(angleIncrement * nodeNumber),
          viewGenerator: (node) => <EnrichmentNode icon={"location.svg"} />,
        });
        newData.links.push({
          label: "City",
          source: ioc,
          target: "IPQualityScore:City",
        });
        nodeNumber++;
        newData.nodes.push({
          id: "IPQualityScore:VPN",
          name: graphData.ipQualityScore.vpn ? "Yes" : "No",

          color: "orange",
          x: centerX + radius * Math.cos(angleIncrement * nodeNumber),
          y: centerY + radius * Math.sin(angleIncrement * nodeNumber),
          viewGenerator: (node) => (
            <EnrichmentNode
              muiIcon={
                <VpnLockIcon
                  sx={{
                    color: "white",
                  }}
                />
              }
            />
          ),
        });
        newData.links.push({
          label: "Is VPN?",
          source: ioc,
          target: "IPQualityScore:VPN",
        });
        nodeNumber++;
        newData.nodes.push({
          id: "IPQualityScore:TOR",
          name: graphData.ipQualityScore.tor ? "Yes" : "No",

          color: "orange",
          x: centerX + radius * Math.cos(angleIncrement * nodeNumber),
          y: centerY + radius * Math.sin(angleIncrement * nodeNumber),
          viewGenerator: (node) => (
            <EnrichmentNode
              muiIcon={
                <RadarIcon
                  sx={{
                    color: "white",
                  }}
                />
              }
              color={"#7E4499"}
            />
          ),
        });
        newData.links.push({
          label: "Is TOR?",
          source: ioc,
          target: "IPQualityScore:TOR",
        });
        nodeNumber++;
      }
      if (graphData?.virusTotal?.data?.attributes) {
        newData.nodes.push({
          id: "VirusTotal:Harmless",
          name: String(
            graphData.virusTotal.data.attributes.last_analysis_stats
              ?.harmless || ""
          ),

          color: "orange",
          x: centerX + radius * Math.cos(angleIncrement * nodeNumber),
          y: centerY + radius * Math.sin(angleIncrement * nodeNumber),
          viewGenerator: (node) => <EnrichmentNode />,
        });
        newData.links.push({
          label: "Harmless Score/100",
          source: ioc,
          target: "VirusTotal:Harmless",
        });
        nodeNumber++;
        newData.nodes.push({
          id: "VirusTotal:Malicious",
          name: String(
            graphData.virusTotal.data.attributes.last_analysis_stats
              ?.malicious || "0"
          ),

          color: "orange",
          x: centerX + radius * Math.cos(angleIncrement * nodeNumber),
          y: centerY + radius * Math.sin(angleIncrement * nodeNumber),
          viewGenerator: (node) => <EnrichmentNode icon={"threat-actor.svg"} />,
        });
        newData.links.push({
          label: "Malicious Score/100",
          source: ioc,
          target: "VirusTotal:Malicious",
        });
        nodeNumber++;
        newData.nodes.push({
          id: "VirusTotal:Suspicious",
          name: String(
            graphData.virusTotal.data.attributes.last_analysis_stats
              ?.malicious || "0"
          ),

          color: "orange",
          x: centerX + radius * Math.cos(angleIncrement * nodeNumber),
          y: centerY + radius * Math.sin(angleIncrement * nodeNumber),
          viewGenerator: (node) => <EnrichmentNode />,
        });
        newData.links.push({
          label: "Suspicious Score/100",
          source: ioc,
          target: "VirusTotal:Suspicious",
        });
        nodeNumber++;
        newData.nodes.push({
          id: "VirusTotal:Undetected",
          name: String(
            graphData.virusTotal.data.attributes.last_analysis_stats
              ?.undetected || "0"
          ),

          color: "orange",
          x: centerX + radius * Math.cos(angleIncrement * nodeNumber),
          y: centerY + radius * Math.sin(angleIncrement * nodeNumber),
          viewGenerator: (node) => <EnrichmentNode />,
        });
        newData.links.push({
          label: "Undetected Score/100",
          source: ioc,
          target: "VirusTotal:Undetected",
        });
        nodeNumber++;
      }
      if (graphData?.alienVault?.pulse_info?.pulses) {
        graphData?.alienVault?.pulse_info?.pulses.forEach((pulse, index) => {
          if (nodeNumber > 20) {
            return;
          }
          newData.nodes.push({
            id: "AlienVault:Pulses" + index,
            name: String(pulse?.name || "-"),

            color: "lightgrey",
            x: centerX + radius * Math.cos(angleIncrement * nodeNumber),
            y: centerY + radius * Math.sin(angleIncrement * nodeNumber),
            viewGenerator: (node) => (
              <EnrichmentNode icon={"observed-data.svg"} />
            ),
          });
          newData.links.push({
            label: "Pulse",
            source: ioc,
            target: "AlienVault:Pulses" + index,
          });

          nodeNumber++;
        });
      }
      //set data to new data
      return newData;
    });
  }, [graphData]);

  const d = {
    nodes: [
      {
        id: "192.167.23.2",

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

        viewGenerator: (node) => <EnrichmentNode icon={"location"} />,
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
    width: 1300,
    highlightDegree: 1,
    initialZoom: 1.3,
    highlightOpacity: 1,
    linkHighlightBehavior: false,
    maxZoom: 2,
    minZoom: 1,
    nodeHighlightBehavior: false,
    panAndZoom: false,
    staticGraphWithDragAndDrop: true,
    d3: {
      alphaTarget: 0.05,
      gravity: -100,
      linkLength: 304,
      linkStrength: 1,
      disableLinkForce: false,
    },
    node: {
      color: "#d3d3d3",
      fontColor: "#602071",
      fontSize: 12,
      fontWeight: "bold",
      highlightColor: "SAME",
      highlightFontSize: 8,
      highlightFontWeight: "bold",
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
      color: "#77767F",

      fontSize: 10,
      fontColor: "#77767F",
      fontWeight: "bold",

      highlightColor: "SAME",
      highlightFontSize: 10,
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
