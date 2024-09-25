"use server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prismadb";

export async function likePost(postId: number) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Not signed in");
  }
  try {
    const currentUserId = +session?.user?.id;

    if (!postId) {
      throw new Error("Post Id is required");
    }
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new Error("Post not found");
    }

    let updatedLikeIds = [...(post.likedIds || [])];

    if (updatedLikeIds.includes(currentUserId)) {
      updatedLikeIds = updatedLikeIds.filter(
        (likeId) => likeId !== currentUserId
      );
    } else {
      updatedLikeIds.push(currentUserId);
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likedIds: updatedLikeIds,
      },
    });
    const isLiked = updatedPost.likedIds.includes(currentUserId);

    return {
      isLiked,
      updatedPost,
    };
  } catch (err) {
    console.log(err, "update");
    throw err;
  }
}
