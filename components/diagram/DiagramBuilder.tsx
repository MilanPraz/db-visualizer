"use client";

import { useDiagramContext } from "@/providers/DiagramProvider";
import {
  Background,
  Connection,
  Controls,
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback } from "react";
import CustomBox from "./CustomBox";
import DBMLImporter from "./DBML";

const nodeTypes = {
  custom: CustomBox,
};

export default function DiagramBuilder() {
  const {
    nodes: allNodes,
    edges: allEdges,
    setNodes,
    setEdges,
    updateHistory,
  } = useDiagramContext();

  const onNodeChange = useCallback(
    (changes: any) => {
      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    [setNodes]
  );

  const onEdgeChange = useCallback(
    (changes: any) => {
      setEdges((eds) => {
        const newEdges = applyEdgeChanges(changes, eds);
        updateHistory(allNodes, newEdges);
        return newEdges;
      });
    },
    [setEdges, allNodes, updateHistory]
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((prev) => {
        const newEdges = addEdge({ ...connection, animated: true }, prev);
        updateHistory(allNodes, newEdges);
        return newEdges;
      });
    },
    [setEdges, allNodes, updateHistory]
  );

  return (
    <div className="flex  h-[100dvh] w-full">
      {/* LEFT SIDEBAR (DBML IMPORTER) */}
      <aside className="w-[520px] shrink-0 border-r border-neutral-800 bg-neutral-950 p-4 overflow-y-auto h-full">
        <h2 className="text-lg font-semibold text-neutral-200">Import DBML</h2>
        <p className="text-sm text-neutral-400 mb-4">
          Paste DBML to visualize database schema
        </p>

        <DBMLImporter />
      </aside>

      {/* DIAGRAM CANVAS */}
      <section className="relative flex-1 bg-white">
        <ReactFlow
          nodes={allNodes}
          edges={allEdges}
          onNodesChange={onNodeChange}
          onEdgesChange={onEdgeChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{
            padding: 0.3,
            minZoom: 0.8,
            maxZoom: 1,
          }}
        >
          <Background />
          <Controls
            style={{
              bottom: 10,
              left: 10,
            }}
          />
        </ReactFlow>
      </section>
    </div>
  );
}
