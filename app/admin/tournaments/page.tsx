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
    <div className="min-h-screen bg-[#fdfcf0]">
      <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6">

        <div className="flex items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Add Tournament</h1>
            <p className="text-gray-500 text-sm">Create a new football or futsal tournament</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div className="bg-white rounded-2xl p-1.5 border border-gray-100 shadow-sm flex gap-1.5">
            {(["football", "futsal"] as TournamentType[]).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setTournamentType(type)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  tournamentType === type
                    ? "bg-[#4a4a4a] text-white shadow-sm"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                <span className="text-base">{type === "football" ? "⚽" : "🥅"}</span>
                {type === "football" ? "Football" : "Futsal"}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Banner Image</p>
            <div className="flex gap-3 items-start">
              <button
                type="button"
                onClick={() => bannerInputRef.current?.click()}
                className="w-24 h-24 shrink-0 flex flex-col items-center justify-center gap-1.5 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl hover:border-[#4a4a4a] hover:bg-gray-100 transition-all group"
              >
                <div className="w-9 h-9 bg-[#4a4a4a] rounded-lg flex items-center justify-center group-hover:bg-[#333] transition-colors">
                  <ImagePlus size={18} className="text-white" />
                </div>
                <span className="text-xs text-gray-400 font-medium">Add Banner</span>
              </button>
              <input
                ref={bannerInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleBannerChange}
              />

              {bannerPreview ? (
                <div className="relative flex-1 h-24">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={bannerPreview}
                    alt="Banner preview"
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-9 rounded-b-xl bg-linear-to-t from-black/55 to-transparent flex items-end px-2.5 pb-1.5">
                    <span className="text-white text-xs font-semibold">
                      {tournamentType === "football" ? "⚽ Football" : "🥅 Futsal"}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={removeBanner}
                    className="absolute top-1.5 right-1.5 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    <X size={11} className="text-white" />
                  </button>
                </div>
              ) : (
                <div className="flex-1 h-24 bg-gray-50 border border-gray-200 rounded-xl flex flex-col items-center justify-center gap-1.5">
                  <Trophy size={24} className="text-gray-200" />
                  <span className="text-xs text-gray-300">Banner preview</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm space-y-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Tournament Details</p>

            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">
                Title <span className="text-red-400">*</span>
              </label>
              <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-3.5 py-2.5 focus-within:border-[#4a4a4a] transition-colors">
                <Trophy size={16} className="text-gray-400 shrink-0" />
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Kathmandu Futsal Cup 2025"
                  className="flex-1 text-gray-800 text-sm outline-none bg-transparent placeholder-gray-300"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">
                Location <span className="text-red-400">*</span>
              </label>
              <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-3.5 py-2.5 focus-within:border-[#4a4a4a] transition-colors">
                <MapPin size={16} className="text-gray-400 shrink-0" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., Kathmandu, Nepal"
                  className="flex-1 text-gray-800 text-sm outline-none bg-transparent placeholder-gray-300"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">
                Date Range <span className="text-red-400">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div className={`rounded-xl p-3.5 border transition-all duration-200 ${startDate ? "bg-[#4a4a4a] border-[#4a4a4a]" : "bg-white border-gray-200"}`}>
                  <div className={`flex items-center gap-1 mb-1 ${startDate ? "text-white/60" : "text-gray-400"}`}>
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
                    className={`w-full text-sm font-bold outline-none bg-transparent cursor-pointer ${startDate ? "text-white" : "text-gray-500"}`}
                  />
                </div>
                <div className={`rounded-xl p-3.5 border transition-all duration-200 ${endDate ? "bg-[#4a4a4a] border-[#4a4a4a]" : "bg-white border-gray-200"}`}>
                  <div className={`flex items-center gap-1 mb-1 ${endDate ? "text-white/60" : "text-gray-400"}`}>
                    <CalendarDays size={12} />
                    <span className="text-xs font-medium">End Date</span>
                  </div>
                  <input
                    type="date"
                    value={endDate}
                    min={startDate || new Date().toISOString().split("T")[0]}
                    onChange={(e) => setEndDate(e.target.value)}
                    className={`w-full text-sm font-bold outline-none bg-transparent cursor-pointer ${endDate ? "text-white" : "text-gray-500"}`}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">
                Organizer
              </label>
              <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-3.5 py-2.5 focus-within:border-[#4a4a4a] transition-colors">
                <Users size={16} className="text-gray-400 shrink-0" />
                <input
                  type="text"
                  value={organizer}
                  onChange={(e) => setOrganizer(e.target.value)}
                  placeholder="e.g., Nepal Football Association"
                  className="flex-1 text-gray-800 text-sm outline-none bg-transparent placeholder-gray-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">
                  Prize Pool
                </label>
                <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-3.5 py-2.5 focus-within:border-[#4a4a4a] transition-colors">
                  <Medal size={16} className="text-gray-400 shrink-0" />
                  <input
                    type="text"
                    value={prize}
                    onChange={(e) => setPrize(e.target.value)}
                    placeholder="e.g., NPR 50,000"
                    className="flex-1 text-gray-800 text-sm outline-none bg-transparent placeholder-gray-300"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">
                  Max Teams
                </label>
                <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-3.5 py-2.5 focus-within:border-[#4a4a4a] transition-colors">
                  <Users size={16} className="text-gray-400 shrink-0" />
                  <input
                    type="number"
                    value={maxTeams}
                    onChange={(e) => setMaxTeams(e.target.value)}
                    placeholder="e.g., 16"
                    min={2}
                    className="flex-1 text-gray-800 text-sm outline-none bg-transparent placeholder-gray-300"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">
                Registration Fee (NPR)
              </label>
              <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-3.5 py-2.5 focus-within:border-[#4a4a4a] transition-colors">
                <IndianRupee size={16} className="text-gray-400 shrink-0" />
                <input
                  type="number"
                  value={registrationFee}
                  onChange={(e) => setRegistrationFee(e.target.value)}
                  placeholder="e.g., 500"
                  min={0}
                  className="flex-1 text-gray-800 text-sm outline-none bg-transparent placeholder-gray-300"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">
                Description
              </label>
              <div className="flex gap-3 border border-gray-200 rounded-xl px-3.5 py-2.5 focus-within:border-[#4a4a4a] transition-colors">
                <FileText size={16} className="text-gray-400 shrink-0 mt-0.5" />
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the tournament rules, format, prizes..."
                  rows={4}
                  className="flex-1 text-gray-800 text-sm outline-none bg-transparent placeholder-gray-300 resize-none"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#4a4a4a] text-white rounded-2xl font-bold text-sm hover:bg-[#333] transition-all shadow-md flex items-center justify-center gap-2.5 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <>
                <PlusCircle size={20} />
                Add {tournamentType === "football" ? "Football" : "Futsal"} Tournament
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}