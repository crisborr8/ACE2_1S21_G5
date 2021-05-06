import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Typography} from "@rmwc/typography";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    centrarTexto: {
        textAlign: 'center',
    },
    centrarContenido: {
        textAlign: 'center',
    }
}));


export default function Historial(){
    const classes = useStyles();

    const getData = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/fechasHistorial');

            if (data.status === 'success') {
                console.log(data.data);
                // if(data.data.length===0){
                //     setBanderaSinTransferencias(true);
                //     return;
                // }
                // setBanderaSinTransferencias(false);
                
                
            } else {
                console.error('data: ', data);
            }
        }
        catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const timeOut = setInterval(() => {
            getData();
            // setListaDetalleOrden([...listDetalleOrden]);
        }, 3000)
        getData();
        return () => clearInterval(timeOut);

    }, []);



    return(
        <div className="container-fluid">
        <br /> 
        <div>
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
                                <br />
                                <form id='formulario2'>
                                    
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}