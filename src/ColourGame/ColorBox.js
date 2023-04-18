
export function ColorBox({ color }) {
    const styles = {
        fontSize: '24px',
        backgroundColor: color,
        height: "35px",
        width: "300px",
        marginTop: "10px",
    };

    return <div style={styles} className="colorbox"></div>;
}
