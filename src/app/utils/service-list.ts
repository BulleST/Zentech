import { sortList } from "./sort-list";

export function removeIds(service: any, ids: number[], property = 'list') {
    var list = JSON.parse(JSON.stringify(service[property].value))  as any[];
    list = list.filter(x => !ids.includes(x.id));
    service[property].next(list);
}

export function remove(service: any, objeto: any, property = 'list') {
    var list = JSON.parse(JSON.stringify(service[property].value))  as any[];
    var index = list.findIndex(x => x.id == objeto.id);
    list.splice(index, 1);
    service[property].next(list);
}

export function insertOrReplace(service: any, object: any, property = 'list') {
    var list =  JSON.parse(JSON.stringify(service[property].value)) as any[];
    console.log('list', list)
    console.log('id', object.id)
    if (object.id) {
        var index = list.findIndex(x => x.id == object.id);
        console.log('index', index)
        if (index == -1 ) {
            list.push(object);
        }
        list.splice(index, 1, object);
    } else {
        list.push(object);
    }
    console.log('list', list)
    service[property].next(list);
}