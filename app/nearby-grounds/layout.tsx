import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nearby Grounds | GoalNepal",
  description: "Find futsal grounds near you in Nepal",
};

export default function NearbyGroundsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}