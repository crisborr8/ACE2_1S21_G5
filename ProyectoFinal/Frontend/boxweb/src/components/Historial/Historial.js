import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography } from "@rmwc/typography";
import { makeStyles } from '@material-ui/core/styles';
import MensajeAlertas from '../Props/MensajeAlertas';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CanvasJSReact from '../../canvasjs.react';
import { Collapse } from '@material-ui/core';

import Navegacion from "../NavBar/Navegacion";

const useStyles = makeStyles((theme) => ({
    centrarTexto: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '20px'
    },
    centrarContenido: {
        textAlign: 'center',
    },
    colorBloque:{
        backgroundColor: '#EBAC44',
        minHeight: 635
    },
    bloque: {
        textAlign: 'right',
        display: 'block',
    },
    alinearAlerta: {
        display: 'inline-block',
        width: '50%'
    },
    bloqueTabla: {
        textAlign: 'center',
        display: 'block',
    },
    alinearTabla: {
        display: 'inline-block',
        width: '88%',
        backgroundColor: '#fff',
        borderRadius: '20px'
    },
    container: {
        maxHeight: 420,
    },
    estiloAutoComplete:{
        
        // backgroundColor: '#FFF',
        width: '100%',
    },
    anchoTextField: {
        width: '70%',
        backgroundColor: '#FFF',
        borderRadius: '20px',
    },
    anchoPagination: {
        maxWidth: '70%'
    },
    bloqueGrafica: {
        textAlign: 'left',
        display: 'block',
        maxWidth: '20%'
    },
    grafica: {
        padding:'4px',
	background:'#fff',
    borderRadius: '20px',
    },
    contGrafica:{
        height: '420px',
        width: '370',
        border: '1px solid #ddd',
        background: '#f1f1f1',
        overflowx: 'scroll',
        overflowy: 'scroll',
        borderRadius: '20px',
    },
    ancho:{
        width: 'auto',
        height: 'auto',
        borderRadius: '20px',
    },
    maxAlto:{
        maxHeight: '500',
    },
    colorHeadTable:{
        backgroundColor: '#E6E6E6',
        fontWeight: 'bolder',
        fontSize: '20',
        fontFamily: 'arial',
    }
}));

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function Historial() {
    const classes = useStyles();
    let [fechasHistorial, setFechasHistorial] = useState([]);
    let [listaHoras, setListaHoras] = useState([]);
    let [banderaSinFechas, setBanderaSinFechas] = useState(false);
    let [banderaServidorCaido, setBanderaServidorCaido] = useState(false);
    let [mensajeErrorData, setMensajeErrorData] = useState('');
    let [banderaErrorData, setBanderaErrorData] = useState(false);
    let [banderaFechasNoRecup, setBnderaFechasNoRecup] = useState(false);
    let [primeraVez, setPrimeraVez] = useState(true);
    let [fechaSeleccionada, setFechaSeleccionada] = useState('');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    let [entrenamientoSeleccionado, setEntrenamientoSeleccionado] = useState({});
    const listaMediciones = [
        'Fuerza',
        'Oxígeno',
        'Velocidad',
        'Aceleración',
        'Temperatura',
        'Ritmo Cardiaco'
    ]
    let [sufijoMedicion, setSufijoMedicion]=useState('');
    let [mostrarSeleccionMedicion, setMostrarSeleccionMedicion] = useState(false);
    let [maxMinMed, setMaxMinMed] = useState([0,0,0]);
    let [options, setOptions] = useState({
        animationEnabled: true,
        title: {
            text: ""
        },
        axisY: {
            title: "",
            suffix: ""
        },
        axisX: {
            title: "Hora",
        },
       
        data: [{
            type: "splineArea",
            xValueFormatString: "",
            yValueFormatString: "",
            dataPoints: []
        }]
    });
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    };

    if (primeraVez) {
        // ENVIAR ID DE USUARIO
        const data = {
            data: {
                id_user : localStorage.getItem('id')
            }
        }
        axios.post('http://104.154.169.109:3000/fechasHistorial', data)
        // axios.get('http://localhost:5000/fechasHistorial', data)
            .then(response => {
                if (response.data.status === 'success') {
                    setBnderaFechasNoRecup(false);
                    if (response.data.data.length === 0) {
                        setBanderaSinFechas(true);
                        return;
                    }
                    setBanderaSinFechas(false);
                    let arr = [];
                    response.data.data.forEach(element => {
                        fechasHistorial.push(element.fecha)
                        let f = new Date(element.fecha)
                        arr.push((f.getDate()+1) + '/' + (f.getMonth() + 1) + '/' + f.getFullYear())
                    });
                    setFechasHistorial(arr)
                } else {
                    setBnderaFechasNoRecup(true);
                }
            });
        setPrimeraVez(false);
    }


    // const getData = async () => {
    //     try {
    //         setBanderaServidorCaido(false);
    //         const { data } = await axios.post('http://104.154.169.109:3000/fechasHistorial');

    //         if (data.status === 'success') {
    //             setBnderaFechasNoRecup(false);
    //             if (data.data.length === 0) {
    //                 setBanderaSinFechas(true);
    //                 return;
    //             }
    //             setBanderaSinFechas(false);
    //             let arr = [];
    //             data.data.forEach(element => {
    //                 let f = new Date(element.fecha)
    //                 arr.push(f.getDate() + '/' + (f.getMonth() + 1) + '/' + f.getFullYear())
    //             });
    //             setFechasHistorial(arr)
    //         } else {
    //             setBnderaFechasNoRecup(true);
    //             console.error('data22: ', data);
    //         }
    //     }
    //     catch (err) {
    //         console.error(err);
    //         setBanderaServidorCaido(true);
    //     }
    // };

    // useEffect(() => {
    //     const timeOut = setInterval(() => {
    //         getData();
    //         setFechasHistorial([...fechasHistorial]);
    //     }, 10000)
    //     getData();
    //     return () => clearInterval(timeOut);

    // }, []);

    const metodoCambiaEstadoFechaSeleccionada = (event, value) => {
        if (value === '' || value === null) {
            setMostrarSeleccionMedicion(false);
            setListaHoras([]);
            setMaxMinMed([0,0,0]);
            options.title.text = '';
            options.axisY.title = ''; 
            options.data[0].dataPoints = [];
            setSufijoMedicion('');
            setOptions({ ...options});
            return;
        }
        setFechaSeleccionada(value);
        // console.log('FECHA: ' + value);
        //ENVIAR FECHA y ID USUARIO
        const data = {
            data: {
                id_user : localStorage.getItem('id'),
                fecha: value
            }
        }
        // console.log('DATA-ENTRENAMIENTOS FECHA: ' + JSON.stringify( data))
        axios.post('http://104.154.169.109:3000/entrenamientosFecha', data)
        // axios.get('http://localhost:5000/entrenamientosFecha', data)
            .then(response => {
                // setListaHoras([]);
                let arr = [];
                if (response.data.status === "success") {
                    let i = 1;
                    response.data.data.forEach((element) => {
                        arr.push({ key: i++, id: element.id, hora: element.hora, duracion: element.duracion });
                    })
                    setListaHoras(arr);
                } else {
                    setMensajeErrorData('No se pudo recuperar la lista de horarios de los entrenamientos')
                    setBanderaErrorData(true);
                }
            });
    };

    const metodoBtnVerEntrenamiento = (event, key)=>{
        listaHoras.forEach(function (item) {
            if (item.key === key) {
                setEntrenamientoSeleccionado(item);
                setMostrarSeleccionMedicion(true);
            }
        }
        );
    }

    const metodoCambiaEstadoMedicion = (event, value) => {
        if (value === '' || value === null) {
            setMaxMinMed([0,0,0]);
            options.title.text = '';
            options.axisY.title = ''; 
            options.data[0].dataPoints = [];
            setSufijoMedicion('');
            setOptions({ ...options});
            return;
        }
        //ENVIAR TAMBIEN ID DEL ENTRENAMIENTO
        //ENVIAR MEDICION SELECCIONADA -> VALUE;
        let med = '';
        if(value === 'Aceleración'){
            med = 'Aceleracion'
        }else if(value === 'Oxígeno'){
            med = 'Oxigeno'
        }else{
            med = value
        }
        const data = {
            data: {
                id_entrenamiento: entrenamientoSeleccionado.id,
                medicion: med
            }
        }
        // console.log('DATA-HISTORIAL_MEDICION: ' + JSON.stringify( data))
        axios.post('http://104.154.169.109:3000/historialMedicion', data)
        // axios.get('http://localhost:5000/historialMedicion', data)
            .then(response => {
                let arr = [];
                if (response.data.status === "success") {
                    response.data.data.forEach((element) => {
                        arr.push({ label: element.hora, y: element.valor});
                        // arr.push({ label: '', y: element.valor});
                    })
                    options.data[0].dataPoints = arr;
                    let sufijo= '';
                    if(value === 'Temperatura'){
                       sufijo = '°C';
                    }else if(value === 'Fuerza'){
                        sufijo = 'Kp';
                    }else if(value === 'Oxígeno'){
                        sufijo = '%';
                    }else if(value === 'Velocidad'){
                        sufijo = 'm/s';
                    }else if(value === 'Aceleración'){
                        sufijo = 'm/s^2';
                    }else if(value === 'Ritmo Cardiaco'){
                        sufijo = 'ppm';
                    }
                    setSufijoMedicion(sufijo);
                    options.title.text = value;
                    options.axisY.title =  'Valor de la medición en ' + sufijo + '\n'; 
                    
                    setOptions({ ...options});
                } else {
                    setMensajeErrorData('No se pudo recuperar el historial de mediciones')
                    setBanderaErrorData(true);
                }
        });
        //ENVIAR ID_ENTRENAMIENTO
        //ENVIAR MEDICION SELECCIONADA -> VALUE;

        // console.log('DATA-MIN_MED_MAX: ' + JSON.stringify( data))
        axios.post('http://104.154.169.109:3000/minMedMax', data)
        // axios.get('http://localhost:5000/minMedMax', data)
            .then(response => {
                let arr = [];
                if (response.data.status === "success") {
                    response.data.data.forEach((element) => {
                        arr.push(element.valor);
                    });
                    setMaxMinMed(arr);
                } else {
                    setMensajeErrorData('No se pudo recuperar los valores promedio de la medición')
                    setBanderaErrorData(true);
                }
        });
    };


    return (
        <div id="CuerpoHistorial">
            <Navegacion />
            <div className="container-fluid">
            
            <br />
            {
                // console.log(listaHoras)
            }
            <div>
                {/* <div className="row justify-content-center"> */}
                <div className="row">
                <div className="col-sm">
                   
                    {/* <div className="col col-lg-6 col-md-12 col-sm-12 col-12 order-sm-last order-last order-lg-first order-md-last"> */}
                        <div className="card border-dark mb-3" style={{ width:'50%', marginLeft:'25%'}}>
                            <div style={{backgroundColor: '#E6E6E6'}}>
                            <div className="card-header">
                                <div className={classes.centrarTexto}>
                                    <Typography use="headline3">HISTORIAL</Typography>
                                </div>
                            </div>
                            </div>
                            <div className={classes.colorBloque}>
                            <div className="card-body">
                                <div className={classes.centrarContenido}>
                                    <div className={classes.bloque}>
                                        <div className={classes.alinearAlerta}>
                                            <MensajeAlertas bandera={banderaServidorCaido} tipo='error' mensaje='El servidor se encuentra fuera de línea' />
                                            <MensajeAlertas bandera={banderaSinFechas} tipo='info' mensaje='No tienes fechas de entrenamiento registradas' />
                                            <MensajeAlertas bandera={banderaFechasNoRecup} tipo='error' mensaje='No se recuperaron las fechas de entrenamiento para este usuario' />
                                            <MensajeAlertas bandera={banderaErrorData} tipo='error' mensaje={mensajeErrorData} />
                                        </div>
                                    </div>
                                    <Autocomplete
                                        key={'inS' + 1}
                                        options={fechasHistorial}
                                        getOptionLabel={(option) => option}
                                        onChange={metodoCambiaEstadoFechaSeleccionada}
                                        className={classes.estiloAutoComplete}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                required
                                                className={classes.anchoTextField}
                                                label="Selecciona una fecha" margin='normal' variant="outlined"
                                            />
                                        )}
                                    />
                                    <br />
                                    <div className={classes.bloqueTabla}>
                                        <div className={classes.alinearTabla}>


                                            <TableContainer className={classes.container}>
                                                <Table stickyHeader aria-label="sticky table">
                                                    <TableHead >
                                                        <TableRow >
                                                            <TableCell className={classes.colorHeadTable} align="right">No.</TableCell>
                                                            <TableCell className={classes.colorHeadTable} align="right">Fecha</TableCell>
                                                            <TableCell className={classes.colorHeadTable} align="right">Hora</TableCell>
                                                            <TableCell className={classes.colorHeadTable} align="right">Seleccionar</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {listaHoras.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                                            return(
                                                            <TableRow key={row.key} >
                                                                <TableCell component="th" scope="row">
                                                                    {row.key}
                                                                </TableCell>
                                                                <TableCell align="right">{fechaSeleccionada}</TableCell>
                                                                <TableCell align="right">{row.hora}</TableCell>
                                                                <TableCell align="right">
                                                                    <Button
                                                                        variant="contained"
                                                                        size="large"
                                                                        style={{ color: '#FFFFFF', backgroundColor: '#6C66E4' }}
                                                                        onClick={(e) => metodoBtnVerEntrenamiento(e, row.key)}
                                                                    >
                                                                        Ver detalles
                                            </Button>


                                                                </TableCell>
                                                            </TableRow>
                                                            );
                                                            })}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                            
                                        </div>
                                        
                                    </div>
                                    <TablePagination
                                                rowsPerPageOptions={[5, 10, 25, 55, 100]}
                                                component="div"
                                                count={listaHoras.length}
                                                rowsPerPage={rowsPerPage}
                                                page={page}
                                                // className={classes.anchoPagination}
                                                onChangePage={handleChangePage}
                                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                            />
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    {/*----- DETALLES DEL ENTRENAMIENTO -------*/}
                    {/* <div className="col col-lg-6 col-md-12 col-sm-12 col-12 order-sm-last order-last order-lg-first order-md-last"> */}
                    


                    
                </div>
                <div className="row"  >
                {(()=>{
                        if(true){
                            return <div id="Histor" className="col-sm">
                        <div className="card border-dark mb-3" style={{ width:'50%', marginLeft:'25%' }}>
                            <div className="card-header">
                                <div className={classes.centrarTexto}>
                                    <Typography use="headline3">DETALLES DEL ENTRENAMIENTO</Typography>
                                </div>
                            </div>
                            <div className={classes.colorBloque}>
                            <div className="card-body">
                                <div className={classes.centrarContenido}>
                                    <div>
                                    <label style={{fontSize: '20px', fontWeight: 'bold', fontFamily: 'Arial'}}>
                                        DURACIÓN DEL ENTRENAMIENTO: 
                                    </label>
                                    &nbsp;
                                    <label style={{fontSize: '18px', fontFamily: 'Arial'}}> 
                                        {entrenamientoSeleccionado.duracion} seg
                                    </label>
                                    </div>
                                    <Collapse in={mostrarSeleccionMedicion}>
                                    <Autocomplete
                                        key={'Med' + 1}
                                        options={listaMediciones}
                                        getOptionLabel={(option) => option}
                                        onChange={metodoCambiaEstadoMedicion}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                required
                                                className={classes.anchoTextField}
                                                label="Selecciona una medición" margin='normal' variant="outlined"
                                            />
                                        )}
                                    />
                                    </Collapse>
                                    <br></br>
                             
                                    
                                    <div>
                                    <label style={{fontSize: '18px', fontWeight: 'bold', fontFamily: 'Arial'}}>
                                        Valor mínimo: 
                                    </label>
                                    &nbsp;
                                    <label style={{fontSize: '18px', fontFamily: 'Arial'}}> 
                                        {maxMinMed[0] + sufijoMedicion}
                                    </label>
                                    &nbsp; &nbsp;
                                    <label style={{fontSize: '18px', fontWeight: 'bold', fontFamily: 'Arial'}}>
                                        Valor medio: 
                                    </label>
                                    &nbsp;
                                    <label style={{fontSize: '18px', fontFamily: 'Arial'}}> 
                                        {maxMinMed[1] + sufijoMedicion}
                                    </label>
                                    &nbsp; &nbsp; &nbsp;
                                    <label style={{fontSize: '18px', fontWeight: 'bold', fontFamily: 'Arial'}}>
                                        Valor máximo: 
                                    </label>
                                    &nbsp;
                                    <label style={{fontSize: '18px', fontFamily: 'Arial'}}> 
                                        {maxMinMed[2] + sufijoMedicion}
                                    </label>
                                    </div>
                                    <br></br>
                                    {/* <div className={classes.bloqueGrafica}> */}
                                    <div className={classes.contGrafica}>
                                        <div className={classes.ancho}>
                                            <div className={classes.grafica}>

                                                <CanvasJSChart options={options} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                        }else{}
                        
                    })()}

                </div>
                
            </div>
        </div>
        </div>
    );
}