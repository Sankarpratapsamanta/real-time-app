import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import axios from 'axios';

class PieComponent extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:{},
        }
    }

    componentDidMount(){
        axios.get('/api').then(res=>{
            const travel=res.data;
            let travelData=[];
            let date=[]
            travel.forEach(data=>{
                travelData.push(data.safe_travel_distance)
                travelData.push(data.moderate_travel_distance)
                travelData.push(data.risky_travel_distance)
                date.push(data.date)
            });
            this.setState({
                Data:{
                    labels:['Safe','Moderate','Risky'],
                    datasets:[
                        {
                           label:'Road Safety Analytics',
                           data: travelData,
                           backgroundColor: [
                            '#0fdb1a',
                            '#deed0e',
                            '#eb4034'
                            ],
                            hoverBackgroundColor: [
                            '#0fdb1a',
                            '#deed0e',
                            '#eb4034'
                            ]
                        }
                     ]
                }
            })
        })
    }

    render(){
        return(
            <div>
            <Doughnut
            data={this.state.Data}
            options={{
                legend:{
                    display:true,
                    position:"left"
                }
            }}
            />
            </div>
        )
    }
}

export default PieComponent;