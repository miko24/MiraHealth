import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import {faker} from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const labels = ["20s","19s","18s","17s","16s","15s","14s","13s","12s","11s","10s","9s","8s","7s","6s","5s","4s","3s","2s","1s"];

export const data = {
  labels,
    datasets: [
        {
            fill: true,
            label: 'Dataset 1',
            data: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
    ],


};

export default function Chart({setLastBPM,url,color,range}) {
    const [dataset, setdataset] = useState(data);
    const [prometheus_data, setprometheus_data] = useState([]);
    const [firstrender, setfirstrender] = useState(true);
    const options = {
        animation: {
            radius: {
                duration: 400,
                easing: 'linear',
                loop: (context) => context.active,
            }},
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                easing: 'linear',
                duration: 400,

                grid: {
                    display: false,
                }
            },
            y: {
                position: 'right',
                suggestedMin: 50,
                suggestedMax: 100,
                easing: 'linear',
                duration: 400,

                border:{
                    display: false,
                },
                grid: {
                    display: false,
                }
            }
        }
    };
    options.scales.y.suggestedMin = range && range[0];
    options.scales.y.suggestedMax = range && range[1];

    useEffect(()=>{
        setfirstrender(false)
    },[])
    const fetch_data = async() =>{
        try{
            const bpm = await fetch(url);
            const data = await bpm.json();
            setprometheus_data((previous)=>{
                let temp = data.data.result[0];
                if (temp) {
                    return [...previous,...data.data.result[0].values.map((el)=>{return el[1];})];
                }else{
                    return [...previous,50];
                }
            })
        }catch(error){
            console.error(error);
        }
    }
    useEffect(() => {
        setprometheus_data([]);
        fetch_data();
    }, [url]);
    const updatedata = ()=>{
    // console.log(prometheus_data)
    let outputdata = [...dataset.datasets[0].data,prometheus_data[0]]
    if(outputdata.length >20){
        outputdata.shift()
    }
    // console.log(outputdata)
    let temp = {
        labels,
        datasets: [
        {
            label: 'BPM',
            data: outputdata,
            borderColor: color,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            fill:true,
        },
    ],
};
        setLastBPM(prometheus_data[0]);
        setprometheus_data((previous) => previous.slice(1));
        setdataset(temp);
}
useEffect(()=>{
    if(!firstrender){
    if (prometheus_data.length > 5) {
        const interval = setInterval(()=>{
            updatedata()
        }, 1000); 
        return ()=>(
            clearInterval(interval)
        )
    }else{
            fetch_data()
    }
    }
},[prometheus_data])
    return (
        <div>
            <Line options={options} data={dataset} height={50} />
        </div>
    );
}
