import React from 'react';
import {Line} from 'react-chartjs-2';
import axios from 'axios';
import './chart.styles.scss';
import io from 'socket.io-client';
class Chart extends React.Component{
    constructor(Props){
        super(Props);

        this.state={
           Data:{},
           
            
        }
       
    }
    componentDidMount(){
        axios.get('/api').then(alldatas=>{
            const socket=io(alldatas)
            socket.emit('initial_data')
            console.log(socket)
          
            socket.on('get_data',res=>{ 
                let AllData=[]
                res.forEach((apidata)=>{  
                    AllData.push(apidata.safe_travel_distance)
                    AllData.push(apidata.moderate_travel_distance)
                    AllData.push(apidata.risky_travel_distance)
                })
            
    
            this.setState({ 
                Data :{
                    labels:['6AM','8AM','10AM','12PM','2PM','4PM','6PM','8PM','10PM'],
                    datasets: [
                        {
                        label: 'Daily Speed Graph',
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: 'rgba(75,192,192,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 5,
                        pointHoverRadius: 10,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data:AllData
                        }
                    ]
                    }
                });
            })
            })
       

    }
    


    render() {
        return (
            <div className='graph'>
            <Line
            data={this.state.Data}
            options={{maintainAspectRatio: true}}
            />
            </div>
        );
    }
}

export default Chart;