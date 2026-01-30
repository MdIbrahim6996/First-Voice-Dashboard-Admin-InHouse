export const timeArr: { id: number; startDate: Date; endDate: Date }[] = [];
for (let i = 0; i < 12; i++) {
    const startYear = new Date();
    startYear.setMonth(i);
    startYear.setDate(1);
    startYear.setUTCHours(0, 0, 0, 0);

    const endYear = new Date();
    endYear.setFullYear(endYear.getFullYear());
    endYear.setMonth(i + 1);
    endYear.setDate(1);
    endYear.setUTCHours(0, 0, 0, 0);
    const obj = {
        id: i,
        startDate: startYear,
        endDate: endYear,
    };
    timeArr.push(obj);
}

export const getMonthStartAndEnd = (month: number, year: number) => {
    year = Number(year);
    month = Number(month) + 1;

    const startOfMonth = new Date(year, month - 1, 2);
    const startOfNextMonth = new Date(year, month, 2);

    return {
        start: new Date(startOfMonth.setUTCHours(0, 0, 0, 0)),
        nextStart: new Date(startOfNextMonth.setUTCHours(0, 0, 0, 0)),
    };
};
