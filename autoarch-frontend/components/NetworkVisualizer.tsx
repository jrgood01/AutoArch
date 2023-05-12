import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

export default function NetworkVisualizer({ adjacencyDict }) {
  console.log(`Adjacency dict: ${JSON.stringify(adjacencyDict)}`)
  const d3Container = useRef(null);

  useEffect(() => {
    if (d3Container.current && adjacencyDict) {
      const svg = d3.select(d3Container.current);
      svg.select('g').selectAll('*').remove(); // Clear the graph

      const containerWidth = d3Container.current.clientWidth;
      const containerHeight = d3Container.current.clientHeight;

      const center = {
        x: containerWidth / 2,
        y: containerHeight / 2,
      };
      
      function deselectAllNodes(event) {
        if (event.target.tagName === "svg") {
          node.select("circle").attr("fill", "#222");
          nodes.forEach((n) => (n.selected = false));
        }
      }
      function selectNode(event, d) {
        const selected = !d.selected;
        
        // Deselect all nodes
        node.select("circle").attr("fill", "#222");
        nodes.forEach((n) => (n.selected = false));
        
        if (selected) {
          // Select the clicked node
          d.selected = true;
          d3.select(this).select("circle").attr("fill", "#f81ce5");
    
          // Change the color of connected nodes
          links.forEach((link) => {
            if (link.source === d || link.target === d) {
              const otherNode = link.source === d ? link.target : link.source;
              const otherNodeColor = "#eb367f";
              d3.select(`[data-id='${otherNode.id}']`)
                .select("circle")
                .attr("fill", otherNodeColor);
            }
          });
        }
      }

      const zoom = d3.zoom()
        .scaleExtent([0.1, 8])
        .on('zoom', zoomed);

      svg.call(zoom);

      const g = svg.append('g');

      const nodes = Object.keys(adjacencyDict).map((key) => ({
        id: key,
        name: key,
      }));

      const links = nodes.flatMap((node) =>
        adjacencyDict[node.id].map((targetId) => ({
          source: node.id,
          target: targetId,
        }))
      );

      const simulation = d3
        .forceSimulation(nodes)
        .force(
          "link",
          d3.forceLink(links).id((d) => d.id).distance(100)
        )
        .force("charge", d3.forceManyBody().strength(-1000))
        .force("center", d3.forceCenter(center.x, center.y))
        .force("collide", d3.forceCollide(60));
      const link = g
        .selectAll(".link")
        .data(links)
        .enter()
        .append("line")
        .attr("class", "link")
        .attr("stroke", "#555")
        .attr("stroke-width", 2);
      
    const node = g
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .on("click", selectNode)
      .attr("data-id", (d) => d.id);
      node
        .append("circle")
        .attr("r", 30)
        .attr("fill", "#222");

      node
        .append("text")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .style("fill", "white")
        .each(function(d) {
          const words = d.name.split(/\s+/);
          const len = words.length;

          // Adjust the font size based on the number of words
          const fontSize = Math.min(30 / len, 8);
          d3.select(this).style("font-size", `${fontSize}px`);

          // Create a <tspan> element for each word
          for (let i = 0; i < len; i++) {
            d3.select(this)
              .append("tspan")
              .attr("x", 0)
              .attr("y", i * fontSize - ((len - 1) * fontSize) / 2)
              .text(words[i]);
          }
        });

      function zoomed(event) {
        g.attr("transform", event.transform);
      }

      simulation.on("tick", () => {
        link
          .attr("x1", (d) => d.source.x)
          .attr("y1", (d) => d.source.y)
          .attr("x2", (d) => d.target.x)
          .attr("y2", (d) => d.target.y);

        node.attr("transform", (d) => `translate(${d.x},${d.y})`);
      });
      svg.on("click", deselectAllNodes);
    } else {
      if (d3Container.current) {
        const svg = d3.select(d3Container.current);
        svg.select('g').selectAll('*').remove(); // Clear the graph
      }
    }
  }, [adjacencyDict]);

  return (
    <div>
      <svg ref={d3Container} width="100%" height="80vh" />
    </div>
    )
}

