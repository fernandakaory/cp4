/*1 – Crie um array contendo 10 valores de salário e utilizando o método map() atribua
um aumento de 15% para salários até 2000 e um aumento de 10% para salários acima
de 2000.*/
const salarios = [2350, 1500, 2800, 1950, 2100, 3700, 2400, 1300, 2200, 2900];
const aumentoSalario = salarios.map(salarios => {
    if(salarios <= 2000) {
        salarioModificado = (salarios  + salarios*0.15)
    }else {
        salarioModificado = salarios  + salarios*0.20
    }
    return salarioModificado.toFixed(2);
})
console.log(aumentoSalario);

/*2 – Utilizando o array de resultado do exercício anterior, crie um novo array, usando o
método filter(), contendo somente os salários superiores a 2500.
*/
const salariosMaiores2500 =  aumentoSalario.filter(salarios => salarios > 2500);
console.log(salariosMaiores2500);

/*3 – Utilizando o array de resultado do exercício anterior, usando o método reduce(),
some os valores. */
const somaSalarios = salariosMaiores2500.reduce((acumulado, atual) => parseFloat(acumulado) + parseFloat(atual));
console.log(`O resultado da soma é ${somaSalarios}`);
