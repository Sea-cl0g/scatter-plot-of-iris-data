export default function Settings({ axis, setAxis, data }) {
    const first = Array.isArray(data) && data.length > 0 ? data[0] : {};
    const COLUMNS = Object.keys(first).filter((key) => {
        return typeof first[key] === "number" && Number.isFinite(first[key]);
    });

    const AxisPulldownMenu = (title, onChange) => {
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
            <p>tesat</p>
            <AxisPulldownMenu />
        </div>
    );
}