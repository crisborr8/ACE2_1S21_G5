import React,{Component} from 'react';


class Reloj extends React.Component {
    constructor() {
        super();
        this.state = {
            hour: 0, 
            min: 0, 
            second : 0, 
            time : ""
        };
        this.update = this.update.bind(this);
    }

    update(event){
        const date = new Date().toLocaleString("en-US", {timeZone: this.props.timeZone}).split(" ")[1];
        const time = date.split(":");        
        this.setState({
            hour: ((Number(time[0]) / 12) * 360) + 90, 
            min: ((Number(time[1]) / 60) * 360) + 90, 
            second : ((Number(time[2]) / 60) * 360) + 90, 
            time : date
        });        
    }

    componentWillMount(){        
        setInterval(this.update, 1000);
        this.update();
    }

    render(){
        return (
                <div className=" bg-dark">                    
                    <h6 className="Hora bg-dark">{this.state.time}</h6>
                </div>
            );
    };
};



//Para establecer valores por defecto...
Reloj.defaultProps = {
    timeZone : "America/Guatemala"
};



export default Reloj;


//export default Reloj;