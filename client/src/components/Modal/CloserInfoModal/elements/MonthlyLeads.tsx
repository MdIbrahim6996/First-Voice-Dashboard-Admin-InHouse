import { Scheduler } from "@aldabil/react-scheduler";
import { motion } from "motion/react";
import { useQuery } from "@tanstack/react-query";
import { getUserYearlyLeads } from "../../../../api/user";
import { returnDarkColors } from "../../../../utils/utils";
const MonthlyLeads = ({ userId }: { userId: number }) => {
    const { data = [] } = useQuery({
        queryKey: [userId, "month-wise-leads"],
        queryFn: () => getUserYearlyLeads(userId),
    });



    const events = data?.map((item: any) => ({
        event_id: item?.id,
        title: (
            <motion.p
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                className="text-xs"
            >
                {item?.status?.name?.toUpperCase()}
            </motion.p>
        ),
        start: new Date(item?.createdAt),
        end: new Date(item?.createdAt),
        color: returnDarkColors(item?.status?.name),
        allDay: true,
    }));
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: -20,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{ duration: 0.5, delay: 0.1 }}
        >
            <div className="p-5">
                {data && (
                    <Scheduler
                        height={1000}
                        dialogMaxWidth={"xs"}
                        view="month"
                        month={{
                            weekDays: [0, 1, 2, 3, 4, 5, 6],
                            step: 1,
                            weekStartOn: 0,
                            startHour: 9,
                            endHour: 17,
                            navigation: true,
                            cellRenderer: () => (
                                <div className="border border-slate-400 h-full rounded-lg text-xs"></div>
                            ),
                        }}
                        week={{
                            weekDays: [0, 1, 2, 3, 4, 5, 6],
                            step: 60,
                            weekStartOn: 0,
                            startHour: 9,
                            endHour: 24,
                            navigation: true,
                            cellRenderer: () => {
                                return (
                                    <div className="border border-slate-400 h-full rounded-lg"></div>
                                );
                            },
                        }}
                        events={events}
                        agenda={false}
                        editable={false}
                        deletable={false}
                    />
                )}
            </div>
        </motion.div>
    );
};

export default MonthlyLeads;
