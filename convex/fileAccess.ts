import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const inviteUserToFile = mutation({
  args: {
    fileId: v.id("files"),
    email: v.string(),
    invitedBy: v.string(),
  },
  handler: async (ctx, args) => {
    // 1️⃣ Check if permission already exists
    const existing = await ctx.db
      .query("fileAccess")
      .filter((q) =>
        q.and(
          q.eq(q.field("fileId"), args.fileId),
          q.eq(q.field("userEmail"), args.email)
        )
      )
      .first();

    if (existing) {
      return { success: false, message: "Already invited" };
    }

    // 2️⃣ Create permission
    await ctx.db.insert("fileAccess", {
      fileId: args.fileId,
      userEmail: args.email,
      invitedBy: args.invitedBy,
      accessType: "view",
    });

    return { success: true };
  },
});
