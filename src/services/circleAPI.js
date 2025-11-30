const getCircles = async () => {
    return [
      {
        name: "Dream House Squad",
        percentage: 60,
        type: "On track",
        pin: true,
      },
      { name: "Project G-Wagon", percentage: 25, type: "On track" },
      { name: "Our incoming heir", percentage: 90, type: "On track" },
      { name: "Detty December", percentage: 10, type: "Payment due" },
      { name: "Next Elon Musks", percentage: 1, type: "Payment due" },
    ];
}

export { getCircles };