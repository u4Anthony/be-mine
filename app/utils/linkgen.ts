import crypto from "crypto";

export function genLink (
    name: string,
    valentineName: string,
    email: string
): string {
    // create hash from input and gen unique link
    const hash = crypto
                    .createHash("sha256")
                    .update(`${name}${valentineName}${email}${Date.now()}`)
                    .digest("hex")
                    .slice(0, 16);

    return `/valentine/${hash}?valentine=${encodeURIComponent(valentineName)}`;
}

export function extractValentineName(url: string): string | null {
    const searchParams = new URLSearchParams(url.split("?")[1]);
    return searchParams.get("valentine");
}