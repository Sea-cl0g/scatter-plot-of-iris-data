export default function Graph({ axis, data }) {
    const width = 600;
    const height = 600;

    return (
        <div>
            <p>X: {axis.x} / Y: {axis.y}</p>
        </div>
    );
}