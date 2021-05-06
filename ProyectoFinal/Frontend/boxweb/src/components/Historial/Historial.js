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


const useStyles = makeStyles((theme) => ({
    centrarTexto: {
        textAlign: 'center',
    },
    centrarContenido: {
        textAlign: 'center',
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
        width: '88%'
    },
    container: {
        maxHeight: 440,
    },
    anchoTextField: {
        width: '70%',
    },
    anchoPagination: {
        maxWidth: '70%'
    },
    containerGrafica: {
        maxWidth: 4,
    },
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
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    let [entrenamientoSeleccionado, setEntrenamientoSeleccionado] = useState({});
    const listaMediciones = [
        'Fuerza',
        'Oxígeno',
        'Temperatura',
        'Ritmo Cardiaco'
    ]
    let [hisotrialMedicion, setHistorialMedicion] = useState([]);
    let [options, setOptions] = useState({
        animationEnabled: true,
        title: {
            text: ""
        },
        axisY: {
            title: "Valor de la medición\n",
            suffix: " %"
        },
        axisX: {
            title: "Tiempo",
        },
        width: '312',
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
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    if (primeraVez) {

        axios.get('http://localhost:5000/fechasHistorial')
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
                        let f = new Date(element.fecha)
                        arr.push(f.getDate() + '/' + (f.getMonth() + 1) + '/' + f.getFullYear())
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
    //         const { data } = await axios.get('http://localhost:5000/fechasHistorial');

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
            return;
        }
        setFechaSeleccionada(value);
        //ENVIAR FECHA
        axios.get('http://localhost:5000/entrenamientosFecha')
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
            }
        }
        );
    }

    const metodoCambiaEstadoMedicion = (event, value) => {
        if (value === '' || value === null) {
            return;
        }
        
        //ENVIAR MEDICION SELECCIONADA -> VALUE;
        axios.get('http://localhost:5000/historialMedicion')
            .then(response => {
                let arr = [];
                if (response.data.status === "success") {
                    response.data.data.forEach((element) => {
                        arr.push({ label: "", y: element.valor});
                    })
                    console.log(arr)
                    
                    options.data[0].dataPoints = arr;
                    options.title.text = value;
                    setOptions({ ...options});
                } else {
                    setMensajeErrorData('No se pudo recuperar el historial de mediciones')
                    setBanderaErrorData(true);
                }
            });
    };


    return (
        <div className="container-fluid">
            <br />
            {
                // console.log(listaHoras)
            }
            <div>
                {/* <div className="row justify-content-center"> */}
                <div className="row">
                    <div className="col col-lg-6 col-md-12 col-sm-12 col-12 order-sm-last order-last order-lg-first order-md-last">
                        <div className="card border-dark mb-3">
                            <div className="card-header">
                                <div className={classes.centrarTexto}>
                                    <Typography use="headline3">HISTORIAL</Typography>
                                </div>
                            </div>
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
                                                <Table stickyHeader aria-label="sticky table" >
                                                    <TableHead>
                                                        <TableRow >
                                                            <TableCell align="right">No.</TableCell>
                                                            <TableCell align="right">Fecha</TableCell>
                                                            <TableCell align="right">Hora</TableCell>
                                                            <TableCell align="right">Seleccionar</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {listaHoras.map((row) => (
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
                                                                        style={{ color: '#FFFFFF', backgroundColor: '#0B78F4' }}
                                                                        onClick={(e) => metodoBtnVerEntrenamiento(e, row.key)}
                                                                    >
                                                                        Ver detalles
                                            </Button>


                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                            <TablePagination
                                                rowsPerPageOptions={[10, 25, 100]}
                                                component="div"
                                                count={listaHoras.length}
                                                rowsPerPage={rowsPerPage}
                                                page={page}
                                                className={classes.anchoPagination}
                                                onChangePage={handleChangePage}
                                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*----- DETALLES DEL ENTRENAMIENTO -------*/}
                    <div className="col col-lg-6 col-md-12 col-sm-12 col-12 order-sm-first order-first order-lg-last order-md-first">
                        <div className="card border-dark mb-3">
                            <div className="card-header">
                                <div className={classes.centrarTexto}>
                                    <Typography use="headline3">DETALLES DEL ENTRENAMIENTO</Typography>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className={classes.centrarContenido}>
                                    <div>
                                    <label style={{fontSize: '20px', fontWeight: 'bold', fontFamily: 'Arial'}}>
                                        DURACIÓN DEL ENTRENAMIENTO: 
                                    </label>
                                    &nbsp;
                                    <label style={{fontSize: '18px', fontFamily: 'Arial'}}> 
                                        {entrenamientoSeleccionado.duracion}
                                    </label>
                                    </div>
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
                                    <br></br>
                                    <div className={classes.containerGrafica}>
                                    <CanvasJSChart options={options} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
}