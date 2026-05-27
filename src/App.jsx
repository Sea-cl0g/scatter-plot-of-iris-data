import { useState } from "react";
import Graph from "./components/Graph";
import Settings from "./components/Settings";
import irisData from "./data/iris.json";

export default function App() {
  const [axis, setAxis] = useState({
    x: "sepal_length",
    y: "sepal_width"
  });

  return (
    <div>
      <Settings axis={axis} onAxisChanged={setAxis} data={irisData} />
      <Graph axis={axis} data={irisData} />
    </div>
  );
}
