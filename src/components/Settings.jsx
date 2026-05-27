export default function Settings({ axis, setAxis, data }) {
    const first = Array.isArray(data) && data.length > 0 ? data[0] : {};
    const COLUMNS = Object.keys(first).filter((key) => {
        return typeof first[key] === "number" && Number.isFinite(first[key]);
    });

    const onXhanged = (value) => {
        setAxis({
            x: value,
            y: axis.y
        });
    }

    const onYhanged = (value) => {
        setAxis({
            x: axis.x,
            y: value
        });
    }

    const AxisPulldownMenu = ({ title, onChange }) => {
        return (
            <form>
                <label>{title}</label>
                <select onChange={onChange}>
                    {COLUMNS.map((name) => {
                        return (
                            <option key={name} value={name}>
                                {name}
                            </option>
                        );
                    })}
                </select>
            </form>
        );
    }

    return (
        <div>
            <AxisPulldownMenu title="x property" onChange={(e) => onXhanged(e.target.value)} />
            <AxisPulldownMenu title="y property" onChange={(e) => onYhanged(e.target.value)} />
        </div>
    );
}