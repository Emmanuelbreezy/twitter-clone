"use server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prismadb";

export async function postComment(data: {
  postId: number;
  body: string;
  commentImage?: string;
}) {
  const { postId, body, commentImage } = data;
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Not signed in");
  }
  try {
    const currentUserId = +session?.user?.id;

    if (!postId) {
      throw new Error("Post Id is required");
    }

    if (!body) {
      throw new Error("Body Id is required");
    }

    const comment = await prisma.comment.create({
      data: {
        body,
        userId: currentUserId,
        postId: postId,
        commentImage: commentImage,
      },
    });

    return {
      message: "Comment created successfully",
      comment,
    };
  } catch (err) {
    throw err;
  }
}
