import CalificacionRow from "./CalificacionRow";

const CalificacionesBody = ({selectAl}) => {
    let rows = [];
    rows.push(<CalificacionRow key={"cb-"+selectAl} alumnoIndex={selectAl}/>);

    return <tbody>{rows}</tbody>;
};

export default CalificacionesBody;
