const getRecentActivities = async () => {
    return [
        {
            id: 1,
            type: "save",
            title: "You saved to Dream House Squad",
            timeAgo: "53 minutes ago",
            amount: "$500",
        },
        {
            id: 2,
            type: "interest",
            title: "You earned interest",
            timeAgo: "53 minutes ago",
            amount: "$3.24",
        },
        {
            id: 3,
            type: "withdraw",
            title: "You withdrew money from Detty December",
            timeAgo: "53 minutes ago",
            amount: "$500",
        },
        {
            id: 4,
            type: "save",
            title: "You saved to Dream House Squad",
            timeAgo: "53 minutes ago",
            amount: "$500",
        },
        {
            id: 5,
            type: "interest",
            title: "You earned interest",
            timeAgo: "53 minutes ago",
            amount: "$3.24"
        }
    ];
};
export { getRecentActivities };