const EnergyBoilers = ({ details, sales }: { details: any; sales: any }) => {
    const data = sales[details?.id];

    const first = data?.firstHalf;
    const second = data?.secondHalf;
    const third = data?.thirdHalf;

    console.log(first);
    return (
        <div className="p-5 overflow-y-scrol">
            <div className="mb-5 text-gray-900 bg-white ">
                <p className="text-3xl font-semibold uppercase text-center">
                    {details?.name}
                </p>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="flex w-full my-5 min-h-[100vh] overflow-y-scroll">
                    <div className="border border-dashed border-r border-y-0 border-l-0 w-[33%] border-slate-400">
                        <p className="text-center my-3 text-xl font-semibold italic underline">
                            1st Half (2:30 PM - 5:30 PM)
                        </p>

                        <div className="px-2 mt-10 space-y-3">
                            {first?.map((item: any) => (
                                <article className="bg-[#E6A500] text-[#0A2342] font-[500] shadow-lg  shadow-[#B88400] flex justify-between items-center rounded-md p-2 px-7 uppercase text-2xl">
                                    <p className="flex items-center gap-3">
                                        <span className="mr-2">🏆</span>
                                        {item?.leadBy?.alias}
                                    </p>
                                    <p>{item?.count}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                    <div className="border border-dashed border-r border-y-0 border-l-0 w-[33%] border-slate-400">
                        <p className="text-center my-3 text-xl font-semibold italic underline">
                            2nd Half (6:00 PM - 8:30 PM)
                        </p>

                        <div className="px-2 mt-10 space-y-3">
                            {second?.map((item: any) => (
                                <article className="bg-[#C0C7D1] text-[#0A2342] font-[500] shadow-lg  shadow-[#9AA1AC] flex justify-between items-center rounded-md p-2 px-7 uppercase text-2xl">
                                    <p className="flex items-center gap-3">
                                        <span>🏆</span>
                                        {item?.leadBy?.alias}
                                    </p>
                                    <p>{item?.count}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                    <div className="w-[33%]">
                        <p className="text-center my-3 text-xl font-semibold italic underline">
                            3rd Half (9:00 PM - 11:30 PM)
                        </p>

                        <div className="px-2 mt-10">
                            {third?.map((item: any) => (
                                <article className="bg-[#CD7F32] text-[#0A2342] font-[500] shadow-lg  shadow-[#8B5A2B] flex justify-between items-center rounded-md p-2 px-7 uppercase text-2xl">
                                    <p className="flex items-center gap-3">
                                        <span>🏆</span>
                                        {item?.leadBy?.alias}
                                    </p>
                                    <p>{item?.count}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnergyBoilers;
