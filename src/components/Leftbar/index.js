import React, { useEffect, useState } from "react";
import { List, Typography, Divider, Collapse, Card, Popover } from "antd";
import * as reactnative from "react-native";
import Button from "antd/lib/button/button";
import Tree from "@widgetjs/tree";
import "./../../assets/bs.css";

const { Panel } = Collapse;

const LeftBar = (props) => {
  useEffect(() => {
    // const myTree = new Tree("#container", {
    //   data: b,
    // });
  }, []);

  // const newArr = (code, child) => {
  //   code.forEach((e, i) => {
  //     code[i].id = e.props.id;
  //     code[i].text = e.element;
  //     if (e.children > 0) {
  //       newArr(e.children, true);
  //     }
  //     if (child == false && i == code.length - 1) {
  //       const b = newArr(props.code);
  //       console.log(newArr(props.code));
  //     }
  //   });
  // };
  return (
    <div style={{ height: "100%", overflow: "auto" }}>
      <Card
        bodyStyle={{ margin: 0, padding: 0 }}
        title="Components"
        bordered={false}
      >
        <div style={{ height: "40vh", overflow: "auto" }}>
          <ul class="list-group">
            {Object.keys(reactnative).map((item, i) => {
              return (
                item.match(new RegExp(/^[A-Z]/)) !== null && (
                  <li
                    id={item}
                    onDrag={props.drag}
                    draggable={"true"}
                    class="list-group-item lii"
                  >
                    {item}
                  </li>
                )
              );
            })}
          </ul>
        </div>
      </Card>
      <Card bodyStyle={{ margin: 0, padding: 0 }} title="Hierarchy">
        <div id={"container"} style={{ height: "40vh", overflow: "auto" }}>
          <ul className="list-group ">
            <Renderer nodes={props.code} />
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default LeftBar;
const Renderer = (props) => {
  const [state, setstate] = useState("initialState");
  return props.nodes.map((e, i) => (
    <>
      <li
        className="list-group-item d-flex justify-content-between align-items-center lii"
        onClick={() => {
          if (e.children.length > 0) {
            if (
              document.querySelector("#" + e.props.id).style.display == "none"
            ) {
              document.querySelector("#" + e.props.id).style.display = "block";
              document
                .querySelector("#" + e.props.id)
                .previousElementSibling.classList.add("active");
            } else {
              document.querySelector("#" + e.props.id).style.display = "none";
              document
                .querySelector("#" + e.props.id)
                .previousElementSibling.classList.remove("active");
            }
            setstate(btoa(Math.random()).substr(10, 5));
          }
        }}
      >
        <span>
          {e.children.length == 0 ? (
            ""
          ) : document.querySelector("#" + e.props.id).style.display !==
            "none" ? (
            <Minus />
          ) : (
            <Plus />
          )}
          <span style={{ paddingLeft: 10 }}>{e.element}</span>
        </span>
        {e.children.length > 0 && (
          <span class="badge badge-primary badge-pill">
            {e.children.length}
          </span>
        )}
      </li>
      {e.children.length != 0 && (
        <ul
          style={{ paddingLeft: 10, display: "none" }}
          className="list-group"
          id={e.props.id}
        >
          <Renderer nodes={e.children} />
        </ul>
      )}
    </>
  ));
};
// const Renderer = (props) => {
//   return props.nodes.map((e) => (
//     <>
//       <li className={e.children != 0 && "folder"} style={{ listStyle: "none" }}>
//         {e.element}
//       </li>
//       {e.children != 0 && (
//         <ul>
//           <Renderer nodes={e.children} />
//         </ul>
//       )}
//     </>
//   ));
// };
const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

const Plus = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    className="bi bi-plus"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
    />
  </svg>
);

const Minus = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    class="bi bi-dash"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"
    />
  </svg>
);
