const CalificacionesHead = ({indexEval}) => {
    let thead = [];
    thead.push(<th key={"chae"}>A-E</th>);
    thead.push(<th key={"chn"}>Nombre</th>);
    thead.push(<th key={"chev-" + indexEval}>E<sub>{indexEval}</sub></th>);
    return <thead><tr>{thead}</tr></thead>;
};

export default CalificacionesHead;
