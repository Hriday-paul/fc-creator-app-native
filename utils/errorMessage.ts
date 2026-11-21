// Extracts a readable message from an RTK Query error (backend responds with { success, message })
export const getErrorMessage = (error: unknown, fallback = "Something went wrong") => {
    const e = error as { data?: { message?: string }; error?: string } | undefined;
    return e?.data?.message ?? e?.error ?? fallback;
}
