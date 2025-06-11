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

document.getElementById('generar').addEventListener('click', () => {
    const size = parseInt(document.getElementById('size').value);
    const matricesInputs = document.getElementById('matrices-inputs');
    matricesInputs.innerHTML = '';

  
    matricesInputs.appendChild(document.createElement('hr'));
    const labelA = document.createElement('h3');
    labelA.textContent = 'Matriz A';
    matricesInputs.appendChild(labelA);
    matricesInputs.appendChild(crearGridInputs('A', size));

   
    matricesInputs.appendChild(document.createElement('hr'));
    const labelB = document.createElement('h3');
    labelB.textContent = 'Matriz B';
    matricesInputs.appendChild(labelB);
    matricesInputs.appendChild(crearGridInputs('B', size));
});


document.getElementById('limpiar').addEventListener('click', () => {
    document.getElementById('matrices-inputs').innerHTML = '';
    document.getElementById('resultado').innerHTML = '';
});


function crearGridInputs(prefix, size) {
    const grid = document.createElement('div');
    grid.className = 'matrix-grid';
    grid.style.gridTemplateColumns = `repeat(${size}, 60px)`;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const input = document.createElement('input');
            input.type = 'number';
            input.id = `${prefix}_${i}_${j}`;
            input.value = 0;
            grid.appendChild(input);
        }
    }
    return grid;
}

function obtenerMatriz(prefix, size) {
    const matriz = [];
    for (let i = 0; i < size; i++) {
        const fila = [];
        for (let j = 0; j < size; j++) {
            const val = parseFloat(document.getElementById(`${prefix}_${i}_${j}`).value);
            fila.push(isNaN(val) ? 0 : val);
        }
        matriz.push(fila);
    }
    return matriz;
}

function mostrarResultado(resultado, titulo = "Resultado") {
    const div = document.getElementById('resultado');
    if (Array.isArray(resultado)) {
        div.innerHTML = `
            <div class="result-matrix">
                <table>
                    <caption>${titulo}</caption>
                    <tbody>
                        ${resultado.map(fila => `<tr>${fila.map(val => `<td>${val}</td>`).join('')}</tr>`).join('')}
                    </tbody>
                </table>
            </div>
        `;
    } else {
        div.innerHTML = `<div class="result-matrix"><strong>${titulo}:</strong> <span>${resultado}</span></div>`;
    }
}


function mostrarResultadoEscalar(resultadoA, resultadoB, k) {
    const div = document.getElementById('resultado');
    div.innerHTML = `
        <div style="display:flex; gap:2em; flex-wrap:wrap; justify-content:center;">
            <div class="result-matrix">
                <table>
                    <caption>Matriz A × ${k}</caption>
                    <tbody>
                        ${resultadoA.map(fila => `<tr>${fila.map(val => `<td>${val}</td>`).join('')}</tr>`).join('')}
                    </tbody>
                </table>
            </div>
            <div class="result-matrix">
                <table>
                    <caption>Matriz B × ${k}</caption>
                    <tbody>
                        ${resultadoB.map(fila => `<tr>${fila.map(val => `<td>${val}</td>`).join('')}</tr>`).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

document.getElementById('sumar').addEventListener('click', () => {
    const size = parseInt(document.getElementById('size').value);
    const A = obtenerMatriz('A', size);
    const B = obtenerMatriz('B', size);
    try {
        const resultado = sumarMatrices(A, B);
        mostrarResultado(resultado);
    } catch (e) {
        mostrarResultado(e.message);
    }
});

document.getElementById('restar').addEventListener('click', () => {
    const size = parseInt(document.getElementById('size').value);
    const A = obtenerMatriz('A', size);
    const B = obtenerMatriz('B', size);
    try {
        const resultado = restarMatrices(A, B);
        mostrarResultado(resultado);
    } catch (e) {
        mostrarResultado(e.message);
    }
});

document.getElementById('multiplicar').addEventListener('click', () => {
    const size = parseInt(document.getElementById('size').value);
    const A = obtenerMatriz('A', size);
    const B = obtenerMatriz('B', size);
    try {
        const resultado = multiplicarMatrices(A, B);
        mostrarResultado(resultado);
    } catch (e) {
        mostrarResultado(e.message);
    }
});

document.getElementById('escalar').addEventListener('click', () => {
    const size = parseInt(document.getElementById('size').value);
    const A = obtenerMatriz('A', size);
    const B = obtenerMatriz('B', size);
    const k = parseFloat(prompt('Ingrese el escalar:'));
    try {
        const resultadoA = multiplicarPorEscalar(k, A);
        const resultadoB = multiplicarPorEscalar(k, B);
        mostrarResultadoEscalar(resultadoA, resultadoB, k);
    } catch (e) {
        mostrarResultado(e.message);
    }
});