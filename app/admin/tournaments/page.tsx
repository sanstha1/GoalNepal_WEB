/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { handleCreateTournament } from "@/lib/actions/admin/tournament-action";
import {
  Trophy,
  MapPin,
  CalendarDays,
  Users,
  Medal,
  FileText,
  ImagePlus,
  X,
  PlusCircle,
  Loader2,
  IndianRupee,
} from "lucide-react";
import { motion } from "framer-motion";

type TournamentType = "football" | "futsal";

export default function AddTournamentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [tournamentType, setTournamentType] = useState<TournamentType>("football");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [prize, setPrize] = useState("");
  const [maxTeams, setMaxTeams] = useState("");
  const [registrationFee, setRegistrationFee] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    setBannerFile(file);
    setBannerPreview(URL.createObjectURL(file));
  };

  const removeBanner = () => {
    setBannerFile(null);
    setBannerPreview(null);
    if (bannerInputRef.current) bannerInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) { toast.error("Please enter tournament title"); return; }
    if (!location.trim()) { toast.error("Please enter location"); return; }
    if (!startDate) { toast.error("Please select a start date"); return; }
    if (!endDate) { toast.error("Please select an end date"); return; }
    if (new Date(endDate) < new Date(startDate)) { toast.error("End date must be after start date"); return; }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("type", tournamentType);
      formData.append("location", location.trim());
      formData.append("startDate", startDate);
      formData.append("endDate", endDate);
      if (organizer.trim()) formData.append("organizer", organizer.trim());
      if (prize.trim()) formData.append("prize", prize.trim());
      if (maxTeams.trim()) formData.append("maxTeams", maxTeams.trim());
      if (registrationFee.trim()) formData.append("registrationFee", registrationFee.trim());
      if (description.trim()) formData.append("description", description.trim());
      if (bannerFile) formData.append("bannerImage", bannerFile);

      const response = await handleCreateTournament(formData);

      if (response.success) {
        toast.success(`${tournamentType === "football" ? "Football" : "Futsal"} tournament created successfully!`);
        router.push("/admin/tournaments");
      } else {
        toast.error(response.message || "Failed to create tournament");
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen px-6 py-12"
      style={{
        backgroundColor: "#FAFAFA",
      }}
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h1 className="text-4xl font-bold text-[#2F2F2F] mb-2">Add Tournament</h1>
          <p className="text-[#6B7280]">Create a new football or futsal tournament</p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <motion.div
            className="rounded-xl border p-1.5"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#E5E7EB"
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex gap-1.5">
              {(["football", "futsal"] as TournamentType[]).map((type) => (
                <motion.button
                  key={type}
                  type="button"
                  onClick={() => setTournamentType(type)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-semibold text-sm transition-all"
                  style={
                    tournamentType === type
                      ? {
                          backgroundColor: "#FF8A2A",
                          color: "white"
                        }
                      : { color: "#9CA3AF" }
                  }
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-base">{type === "football" ? "⚽" : "🥅"}</span>
                  {type === "football" ? "Football" : "Futsal"}
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="rounded-xl border p-6"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#E5E7EB"
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-4">Banner Image</p>
            <div className="flex gap-4 items-start">
              <motion.button
                type="button"
                onClick={() => bannerInputRef.current?.click()}
                className="w-24 h-24 shrink-0 flex flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed transition"
                style={{
                  backgroundColor: "#FAFAFA",
                  borderColor: "rgba(255, 138, 42, 0.3)"
                }}
                whileHover={{
                  borderColor: "rgba(255, 138, 42, 0.5)",
                  backgroundColor: "#FFF4E8"
                }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition"
                  style={{ backgroundColor: "rgba(255, 138, 42, 0.15)" }}
                >
                  <ImagePlus size={18} color="#FF8A2A" />
                </div>
                <span className="text-xs text-[#6B7280] font-medium">Add Banner</span>
              </motion.button>
              <input
                ref={bannerInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleBannerChange}
              />

              {bannerPreview ? (
                <div className="relative flex-1 h-24 rounded-lg overflow-hidden">
                  <img
                    src={bannerPreview}
                    alt="Banner preview"
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute bottom-0 left-0 right-0 h-8 flex items-end px-3 pb-1.5"
                    style={{
                      background: "linear-gradient(180deg, transparent, rgba(0,0,0,0.6))"
                    }}
                  >
                    <span className="text-white text-xs font-semibold">
                      {tournamentType === "football" ? "⚽ Football" : "🥅 Futsal"}
                    </span>
                  </div>
                  <motion.button
                    type="button"
                    onClick={removeBanner}
                    className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "rgba(239, 68, 68, 0.15)" }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={12} color="#EF4444" />
                  </motion.button>
                </div>
              ) : (
                <div
                  className="flex-1 h-24 rounded-lg flex flex-col items-center justify-center border"
                  style={{
                    backgroundColor: "#FAFAFA",
                    borderColor: "#E5E7EB"
                  }}
                >
                  <Trophy size={24} color="#E5E7EB" />
                  <span className="text-xs text-[#9CA3AF] mt-1">Banner preview</span>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            className="rounded-xl border p-6 space-y-4"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#E5E7EB"
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Tournament Details</p>

            <div>
              <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider block mb-2">
                Title <span style={{ color: "#EF4444" }}>*</span>
              </label>
              <div
                className="flex items-center gap-3 border rounded-lg px-3.5 py-2.5 focus-within:border-[#FF8A2A] transition"
                style={{ borderColor: "#E5E7EB" }}
              >
                <Trophy size={16} color="#9CA3AF" />
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Kathmandu Futsal Cup 2025"
                  className="flex-1 text-[#2F2F2F] text-sm outline-none bg-transparent placeholder-[#9CA3AF]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider block mb-2">
                Location <span style={{ color: "#EF4444" }}>*</span>
              </label>
              <div
                className="flex items-center gap-3 border rounded-lg px-3.5 py-2.5 focus-within:border-[#FF8A2A] transition"
                style={{ borderColor: "#E5E7EB" }}
              >
                <MapPin size={16} color="#9CA3AF" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., Kathmandu, Nepal"
                  className="flex-1 text-[#2F2F2F] text-sm outline-none bg-transparent placeholder-[#9CA3AF]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider block mb-2">
                Date Range <span style={{ color: "#EF4444" }}>*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div
                  className={`rounded-lg p-3.5 border transition ${startDate ? "border-[#FF8A2A] bg-[#FFF4E8]" : "border-[#E5E7EB] bg-[#FAFAFA]"}`}
                >
                  <div className="flex items-center gap-1 mb-1 text-[#6B7280]">
                    <CalendarDays size={12} />
                    <span className="text-xs font-medium">Start Date</span>
                  </div>
                  <input
                    type="date"
                    value={startDate}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => {
                      setStartDate(e.target.value);
                      if (endDate && e.target.value > endDate) setEndDate("");
                    }}
                    className={`w-full text-sm font-bold outline-none bg-transparent cursor-pointer ${startDate ? "text-[#2F2F2F]" : "text-[#9CA3AF]"}`}
                  />
                </div>
                <div
                  className={`rounded-lg p-3.5 border transition ${endDate ? "border-[#FF8A2A] bg-[#FFF4E8]" : "border-[#E5E7EB] bg-[#FAFAFA]"}`}
                >
                  <div className="flex items-center gap-1 mb-1 text-[#6B7280]">
                    <CalendarDays size={12} />
                    <span className="text-xs font-medium">End Date</span>
                  </div>
                  <input
                    type="date"
                    value={endDate}
                    min={startDate || new Date().toISOString().split("T")[0]}
                    onChange={(e) => setEndDate(e.target.value)}
                    className={`w-full text-sm font-bold outline-none bg-transparent cursor-pointer ${endDate ? "text-[#2F2F2F]" : "text-[#9CA3AF]"}`}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider block mb-2">
                Organizer
              </label>
              <div
                className="flex items-center gap-3 border rounded-lg px-3.5 py-2.5 focus-within:border-[#FF8A2A] transition"
                style={{ borderColor: "#E5E7EB" }}
              >
                <Users size={16} color="#9CA3AF" />
                <input
                  type="text"
                  value={organizer}
                  onChange={(e) => setOrganizer(e.target.value)}
                  placeholder="e.g., Nepal Football Association"
                  className="flex-1 text-[#2F2F2F] text-sm outline-none bg-transparent placeholder-[#9CA3AF]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider block mb-2">
                  Prize Pool
                </label>
                <div
                  className="flex items-center gap-3 border rounded-lg px-3.5 py-2.5 focus-within:border-[#FF8A2A] transition"
                  style={{ borderColor: "#E5E7EB" }}
                >
                  <Medal size={16} color="#9CA3AF" />
                  <input
                    type="text"
                    value={prize}
                    onChange={(e) => setPrize(e.target.value)}
                    placeholder="e.g., NPR 50,000"
                    className="flex-1 text-[#2F2F2F] text-sm outline-none bg-transparent placeholder-[#9CA3AF]"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider block mb-2">
                  Max Teams
                </label>
                <div
                  className="flex items-center gap-3 border rounded-lg px-3.5 py-2.5 focus-within:border-[#FF8A2A] transition"
                  style={{ borderColor: "#E5E7EB" }}
                >
                  <Users size={16} color="#9CA3AF" />
                  <input
                    type="number"
                    value={maxTeams}
                    onChange={(e) => setMaxTeams(e.target.value)}
                    placeholder="e.g., 16"
                    min={2}
                    className="flex-1 text-[#2F2F2F] text-sm outline-none bg-transparent placeholder-[#9CA3AF]"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider block mb-2">
                Registration Fee (NPR)
              </label>
              <div
                className="flex items-center gap-3 border rounded-lg px-3.5 py-2.5 focus-within:border-[#FF8A2A] transition"
                style={{ borderColor: "#E5E7EB" }}
              >
                <IndianRupee size={16} color="#9CA3AF" />
                <input
                  type="number"
                  value={registrationFee}
                  onChange={(e) => setRegistrationFee(e.target.value)}
                  placeholder="e.g., 500"
                  min={0}
                  className="flex-1 text-[#2F2F2F] text-sm outline-none bg-transparent placeholder-[#9CA3AF]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider block mb-2">
                Description
              </label>
              <div
                className="flex gap-3 border rounded-lg px-3.5 py-2.5 focus-within:border-[#FF8A2A] transition"
                style={{ borderColor: "#E5E7EB" }}
              >
                <FileText size={16} color="#9CA3AF" className="mt-0.5 shrink-0" />
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the tournament rules, format, prizes..."
                  rows={4}
                  className="flex-1 text-[#2F2F2F] text-sm outline-none bg-transparent placeholder-[#9CA3AF] resize-none"
                />
              </div>
            </div>
          </motion.div>

          <motion.button
            type="submit"
            disabled={loading}
            className="w-full py-4 text-white rounded-lg font-bold text-sm flex items-center justify-center gap-2.5 transition disabled:opacity-60"
            style={{
              backgroundColor: loading ? "rgba(255, 138, 42, 0.5)" : "#FF8A2A"
            }}
            whileHover={!loading ? { scale: 1.02 } : {}}
            whileTap={!loading ? { scale: 0.98 } : {}}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <PlusCircle size={20} />
                Add {tournamentType === "football" ? "Football" : "Futsal"} Tournament
              </>
            )}
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
}