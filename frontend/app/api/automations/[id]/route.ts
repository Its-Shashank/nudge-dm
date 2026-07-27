import { NextRequest, NextResponse } from "next/server";
import { deleteAutomation, setAutomationEnabled } from "@/lib/api/automations";
import { ApiError } from "@/lib/api/server";

// Same-origin Route Handler so the browser's normal cookie behavior just
// works — used for the one client-side mutation that needs optimistic UI
// (the enable/disable switch), per .ai/FRONTEND.md's stated exception.
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json().catch(() => ({}));

  if (typeof body.enabled !== "boolean") {
    return NextResponse.json({ error: "`enabled` (boolean) is required" }, { status: 400 });
  }

  try {
    const automation = await setAutomationEnabled(id, body.enabled);
    return NextResponse.json(automation);
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    await deleteAutomation(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
