import { useDnD } from "@/contexts/dnd-context";
import type { NodeType } from "@/lib/flow-builder";
import { CommandIcon, MessageCircleMoreIcon } from "lucide-react";
import type { DragEvent } from "react";

const NodeTypes = {
  message: { name: "Message", icon: MessageCircleMoreIcon, nodeType: "textNode" },
} as const;

export default function NodePanel() {
  const { setType } = useDnD();

  const onDragStart = (event: DragEvent<HTMLButtonElement>, nodeType: NodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <div className="bg-indigo-500 rounded-md p-1">
          <CommandIcon className="size-4 text-white" />
        </div>
        <h2 className="text-lg font-semibold">Node Panel</h2>
      </div>
      <ul className="ml-auto grid grid-cols-2 gap-4">
        {/* BUTTONS */}
        {Object.entries(NodeTypes).map(([key, { name, icon: Icon, nodeType }]) => (
          <li key={key}>
            <button
              onDragStart={(event) => onDragStart(event, nodeType)}
              draggable
              className="px-4 py-3 rounded-md font-semibold cursor-grab hover:bg-indigo-100 flex items-center justify-center gap-2 w-full border border-indigo-500 text-indigo-500"
            >
              <Icon className="size-4" />
              {name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
