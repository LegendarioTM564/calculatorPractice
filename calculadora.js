const numeros = document.querySelectorAll('.btn-numero');
const operadores = document.querySelectorAll('.btn-operador');
const borrarTodo = document.querySelector('.btn-borrar-todo');
const borrar = document.querySelector('.btn-borrar');
const igual = document.querySelector('.btn-igual');
const textoValorAnterior = document.querySelector('#valor-anterior');
const textoValorActual = document.querySelector('#valor-actual');

class Calculadora {
    constructor(textoValorAnterior,textoValorActual){
        this.textoValorAnterior= textoValorAnterior;
        this.textoValorActual= textoValorActual;
        this.valorAnterior= '';
        this.valorActual= '';
        this.operador= undefined;
    }

    agregarNumero(numero){
        if(numero==='.' && this.valorActual.includes('.')) return;
        this.valorActual = this.valorActual + numero;
    }

    imprimirDisplay(){
        this.textoValorActual.textContent = this.valorActual; 
        this.textoValorAnterior.textContent = this.valorAnterior; 
    }

    borrar(){
        this.valorActual = this.valorActual.slice(0,-1);
    }

    operacion(operador) {
        if(this.valorActual == '') return;
        if(this.valorAnterior != '') {
            this.calculo()
        }
        this.operador = operador;
        this.valorAnterior = this.valorActual;
        this.valorActual = '';
}

    calculo() {
    let resultado
    let conversionValorAnterior = Number(this.valorAnterior);
    let conversionValorActual =  Number(this.valorActual);
    
    if(isNaN(conversionValorAnterior) || isNaN(conversionValorActual)) return
    
    switch (this.operador) {
        case '+':
        resultado = conversionValorAnterior + conversionValorActual;
        break
        case '-':
        resultado = conversionValorAnterior - conversionValorActual;
        break
        case '*':
        resultado = conversionValorAnterior * conversionValorActual;
        break
        case '/':
        resultado = conversionValorAnterior / conversionValorActual;
        break
        case '^':
        resultado = conversionValorAnterior ** conversionValorActual;
        break
        case '√':
        resultado = Math.sqrt(conversionValorAnterior);
        break
        default: return
    }
    
    this.valorActual = resultado;
    this.operador = undefined;
    this.valorAnterior= '';
}

    borrarPantalla(){
    this.valorActual= '';
    this.valorAnterior= '';
    this.operador= undefined;
}
}

const calculadora = new Calculadora (textoValorAnterior,textoValorActual);

numeros.forEach(boton => {
    boton.addEventListener('click',() => {
        calculadora.agregarNumero(boton.textContent);
        calculadora.imprimirDisplay();
    })
})

borrar.addEventListener('click', () => {
     calculadora.borrar();
     calculadora.imprimirDisplay();
})

operadores.forEach(boton => {
    boton.addEventListener('click', () => {
        calculadora.operacion(boton.textContent);
        calculadora.imprimirDisplay();
         
    })
})

igual.addEventListener('click',() =>{
    calculadora.calculo();
    calculadora.imprimirDisplay();
})

borrarTodo.addEventListener('click',() =>{
    calculadora.borrarPantalla();
    calculadora.imprimirDisplay();
})