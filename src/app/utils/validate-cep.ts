
export function validateCEP(doc: number | string) {
    var cep: string = doc.toString().replace(/^\s+|\s+$/g, '');

    var tryparse = parseInt(cep)
    if (Number.isNaN(tryparse))
        return false


    if (tryparse == 0)
        return false

    if (cep.length > 8)
        return false;
    
    cep = cep.padStart(8, '0')
    if (cep.length != 8)
        return false;

    if (checkIfEqual(cep))
        return false;

    if (checkIfSequential(tryparse))
        return false;
    return true;


}

function checkIfEqual(input: string) {
    return input.split('').every(char => char === input[0]);
}

function checkIfSequential(num: number) {
    var newNum: any = num + ''
    newNum = newNum.split('');
    var sequential = newNum.every((num: any, i: any) => i === newNum.length - 1 || num < newNum[i + 1])
    return sequential
}