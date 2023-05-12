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
      <div style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 3fr", borderBottomWidth: "1px" }}>
        <div style={{ borderRightWidth: "1px" }}>
          <div style={{ textAlign: "center" }}>
            <h4 className="scroll-m-20 border-b text-xl font-semibold tracking-tight" style={{ padding: "10px" }}>
              Description
            </h4>
          </div>
          <p className="leading-7 [&:not(:first-child)]:mt-6" style={{ padding: "0px 5px" }}>
            {architectureDescription}
          </p>
        </div>
        <div style={{ position: "relative" }}>
          <div style={{ textAlign: "center" }}>
            <h4 className="scroll-m-20 border-b text-xl font-semibold tracking-tight" style={{ padding: "10px" }}>
              Architecture Graph
            </h4>
          </div>
          {preLoader && (
            <div style={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0 }}>
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
          <div style={{ position: "relative", textAlign: "center", paddingBottom: "20px" }}>
            <NetworkVisualizer adjacencyDict={archSuggestion} />
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
        <div className="flex w-full max-w-lg items-center space-x-2 input-container">
          <Input
            type="description"
            placeholder="Project Description"
            value={projectDescription}
            onChange={handleProjectDescriptionChange}
            style={{ width: "100%" }}
          />
          <Button type="submit" disabled={preLoader} onClick={handleButtonClick}>
            GO
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
}