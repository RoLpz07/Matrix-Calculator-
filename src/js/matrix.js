console.log('Matrix Calculator.'); 

// Suma dos matrices A y B de igual dimensión
function sumarMatrices(A, B) {
    if (!sonDimensionesIguales(A, B)) {
        throw new Error('Las matrices deben tener las mismas dimensiones para sumarse.');
    }
    return A.map((fila, i) => fila.map((val, j) => val + B[i][j]));
}

// Resta dos matrices A y B de igual dimensión
function restarMatrices(A, B) {
    if (!sonDimensionesIguales(A, B)) {
        throw new Error('Las matrices deben tener las mismas dimensiones para restarse.');
    }
    return A.map((fila, i) => fila.map((val, j) => val - B[i][j]));
}

// Multiplica dos matrices A y B (A columnas = B filas)
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

// Multiplica una matriz A por un escalar k
function multiplicarPorEscalar(k, A) {
    if (typeof k !== 'number' || isNaN(k)) {
        throw new Error('El escalar debe ser un número válido.');
    }
    return A.map(fila => fila.map(val => k * val));
}

// Verifica si dos matrices tienen las mismas dimensiones
function sonDimensionesIguales(A, B) {
    return (
        Array.isArray(A) && Array.isArray(B) &&
        A.length === B.length &&
        A.every((fila, i) => Array.isArray(fila) && Array.isArray(B[i]) && fila.length === B[i].length)
    );
}

// Evento para generar los inputs de las matrices según el tamaño seleccionado
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

// Evento para limpiar los inputs y resultados
document.getElementById('limpiar').addEventListener('click', () => {
    document.getElementById('matrices-inputs').innerHTML = '';
    document.getElementById('resultado').innerHTML = '';
});

// Crea los inputs para una matriz de tamaño size x size
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

// Obtiene los valores de los inputs y construye la matriz correspondiente
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

// Muestra el resultado de una operación en el div de resultados
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

// Muestra el resultado de multiplicar por escalar para ambas matrices
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

// Evento para sumar matrices
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

// Evento para restar matrices
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

// Evento para multiplicar matrices
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

// Evento para mostrar el cuadro de multiplicación por escalar
document.getElementById('escalar').addEventListener('click', () => {
    mostrarCuadroEscalar();
});

// Muestra un cuadro para ingresar el escalar y aplicar la operación
function mostrarCuadroEscalar() {
    if (document.getElementById('cuadro-escalar')) return; // Evita duplicados

    const resultadoDiv = document.getElementById('resultado');
    const size = parseInt(document.getElementById('size').value);

    const cuadro = document.createElement('div');
    cuadro.id = 'cuadro-escalar';
    cuadro.style.background = '#232946';
    cuadro.style.border = '1.5px solid #ffd6e0';
    cuadro.style.borderRadius = '10px';
    cuadro.style.padding = '1em';
    cuadro.style.margin = '1em auto';
    cuadro.style.maxWidth = '320px';
    cuadro.style.textAlign = 'center';
    cuadro.style.boxShadow = '0 2px 8px rgba(35,69,103,0.13)';
    cuadro.innerHTML = `
        <label for="input-escalar" style="color:#ffd6e0;font-weight:600;">Escalar:</label>
        <input type="number" id="input-escalar" style="margin:0.5em 0.5em 0.5em 0.7em;width:90px;">
        <button id="aplicar-escalar" style="margin-left:0.5em;">Aplicar</button>
        <button id="cancelar-escalar" style="margin-left:0.5em;">Cancelar</button>
    `;

    resultadoDiv.prepend(cuadro);

    document.getElementById('input-escalar').focus();

    // Aplica la multiplicación por escalar
    document.getElementById('aplicar-escalar').onclick = () => {
        const k = parseFloat(document.getElementById('input-escalar').value);
        const A = obtenerMatriz('A', size);
        const B = obtenerMatriz('B', size);
        try {
            const resultadoA = multiplicarPorEscalar(k, A);
            const resultadoB = multiplicarPorEscalar(k, B);
            mostrarResultadoEscalar(resultadoA, resultadoB, k);
        } catch (e) {
            mostrarResultado(e.message);
        }
        cuadro.remove();
    };

    // Cancela la operación
    document.getElementById('cancelar-escalar').onclick = () => {
        cuadro.remove();
    };
}

// Evento para transponer matrices
document.getElementById('transponer').addEventListener('click', () => {
    const size = parseInt(document.getElementById('size').value);
    const A = obtenerMatriz('A', size);
    const B = obtenerMatriz('B', size);
    const transA = transponerMatriz(A);
    const transB = transponerMatriz(B);
    mostrarResultadoTranspuestas(transA, transB);
});

// Devuelve la transpuesta de una matriz
function transponerMatriz(M) {
    return M[0].map((_, i) => M.map(fila => fila[i]));
}

// Muestra las transpuestas de ambas matrices
function mostrarResultadoTranspuestas(transA, transB) {
    const div = document.getElementById('resultado');
    div.innerHTML = `
        <div style="display:flex; gap:2em; flex-wrap:wrap; justify-content:center;">
            <div class="result-matrix">
                <table>
                    <caption>Transpuesta de A</caption>
                    <tbody>
                        ${transA.map(fila => `<tr>${fila.map(val => `<td>${val}</td>`).join('')}</tr>`).join('')}
                    </tbody>
                </table>
            </div>
            <div class="result-matrix">
                <table>
                    <caption>Transpuesta de B</caption>
                    <tbody>
                        ${transB.map(fila => `<tr>${fila.map(val => `<td>${val}</td>`).join('')}</tr>`).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// Evento para calcular determinantes de A y B
document.getElementById('determinante').addEventListener('click', () => {
    const size = parseInt(document.getElementById('size').value);
    const A = obtenerMatriz('A', size);
    const B = obtenerMatriz('B', size);
    try {
        const detA = determinante(A).toFixed(4);
        const detB = determinante(B).toFixed(4);
        mostrarResultado(
            [
                [`det(A) = ${detA}`],
                [`det(B) = ${detB}`]
            ],
            "Determinantes"
        );
    } catch (e) {
        mostrarResultado(e.message);
    }
});

// Evento para calcular la inversa de A y B y mostrar la verificación (identidad)
document.getElementById('inversa').addEventListener('click', () => {
    const size = parseInt(document.getElementById('size').value);
    const A = obtenerMatriz('A', size);
    const B = obtenerMatriz('B', size);
    try {
        const invA = inversa(A);
        const invB = inversa(B);

        const verifA = multiplicarMatrices(A, invA);
        const verifB = multiplicarMatrices(B, invB);

        mostrarResultadoDobleInversa(invA, invB, verifA, verifB);
    } catch (e) {
        mostrarResultado(e.message);
    }
});

// Muestra la inversa y la verificación (identidad) para ambas matrices
function mostrarResultadoDobleInversa(invA, invB, verifA, verifB) {
    const div = document.getElementById('resultado');
    div.innerHTML = `
        <div style="display:flex; gap:2em; flex-wrap:wrap; justify-content:center;">
            <div class="result-matrix">
                <table>
                    <caption>Inversa de A</caption>
                    <tbody>
                        ${invA.map(fila => `<tr>${fila.map(val => `<td>${val.toFixed(4)}</td>`).join('')}</tr>`).join('')}
                    </tbody>
                </table>
                <table>
                    <caption>A × Inversa de A (Identidad)</caption>
                    <tbody>
                        ${verifA.map(fila => `<tr>${fila.map(val => `<td>${val.toFixed(4)}</td>`).join('')}</tr>`).join('')}
                    </tbody>
                </table>
            </div>
            <div class="result-matrix">
                <table>
                    <caption>Inversa de B</caption>
                    <tbody>
                        ${invB.map(fila => `<tr>${fila.map(val => `<td>${val.toFixed(4)}</td>`).join('')}</tr>`).join('')}
                    </tbody>
                </table>
                <table>
                    <caption>B × Inversa de B (Identidad)</caption>
                    <tbody>
                        ${verifB.map(fila => `<tr>${fila.map(val => `<td>${val.toFixed(4)}</td>`).join('')}</tr>`).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// Evento para mostrar la matriz identidad del tamaño seleccionado
document.getElementById('identidad').addEventListener('click', () => {
    const size = parseInt(document.getElementById('size').value);
    mostrarResultado(identidad(size), `Identidad ${size}x${size}`);
});

// Calcula el determinante de una matriz cuadrada (recursivo)
function determinante(M) {
    const n = M.length;
    if (n === 1) return M[0][0];
    if (n === 2) return M[0][0]*M[1][1] - M[0][1]*M[1][0];
    let det = 0;
    for (let j = 0; j < n; j++) {
        det += ((j % 2 === 0 ? 1 : -1) * M[0][j] * determinante(M.slice(1).map(row => row.filter((_, col) => col !== j))));
    }
    return det;
}

// Calcula la inversa de una matriz cuadrada usando Gauss-Jordan
function inversa(M) {
    const n = M.length;
    const det = determinante(M);
    if (Math.abs(det) < 1e-8) throw new Error("La matriz no es invertible.");
  
    let A = M.map((fila, i) => [...fila, ...identidad(n)[i]]);
   
    for (let i = 0; i < n; i++) {
        // Busca el mayor pivote para evitar errores numéricos
        let maxRow = i;
        for (let k = i+1; k < n; k++) if (Math.abs(A[k][i]) > Math.abs(A[maxRow][i])) maxRow = k;
        [A[i], A[maxRow]] = [A[maxRow], A[i]];
        let pivote = A[i][i];
        if (Math.abs(pivote) < 1e-8) throw new Error("La matriz no es invertible.");
        for (let j = 0; j < 2*n; j++) A[i][j] /= pivote;
        for (let k = 0; k < n; k++) {
            if (k !== i) {
                let factor = A[k][i];
                for (let j = 0; j < 2*n; j++) A[k][j] -= factor * A[i][j];
            }
        }
    }
    return A.map(fila => fila.slice(n));
}

// Genera una matriz identidad de tamaño n x n
function identidad(n) {
    return Array.from({length: n}, (_, i) =>
        Array.from({length: n}, (_, j) => (i === j ? 1 : 0))
    );
}