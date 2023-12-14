
Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}
var dataNascimento = []
for(let i = 0; i <= 97; i++) {
    var start = new Date(1940, 0, 1);
    var end = new Date(2010, 0, 1);
    var date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    dataNascimento.push(date)
}

var dataInscricao = [];
for(let i = 0; i <= 97; i++) {
    var start = new Date(dataNascimento[i]);
    start.setFullYear(start.getFullYear() + 10)
    var end = new Date();
    var date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    dataInscricao.push(date)
}

var dataObito = [];
for(let i = 0; i <= 97; i++) {
    var start = new Date(dataInscricao[i]);
    start.setFullYear(start.getFullYear() + 20)
    var end = new Date();
    var date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    dataObito.push(date)
}


var dataCap = [];
for(let i = 0; i <= 97; i++) {
    var start = new Date(dataObito[i]);
    start = start.addDays(3)
    var end = (new Date());
    var date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    dataCap.push(date)
}


dataNascimento = dataNascimento.map(x => {
    x = x.toLocaleDateString()
    return x
})
console.info('dataNascimento')
console.log(dataNascimento.join('\n'))

dataObito = dataObito.map(x => {
    x = x.getFullYear()
    return x
})
console.info('anoObito')
console.log(dataObito.join('\n'))

dataInscricao = dataInscricao.map(x => {
    x = x.toLocaleDateString()
    return x
})
console.info('Data_Inscricao')
console.log(dataInscricao.join('\n'))

var horaCap = dataCap.map(x => {
    x = (new Date(x)).toLocaleTimeString().substring(0,5).replace(':', 'h') + 'm';
    return x
})
console.info('hora_cap')
console.log(horaCap.join('\n'))

dataCap = dataCap.map(x => {
    x = x.toLocaleDateString()
    return x
})
console.info('data_cap')
console.log(dataCap.join('\n'))


const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
var constrole = []
for(let i = 0; i <= 97; i++) {
    var string = genRanHex(16);
    var aa = string.substring(0,4) + '.' + string.substring(4,8) + '.' + string.substring(8,12) + '.' + string.substring(12,16)
    constrole.push(aa)
}

console.log(constrole.join('\n'))

const getNumber = size => [...Array(size)].map(() => Math.floor(Math.random() * 8).toString(8)).join('');
var idNum = []
for(let i = 0; i <= 97; i++) {
    var string = getNumber(6);
    idNum.push(string)
}

console.log(idNum.join('\n'))