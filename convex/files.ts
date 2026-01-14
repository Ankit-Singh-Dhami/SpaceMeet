import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/* =======================
   Create File
======================= */
export const createFile = mutation({
  args: {
    fileName: v.string(),
    teamId: v.id("teams"), // ✅ FIXED
    createdBy: v.string(),
    archive: v.boolean(),
    document: v.string(),
    whiteboard: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.insert("files", args);
    return result;
  },
});

/* =======================
   Get Files by Team
======================= */
export const getFile = query({
  args: {
    teamId: v.id("teams"), // ✅ FIXED
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("files")
      .filter((q) => q.eq(q.field("teamId"), args.teamId))
      .order("desc")
      .collect();
  },
});

/* =======================
   Delete File
======================= */
export const deleteFile = mutation({
  args: {
    _id: v.id("files"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args._id);
    return { success: true };
  },
});

/* =======================
   Update Document
======================= */
export const updateDocument = mutation({
  args: {
    _id: v.id("files"),
    document: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args._id, {
      document: args.document,
    });
  },
});

/* =======================
   Get File by ID
======================= */
export const getFileById = query({
  args: {
    _id: v.id("files"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args._id);
  },
});

/* =======================
   Update Whiteboard
======================= */
export const updateWhiteBoard = mutation({
  args: {
    _id: v.id("files"),
    whiteboard: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args._id, {
      whiteboard: args.whiteboard,
    });
  },
});

export const getAccessibleFiles = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    // 1️⃣ Files user owns
    const ownedFiles = await ctx.db
      .query("files")
      .filter((q) => q.eq(q.field("createdBy"), args.email))
      .collect();

    // 2️⃣ Files shared with user
    const permissions = await ctx.db
      .query("fileAccess")
      .filter((q) => q.eq(q.field("userEmail"), args.email))
      .collect();

    const sharedFiles = await Promise.all(
      permissions.map((p) => ctx.db.get(p.fileId))
    );

    return [...ownedFiles, ...sharedFiles.filter(Boolean)];
  },
});
