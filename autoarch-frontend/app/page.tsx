"use client";

import { useState } from "react";
import NetworkVisualizer from "@/components/NetworkVisualizer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React from "react";

export default function IndexPage() {
  const [projectDescription, setProjectDescription] = useState("");
  const [archSuggestion, setArchSuggestion] = useState(null);
  const [architectureDescription, setArchitectureDescription] = useState("")
  const [preLoader, setPreLoader] = useState(false);
  
  const fetchArchSuggestion = async () => {
    setPreLoader(true); // Show preloader
    setArchSuggestion(null)
    setArchitectureDescription("")
    try {
      const response = await fetch("/api/arch_suggestion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input_text: projectDescription }),
      });
      const data = await response.json();
      setArchitectureDescription(data.architecture_description)

      const adjacency_dict = {}
      console.log(`Data: ${JSON.stringify(data)}`)
      for(var i = 0; i < data.service_list.length; i++) {
        let output_services = []
        if (data.service_list[i].output_services) {
          for(var j = 0; j < data.service_list[i].output_services.length; j++) {
            output_services.push(data.service_list[i].output_services[j].service)
          }
        } else {
          output_services = []
        }
        
        adjacency_dict[data.service_list[i].service] = output_services
      }
      console.log(adjacency_dict)
      setArchSuggestion(adjacency_dict);
    } catch (error) {
      console.error("Error fetching architecture suggestion:", error);
    } finally {
      setPreLoader(false); 
    }
  };

  const handleProjectDescriptionChange = (event) => {
    setProjectDescription(event.target.value);
  };

  const handleButtonClick = () => {
    fetchArchSuggestion();
  };

  return (
    <React.Fragment>
       <div style={{position:"relative",display:"grid", gridTemplateColumns:"1fr 3fr", borderBottomWidth:"1px"}}>
          <div style={{borderRightWidth:"1px"}}>
            <div style={{textAlign:"center"}}>
              <h3 className="scroll-m-20 border-b text-2xl font-semibold tracking-tight" style={{padding:"10px"}}>
                Description
              </h3>
            </div>
            <p className="leading-7 [&:not(:first-child)]:mt-6" style={{padding:"0px 5px"}}>
              {architectureDescription}
            </p>
          </div>
        <div style={{textAlign:"center"}}>
          <h3 className="scroll-m-20 border-b text-2xl font-semibold tracking-tight" style={{padding:"10px"}}>
            Architecture Graph
          </h3>
          {preLoader && (
            <div style={{position:"absolute", width:"100%", height:"100%"}}>
              <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className="preloader" />
            </div>
          </div>

          )}

          <NetworkVisualizer adjacencyDict={archSuggestion}/>
        </div>
      </div>

        <div className="flex w-full max-w-sm items-center space-x-2 input-container">
          <Input
            type="email"
            placeholder="Project Description"
            value={projectDescription}
            onChange={handleProjectDescriptionChange}
          />
          <Button type="submit" onClick={handleButtonClick}>
            GO
          </Button>
        </div>

   
    </React.Fragment>
  );
}