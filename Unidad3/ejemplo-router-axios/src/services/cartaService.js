import { API } from "./api.js"

export function getCartas(){
    return API.get('/carta')
}

export function getCartaByID(id){
    return API.get('/carta/'+id)
    // API.get(`/carta/${id}`);
    // API.get(`/carta`, {params: {id: id}});
}

export function postCarta(carta){
    return API.post('/carta', carta);
}


export function putCarta(id){
    return API.put('/carta'+id)
}