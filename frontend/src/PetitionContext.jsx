import React, { createContext, useState } from "react";

export const PetitionContext = createContext();

export const PetitionProvider = ({ children }) => {
  const [petitions, setPetitions] = useState([
    // Your initial petitions array here, same as before
    {
      id: 3,
      user: "User3",
      time: "less than a minute ago",
      title: "Regarding Increase the Planting of More Trees nearby Tier-1 Metro Cities to decrease the amount Poll..",
      description: "This petition aims to increase tree planting in metropolitan areas to combat pollution and improve air quality. We urge local governments to allocate funds and spaces for green initiatives.",
      category: "Environment",
      signatures: 0,
      signatureGoal: 100,
      status: "Active",
      postedDate: "2025-09-09",
      image: "https://via.placeholder.com/300x200.png?text=Tree+Planting",
      signaturesList: [],
    },
    {
      id: 2,
      user: "User2",
      time: "2 minutes ago",
      title: "Petition Creation of Separate Lane for Two and Three Wheelers in Highways",
      description: "We propose dedicated lanes for two and three-wheelers on highways to enhance safety and reduce accidents caused by mixed traffic.",
      category: "Transportation",
      signatures: 0,
      signatureGoal: 100,
      status: "In Progress",
      postedDate: "2025-09-09",
      image: "https://via.placeholder.com/300x200.png?text=Highway+Safety",
      signaturesList: [],
    },
    {
      id: 1,
      user: "User1",
      time: "5 minutes ago",
      title: "petition creation testdbdbjkdbkdsnmd smd ms,ar sm,s da.dm",
      description: "This is a test petition to evaluate the platform's functionality and user engagement.",
      category: "All Categories",
      signatures: 0,
      signatureGoal: 100,
      status: "Closed",
      postedDate: "2025-09-08",
      image: "https://via.placeholder.com/300x200.png?text=Test+Petition",
      signaturesList: [],
    },
  ]);

  return (
    <PetitionContext.Provider value={{ petitions, setPetitions }}>
      {children}
    </PetitionContext.Provider>
  );
};