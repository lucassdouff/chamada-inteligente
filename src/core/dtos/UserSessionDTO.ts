export interface UserSessionDTO {
    name: string | undefined;
    id: number | undefined;
    role: "teacher" | "student" | undefined;
}