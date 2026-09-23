import type { ReactNode } from "react";

import { TreeNodeView } from "./node";
import { locales } from "./locales";

export type TreeNode = { id: string; label: ReactNode; children?: readonly TreeNode[] };

export function TreeView({
  nodes,
  className = "",
}: {
  nodes: readonly TreeNode[];
  className?: string;
}) {
  return (
    <nav aria-label={locales.label} className={`flex flex-col gap-1 ${className}`}>
      {nodes.map((node) => (
        <TreeNodeView key={node.id} node={node} />
      ))}
    </nav>
  );
}
