import React, { useEffect, useState } from "react";
import { HomeInfoCard } from "../cards/home-info-card";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
const getNewIndicators = async()=>{

    const resp = await axios.get('http://localhost:8000/api/ioc_feeds/stats/new_iocs/length/')
    return  resp.data

}
export const NewIndicatorCards = () => {
  
  const [newIndicators, setNewIndicators] = useState(0);
  const {isLoading} = useQuery(['new-indicators-num'],getNewIndicators,{
    onSuccess:(d)=>{
      console.log("New ", d)
      setNewIndicators(d?.length || 0)
    }
  })
  return (
    <div
      style={{
        marginTop: "20px",
        height: "300px",
        width: "300px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "30px 0px",
      }}
    >
      <HomeInfoCard
        title={newIndicators}
        subTitle={"NEW INDICATORS"}
        backgroundColor={"#6066F4"}
      />
      <HomeInfoCard
        title={6}
        subTitle={"SOURCES"}
        backgroundColor={"#59C3F3"}
      />
    </div>
  );
};
