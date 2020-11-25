import React, { useState } from "react";
import * as reactnative from "react-native";
import Draggable from "react-draggable"; // The default
import { Card } from "antd";
import { ZoomInOutlined, ZoomOutOutlined } from "@ant-design/icons";
import { Canvas } from "reaflow";

export default function Story(props) {
  const Recursion = (arr) => {
    return arr.map((e, i) => {
      const Element = reactnative[e.element];
      return (
        <div id={e.props.id}>
          {e.children.length != 0 ? (
            <Element
              key={i}
              onDragOver={props.allowDrop}
              onDrop={props.drop}
              {...e.props}
            >
              {Recursion(e.children)}
            </Element>
          ) : (
            <Element
              key={i}
              onDragOver={props.allowDrop}
              onDrop={props.drop}
              {...e.props}
            />
          )}
        </div>
      );
    });
  };

  const [activeDrags, setactiveDrag] = useState();
  const onStart = () => {
    let a = activeDrags;
    setactiveDrag(++a);
  };

  const onStop = () => {
    let a = activeDrags;
    setactiveDrag(--a);
  };
  const dragHandlers = { onStart, onStop };
  const [scale, setscale] = useState(0.7);
  const setS = (val) => {
    console.log({ val });
    setscale(val);
    // document.querySelector(".dgb").children[0].style.transform =
    //   "scale(" + val + ")";
  };

  const nodes = [
    {
      id: "1",
      text: "1",
    },
    {
      id: "2",
      text: "2",
    },
  ];

  const edges = [
    {
      id: "1-2",
      from: "1",
      to: "2",
    },
  ];
  return (
    <Card
      bodyStyle={{ margin: 0, padding: 0 }}
      title="Playground"
      bordered={false}
      actions={[
        <ZoomInOutlined onClick={() => setS(scale + 0.1)} />,
        <ZoomOutOutlined onClick={() => setS(scale - 0.1)} />,
      ]}
    >
      <div
        className={"dgb"}
        style={{
          height: "86vh",
          display: "flex",
          backgroundColor: "#d6d6d6",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          overflow: "auto",
        }}
      >
        <Draggable {...dragHandlers}>
          <div
            style={{
              width: 300,
              height: 700,
              background: "white",
              border: "1px solid gray",
              zoom: scale,
            }}
            onDragOver={props.allowDrop}
            onDrop={props.drop}
          >
            <reactnative.View style={{ width: "100%", height: "100%" }}>
              {Recursion(props.code)}
            </reactnative.View>
          </div>
        </Draggable>
      </div>
    </Card>
  );
}
