import { sortList } from "./sort-list";

export function remove(service: any, objeto: any, property = 'list') {
    console.log('remove');
    var list = JSON.parse(JSON.stringify(service[property].value))  as any[];
    console.log('list', list);
    var index = list.findIndex(x => x.id == objeto.id);
    console.log('index', index);
    console.log('item', list[index]);
    list.splice(index, 1);
    console.log('list', list);
    service[property].next(list);
}

export function insertOrReplace(service: any, object: any, property = 'list') {
    var list =  JSON.parse(JSON.stringify(service[property].value)) as any[];
    if (object.id) {
        var index = list.findIndex(x => x.id == object.id);
        if (index == -1 ) {
            list.push(object);
        }
        list.splice(index, 1, object);
    } else {
        list.push(object);
    }
    service[property].next(list);
}