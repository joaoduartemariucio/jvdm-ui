import type { TreeNode } from "./index";

export function TreeNodeView({ node }: { node: TreeNode }) {
  return node.children?.length ? (
    <details className="group" open>
      <summary className="cursor-pointer list-none rounded-sm px-3 py-2 text-sm text-ink-soft hover:bg-raised [&::-webkit-details-marker]:hidden">
        <span className="mr-2 text-ink-dim transition-transform duration-(--duration-fast) ease-out group-open:rotate-90">
          ›
        </span>
        {node.label}
      </summary>
      <div className="ml-4 border-l border-line pl-2">
        {node.children.map((child) => (
          <TreeNodeView key={child.id} node={child} />
        ))}
      </div>
    </details>
  ) : (
    <div className="rounded-sm px-3 py-2 text-sm text-ink-muted hover:bg-raised">{node.label}</div>
  );
}
