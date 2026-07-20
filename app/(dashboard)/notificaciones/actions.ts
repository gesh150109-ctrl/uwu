"use server";

import { revalidatePath } from "next/cache";

import { markNotificationRead } from "@/services/notifications/mark-notification-read";
import { markAllNotificationsRead } from "@/services/notifications/mark-all-notifications-read";

export async function markNotificationReadAction(
  formData: FormData,
) {
  const id = formData.get("id");

  if (typeof id !== "string" || !id) {
    throw new Error("Notificación inválida.");
  }

  await markNotificationRead(id);

  revalidatePath("/notificaciones");
  revalidatePath("/", "layout");
}

export async function markAllNotificationsReadAction() {
  await markAllNotificationsRead();

  revalidatePath("/notificaciones");
  revalidatePath("/", "layout");
}