export default function Graph() {
    const width = 600;
    const height = 600;

    function VAxis({ max }) {
        const ticks = [];
        for (let i = 0; i <= max * 2; i++) {
            ticks.push(
                <g key={i}>
                    <text x="90" y={height - (height * i) / (max * 2)} textAnchor="end" dominantBaseline="central">
                        {i / 2}
                    </text>
                </g>
            );
        }

        return (
            <g>
                <line x1="100" y1="0" x2="100" y2={height} stroke="black" />
                {ticks}
            </g>
        );
    }

    return (
        <div>
            <svg width={width} height={height}>
                <g>
                    <VAxis max={8} />
                </g>
            </svg>
        </div>
    );
}