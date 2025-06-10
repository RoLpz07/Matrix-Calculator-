console.log('Matrix Calculator.');

function sumarMatrices(A, B) {
    if (!sonDimensionesIguales(A, B)) {
        throw new Error('Las matrices deben tener las mismas dimensiones para sumarse.');
    }
    return A.map((fila, i) => fila.map((val, j) => val + B[i][j]));
}

function restarMatrices(A, B) {
    if (!sonDimensionesIguales(A, B)) {
        throw new Error('Las matrices deben tener las mismas dimensiones para restarse.');
    }
    return A.map((fila, i) => fila.map((val, j) => val - B[i][j]));
}

function multiplicarMatrices(A, B) {
    if (A[0].length !== B.length) {
        throw new Error('El número de columnas de A debe ser igual al número de filas de B.');
    }
    let resultado = [];
    for (let i = 0; i < A.length; i++) {
        resultado[i] = [];
        for (let j = 0; j < B[0].length; j++) {
            let suma = 0;
            for (let k = 0; k < A[0].length; k++) {
                suma += A[i][k] * B[k][j];
            }
            resultado[i][j] = suma;
        }
    }
    return resultado;
}

function multiplicarPorEscalar(k, A) {
    if (typeof k !== 'number' || isNaN(k)) {
        throw new Error('El escalar debe ser un número válido.');
    }
    return A.map(fila => fila.map(val => k * val));
}

function sonDimensionesIguales(A, B) {
    return (
        Array.isArray(A) && Array.isArray(B) &&
        A.length === B.length &&
        A.every((fila, i) => Array.isArray(fila) && Array.isArray(B[i]) && fila.length === B[i].length)
    );
}

const matrizA = [
    [1, 2],
    [3, 4]
];
const matrizB = [
    [5, 6],
    [7, 8]
];

console.log('Suma:', sumarMatrices(matrizA, matrizB));
console.log('Resta:', restarMatrices(matrizA, matrizB));
console.log('Multiplicación:', multiplicarMatrices(matrizA, matrizB));
console.log('Multiplicación por escalar (2):', multiplicarPorEscalar(2, matrizA));