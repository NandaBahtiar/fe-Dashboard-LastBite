import React from 'react'
import {LineChart} from "@mui/x-charts";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { FaRegHandshake } from "react-icons/fa";
import { IoReceiptOutline } from "react-icons/io5";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import { FaUserCircle } from "react-icons/fa";
import {Link, Navigate} from "react-router-dom";
import CountUp from "../../components/Library/CountUp/CountUp.jsx";

const Dashboard = () => {
    const weekDay = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const dataverivikasi =[
    {
        id:1,
        name:"nanda",
        adres:"jakarta"
    },
    {
        id: 2,
        name:"kanda",
        adres:"malang"
    },  {
        id: 2,
        name:"kanda",
        adres:"malang"
    }
    ,  {
        id: 2,
        name:"kanda",
        adres:"malang"
    }
    ,  {
        id: 2,
        name:"kanda",
        adres:"malang"
    }
]
    return (
        <div className={"h-auto p-2 md:p-5"}>
           <div className={"grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5"}>
               <div className="flex flex-1  bg-white h-28 rounded-lg shadow-md p-4 flex-row">
                   <div className="flex-auto">
                       <h2 className="text-[clamp(0.875rem,2vw,1rem)]">Total Pengguna</h2>
                       <h1 className={"text-[#2ECC71] font-bold text-[clamp(1rem,2.2vw,1.4rem)]"}>
                           <CountUp
                               from={0}
                               to={201}
                               separator=","
                               direction="up"
                                className="count-up-text"
                           />


                       </h1>
                   </div>
                   <div className="flex-none flex justify-center items-center s">
                       <HiOutlineUserGroup size={40} />
                   </div>

               </div>
               <div className="flex flex-1  bg-white h-28 rounded-lg shadow-md p-4 flex-row">
                   <div className="flex-auto">
                       <h2 className="text-[clamp(0.875rem,2vw,1rem)]">Mitra</h2>
                       <h1 className={"text-[#2ECC71] font-bold text-[clamp(1rem,2.2vw,1.4rem)]"}>
                           <CountUp
                               from={0}
                               to={80}
                               separator=","
                               direction="up"
                               className="count-up-text"
                           />

                       </h1>
                   </div>
                   <div className="flex-none flex justify-center items-center ">
                       <FaRegHandshake size={40} />
                   </div>

               </div>
               <div className="flex flex-1  bg-white h-28 rounded-lg shadow-md p-4 flex-row">
                   <div className="flex-auto">
                       <h2 className="text-[clamp(0.875rem,2vw,1rem)]">Transaksi Berhasil</h2>
                       <h1 className={"text-[#2ECC71] font-bold text-[clamp(1rem,2.2vw,1.4rem)]"}>
                           <CountUp
                               from={0}
                               to={8202}
                               separator=","
                               direction="up"
                               className="count-up-text"
                           /></h1>
                   </div>
                   <div className="flex-none flex justify-center items-center ">
                       <IoReceiptOutline size={40} />
                   </div>

               </div>
               <div className="flex flex-1  bg-white h-28 rounded-lg shadow-md p-4 flex-row">
                   <div className="flex-auto">
                       <h2 className="text-[clamp(0.875rem,2vw,1rem)]">Pendapatan</h2>
                       <h1 className={"text-[#2ECC71] font-bold text-[clamp(1rem,2.2vw,1.4rem)]"}>Rp
                           <CountUp
                               from={0}
                               to={1120200}
                               separator=","
                               direction="up"
                               className="count-up-text"
                           /></h1>
                   </div>
                   <div className="flex-none flex justify-center items-center ">
                       <LiaMoneyBillWaveSolid size={40} />
                   </div>

               </div>



           </div>
            <div className={"flex flex-col lg:flex-row mt-5 gap-5"}>
                <div className="flex-[2] bg-white h-96 rounded-lg shadow-md p-4 flex flex-col relative">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Statistik Mingguan</h3>
                    <div className="flex-grow w-full h-full">
                        <LineChart
                            xAxis={[{ scaleType: 'band', data: weekDay }]}
                            series={[
                                {
                                    data: [10000, 50000, 50000, 10000, 5000, 50000, 10000],
                                    area: true,
                                    color: '#2ECC71',
                                },
                            ]}
                            grid={{ vertical: true, horizontal: true }}
                            sx={{
                                '.MuiLineElement-root': {
                                    strokeWidth: 2,
                                },
                                '.MuiAreaElement-root': {
                                    fill: 'rgba(46, 204, 113, 0.2)',
                                },
                            }}
                        />
                    </div>
                </div>
                <div className="flex-[1] bg-white h-96 rounded-lg shadow-md p-4 flex flex-col">
                    <h1 className="text-lg font-semibold text-gray-800 mb-2">Antrian Verivikasi Mitra</h1>
                    <div className="flex-grow overflow-y-auto pb-4">
                    <ul>
                        {dataverivikasi.map((item) => (
                            <li key={item.id} className="bg-white p-3 rounded-lg shadow-md mb-3 flex justify-between items-center space-x-3">
                                <div className={"flex flex-row items-center "}>
                                    <FaUserCircle size={24} className="text-gray-60 0 m-2" />
                                    <div>
                                        <p className="text-md font-semibold text-gray-800">{item.name}</p>
                                        <p className="text-sm text-gray-600">{item.adres}</p>
                                    </div>

                                </div>
                                <div>
                                    <Link to={`/dashboard/patner/detail/${item.id}`} className={"bg-green-500 px-2 py-1 text-white rounded-xl"}>Lihat</Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
            </div>
        </div>
    )
}
export default Dashboard