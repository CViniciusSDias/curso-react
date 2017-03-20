import React from 'react';
import { InputCustomizado } from './InputCustomizado';

export class SelectCustomizado extends InputCustomizado {

    render() {
        return (
            <div className="pure-control-group">
                <label htmlFor={this.props.name}>{this.props.label}</label>

                <select {...this.props}>
                    <option value="">Selecione</option>
                    {
                        Array.isArray(this.props.valores)
                            ? this.props.valores.map(v => <option key={v.id} value={v.id}>{v.nome}</option>)
                            : ''
                    }
                </select>
                <span className="error">{this.state.msgErro}</span>
            </div>
        );
    }
}
