import React, { Component } from 'react';
import { InputCustomizado } from './../InputCustomizado';
import { SubmitCustomizado } from './../SubmitCustomizado';
import PubSub from 'pubsub-js';
import TratadorErros from './../../servicos/TratadorErros';

export class FormularioAutor extends Component {
    constructor() {
        super();
        this.state = { nome: '', email: '', senha: '' };
    }

    enviaForm(reactEvent) {
        reactEvent.preventDefault();
        let requestConfig = {
            headers: { 'Content-Type': 'application/json' },
            method: 'post',
            body: JSON.stringify({
                nome: this.state.nome,
                email: this.state.email,
                senha: this.state.senha
            })
        };
        PubSub.publish('limpa-erros', {});
        fetch('http://cdc-react.herokuapp.com/api/autores', requestConfig)
            .then(resposta => {
                if (resposta.status === 400) {
                    throw resposta.json();
                }
                return resposta;
            })
            .then(resposta => resposta.json())
            .then(lista => {
                PubSub.publish('atualiza-lista-autores', lista);
                this.setState({nome: '', email: '', senha: ''});
            })
            .catch(promiseErro => promiseErro.then(erro => new TratadorErros().publicaErros(erro)));
    }

    salvaAlteracao(nomeInput, evento) {
        this.setState({ [nomeInput]: evento.target.value });
    }

    render() {
        return (
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm.bind(this)}>
                    <InputCustomizado id="nome" type="text" name="nome"
                        value={this.state.nome} onChange={this.salvaAlteracao.bind(this, 'nome')} label="Nome" />
                    <InputCustomizado id="email" type="email" name="email"
                        value={this.state.email} onChange={this.salvaAlteracao.bind(this,  'email')} label="E-mail" />
                    <InputCustomizado id="senha" type="password" name="senha"
                        value={this.state.senha} onChange={this.salvaAlteracao.bind(this, 'senha')} label="Senha" />

                    <SubmitCustomizado />
                </form>
            </div>
        );
    }
}
