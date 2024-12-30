const pantalla = document.getElementById('pantalla');
const botones = document.querySelectorAll('.btn');

let operacion = ''; 

botones.forEach(boton => {
    boton.addEventListener('click', () => {
        const valor = boton.textContent;

        if (valor === 'C') {
            operacion = '';
            pantalla.value = '';
        } else if (valor === '=') {
            try {
                pantalla.value = eval(operacion); 
                operacion = pantalla.value; 
            } catch {
                pantalla.value = 'Error';
            }
        } else {
            operacion += valor;
            pantalla.value = operacion;
        }
    });
});

document.addEventListener('keydown', (evento) => {
    const tecla = evento.key;

    if (!isNaN(tecla) || "+-*/.".includes(tecla)) {
        operacion += tecla;
        pantalla.value = operacion;
    } else if (tecla === 'Enter') {
        try {
            pantalla.value = eval(operacion);
            operacion = pantalla.value;
        } catch {
            pantalla.value = 'Error';
        }
    } else if (tecla === 'Backspace') {
        operacion = operacion.slice(0, -1);
        pantalla.value = operacion;
    } else if (tecla === 'Escape') {
        operacion = '';
        pantalla.value = '';
    }
});
