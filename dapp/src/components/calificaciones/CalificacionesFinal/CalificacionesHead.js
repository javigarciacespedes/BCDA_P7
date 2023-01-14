const CalificacionesHead = () => {
    let thead = [];
    thead.push(<th key={"chae"}>A-Nota</th>);
    thead.push(<th key={"chn"}>Nombre</th>);
    thead.push(<th key={"chev-"}>Nota Final</th>);
    return <thead><tr>{thead}</tr></thead>;
};

export default CalificacionesHead;
