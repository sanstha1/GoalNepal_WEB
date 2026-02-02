export default function Footer() {
  return (
    <footer className="bg-[#fefee3] border-t mt-16">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
        <p>© 2025 GoalNepal. All rights reserved.</p>

        <div className="flex gap-6 mt-3 md:mt-0">
          <span>Privacy</span>
          <span>Terms</span>
          <span>Contact</span>
        </div>
      </div>
    </footer>
  );
}
