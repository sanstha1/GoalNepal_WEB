"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface Tournament {
  _id: string;
  title: string;
  type: "football" | "futsal";
  location: string;
  startDate: string;
  endDate: string;
  bannerImage?: string | null;
  organizer?: string;
  prize?: string;
  maxTeams?: number;
  description?: string;
  registrationFee?: number | null;
}

interface SavedContextType {
  savedTournaments: Tournament[];
  isSaved: (id: string) => boolean;
  toggleSaved: (tournament: Tournament) => void;
}

const SavedContext = createContext<SavedContextType | null>(null);

export function SavedProvider({ children }: { children: ReactNode }) {
  const [savedTournaments, setSavedTournaments] = useState<Tournament[]>([]);

  const isSaved = (id: string) => savedTournaments.some((t) => t._id === id);

  const toggleSaved = (tournament: Tournament) => {
    setSavedTournaments((prev) =>
      prev.some((t) => t._id === tournament._id)
        ? prev.filter((t) => t._id !== tournament._id)
        : [...prev, tournament]
    );
  };

  return (
    <SavedContext.Provider value={{ savedTournaments, isSaved, toggleSaved }}>
      {children}
    </SavedContext.Provider>
  );
}

export function useSaved() {
  const ctx = useContext(SavedContext);
  if (!ctx) throw new Error("useSaved must be used within SavedProvider");
  return ctx;
}