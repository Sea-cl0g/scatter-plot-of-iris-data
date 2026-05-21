export default function App() {
  return (
    <div>
      <Settings />
      <Graph />
    </div>
  );
}

function Settings() {
  return (
    <p>test</p>
  )
}

function Graph() {
  const width = 400;
  const height = 500;
  return (
    <div>
      <svg width={width} height={height}>
        <g>
          
        </g>
      </svg>
    </div>
  )
}