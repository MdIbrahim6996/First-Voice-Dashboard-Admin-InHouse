import { motion } from "motion/react";
import { CSVLink } from "react-csv";
import { FaFileCsv } from "react-icons/fa";

interface IPageHeaderProps {
    headers: { label: string; key: string }[];
    leads: any[];
    text: string;
}

const PageHeader = ({ headers, leads, text = "Leads" }: IPageHeaderProps) => {
    return (
        <motion.div
            initial={{
                opacity: 0,
                scale: 1.2,
            }}
            animate={{
                opacity: 1,
                scale: 1,
            }}
            transition={{ duration: 0.5 }}
            className="mb-5 text-gray-900 bg-white flex justify-between items-center"
        >
            <p className="text-3xl font-semibold uppercase origin-center w-fit">
                {text}
            </p>
            <CSVLink
                headers={headers}
                data={leads ? leads : []}
                filename="OldLead.csv"
            >
                <button className="py-1.5 px-7 bg-green-700 text-white rounded-md text-sm flex gap-1 items-center cursor-pointer">
                    <FaFileCsv className="text-lg" /> Export as CSV
                </button>
            </CSVLink>
        </motion.div>
    );
};

export default PageHeader;
