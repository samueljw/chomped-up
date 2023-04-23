export const convertDate = (dateString) => {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const date = new Date(dateString);
    const monthIndex = date.getMonth();
    const day = date.getDate();

    const month = months[monthIndex];
    const formattedDate = `${month} ${day}`;

    return formattedDate;
};
