import React, { Component } from 'react';
import { InputCustomizado } from './../InputCustomizado';
import { SelectCustomizado } from './../SelectCustomizado';
import { SubmitCustomizado } from './../SubmitCustomizado';
import TratadorErros from './../../servicos/TratadorErros';
import PubSub from 'pubsub-js';

export class FormularioLivro extends Component {

    constructor() {
        super();
        this.state = {titulo: '', preco: '', autorId: '', autores: []};
    }

    enviaForm(evento) {
        evento.preventDefault();

        let livro = { titulo: this.state.titulo, preco: this.state.preco, autorId: this.state.autorId };
        let requestConfig = {
            headers: { 'Content-Type': 'application/json' },
            method: 'post',
            body: JSON.stringify(livro)
        };
        PubSub.publish('limpa-erros', {});
        fetch('http://cdc-react.herokuapp.com/api/livros', requestConfig)
            .then(resposta => {
                if (!resposta.ok) {
                    throw resposta.json();
                }
                return resposta;
            })
            .then(resposta => resposta.json())
            .then(livros => {
                PubSub.publish('atualiza-lista-livros', livros);
                this.setState({ titulo: '', preco: 0, autorId: '' });
            })
            .catch(promiseErro => promiseErro.then(erro => new TratadorErros().publicaErros(erro)));
    }

    salvaAlteracao(nomeInput, evento) {
        this.setState({ [nomeInput]: evento.target.value });
    }

    componentDidMount() {
        fetch('http://cdc-react.herokuapp.com/api/autores')
            .then(resposta => resposta.json())
            .then(autores => this.setState({ autores }));
    }

    render() {
        return (
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm.bind(this)}>
                    <InputCustomizado id="titulo" type="text" name="titulo" value={this.state.titulo}
                        onChange={this.salvaAlteracao.bind(this, 'titulo')} label="Título" />
                    <InputCustomizado id="preco" type="number" name="preco" value={this.state.preco}
                        onChange={this.salvaAlteracao.bind(this, 'preco')} label="Preço" />
                    <SelectCustomizado label="Autor" name="autorId" id="autorId" valores={this.state.autores}
                        onChange={this.salvaAlteracao.bind(this, 'autorId')} value={this.state.autorId} />

                    <SubmitCustomizado />
                </form>
            </div>
        );
    }
}