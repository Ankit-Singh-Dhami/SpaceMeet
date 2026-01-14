import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  files: defineTable({
    archive: v.boolean(),
    createdBy: v.string(),
    document: v.string(),
    fileName: v.string(),
    teamId: v.id("teams"),
    whiteboard: v.string(),
  }),
  teams: defineTable({
    createBy: v.string(),
    teamName: v.string(),
  }),

  user: defineTable({
    email: v.string(),
    image: v.string(),
    name: v.string(),
  }),

  fileAccess: defineTable({
    fileId: v.id("files"),
    userEmail: v.string(), // invited user
    invitedBy: v.string(), // owner email
    accessType: v.string(), // "view" | "edit"
  }),
});
