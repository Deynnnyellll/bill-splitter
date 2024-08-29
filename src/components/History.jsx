import { GoBellFill } from "react-icons/go";
import Bills from "./Bills";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  plugins,
} from 'chart.js'
import { callback } from "chart.js/helpers";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const History = () => {
    let jan = 650;
    let feb = 590;
    let march = 800;
    let april = 810;
    let may = 630;

    const spending = jan + feb + march + april;
    const formattedSpending = new Intl.NumberFormat().format(spending)

    const data = {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [
          {
            label: "Bills Spent",
            data: [jan, feb, march, april, may],
            backgroundColor: '#FFFF',
            borderRadius: 20,
            barThickness: 20,
            hoverBackgroundColor:  '#996BFF',
          },
        ],
      };
    
      const options = {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => `${value} k`,
              stepSize: 30,
            }
          },
        },
        plugins: {
          legend: {
            display: false,
          }
        }
      };
    
  return (
    <div className="text-white w-full h-auto font-sans">
        <div className="bg-darkTwo w-full rounded-b-3xl px-4 py-6 flex flex-col justify-center gap-6">
            <div className="flex justify-between items-center">
                <h1>History</h1>
                <GoBellFill size={30} className="bg-darkOne p-2 rounded-full text-primaryThree"/>
            </div>

            <div className="flex justify-center items-center flex-col gap-1">
                <p className="text-[7pt] text-primaryTwo font-semibold"> Monthly Spending </p>
                <p className="text-4xl font-semibold"> $ {formattedSpending} </p>
            </div>

            <Bar data={data} options={options}/>
        </div>

        <div className="w-fullflex flex-col item-center justify-center">
            <Bills />
        </div>
    </div>
  )
}

export default History