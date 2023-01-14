module.exports = async callback => {

    try {
        const Asignatura = artifacts.require("./Asignatura.sol");

        // Usar las cuentas de usuario
        const accounts = await web3.eth.getAccounts();
        if (accounts.length < 8) {
            throw new Error("No hay cuentas.");
        }

        let asignatura = await Asignatura.deployed();

        // Identificar al owner:
        let owner = await asignatura.owner();
        console.log("Cuenta del owner =", owner);

        // Asignar el coordinador:
        console.log("Asignar el coordinador:");
        const coordinadorAddr = accounts[1];
        await asignatura.setCoordinador(coordinadorAddr);
        const coordAccount = await asignatura.coordinador()
        console.log("Cuenta del coordinador =", coordAccount);

        // Crear profesores:
        console.log("Add profesores:");
        const p1Addr = accounts[2];
        const p2Addr = accounts[3];
        console.log("Cuenta del primer profesor =", p1Addr);
        console.log("Cuenta del segundo profesor =", p2Addr);
        await asignatura.addProfesor(p1Addr, "Profesor Uno");
        await asignatura.addProfesor(p2Addr, "Profesor Dos");
        let P1Account = await asignatura.profesores(0);
        let P2Account = await asignatura.profesores(1);
        console.log("Profesor 1 = ", await asignatura.datosProfesor(P1Account));
        console.log("Profesor 2 = ", await asignatura.datosProfesor(P2Account));

        console.log("Crear cuatro evaluaciones:");
        await asignatura.creaEvaluacion("Parcial 1", Date.now() + 60 * 24 * 3600000, 25, 300, {from: coordAccount});
        await asignatura.creaEvaluacion("Parcial 2", Date.now() + 120 * 24 * 3600000, 30, 400, {from: coordAccount});
        await asignatura.creaEvaluacion("Práctica 1", Date.now() + 50 * 24 * 3600000, 20, 300, {from: coordAccount});
        await asignatura.creaEvaluacion("Práctica 2", Date.now() + 110 * 24 * 3600000, 25, 400, {from: coordAccount});

        // Matricular alumnos:
        console.log("Matricular a dos alumnos:");
        let evaAccount = accounts[4];
        let pepeAccount = accounts[5];
        console.log("Cuenta de Eva =", evaAccount);
        console.log("Cuenta de Pepe =", pepeAccount);
        await asignatura.automatricula("Eva Martinez", "66666666A", "em@dominio.es", {from: evaAccount});
        await asignatura.automatricula("Jose Redondo", "55555555B", "jr@stio.com", {from: pepeAccount});

        // Crear calificaciones:
        console.log("Añadir calificaciones:");
        await asignatura.califica(evaAccount,  0, 1, 0, {from: P1Account});
        await asignatura.califica(evaAccount,  1, 2, 400, {from: P1Account});
        await asignatura.califica(evaAccount,  2, 2, 750, {from: P1Account});
        await asignatura.califica(evaAccount,  3, 2, 900, {from: P1Account});
        await asignatura.califica(pepeAccount, 0, 0, 0, {from: P1Account});
        await asignatura.califica(pepeAccount, 1, 1, 0, {from: P1Account});
        await asignatura.califica(pepeAccount, 2, 2, 350, {from: P1Account});
        await asignatura.califica(pepeAccount, 3, 2, 650, {from: P1Account});

    } catch (err) {   // Capturar errores
        console.log(`Error: ${err}`);
    } finally {
        console.log("FIN");
    }

    callback();      // Terminar
};
