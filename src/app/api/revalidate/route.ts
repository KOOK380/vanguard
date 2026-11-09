import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

/**
 * On-demand revalidation from a Sanity webhook (decision 283). Sanity sends the changed document's
 * _type, signed with SANITY_REVALIDATE_SECRET. Every query is tagged with the types it reads
 * (src/lib/cms/sanity.ts), so only pages that use the changed type are rebuilt, on their next visit.
 *
 * Webhook settings in Sanity: POST to https://<site>/api/revalidate, projection {_type, "slug":
 * slug.current}, on create, update and delete, for all document types, with the same secret.
 */

const TYPES = new Set(["siteSettings", "solution", "industry", "project", "teamMember", "partner", "testimonial", "jobOpening", "legalPage"]);

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return NextResponse.json({ message: "Revalidation is not configured." }, { status: 500 });
  try {
    const { isValidSignature, body } = await parseBody<{ _type?: string; slug?: string }>(req, secret, true);
    if (!isValidSignature) return NextResponse.json({ message: "Invalid signature." }, { status: 401 });
    const type = body?._type;
    if (!type || !TYPES.has(type)) return NextResponse.json({ message: "Unknown document type." }, { status: 400 });
    revalidateTag(type, "max");
    return NextResponse.json({ revalidated: type });
  } catch (e) {
    return NextResponse.json({ message: e instanceof Error ? e.message : "Error" }, { status: 500 });
  }
}
