"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function CodeBlock({ code }: { code: string }) {
  return (
    <div className="rounded-lg overflow-hidden text-sm my-3">
      <SyntaxHighlighter
        language="cpp"
        style={vscDarkPlus}
        customStyle={{ margin: 0, borderRadius: "0.5rem", fontSize: "0.82rem" }}
        showLineNumbers
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
