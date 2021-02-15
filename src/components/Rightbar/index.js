import React, { useEffect, useState } from "react";
import { Drawer, Button } from "antd";
import Prism, { highlight, languages } from "prismjs";
import Editor from "react-simple-code-editor";
import { connect } from "dva";
import { setNodes, setSelectedNode } from "../../model/app";
import syntaxValidator from "syntax-checker-new";

function Rightbar(props) {
  const code1 = `function add(a, b) {
  return a + b;
}
`;

  const [selectedNode, setselectedNode] = useState(0);
  const [code, setcode] = useState("// Visit rajaosama.me");

  useEffect(() => {
    if (!props.selectedNode) return;
    let a = undefined;
    const arr = props.selectedNode.split(":");
    arr.forEach((element) => {
      const i = element.split(";")[1];
      if (a) {
        a = a.children[i];
        // console.log("2", { a });
      } else {
        a = props.nodes[i];
        // console.log("1", { a });
      }
    });
    setselectedNode(a);
    setcode(JSON.stringify(a.props.style, null, 2));
  }, [props.selectedNode]);
  useEffect(() => {
    if (code == "// Visit rajaosama.me") return;

    try {
      eval("const a = " + code);
      let a = props.nodes;
      const arr = props.selectedNode.split(":");
      let str = "";

      arr.forEach((e, a) => {
        const i = e.split(";")[1];
        if (a == 0) {
          str = `[${i}]`;
        } else {
          str = str + `.children[${i}]`;
        }
      });

      str = `a${str}.props.style = ${code}`;
      eval(str);
      props.setNodes([...a]);
    } catch (error) {
      console.log("error Has been throwned", error);
    }
  }, [code]);

  console.log({ nodes: props.nodes });
  return (
    <div style={{ height: "100%", overflow: "auto" }}>
      <SourceDrawer data={props.nodes} />

      <Editor
        value={code}
        onValueChange={(code) => setcode(code)}
        highlight={(code) =>
          Prism.highlight(code, Prism.languages.javascript, "javascript")
        }
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12,
        }}
      />
    </div>
  );
}
export default connect(
  ({ app }) => ({
    selectedNode: app.selectedNode,
    nodes: app.nodes,
  }),
  { setNodes }
)(Rightbar);
const SourceDrawer = ({ data }) => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Open Source Map
      </Button>
      <Drawer
        title="Source map"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <div style={{ overflow: "auto" }}>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      </Drawer>
    </>
  );
};
