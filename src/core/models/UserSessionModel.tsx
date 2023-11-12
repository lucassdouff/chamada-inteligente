export type UserSessionModel = {
    name: string | undefined;
    id: number | undefined;
    role: "teacher" | "student" | undefined;
}