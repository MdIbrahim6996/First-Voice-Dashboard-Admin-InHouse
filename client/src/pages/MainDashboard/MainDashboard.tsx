import TopPerformer from "./elements/TopPerformer";
import Carousel from "./elements/Carousel";
import EnergyBoilers from "./elements/EnergyBoilers";
import { getDailySales } from "../../api/mainDashboard";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader/Loader";
import { getAllProcess } from "../../api/process";

const MainDashboard = () => {
    // const { data: processLeadCount = [], isLoading } = useQuery({
    //     queryKey: ["process-lead-count"],
    //     queryFn: getProcessLeadCount,
    // });
    const { data: process = [] } = useQuery({
        queryKey: ["process"],
        queryFn: getAllProcess,
    });

    const { data: dailySales = [], isLoading } = useQuery({
        queryKey: ["dailySales"],
        queryFn: getDailySales,
        refetchInterval: 60 * 1000, //1 min
    });

    return (
        <div className="overflow-hidden">
            <Carousel>
                <TopPerformer />
                {!isLoading ? (
                    process?.map((item: any) => (
                        <EnergyBoilers details={item} sales={dailySales} />
                    ))
                ) : (
                    <Loader />
                )}
            </Carousel>
        </div>
    );
};

export default MainDashboard;
