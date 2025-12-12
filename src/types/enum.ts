export const DialogType = {
  UPDATE: "Update",
  CREATE: "Create",
} as const;

export type DialogType = (typeof DialogType)[keyof typeof DialogType];
