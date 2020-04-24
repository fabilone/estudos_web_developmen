import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Usuario extends Component{

    state = {
        usuario: {}
    }

    componentWillMount(){
        const {id} = this.props.match.params;

        fetch(`http://localhost:3000/usuarios/${id}`)
        .then( usuario => 
            usuario.json().then(usuario => this.setState({usuario})))
    }

    render(){
        const {usuario} = this.state;

        return(
            <div>
                <h5>{usuario.nome}</h5>
                <Link to={`/usuarios`}>Voltar</Link>
                <Link to={`/usuarios`}>Editar</Link>
                <Link to={`/usuarios`}>Deletar</Link>
            </div>
        )

    }
}
