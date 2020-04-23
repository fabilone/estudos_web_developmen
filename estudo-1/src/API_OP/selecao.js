import React from 'react';

export default class Selecao extends React.Component {

    constructor() {
        super();
        this.state = ({
            db: []
        });
        this.searchDB();
    }

    searchDB() {

        fetch("./index.js", { method: 'POST' })
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    db: responseJson
                });
                console.log(responseJson);
                //console.log(this.state.db);   

            });

    }


    render(){

        return(
            <div>
                <p>Olá mundo</p>
            </div>
        );

    }



}