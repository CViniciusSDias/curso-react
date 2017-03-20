import React, { Component } from 'react';
import { FormularioAutor } from './FormularioAutor';
import { TabelaAutores } from './TabelaAutores';
import PubSub from 'pubsub-js';

export class AutorBox extends Component {
    constructor() {
        super();
        this.state = {
            lista: [],
        };
    }

    componentDidMount() {
        fetch('http://cdc-react.herokuapp.com/api/autores')
            .then(resposta => resposta.json())
            .then(lista => this.setState({ lista: lista }));

        PubSub.subscribe('atualiza-lista-autores', (topico, novaListagem) => this.setState({ lista: novaListagem }));
    }

    atualizaLista(lista) {
        this.setState({ lista: lista });
    }

    render() {
        return (
            <div>
                <div className="header">
                    <h1>Cadastro de autores</h1>
                </div>
                <br/>

                <div className="content" id="content">
                    <FormularioAutor />
                    <TabelaAutores lista={this.state.lista} />
                </div>
            </div>
        );
    }
}