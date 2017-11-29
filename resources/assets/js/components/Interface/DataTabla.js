import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios, { post } from 'axios';

import './DataTabla.css';

import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter} from 'material-ui/Table';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';
import FontIcon from 'material-ui/FontIcon';
import FlatPagination from 'material-ui-flat-pagination';
import CircularProgress from 'material-ui/CircularProgress';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

class DataTabla extends Component {

    constructor(props) {
        super(props);

        this.page = null;
        this.data = this.props.data;

        this.state = {
            selected: [],
            data: this.props.data,
            total: this.props.data.length,
            filter: '',
            offset: 0,
            perPage: 10,
            sort: {
                column: null,
                order: 'asc',
            },
            snack: {
                open: false,
                message: '',
            },
            delete: {
                dialogShow: false,
                dialogMessage: '',
                delete_id: [],
                delete_index: [],
            },
            upload: {
                dialogShow: false,
                file: null,
                fileName: 'No hay ningún archivo seleccionado'
            }
        };

        this.handleRowSelection = this.handleRowSelection.bind(this);
        this.handleDeleteRow = this.handleDeleteRow.bind(this);
        this.handleChangePerPage = this.handleChangePerPage.bind(this);
        this.handlePaginationClick = this.handlePaginationClick.bind(this);
        this.handleClickSelectFile = this.handleClickSelectFile.bind(this);
        this.handleClickImportar = this.handleClickImportar.bind(this);
        this.handleImportCSV = this.handleImportCSV.bind(this);
        this.handleDownloadTemplate = this.handleDownloadTemplate.bind(this);
        this.handleFilterValueChange = this.handleFilterValueChange.bind(this);
    }
    componentDidMount(){
    }
    isSelected(index) {
        return this.state.selected.indexOf(index) !== -1;
    }
    handleRowSelection(selectedRows) {
        let message;

        if('all' === selectedRows) {
            message = this.state.data.length + " filas seleccionadas";
        } else if('none' === selectedRows || selectedRows.length < 1) {
            selectedRows = [];
            message = "Ninguna fila seleccionada";
        } else if(selectedRows.length > 1) {
            message = selectedRows.length + " filas seleccionadas";
        } else {
            message = "1 fila seleccionada";
        }

        this.setState({
            selected: selectedRows,
            snack: {
                open: true,
                message: message,
            },
        });
    }
    handleFilterValueChange(event) {
        let filtered = this.data;
        let columns = this.props.columns;
        let value = event.target.value;

        filtered = _.filter(filtered, function(o) {
            let result = false;
            columns.map((val,key) => {
                if( val.key.indexOf(".") < 0) {
                    result = result || o[val.key].toUpperCase().match(value.toUpperCase());
                } else {
                    var pos = val.key.indexOf(".");
                    var key01 = val.key.substring(0,pos);
                    var key02 = val.key.substring(pos+1, val.key.length);
                    result = result || o[key01][key02].toUpperCase().match(value.toUpperCase());
                }
            });
            return result;
        });

        this.setState({
            data: filtered,
            filter: value,
            total:filtered.length,
            snack: {
                open:false,
                message: ''
            }
        });
    }
    handleDeleteRow() {
        if(this.state.selected.length) {
            let message = (this.state.selected.length > 1 ? "¿Está seguro de que desea BORRAR los registros seleccionados?" : "¿Está seguro de que desea BORRAR el registro seleccionado?");

            let array_id = [];
            let array_index = [];
            this.state.selected.map((val,key) => {
                array_id.push(this.state.data[val].id);
                array_index.push(val);
            });

            this.setState({
                delete: {
                    delete_id: array_id,
                    delete_index: array_index,
                    dialogShow:true,
                    dialogMessage:message,
                }
            });
        }
    }
    handleClickImportar() {
        this.setState({
            upload: {
                dialogShow:true,
                file: null,
                fileName: 'No hay ningún archivo seleccionado'
            }
        })
    }
    handleChangePerPage(event, key, value) {
        this.setState({
            offset: 0,
            perPage: value
        });
    }
    handlePaginationClick(offset) {
        this.setState({offset});
    }
    handleClickSelectFile(event) {
        this.setState({
            upload: {
                dialogShow:true,
                fileName: event.target.value.replace("C:\\fakepath\\", ""),
                file: event.target.files[0]
            }
        })
    }
    handleImportCSV() {
        var file = this.state.upload.file;
        var uri = '/'+this.props.api+'/import';

        this.setState({
            upload: {
                dialogShow: true,
                file: file,
                fileName:  <CircularProgress />
            }
        })

        var data = new FormData();
        data.append('file', file);

        axios.post(uri, data).then( response => {
            setTimeout(() => { // async
                this.data = response.data;
                this.setState({
                    data: response.data,
                    total: response.data.length,
                    filter: '',
                    snack: {
                        open: true,
                        message: 'Importación realizada con éxito'
                    },
                    upload: {
                        dialogShow: false,
                        file: null,
                        fileName: 'No hay ningún archivo seleccionado'
                    }
                });
            }, 1500);
        });
    }
    handleDownloadTemplate() {
        var uri = '/'+this.props.api+'/export';

        axios.get(uri).then((response) => {
            window.open(response.data);
            setTimeout(function(){ // async
                uri += '/delete';
                axios.post(uri).then((response) => {
                    console.log("Delete? =>" + response.data);
                });
            }, 500);
        });
    }

    render() {
        /* CSS Styles */
        const styles = {
            toolbar: {
                backgroundColor:'#FFFFFF',
            },
            bottomtb: {
                backgroundColor:'#FFFFFF',
                borderTop:'2px solid rgb(224,224,224)',
            },
            buttonUploadDialog: {
                margin:12,
            },
            dialog: {
                margin:12,
            },
            floating: {
                bottom:75,
                float:'right',
                marginTop:20,
                position:'fixed',
                right:75,
            },
            perPage: {
                width:100
            },
            perPageItem: {
                textAlign:'left'
            },
        }

        /* Callback functions */
        const handleHeaderColumnClick = (event, rowIndex, columnIndex) => {
            var adjustedColumnIndex = columnIndex - 1;
            var column = this.props.columns[adjustedColumnIndex];

            if (column && column.sortable) {
                var sort = this.state.sort;
                var key = column.key;
                var order = sort.column === key && sort.order === 'asc' ? 'desc' : 'asc';
                var ordered = _.orderBy(this.state.data, key, order);

                this.setState({
                    data: ordered,
                    sort: {
                        column: key,
                        order: order
                    }
                });
            }
        }
        const handleDeleteDialogClose = () => {
            this.setState({
                delete: {
                    dialogShow: false,
                    dialogMessage: '',
                    delete_id: [],
                    delete_index: [],
                }
            });
        };
        const handleUploadDialogClose = () => {
            this.setState({
                upload: {
                    dialogShow: false,
                    file: null,
                    fileName: 'No hay ningún archivo seleccionado'
                }
            });
        };
        const handleDeleteRows = () => {
            this.setState({
                delete: {
                    dialogShow: false,
                    dialogMessage: '',
                    delete_id: [],
                    delete_index: [],
                }
            });

            var deletion = this.state.delete;

            if( deletion.delete_id.length > 1 ) {
                let uri = '/'+this.props.api+'/delete';

                const request = {
                    data: deletion.delete_id
                };
                axios.post(uri, request).then((response) => {
                    let dataArr = this.state.data;
                    deletion.delete_index.map((val,key) => {
                        dataArr.splice(val-key, 1);
                    });
                    this.data = response.data;
                    this.setState({
                        delete: {
                            dialogShow: false,
                            dialogMessage: '',
                            delete_id: [],
                            delete_index: [],
                        },
                        snack: {
                            message: this.props.plural.charAt(0).toUpperCase() + this.props.plural.slice(1)+ ' borrados',
                            open: true
                        },
                        selected: [],
                        data: dataArr,
                        total: dataArr.length,
                    });
                });
            } else {
                let uri = '/'+this.props.api+'/' + deletion.delete_id;

                axios.delete(uri).then((response) => {
                    let dataArr = this.state.data;
                    dataArr.splice(deletion.delete_index, 1);
                    this.data = response.data;
                    this.setState({
                        delete: {
                            dialogShow: false,
                            dialogMessage: '',
                            delete_id: [],
                            delete_index: [],
                        },
                        snack: {
                            message: this.props.singular.charAt(0).toUpperCase() + this.props.singular.slice(1) + ' borrado',
                            open: true
                        },
                        selected: [],
                        data: dataArr,
                        total: dataArr.length,
                    });
                });
            }
        }
        const getCell = (value) => {
            let ret = [];
            this.props.columns.map((val, key) => {
                var index = this.props.columns[key].key;
                if (index.indexOf(".") > -1) {
                    var pos = index.indexOf(".");
                    var index01 = index.substring(0,pos);
                    var index02 = index.substring(pos+1, index.length);
                    ret[key] = <TableRowColumn key={key}>{value[index01][index02]}</TableRowColumn>;
                } else {
                    ret[key] = <TableRowColumn key={key}>{value[index]}</TableRowColumn>;
                }
            });
            return ret;
        }

        /* Components */
        var toptoolbar = (this.state.selected.length ?
            this.state.selected.length > 1 ?
            [
                <Toolbar key={1} style={styles.toolbar}>
                    <ToolbarGroup key={11} firstChild={true}>
                    </ToolbarGroup>
                    <ToolbarGroup key={12}>
                        <FlatButton label="Borrar" title={"Borrar "+this.props.singular} primary={true} style={styles.flatNew}  onClick={this.handleDeleteRow} icon={<FontIcon className="fa fa-trash" style={{fontSize:18}} />} />
                    </ToolbarGroup>
                </Toolbar>
            ]
            :
            [
                <Toolbar key={1} style={styles.toolbar}>
                    <ToolbarGroup key={11} firstChild={true}>
                    </ToolbarGroup>
                    <ToolbarGroup key={12}>
                        <NavLink to={"/"+this.props.route+"/editar/"+this.state.data[this.state.selected].id}><FlatButton label="Editar" title={"Editar "+this.props.singular} primary={true} style={styles.flatNew} icon={<FontIcon className="fa fa-pencil" style={{fontSize:18}} />}/></NavLink>
                        <FlatButton label="Borrar" title={"Borrar "+this.props.singular} primary={true} style={styles.flatNew}  onClick={this.handleDeleteRow} icon={<FontIcon className="fa fa-trash" style={{fontSize:18}} />} />
                    </ToolbarGroup>
                </Toolbar>
            ]
            :
            true == this.props.importCSV ?
            [
                <Toolbar key={2} style={styles.toolbar}>
                    <ToolbarGroup key={21} firstChild={true}>
                        <TextField onChange={this.handleFilterValueChange} hintText={this.props.searchText} style={{paddingLeft:20}} value={this.state.filter}/>
                    </ToolbarGroup>
                    <ToolbarGroup key={22}>
                        <NavLink to={"/"+this.props.route+"/nuevo"}><FlatButton label="Nuevo" title={"Nuevo "+this.props.singular} primary={true} style={styles.flatNew} icon={<FontIcon className="fa fa-plus-circle" style={{fontSize:18}} />}  /></NavLink>
                        <FlatButton containerElement='label' label='Importar' title={"Importar "+this.props.plural} primary={true} style={styles.flatNew} onClick={this.handleClickImportar} icon={<FontIcon className="fa fa-upload" style={{fontSize:18}} />} />
                    </ToolbarGroup>
                </Toolbar>
            ]
            :
            [
                <Toolbar key={2} style={styles.toolbar}>
                    <ToolbarGroup key={21} firstChild={true}>
                        <TextField onChange={this.handleFilterValueChange} hintText={this.props.searchText} style={{paddingLeft:20}} value={this.state.filter}/>
                    </ToolbarGroup>
                    <ToolbarGroup key={22}>
                        <NavLink to={"/"+this.props.route+"/nuevo"}><FlatButton label="Nuevo" title={"Nuevo "+this.props.singular} primary={true} style={styles.flatNew} icon={<FontIcon className="fa fa-plus-circle" style={{fontSize:18}} />}  /></NavLink>
                    </ToolbarGroup>
                </Toolbar>
            ]
        );
        var bottomtoolbar = [
            <Toolbar key={10} style={styles.bottomtb}>
                <ToolbarGroup key={100} firstChild={true} style={{marginLeft:0}}>
                    {this.state.offset > 0 ? this.state.offset : 1} - {(this.state.offset+this.state.perPage) < this.state.total ? (this.state.offset+this.state.perPage) : this.state.total} de {this.state.total} {this.props.plural}
                </ToolbarGroup>
                <ToolbarGroup key={105}>
                    <FlatPagination
                        offset={this.state.offset}
                        limit={this.state.perPage}
                        total={this.state.total}
                        onClick={(e, offset) => this.handlePaginationClick(offset)}
                    />
                </ToolbarGroup>
                <ToolbarGroup key={110}>
                    <SelectField
                        value={this.state.perPage}
                        onChange={this.handleChangePerPage}
                        style={styles.perPage} >
                            <MenuItem value={10} primaryText="10" style={styles.perPageItem} />
                            <MenuItem value={25} primaryText="25" style={styles.perPageItem} />
                            <MenuItem value={50} primaryText="50" style={styles.perPageItem} />
                            <MenuItem value={100} primaryText="100" style={styles.perPageItem} />
                            <MenuItem value={this.state.total} primaryText="Todos" style={styles.perPageItem} />
                    </SelectField>
                </ToolbarGroup>
            </Toolbar>
        ];
        const columns = this.props.columns.map((val,key) => {
            var columnClass = (true === val.sortable ? 'sortable-label' : '');
            var columnIcon  = (true === val.sortable ? <FontIcon className="fa fa-sort" style={{fontSize:14, color:'efefef',marginLeft:5}} /> : '');
            return(
                <TableHeaderColumn key={key} className={columnClass}><label>{val.label}{columnIcon}</label></TableHeaderColumn>
            );
        });
        const rows = this.state.data.slice(this.state.offset, this.state.offset+this.state.perPage).map((val, key) => {
            key += this.state.offset;
            const cells = getCell(val);
            return (
                <TableRow key={key} selected={this.isSelected(key)}>
                    {cells}
                </TableRow>
            );
        });
        const deleteDialogActions = [
            <RaisedButton label="Cancelar" style={styles.dialog} keyboardFocused={true} onClick={handleDeleteDialogClose} />,
            <RaisedButton label="Borrar" primary={true} style={styles.dialog} onClick={handleDeleteRows} />,
        ];
        const uploadDialogActions = [
            <RaisedButton label="Cancelar" style={styles.dialog} keyboardFocused={true} onClick={handleUploadDialogClose} />,
            <RaisedButton label="Importar" primary={true} style={styles.dialog} onClick={this.handleImportCSV} />,
        ]


        /* Render return */
        return(
            <div>
                <AppBar
                    title={this.props.plural}
                    iconElementLeft={<div></div>}
                    className="app-bar no-element-left"
                />
                <div className="container" style={{maxWidth:'100%'}}>
                    <Table onRowSelection={this.handleRowSelection} multiSelectable={this.props.multiSelectable}>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderColumn colSpan={this.props.columns.length} style={{padding:0}}>
                                    {toptoolbar}
                                </TableHeaderColumn>
                            </TableRow>
                            <TableRow onCellClick={handleHeaderColumnClick}>
                                {columns}
                            </TableRow>
                        </TableHeader>
                        <TableBody deselectOnClickaway={false}>
                            {rows}
                        </TableBody>
                    </Table>
                    {bottomtoolbar}
                    <Snackbar
                        open={this.state.snack.open}
                        message={this.state.snack.message}
                        autoHideDuration={5000}
                    />
                    <Dialog actions={deleteDialogActions} modal={false} open={this.state.delete.dialogShow} onRequestClose={handleDeleteDialogClose} style={{textAlign:'center'}}>
                        <p>{this.state.delete.dialogMessage}</p>
                    </Dialog>
                    <Dialog actions={uploadDialogActions} modal={false} open={this.state.upload.dialogShow} onRequestClose={handleUploadDialogClose} style={{textAlign:'center'}}>
                        <div style={{textAlign:'left'}}>
                            <p>Para hacer una carga masiva de <strong>{this.props.plural.toUpperCase()}</strong> debe subir un fichero CSV con el formato adecuado.</p>
                            <p>Descargue la plantilla con el formato para <strong>{this.props.plural.toUpperCase()}</strong> y, una vez rellenada con los datos que desea incorporar a la base de datos, pulse el botón <strong>"Seleccionar Archivo"</strong> para seleccionar el fichero CSV y a continuación <strong>"Importar"</strong>.</p>
                        </div>
                        <small>{this.state.upload.fileName}</small><br/>
                        <RaisedButton containerElement='label' label="Descargar Plantilla" primary={false} onClick={this.handleDownloadTemplate} style={styles.buttonUploadDialog} icon={<FontIcon className="fa fa-download" style={{fontSize:18}} />} />
                        <RaisedButton containerElement='label' label='Seleccionar Archivo' title={"Importar "+this.props.plural} primary={false} style={styles.buttonUploadDialog} icon={<FontIcon className="fa fa-upload" style={{fontSize:18}} />} >
                            <form ref="uploadForm" className="uploader" encType="multipart/form-data" >
                                <input ref="file" type="file" name="file" style={{display:'none'}} onChange={this.handleClickSelectFile} />
                            </form>
                        </RaisedButton>
                        <div style={{marginTop:-24}}></div>
                    </Dialog>
                </div>
                <NavLink to={"/"+this.props.route+"/nuevo"}>
                    <FloatingActionButton title={"Añadir "+this.props.singular} style={styles.floating}>
                        <ContentAdd />
                    </FloatingActionButton>
                </NavLink>
            </div>
        );
    }
}

export default DataTabla;
