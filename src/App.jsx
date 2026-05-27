import { useState } from "react";
import Header from "./components/Header";
import Graph from "./components/Graph";
import Settings from "./components/Settings";
import irisData from "./data/iris.json";

export default function App() {
  const [axis, setAxis] = useState({
    x: "sepalLength",
    y: "sepalWidth"
  });

  return (
    <div>
      <Header />
      <Settings axis={axis} setAxis={setAxis} data={irisData} />
      <Graph axis={axis} data={irisData} />
    </div>
  );
}
