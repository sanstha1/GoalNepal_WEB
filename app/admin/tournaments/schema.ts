import z from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const TournamentSchema = z.object({
    title: z.string().min(3, { message: "Title must be at least 3 characters" }),
    type: z.enum(["football", "futsal"], { message: "Type must be football or futsal" }),
    location: z.string().min(1, { message: "Location is required" }),
    startDate: z.string().min(1, { message: "Start date is required" }),
    endDate: z.string().min(1, { message: "End date is required" }),
    organizer: z.string().optional(),
    description: z.string().optional(),
    prize: z.string().optional(),
    maxTeams: z
        .string()
        .optional()
        .refine((val) => !val || (!isNaN(Number(val)) && Number(val) >= 2), {
            message: "Max teams must be a number of at least 2",
        }),
    registrationFee: z
        .string()
        .optional()
        .refine((val) => !val || (!isNaN(Number(val)) && Number(val) >= 0), {
            message: "Registration fee must be a non-negative number",
        }),
    bannerImage: z
        .instanceof(File)
        .optional()
        .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
            message: "Max file size is 5MB",
        })
        .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), {
            message: "Only .jpg, .jpeg, .png, .webp formats are supported",
        }),
}).refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
    path: ["endDate"],
    message: "End date must be on or after start date",
});

export type TournamentData = z.infer<typeof TournamentSchema>;