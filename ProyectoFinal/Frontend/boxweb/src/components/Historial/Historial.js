import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography } from "@rmwc/typography";
import { makeStyles } from '@material-ui/core/styles';
import MensajeAlertas from '../Props/MensajeAlertas';

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
    }
}));


export default function Historial() {
    const classes = useStyles();
    let [fechasHistorial, setFechasHistorial] = useState([]);
    let [banderaSinFechas, setBanderaSinFechas] = useState(false);
    let [banderaServidorCaido, setBanderaServidorCaido] = useState(false);
    const getData = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/fechasHistorial');

            if (data.status === 'success') {
                if (data.data.length === 0) {
                    setBanderaSinFechas(true);
                    return;
                }
                setBanderaSinFechas(false);

                let arr = [];
                data.data.forEach(element => {
                    let f = new Date(element.fecha)
                    arr.push(f.getDate() + '/' + (f.getMonth() + 1) + '/' + f.getFullYear())
                });
                setFechasHistorial(arr)
            } else {
                console.error('data22: ', data);
            }
        }
        catch (err) {
            console.error(err);
            setBanderaServidorCaido(true);
        }
    };

    useEffect(() => {
        const timeOut = setInterval(() => {
            getData();
            setFechasHistorial([...fechasHistorial]);
        }, 3000)
        getData();
        return () => clearInterval(timeOut);

    }, []);



    return (
        <div className="container-fluid">
            <br />
            <div>
                {
                // console.log(fechasHistorial)
                }
                <div className="row justify-content-center">
                    <div className="col col-lg-10 col-md-12 col-sm-12 col-12 order-sm-last order-last order-lg-first order-md-last">
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
                                            {/* <MensajeAlertas bandera={banderaError} tipo='error' mensaje='La orden no pudo entregarse' /> */}
                                        </div>
                                    </div>
                                    <br />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}