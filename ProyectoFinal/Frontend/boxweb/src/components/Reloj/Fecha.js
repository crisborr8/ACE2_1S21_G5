import React,{Component} from 'react';


class Fecha extends Component {
    constructor() {
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        super();
        
        this.state = {
            Dia: date, 
            Mes: month, 
            Año : year, 
            time : newDate
        };
        //this.update = this.update.bind(this);
    }


    render(){
        return (
            <div className=" bg-dark">                    
                <h6 className="Hora bg-dark">{this.state.Dia}/{this.state.Mes}/{this.state.Año}</h6>
            </div>
        );  
    }
    
    
};





export default Fecha;
