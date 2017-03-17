import PubSub from 'pubsub-js';

export default class TratadorErros {

    publicaErros(resposta) {
        for (let i = 0; i < resposta.errors.length; i++) {
            let erro = resposta.errors[i];
            PubSub.publish('erro-validacao', erro);
        }
    }
}
