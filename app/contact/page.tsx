"use client";

export default function ContactPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 text-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-white">Contact Us</h1>
      <p className="mb-4">
        We’d love to hear from you. Whether you have questions, feedback, or partnership inquiries, reach out below.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2 text-white">Email</h2>
      <p className="mb-4">
        You can email us at <a href="mailto:support@goalnepal.com" className="text-[#4caf50] hover:underline">support@goalnepal.com</a>.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2 text-white">Phone</h2>
      <p className="mb-4">
        Call us at <a href="tel:+977123456789" className="text-[#4caf50] hover:underline">+977 123456789</a>.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2 text-white">Address</h2>
      <p>
        GoalNepal HQ, Patan, Bagmati, Nepal
      </p>
    </main>
  );
}
