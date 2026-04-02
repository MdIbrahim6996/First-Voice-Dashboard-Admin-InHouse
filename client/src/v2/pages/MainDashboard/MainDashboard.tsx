import TopPerformer from "./elements/TopPerformer";
import { getProcessLeaderboardData } from "../../api/mainDashboard";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../components/Loader/Loader";
import Carousel from "../../components/Carousel/Carousel";
import ProcessLeaderboard from "./elements/ProcessLeaderboard";

const MainDashboard = () => {
    const { data: leaderboard = [], isLoading } = useQuery({
        queryKey: ["leaderboard"],
        queryFn: getProcessLeaderboardData,
    });

    return (
        <div className="overflow-hidden">
            <Carousel>
                <TopPerformer />
                {!isLoading ? (
                    leaderboard?.data.map((item: any) => (
                        <ProcessLeaderboard details={item} />
                    ))
                ) : (
                    <Loader />
                )}
            </Carousel>
        </div>
    );
};

export default MainDashboard;
