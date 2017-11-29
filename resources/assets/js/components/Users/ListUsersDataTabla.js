import React, { Component } from 'react';
import DataTabla from '../Interface/DataTabla';

class ListUsersDataTabla extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
        };
    }

    componentDidMount(){
        axios.get('/users')
        .then(response => {
            this.setState({
                data: response.data,
            });
        })
        .catch(function (error) {
            (error);
        })
    }

    render() {

        const TABLE_COLUMNS = [
          {
            key: 'name',
            label: 'Nombre',
            sortable: true,
          }, {
            key: 'email',
            label: 'Correo electrónico',
            sortable: true,
          }, {
            key: 'role.description',
            label: 'Perfil',
            sortable: true,
          }
        ];

        if (this.state.data.length == 0) return(<div></div>);

        return(
            <DataTabla
                singular={"usuario"}
                plural={"usuarios"}
                route={"usuarios"}
                api={"users"}
                columns = {TABLE_COLUMNS}
                data={this.state.data}
                searchText={"Buscar"}
                multiSelectable={false}
                importCSV={false}
            />
        );
    }
}

export default ListUsersDataTabla;
