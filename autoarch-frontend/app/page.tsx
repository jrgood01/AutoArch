"use client"
import React, { useState } from "react";
import NetworkVisualizer from "@/components/NetworkVisualizer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Define the types for data received from the API
interface Service {
  service: string;
  output_services?: Service[];
}

interface SuggestionResponse {
  architecture_description: string;
  service_list: Service[];
}

const IndexPage: React.FC = () => {
  // State variables
  const [projectDescription, setProjectDescription] = useState<string>("");
  const [archSuggestion, setArchSuggestion] = useState<{ [key: string]: string[] } | null>(null);
  const [architectureDescription, setArchitectureDescription] = useState<string>("");
  const [preLoader, setPreLoader] = useState<boolean>(false);

  // Function to fetch architecture suggestions from the API
  const fetchArchSuggestion = async () => {
    setPreLoader(true); // Show preloader
    setArchSuggestion(null);
    setArchitectureDescription("");

    try {
      const response = await fetch("/api/arch_suggestion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input_text: projectDescription }),
      });
      
      const data: SuggestionResponse = await response.json();
      setArchitectureDescription(data.architecture_description);

      // Creating adjacency dictionary from the fetched data
      const adjacency_dict: { [key: string]: string[] } = {};
      
      for (const service of data.service_list) {
        const output_services = service.output_services?.map(outputService => outputService.service) || [];
        adjacency_dict[service.service] = output_services;
      }
      
      setArchSuggestion(adjacency_dict);
    } catch (error) {
      console.error("Error fetching architecture suggestion:", error);
    } finally {
      setPreLoader(false); // Hide preloader
    }
  };

  const handleProjectDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProjectDescription(event.target.value);
  };

  const handleButtonClick = () => {
    fetchArchSuggestion();
  };

  return (
    <React.Fragment>
      {/* Grid layout container */}
      <div style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 3fr", borderBottomWidth: "1px" }}>
        {/* Left side: Description */}
        <div style={{ borderRightWidth: "1px"}}>
          <div style={{ textAlign: "center"}}>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight" style={{ padding: "10px" }}>
              Description
            </h4>
          </div>
          <p className="leading-7 [&:not(:first-child)]:mt-6" style={{ padding: "0px 5px" }}>
            {architectureDescription}
          </p>
        </div>
        {/* Right side: Architecture Graph */}
        <div style={{ position: "relative", background:"#000" }}>
          <div style={{ textAlign: "center" }}>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight" style={{ padding: "10px" }}>
              Architecture Graph
            </h4>
          </div>
          {/* Preloader */}
          {preLoader && (
            <div style={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0 }}>
              <div
                style={{
                  position: "relative",
                  width: "                  100%",
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
          {/* NetworkVisualizer component */}
          <div style={{ position: "relative", textAlign: "center", paddingBottom: "20px" }}>
            <NetworkVisualizer adjacencyDict={archSuggestion} />
          </div>
        </div>
      </div>
      {/* Input and button section */}
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
};

export default IndexPage;

