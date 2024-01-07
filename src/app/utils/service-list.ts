import { sortList } from "./sort-list";

export function remove(service: any, objeto: any, property = 'list') {
    var list = service.list.value as any[];
    var index = list.findIndex(x => x.id == objeto.id);
    list.splice(index, 1);
    service[property].next(list);
}

export function insertOrReplace(service: any, object: any, property = 'list') {
    console.group('init')
    console.log('service', service)
    console.log('object', object)
    console.log('property', property)
    var list =  service[property].value as any[];
    console.log('list', list)
    if (object.id) {
        var index = list.findIndex(x => x.id == object.id);
        console.log('index', index)
        if (index == -1 ) {
            list.push(object);
        }
        list.splice(index, 1, object);
        console.log('list', list)
    } else {
        list.push(object);
        console.log('list', list)
    }
    // list = sortList(list, 'name');
    // service.list.next(JSON.parse(JSON.stringify(list)));
    service[property].next(list);
    console.log('service[property]', service[property])
    console.log('service[property]', service[property].value)
    console.groupEnd()
}