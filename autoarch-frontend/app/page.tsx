"use client"
import React, { useState } from "react";
import NetworkVisualizer from "@/components/NetworkVisualizer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AppInputCard } from "@/components/AppInputCard";
import { DescriptionCard } from "@/components/DescriptionCard";
import { SuggestionDisplayCard } from "@/components/SuggestionDisplayCard";

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
  const [archSuggestion, setArchSuggestion] = useState<{ [key: string]: string[] } | null>(null);
  const [architectureDescription, setArchitectureDescription] = useState<string>("");
  const [preLoader, setPreLoader] = useState<boolean>(false);

  // Function to fetch architecture suggestions from the API
  const fetchArchSuggestion = async (projectDescription : string) => {
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
      console.log(data)
      setArchSuggestion(adjacency_dict);
    } catch (error) {
      console.error("Error fetching architecture suggestion:", error);
    } finally {
      setPreLoader(false); // Hide preloader
    }
  };

  const handleFetchSuggestions = (projectDescription : string) => {
    fetchArchSuggestion(projectDescription)
  };

  return (
    <React.Fragment>
      {/* Grid layout container */}
      <div style={{ 
        top: "100px",
        display: "grid", 
        gridTemplateColumns: "3fr 400px", 
        gridTemplateRows: "9fr 1fr",
        height: "100vh"
        }}>
          <div>
            <div style={{
              paddingTop: "20px", 
              height:"100%", 
              paddingLeft:"20px"}}>
                <SuggestionDisplayCard archSuggestion={archSuggestion} />

            </div>
          </div>
          <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center",
            marginTop: "20px",

            gap: "20px",
          }}>
            <div style={{height:"350px"}}>
            <AppInputCard loading={preLoader} onSubmit={fetchArchSuggestion} />
            </div>

            <div style={{minHeight:"calc(100% - 350px)"}}>
            <DescriptionCard generatedDescription={architectureDescription}/>
            </div>
          </div>
      </div>
    </React.Fragment>
  );
};

export default IndexPage;

