// "use client";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { useDiagramContext } from "@/providers/DiagramProvider";
// import { Handle, Position } from "@xyflow/react";
// import { PenBox, X } from "lucide-react";
// import { useState } from "react";
// import EditTable from "./EditTable";

// type TColumn = {
//   name: string;
//   dataType: string;
//   constraint: string;
// };

// export default function CustomBox({ data, id }: { data: any; id: string }) {
//   const { deleteNode, handleEditId } = useDiagramContext();
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   console.log("custom box data:", data, id);
//   return (
//     <div className="  border rounded-xl text-start text-black bg-gray-50">
//       {/* Table Header */}
//       <div className="mb-2 group flex justify-between items-center text-lg p-2 rounded-t-xl font-bold bg-gray-300">
//         {data.tableName}
//         <div className=" flex gap-2 items-center">
//           <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
//             <SheetTrigger asChild>
//               <div
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleEditId(id);
//                 }}
//                 className=" text-white bg-green-700 p-1 rounded-full group-hover:block hidden"
//               >
//                 {" "}
//                 <PenBox size={10} />
//               </div>
//             </SheetTrigger>
//             <SheetContent side={"left"} className="  w-[500px] ">
//               <SheetHeader>
//                 <SheetTitle>Configure Nodes</SheetTitle>
//                 <SheetDescription>Edit the node</SheetDescription>
//               </SheetHeader>
//               <div className="grid gap-4 py-4 ">
//                 <EditTable
//                   sidebarOpen={sidebarOpen}
//                   setSidebarOpen={setSidebarOpen}
//                 />
//               </div>
//             </SheetContent>
//           </Sheet>

//           <AlertDialog>
//             <AlertDialogTrigger asChild>
//               <div
//                 onClick={(e) => {
//                   e.stopPropagation();
//                 }}
//                 className=" text-white bg-destructive p-1 rounded-full group-hover:block hidden"
//               >
//                 {" "}
//                 <X size={10} />
//               </div>
//             </AlertDialogTrigger>
//             <AlertDialogContent>
//               <AlertDialogHeader>
//                 <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
//                 <AlertDialogDescription>
//                   This action cannot be undone. This will permanently delete
//                   your account and remove your data from our servers.
//                 </AlertDialogDescription>
//               </AlertDialogHeader>
//               <AlertDialogFooter>
//                 <AlertDialogCancel>Cancel</AlertDialogCancel>
//                 <AlertDialogAction onClick={() => deleteNode(id)}>
//                   Continue
//                 </AlertDialogAction>
//               </AlertDialogFooter>
//             </AlertDialogContent>
//           </AlertDialog>
//         </div>
//       </div>

//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead className=" capitalize">Column Name </TableHead>
//             <TableHead>Data Type</TableHead>
//             <TableHead>Constraint</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {data.columns.map((c: TColumn, idx: number) => (
//             <TableRow key={idx} className=" text-xs">
//               <TableCell className="capitalize">{c.name}</TableCell>
//               <TableCell>{c.dataType}</TableCell>
//               <TableCell>{c.constraint}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//       {/* Handles for connections */}
//       <Handle type="source" position={Position.Right} />
//       <Handle type="target" position={Position.Left} />
//     </div>
//   );
// }

"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDiagramContext } from "@/providers/DiagramProvider";
import { Handle, Position } from "@xyflow/react";
import { PenBox, Trash2 } from "lucide-react";
import { useState } from "react";
import EditTable from "./EditTable";

type TColumn = {
  name: string;
  dataType: string;
  constraint: string;
};

export default function CustomBox({ data, id }: { data: any; id: string }) {
  const { deleteNode, handleEditId } = useDiagramContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="group relative w-[340px] rounded-xl border border-neutral-800 bg-neutral-900 shadow-lg text-neutral-200">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 rounded-t-xl bg-neutral-800">
        <h3 className="text-sm font-semibold tracking-wide">
          {data.tableName}
        </h3>

        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
          {/* Edit */}
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditId(id);
                }}
                className="rounded-md bg-neutral-700 p-1.5 hover:bg-neutral-600 transition"
              >
                <PenBox size={14} />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[480px] bg-neutral-950">
              <SheetHeader>
                <SheetTitle>Configure Table</SheetTitle>
                <SheetDescription>Edit table schema</SheetDescription>
              </SheetHeader>
              <div className="py-4">
                <EditTable
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                />
              </div>
            </SheetContent>
          </Sheet>

          {/* Delete */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                onClick={(e) => e.stopPropagation()}
                className="rounded-md bg-red-600/80 p-1.5 hover:bg-red-600 transition"
              >
                <Trash2 size={14} />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete table?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. The table and all connections
                  will be permanently removed.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteNode(id)}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Table */}
      <div className="px-3 py-2">
        <Table>
          <TableHeader>
            <TableRow className="border-neutral-800">
              <TableHead className="text-xs text-neutral-400">Column</TableHead>
              <TableHead className="text-xs text-neutral-400">Type</TableHead>
              <TableHead className="text-xs text-neutral-400">
                Constraint
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.columns.map((c: TColumn, idx: number) => (
              <TableRow
                key={idx}
                className="border-neutral-800 text-xs hover:bg-neutral-800/50 transition"
              >
                <TableCell className="font-medium capitalize">
                  {c.name}
                </TableCell>
                <TableCell className="text-neutral-300">{c.dataType}</TableCell>
                <TableCell className="text-neutral-400">
                  {c.constraint || "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Handles */}
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-neutral-500 !border-neutral-700"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-neutral-500 !border-neutral-700"
      />
    </div>
  );
}
