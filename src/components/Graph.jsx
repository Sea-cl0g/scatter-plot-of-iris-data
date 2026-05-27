import { useMemo } from "react";
import * as d3 from "d3";

export default function Graph({ axis, data }) {
    const width = 500;
    const height = 500;
    
    const plotWidth = width - 70;
    const plotHeight = height - 70;

    const plotData = [];
    for (const obj of data) {
        const point = { y: obj[axis.x], x: obj[axis.y] }
        plotData.push(point);
    }

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
                <Axis
                    xScale={xScale}
                    yScale={yScale}
                    xTicks={xTicks}
                    yTicks={yTicks}
                    plotWidth={plotWidth}
                    plotHeight={plotHeight}
                />
            </svg>
        </div>
    );
}

function Axis({ xScale, yScale, xTicks, yTicks, plotWidth, plotHeight }) {
    return (
        <g transform="translate(50,50)">
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