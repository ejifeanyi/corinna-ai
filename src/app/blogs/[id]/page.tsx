import { onGetBlogPost } from "@/actions/landing";
import React from "react";

type Props = {
	params: { id: string };
};

const PostPage = async ({ params }: Props) => {
    const post = await onGetBlogPost(params.id)
	return <div>PostPage</div>;
};

export default PostPage;
