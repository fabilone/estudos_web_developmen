import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Main extends Component{

    constructor(props){
        super(props);
        this.state = {
            usuario: []
        }
    }
    componentDidMount(){
        fetch('http://localhost:3000/')
        .then( usuario => 
            usuario.json().then( usuario => this.setState({usuario})))
    }

    render(){
        const {usuario} = this.state;

        return usuario.map((usuario, index) =>(
            <div className="">
                <div key={index}>

                    <h5>{usuario.nome}</h5>
                    <p>
                        <Link to={`/usuarios/${usuario.id}`}>
                            Detalhes
                        </Link>
                    </p>

                </div>

            </div>
        ))
    }
}