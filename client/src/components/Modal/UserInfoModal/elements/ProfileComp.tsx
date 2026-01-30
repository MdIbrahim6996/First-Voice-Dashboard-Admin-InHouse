import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

import { getUserInfo } from "../../../../api/user";
import { useState } from "react";
import { returnColors } from "../../../../utils/utils";
import { monthNames } from "../../../../constants/appConstant";

const ProfileComp = ({ userId }: { userId: number }) => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const [time, setTime] = useState({
        month: currentMonth,
        year: currentYear,
    });

    const { data: leadData = [] } = useQuery({
        queryKey: [`profile-${userId}`, time.month, time.year],
        queryFn: ({ queryKey }) => {
            const [_, month, year] = queryKey;
            return getUserInfo(userId, {
                month: Number(month),
                year: Number(year),
            });
        },
        staleTime: 0,
    });

    // console.log(leadData);

    // const { data: cardData } = useQuery({
    //     queryKey: [`profile-${userId}`],
    //     queryFn: () => getProfileCardInfo(userId!),
    // });

    const cardData = leadData?.cardInfo;
    console.log(cardData);
    const pieChart = leadData?.pieChart ?? [];

    const piedata = {
        datasets: [
            {
                data: pieChart?.map((item: any) => item?.count),
                backgroundColor: leadData?.pieChart?.map((item: any) =>
                    returnColors(item?.status)
                ),
            },
        ],
        labels: pieChart?.map((item: any) => item?.status?.toUpperCase()),
    };
    return (
        <section className="p-4">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative overflow-x-auto "
            >
                <div className="flex justify-between">
                    <p className="text-3xl italic mb-2 text-black/80">
                        {/* <span className="capitalize">{time}</span>'s Analytics */}
                        <span className="capitalize">
                            {monthNames[time?.month]}
                        </span>
                        's Analytics
                    </p>
                    <div className="space-x-2">
                        <select
                            onChange={(e: any) =>
                                setTime({
                                    ...time,
                                    month: Number(e.target.value!),
                                })
                            }
                            defaultValue={currentMonth}
                            className="border border-slate-400 px-5 py-1 rounded-md text-sm cursor-pointer outline-none"
                        >
                            {monthNames?.map((item, i) => (
                                <option value={i}>{item}</option>
                            ))}
                        </select>
                        <select
                            onChange={(e: any) =>
                                setTime({
                                    ...time,
                                    year: Number(e.target.value!),
                                })
                            }
                            defaultValue={currentYear}
                            className="border border-slate-400 px-5 py-1 rounded-md text-sm cursor-pointer outline-none"
                        >
                            <option value={2025}>2025</option>
                            <option value={2026}>2026</option>
                            <option value={2027}>2027</option>
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-5 gap-3 mb-10">
                    <article className="text-white p-3 rounded-md text-center shadow-xl bg-gradient-to-b from-teal-400 to-yellow-200">
                        <p className="text-2xl capitalize">today's sale</p>
                        <p className="mt-2 text-3xl">{cardData?.todayLead}</p>
                    </article>
                    <article className="text-white p-3 rounded-md text-center shadow-xl bg-gradient-to-t from-emerald-300 to-emerald-900">
                        <p className="text-2xl capitalize">Month Sales</p>
                        <p className="mt-2 text-2xl">
                            {cardData?.totalSuccessLead}
                        </p>
                    </article>
                    <article className="text-white p-3 rounded-md text-center shadow-xl bg-gradient-to-b from-fuchsia-600 to-pink-300">
                        <p className="text-2xl capitalize">Gross Sale</p>
                        <p className="mt-2 text-2xl">{cardData?.totalLead}</p>
                    </article>
                    <article className="text-white p-3 rounded-md text-center shadow-xl bg-gradient-to-b from-red-500 to-orange-300">
                        <p className="text-2xl capitalize">SPD</p>
                        <p className="mt-2 text-2xl">{cardData?.spd}</p>
                    </article>
                    <article className="text-white p-3 rounded-md text-center shadow-xl bg-gradient-to-bl from-[#e879f9] via-[#4ade80]">
                        <p className="text-2xl capitalize">attendance</p>
                        <p className="mt-2 text-3xl">
                            {cardData?.totalAttendance}
                        </p>
                    </article>
                </div>

                <div className="h-[17rem] mx-auto w-fit">
                    <Pie data={piedata} />
                </div>
            </motion.div>
        </section>
    );
};

export default ProfileComp;
