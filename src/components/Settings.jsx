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

    const AxisPulldownMenu = ({ title, value, onChange }) => {
        return (
            <form>
                <label>{title}</label>
                <br/>
                <select value={value} onChange={onChange}>
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
        <div className="settings">
            <AxisPulldownMenu title="x property" value={axis.x} onChange={(e) => onXhanged(e.target.value)} />
            <AxisPulldownMenu title="y property" value={axis.y} onChange={(e) => onYhanged(e.target.value)} />
        </div>
    );
}