import NearbyGrounds from "../../components/nearbygrounds";

export const metadata = {
  title: "Nearby Grounds | GoalNepal",
  description: "Find football and futsal grounds near you",
};

export default function GroundsPage() {
  return (
    <main
      className="min-h-screen w-full"
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-8">
        <NearbyGrounds />
      </div>
    </main>
  );
}