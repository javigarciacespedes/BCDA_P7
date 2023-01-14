// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.16;

// Alumnos:
// Juan Francisco Vara Sánchez
// Javier García Céspedes
// Alvaro de Blas Montalvillo

contract Asignatura {
    string public version = "2022 Full";
    /**
     * address del usuario que ha desplegado el contrato.
     * El contrato lo delpliega el owner.
     */
    address public owner;
    // Nombre de la asignatura
    string public nombre;
    // Curso académico
    string public curso;
    // Coordinador de la asignatura
    address public coordinador;
    // Estado de la asignatura
    bool public cerrada;
    // Acceder al nombre de un profesor dada su direccion
    mapping(address => string) public datosProfesor;
    //Array con las direcciones de los profesores
    address[] public profesores;

    // Datos de un alumno
    struct DatosAlumno {
        string nombre;
        string dni;
        string email;
    }
    // Acceder a los datos de un alumno dada su dirección
    mapping(address => DatosAlumno) public datosAlumno;

    /**
     * Valores de DNI usados:
     * Clave -> DNI
     * Valor -> dirección del alumno con ese DNI
     */
    mapping(string => address) public dniUsados;

    // Array con las direcciones de los alumnos matriculados
    address[] public matriculas;

    /**
     * Datos de una evaluacion
     */
    struct Evaluacion {
        string nombre;
        uint256 fecha;
        uint256 porcentaje;
        uint256 minimo;
    }

    // Evaluaciones de la asignatura
    Evaluacion[] public evaluaciones;

    // Tipos de notas: sin usar, no presentado, y nota normal entre 0 y 1000
    enum TipoNota {
        Empty,
        NP,
        Normal
    }

    /**
     * Datos de una nota
     * La calificacion esta multiplicada por 100 porque no hay decimales
     */
    struct Nota {
        TipoNota tipo;
        uint256 calificacion;
    }
    // Dado el address del alumno y el indice de evaluacion, decuelve la nota del alumno
    mapping(address => mapping(uint256 => Nota)) public calificaciones;
    // Error usado para indicar que un DNI esta duplicado
    error DNIDuplicadoError(string dni);

    //CONSTRUCTOR POR REVISAR
    // Storage: variables permanentes; Memory: variables temporales
    constructor(string memory _nombre, string memory _curso) {
        require(bytes(_nombre).length != 0, "nombre no puede ser vacio");
        require(bytes(_curso).length != 0, "curso no puede ser vacio");
        nombre = _nombre;
        curso = _curso;
        owner = msg.sender; //dirección del que llama al contrato
    }

    /**
     * Asignar la dirección del usuario coordinador
     * @param addr Direccion del usuario coordinador
     */
    function setCoordinador(address addr) public soloOwner soloAbierta {
        coordinador = addr;
    }

    /**
     * Cerrar la asignatura
     */
    function cerrar() public soloCoordinador {
        cerrada = true;
    }

    /**
     * Añadir un profesor nuevo
     * Impedir que se pueda meter un nombre vacio
     * @param _addr Direccion del profesor
     * @param _nombre El nombre del profesor
     */
    function addProfesor(address _addr, string memory _nombre)
        public
        soloOwner
        soloAbierta
    {
        require(bytes(datosProfesor[_addr]).length == 0, "Profesor ya creado");
        require(
            bytes(_nombre).length != 0,
            "Nombre de profesor no puede ser vacio"
        );

        datosProfesor[_addr] = _nombre;
        profesores.push(_addr);
    }

    /**
     * Los alumnos pueden automatricularse con el metodo automatricula
     * Impide que se pueda meter un nombre o un DNI vacios
     * El DNI debe ser unico
     * @param _nombre Nombre del alumno
     * @param _dni DNI del alumno
     * @param _email email del alumno
     */
    function automatricula(
        string memory _nombre,
        string memory _dni,
        string memory _email
    ) public soloNoMatriculados soloAbierta {
        _matricular(msg.sender, _nombre, _dni, _email);
    }

    /**
     * El owner puede matricular alumnos
     * Impide que se pueda meter un nombre o DNI vacios
     * El valor del DNI debe ser unico
     * @param _addr address del alumno
     * @param _nombre Nombre del alumno
     * @param _dni DNI del alumno
     * @param _email email del alumno
     */
    function matricular(
        address _addr,
        string memory _nombre,
        string memory _dni,
        string memory _email
    ) public soloOwner soloNoMatriculados soloAbierta {
        _matricular(_addr, _nombre, _dni, _email);
    }

    function _matricular(
        address _addr,
        string memory _nombre,
        string memory _dni,
        string memory _email
    ) private soloNoMatriculados soloAbierta {
        require(bytes(_nombre).length != 0, "El nombre no puede ser vacio");
        require(bytes(_dni).length != 0, "El DNI no puede ser vacio");

        if (dniUsados[_dni] != address(0x0)) {
            revert DNIDuplicadoError({dni: _dni});
        }
        DatosAlumno memory datos = DatosAlumno(_nombre, _dni, _email);
        datosAlumno[_addr] = datos;
        dniUsados[_dni] = _addr;
        matriculas.push(_addr);
    }

    /**
     * El numero de alumnos matriculados
     * @return El numero de alumnos matriculados
     */
    function matriculasLength() public view returns (uint256) {
        return matriculas.length;
    }

    /**
     * Permite a un alumno obtener sus propios datos
     * @return _nombre Nombre del alumno
     * @return _dni DNI del alumno
     * @return _email email del alumno que invoca al metodo
     */
    function quienSoy()
        public
        view
        soloMatriculados
        returns (
            string memory _nombre,
            string memory _dni,
            string memory _email
        )
    {
        DatosAlumno memory datos = datosAlumno[msg.sender];
        _nombre = datos.nombre;
        _dni = datos.dni;
        _email = datos.email;
    }

    /**
     * Crear una prueba de evaluacion de la asignatura
     * Las evaluaciones se meten en el array de evaluaciones y nos referiremos a ellas por su posicion en el array.
     * @param _nombre Nombre de la evaluacion
     * @param _fecha Fecha de evaluacion
     * @param _porcentaje Porcentaje de puntos que proporciona a la nota final
     * @param _minimo Nota minima necesaria para aprobar
     * @return Posicion en el array de evaluaciones
     */
    function creaEvaluacion(
        string memory _nombre,
        uint256 _fecha,
        uint256 _porcentaje,
        uint256 _minimo
    ) public soloCoordinador soloAbierta returns (uint256) {
        require(
            bytes(_nombre).length != 0,
            "El nombre de la evaluacion no puede ser vacio"
        );
        evaluaciones.push(Evaluacion(_nombre, _fecha, _porcentaje, _minimo));
        return evaluaciones.length - 1;
    }

    /**
     * Actualiza una evaluacion ya existente. (Función para Dapp_Full)
     * Dada la posicion de la evaluación, modifica sus valores.
     * @param _nombre Nombre de la evaluacion
     * @param _fecha Fecha de evaluacion
     * @param _porcentaje Porcentaje de puntos que proporciona a la nota final
     * @param _minimo Nota minima necesaria para aprobar
     */
    function cambiarEvaluacion(
        uint256 _posicion,
        string memory _nombre,
        uint256 _fecha,
        uint256 _porcentaje,
        uint256 _minimo
    ) public soloCoordinador soloAbierta {
        require(
            bytes(_nombre).length != 0,
            "El nombre de la evaluacion no puede ser vacio"
        );
        evaluaciones[_posicion] = Evaluacion(
            _nombre,
            _fecha,
            _porcentaje,
            _minimo
        );
    }

    /**
     * Numero de evaluaciones creadas
     * @return Numero de evaluaciones creadas
     */
    function evaluacionesLength() public view returns (uint256) {
        return evaluaciones.length;
    }

    /**
     * Poner la nota de un alumno en la evaluacion
     * @param alumno Direccion del alumno
     * @param evaluacion Indice de una evaluacion en el array evaluaciones
     * @param tipo Tipo de nota
     * @param calificacion Calificacion, multiplicada por 100
     */
    function califica(
        address alumno,
        uint256 evaluacion,
        TipoNota tipo,
        uint256 calificacion
    ) public soloProfesor soloAbierta {
        require(estaMatriculado(alumno), "Alumno no matriculado.");
        require(evaluacion < evaluaciones.length, "La evaluacion no existe.");
        require(calificacion <= 1000, "La nota supera el maximo permitido");

        Nota memory nota = Nota(tipo, calificacion);
        calificaciones[alumno][evaluacion] = nota;
    }

    /**
     * Devuelve el tipo de nota y la calificacion que ha sacado el alumno que invoca el metodo en la evaluacion pasada como parametro
     * @param evaluacion Indice de una evaluacion en el array de evaluaciones
     * @return tipo Tipo de nota que ha sacado el alumno
     * @return calificacion Calificacion que ha sacado el alumno
     */
    function miNota(uint256 evaluacion)
        public
        view
        soloMatriculados
        returns (TipoNota tipo, uint256 calificacion)
    {
        require(
            evaluacion < evaluaciones.length,
            "El indice de la evaluacion no existe."
        );

        Nota memory nota = calificaciones[msg.sender][evaluacion];
        tipo = nota.tipo;
        calificacion = nota.calificacion;
    }

    /**
     * Devuelve la nota final del alumno que llama a este metodo
     * Si el tipo de nota de alguna de las evaluaciones es Empty, este metodo devuelve (Empty,0)
     * Si todas las calificaciones son NP, devuleve (NP,0)
     * Si la nota final es superior a 499 y hay alguna evaluacion NP, entonces devuelve como maximo 499.
     *
     * @return tipo Tipo de nota que ha sacado el alumno
     * @return calificacion Calificacion que ha sacado el alumno
     */
    function miNotaFinal()
        public
        view
        soloMatriculados
        returns (TipoNota tipo, uint256 calificacion)
    {
        //return _notaFinal(msg.sender);
        return _notaFinal(msg.sender);
    }

    /**
     * Devuelve la nota final del alumno indicado
     * @param _addr address del alumno
     * @return tipo Tipo de nota que ha sacado el alumno
     * @return calificacion que ha sacado el alumno
     */
    function notaFinal(address _addr)
        public
        view
        returns (TipoNota tipo, uint256 calificacion)
    {
        return _notaFinal(_addr);
    }

    function _notaFinal(address _addr)
        private
        view
        returns (TipoNota tipo, uint256 calificacion)
    {
        tipo = TipoNota.NP;

        for (uint256 i = 0; i < evaluaciones.length; i++) {
            if (calificaciones[_addr][i].tipo == TipoNota.Empty) {
                return (TipoNota.Empty, 0);
            }
            if (calificaciones[_addr][i].tipo == TipoNota.Normal) {
                tipo = TipoNota.Normal;
                continue;
            }
        }
        if (tipo == TipoNota.NP) {
            return (tipo, 0);
        }

        bool suspenso = false;
        uint256 nota = 0;

        for (uint256 i = 0; i < evaluaciones.length; i++) {
            if (
                calificaciones[_addr][i].calificacion < evaluaciones[i].minimo
            ) {
                suspenso = true;
            }
            nota +=
                (calificaciones[_addr][i].calificacion *
                    evaluaciones[i].porcentaje) /
                100;
        }
        if (suspenso && nota > 499) {
            nota = 499;
        }

        tipo = TipoNota.Normal;
        calificacion = nota;
    }

    /**
     * Consulta si una direccion pertenece a un alumno matriculado
     * @param alumno Direccion del alumno
     * @return true Si es un alumno matriculado
     */
    function estaMatriculado(address alumno) private view returns (bool) {
        string memory _nombre = datosAlumno[alumno].nombre;
        return bytes(_nombre).length != 0;
    }

    /**
     * Numero de profesores añadidos
     * @return El numero de profesores añadidos
     */
    function profesoresLength() public view returns (uint256) {
        return profesores.length;
    }

    function senderMsg() public view returns (address) {
        return msg.sender;
    }

    /**
     * Modificador para que una funcion solo la pueda ejecutar el owner
     * Se usa en set Coordinador y addProfesor
     */
    modifier soloOwner() {
        require(msg.sender == owner, "Solo permitido al owner");
        _;
    }

    /**
     * Modificador para que una funcion solo la pueda ejecutar el coordinador
     * Se usa en cerrar y creaEvaluacion
     */
    modifier soloCoordinador() {
        require(msg.sender == coordinador, "Solo permitido a un coordinador");
        _;
    }

    /**
     * Modificador para que una funcion solo la pueda ejecutar el profesor
     * Se usa en califica
     */
    modifier soloProfesor() {
        string memory _nombre = datosProfesor[msg.sender];
        require(bytes(_nombre).length != 0, "Solo permitido a un profesor");
        _;
    }

    /**
     * Modificador para que una funcion solo la pueda ejecutar un alumno matriculado
     */
    modifier soloMatriculados() {
        require(
            estaMatriculado(msg.sender),
            "Solo permitido a alumnos matriculados"
        );
        _;
    }

    /**
     * Modificador para que una funcion solo la pueda ejecutar un alumno no matriculado
     */
    modifier soloNoMatriculados() {
        require(
            !estaMatriculado(msg.sender),
            "Solo permitido a alumnos NO matriculados"
        );
        _;
    }

    /**
     * Modificador para que una funcion solo la pueda ejecutar si la asignatura no esta cerrada
     * Se usa en setCooredinador, addProfesor, automatricula, creaEvaluacion y califica
     */
    modifier soloAbierta() {
        require(!cerrada, "Solo permitido si la asignatura no esta cerrada");
        _;
    }

    /**
     * No se permite la recepción de dinero
     */
    receive() external payable {
        revert("No se permite la recepcion de dinero");
    }
}
