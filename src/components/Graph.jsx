import { useMemo, useState } from "react";
import * as d3 from "d3";

const defaultPlotColor = ["#7fc97f", "#beaed4", "#fdc086"]

export default function Graph({ axis, data }) {
    const width = 600;
    const height = 500;
    const graphTransform = "translate(50,50)";
    const plotWidth = 400;
    const plotHeight = 400;

    const plotData = [];
    for (const obj of data) {
        const point = { x: obj[axis.x], y: obj[axis.y], species: obj.species }
        plotData.push(point);
    }

    const speciesList = [...new Set(data.map((d) => d.species))];
    const [visibleSpecies, setVisibleSpecies] = useState(() => {
        return Object.fromEntries(speciesList.map((species) => [species, true]));
    });
    const plotColor = {};
    speciesList.map((d, i) => {
        plotColor[d] = i < defaultPlotColor.length ? defaultPlotColor[i] : genRandomColor(() => { return });
    })

    const xScale = useMemo(() => {
        const [min, max] = d3.extent(plotData, (p) => p.x);
        return d3.scaleLinear().domain([min ?? 0, max ?? 1]).nice().range([0, plotWidth]);
    }, [plotData]);
    const yScale = useMemo(() => {
        const [min, max] = d3.extent(plotData, (p) => p.y);
        return d3.scaleLinear().domain([min ?? 0, max ?? 1]).nice().range([plotHeight, 0]);
    }, [plotData]);

    const xTicks = useMemo(() => xScale.ticks(10), [xScale]);
    const yTicks = useMemo(() => yScale.ticks(10), [yScale]);

    return (
        <div>
            <svg width={width} height={height}>
                <g transform={graphTransform}>
                    <Axis
                        xScale={xScale}
                        yScale={yScale}
                        xTicks={xTicks}
                        yTicks={yTicks}
                        plotWidth={plotWidth}
                        plotHeight={plotHeight}
                    />
                    <Points
                        data={plotData}
                        xScale={xScale}
                        yScale={yScale}
                        visibleSpecies={visibleSpecies}
                        plotColor={plotColor}
                    />
                </g>
                <Series
                    x={plotWidth + 100}
                    y={40}
                    visibleSpecies={visibleSpecies}
                    setVisibleSpecies={setVisibleSpecies}
                    plotColor={plotColor}
                />
            </svg>
        </div>
    );
}

function Series({ x, y, visibleSpecies, setVisibleSpecies, plotColor }) {
    const entries = Object.entries(visibleSpecies);
    const tglClickedSpecies = (name) => {
        const visible = structuredClone(visibleSpecies);
        visible[name] = !visible[name];
        setVisibleSpecies(visible);
        console.log(visible);
    }
    return (
        <g transform={`translate(${x}, ${y})`}>
            {entries.map(([species, visible], i) => (
                <g key={species} transform={`translate(0, ${i * 24})`} onClick={() => tglClickedSpecies(species)}>
                    <rect width="14" height="14" fill={plotColor[species]} stroke="black" />
                    <text x="20" y="11" fontSize="12">{species}</text>
                </g>
            ))}
        </g>
    );
}

function Points({ data, xScale, yScale, visibleSpecies, plotColor }) {
    return (
        <g>
            {data.map((d, i) => {
                const isVisible = visibleSpecies[d.species];
                return (
                    <g
                        key={i}
                        style={{
                            transform: `translate(${xScale(d.x)}px, ${yScale(d.y)}px)`,
                            transition: "transform 400ms ease, opacity 250ms ease",
                            opacity: isVisible ? 1 : 0,
                            pointerEvents: isVisible ? "auto" : "none",
                        }}
                    >
                        <circle r={4} fill={plotColor[d.species]} />
                    </g>
                );
            })}
        </g>
    );
}

function Axis({ xScale, yScale, xTicks, yTicks, plotWidth, plotHeight }) {
    return (
        <g>
            <line x1="0" y1={plotHeight} x2={plotWidth} y2={plotHeight} stroke="black" />
            <line x1="0" y1="0" x2="0" y2={plotHeight} stroke="black" />

            {xTicks.map((tick) => (
                <g key={`x-${tick}`} transform={`translate(${xScale(tick)}, ${plotHeight})`}>
                    <line x1="0" y1="0" x2="0" y2="6" stroke="black" />
                    <text y="20" textAnchor="middle" fontSize="10">{tick}</text>
                </g>
            ))}

            {yTicks.map((tick) => (
                <g key={`y-${tick}`} transform={`translate(0, ${yScale(tick)})`}>
                    <line x1="0" y1="0" x2="-6" y2="0" stroke="black" />
                    <text x="-10" textAnchor="end" dominantBaseline="middle" fontSize="10">{tick}</text>
                </g>
            ))}
        </g>
    );
}