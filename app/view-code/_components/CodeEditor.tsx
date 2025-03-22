import React from "react";
import {
  Sandpack,
  SandpackCodeEditor,
  SandpackLayout,
  SandpackProvider,
} from "@codesandbox/sandpack-react";
import { DEPENDENCIES } from "@/data/Constant";
import { atomDark } from "@codesandbox/sandpack-themes";

function CodeEditor({ codeResponse, isReady }: any) {
  return (
    <div>
      {isReady ? (
        <Sandpack
          theme={atomDark}
          template="react"
          options={{
            showNavigator: true,
            showTabs: true,
            editorHeight: 680,
            externalResources: ["https://cdn.tailwindcss.com"],
          }}
          customSetup={{
            dependencies: {
              ...DEPENDENCIES,
            },
          }}
          files={{
            "/App.js": `${codeResponse}`,
          }}
        />
      ) : (
        <SandpackProvider
          template="react"
          theme={atomDark}
          files={{
            "/app.js": {
              code: `${codeResponse}`,
              active: true,
            },
          }}
          customSetup={{
            dependencies: {
              ...DEPENDENCIES,
            },
          }}
          options={{
            externalResources: ["https://cdn.tailwindcss.com"],
          }}
        >
          <SandpackLayout>
            <SandpackCodeEditor showTabs={true} style={{ height: "70vh" }} />
          </SandpackLayout>
        </SandpackProvider>
      )}
    </div>
  );
}

export default CodeEditor;
