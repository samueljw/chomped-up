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

export const convertTimeTo12HourFormat = (timeString) => {
    const date = new Date(timeString);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const amPm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

    return `${formattedHours}:${formattedMinutes} ${amPm}`;
};
