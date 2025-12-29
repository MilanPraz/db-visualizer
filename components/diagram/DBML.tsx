"use client";

import { dbmlToDiagram } from "@/lib/dbmlToDiagram";
import { useDiagramContext } from "@/providers/DiagramProvider";
import { useState } from "react";

export default function DBMLImporter() {
  const [dbml, setDbml] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { setNodes, setEdges, updateHistory } = useDiagramContext();

  function handleImport() {
    try {
      const { nodes, edges } = dbmlToDiagram(dbml);
      setNodes(nodes);
      setEdges(edges);
      updateHistory(nodes, edges);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Invalid DBML");
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <textarea
        value={dbml}
        onChange={(e) => setDbml(e.target.value)}
        placeholder="Paste DBML here..."
        className="h-64 w-full resize-none rounded-lg bg-neutral-950 border border-neutral-700
                   px-3 py-2 font-mono text-sm text-neutral-200 outline-none"
      />

      {error && (
        <div className="text-sm text-red-500 bg-red-500/10 p-2 rounded">
          {error}
        </div>
      )}

      <button
        onClick={handleImport}
        className="self-end rounded-lg bg-neutral-700 px-4 py-2
                   text-sm text-neutral-100 hover:bg-neutral-600 transition"
      >
        Visualize DBML
      </button>
    </div>
  );
}
