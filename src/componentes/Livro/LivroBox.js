import React, { Component } from 'react';
import { FormularioLivro } from './FormularioLivro';
import { TabelaLivros } from './TabelaLivros';
import PubSub from 'pubsub-js';

export class LivroBox extends Component {

    constructor() {
        super();
        this.state = {livros: []};
    }

    componentDidMount() {
        fetch('http://cdc-react.herokuapp.com/api/livros')
            .then(resposta => resposta.json())
            .then(livros => this.setState({ livros }));

        PubSub.subscribe('atualiza-lista-livros', (topico, livros) => this.setState({ livros }));
    }

    render() {
        return (
            <div>
                <div className="header">
                    <h1>Cadastro de Livros</h1>
                </div>
                <br/>

                <div className="content" id="content">
                    <FormularioLivro />
                    <TabelaLivros livros={this.state.livros} />
                </div>
            </div>
        );
    }
}