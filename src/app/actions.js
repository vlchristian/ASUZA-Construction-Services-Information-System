"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function approveUser(){
  
}

export async function saveProject(formData) {
  const {
    projectID,
    projectName,
    projectLocation,
    projectStatus,
    assignedUserIDs,
  } = formData;

  try {
    if (projectID) {
      const currentProject = await prisma.project.findUnique({
        where: { projectID },
        include: { users: true },
      });
      if (!currentProject) {
        throw new Error("Project not found");
      }
      const removeUser = currentProject.users
        .filter((u) => !assignedUserIDs.includes(u.userID))
        .map((u) => ({ userID: u.userID }));
      await prisma.project.update({
        where: { projectID },
        data: {
          projectName,
          projectLocation,
          projectStatus,
          users: {
            disconnect: removeUser,
            connect: assignedUserIDs.map((uid) => ({ userID: uid })),
          },
        },
      });
    } else {
      await prisma.project.create({
        data: {
          projectName,
          projectLocation,
          projectStatus,
          users: {
            connect: assignedUserIDs.map((uid) => ({ userID: uid })),
          },
        },
      });
    }
    revalidatePath("/dashboard/admin/projects");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to save project" };
  }
}

export async function deleteProject(projectID) {
  try {
    await prisma.project.delete({
      where: { projectID },
    });

    revalidatePath("/dashboard/admin/projects");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete" };
  }
}