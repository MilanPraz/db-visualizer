import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDiagramContext } from "@/providers/DiagramProvider";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

/* ------------------ OPTIONS ------------------ */

const DATA_TYPES = [
  "int",
  "bigint",
  "varchar",
  "text",
  "boolean",
  "uuid",
  "timestamp",
  "date",
  "json",
];

const CONSTRAINTS = ["", "PK", "FK", "UNIQUE", "NOT NULL"];

export default function AddTable() {
  const { addNewTable } = useDiagramContext();

  const [tableName, setTableName] = useState("");
  const [columns, setColumns] = useState([
    { id: 1, name: "", dataType: "varchar", size: "255", constraint: "" },
    { id: 2, name: "", dataType: "varchar", size: "255", constraint: "" },
    { id: 3, name: "", dataType: "varchar", size: "255", constraint: "" },
  ]);

  const handleAddTable = () => {
    if (!tableName.trim()) {
      toast.error("Please enter a table name");
      return;
    }

    addNewTable({
      tableName,
      columnsData: columns.map((c) => ({
        ...c,
        dataType:
          c.dataType === "varchar" ? `varchar(${c.size || 255})` : c.dataType,
      })),
    });

    setTableName("");
    setColumns([
      { id: 1, name: "", dataType: "varchar", size: "255", constraint: "" },
      { id: 2, name: "", dataType: "varchar", size: "255", constraint: "" },
      { id: 3, name: "", dataType: "varchar", size: "255", constraint: "" },
    ]);

    toast.success("Table added successfully!");
  };

  const handleColumnChange = (id: number, field: string, value: string) => {
    setColumns((prev) =>
      prev.map((col) => (col.id === id ? { ...col, [field]: value } : col))
    );
  };

  const handleAddColumn = () => {
    setColumns((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        name: "",
        dataType: "varchar",
        size: "255",
        constraint: "",
      },
    ]);
  };

  const handleDeleteColumn = (id: number) => {
    setColumns((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="flex flex-col h-full gap-6">
      {/* TABLE NAME */}
      <div className="flex flex-col gap-2">
        <Label className="text-sm text-neutral-300">Table name</Label>
        <Input
          value={tableName}
          onChange={(e) => setTableName(e.target.value)}
          placeholder="e.g. users, orders"
          className="bg-neutral-900 border-neutral-700 text-neutral-200"
        />
      </div>

      {/* COLUMNS */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-neutral-200">Columns</h3>
          <button
            onClick={handleAddColumn}
            className="flex items-center gap-1 rounded-md bg-neutral-700 px-2 py-1
                       text-xs text-neutral-200 hover:bg-neutral-600 transition"
          >
            <Plus size={14} />
            Add column
          </button>
        </div>

        <div className="rounded-lg border border-neutral-800 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-neutral-900">
                <TableHead className="text-xs text-neutral-400">Name</TableHead>
                <TableHead className="text-xs text-neutral-400">Type</TableHead>
                <TableHead className="text-xs text-neutral-400">
                  Constraint
                </TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>

            <TableBody>
              {columns.map((col) => (
                <TableRow
                  key={col.id}
                  className="hover:bg-neutral-900/60 transition"
                >
                  {/* NAME */}
                  <TableCell>
                    <Input
                      value={col.name}
                      onChange={(e) =>
                        handleColumnChange(col.id, "name", e.target.value)
                      }
                      placeholder="id"
                      className="h-8 bg-neutral-900 border-neutral-700 text-neutral-200"
                    />
                  </TableCell>

                  {/* TYPE */}
                  <TableCell>
                    <div className="flex gap-2">
                      <select
                        value={col.dataType}
                        onChange={(e) =>
                          handleColumnChange(col.id, "dataType", e.target.value)
                        }
                        className="h-8 rounded-md bg-neutral-900 border border-neutral-700
                                   px-2 text-sm text-neutral-200"
                      >
                        {DATA_TYPES.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>

                      {col.dataType === "varchar" && (
                        <Input
                          value={col.size}
                          onChange={(e) =>
                            handleColumnChange(col.id, "size", e.target.value)
                          }
                          placeholder="255"
                          className="h-8 w-16 bg-neutral-900 border-neutral-700 text-neutral-200"
                        />
                      )}
                    </div>
                  </TableCell>

                  {/* CONSTRAINT */}
                  <TableCell>
                    <select
                      value={col.constraint}
                      onChange={(e) =>
                        handleColumnChange(col.id, "constraint", e.target.value)
                      }
                      className="h-8 w-full rounded-md bg-neutral-900 border border-neutral-700
                                 px-2 text-sm text-neutral-200"
                    >
                      {CONSTRAINTS.map((c) => (
                        <option key={c} value={c}>
                          {c || "—"}
                        </option>
                      ))}
                    </select>
                  </TableCell>

                  {/* DELETE */}
                  <TableCell>
                    <button
                      onClick={() => handleDeleteColumn(col.id)}
                      className="flex h-8 w-8 items-center justify-center
                                 rounded-md bg-red-600/80 hover:bg-red-600 transition"
                    >
                      <Trash2 size={14} />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* ACTION */}
      <Button
        onClick={handleAddTable}
        className="w-full bg-neutral-800 hover:bg-neutral-700"
      >
        Add table to diagram
      </Button>
    </div>
  );
}
