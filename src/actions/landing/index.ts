"use server";
import axios from "axios";

interface WordPressPost {
	id: string;
	title: {
		rendered: string;
	};
	featured_media: number;
	content: {
		rendered: string;
	};
	date: string;
}

interface WordPressMedia {
	media_details: {
		file: string;
		sizes: {
			full: {
				source_url: string;
			};
		};
	};
	source_url: string;
}

export const onGetBlogPosts = async () => {
	try {
		const postsUrl = process.env.CLOUDWAYS_POSTS_URL;
		const featuredImages = process.env.CLOUDWAYS_FEATURED_IMAGES_URL;

		if (!postsUrl || !featuredImages) {
			console.error("Missing environment variables");
			return [];
		}

		const { data: posts } = await axios.get<WordPressPost[]>(postsUrl);

		// Use Promise.all to fetch all images in parallel
		const postsWithImages = await Promise.all(
			posts.map(async (post) => {
				try {
					if (!post.featured_media) {
						return null;
					}

					const { data: imageData } = await axios.get<WordPressMedia>(
						`${featuredImages}/${post.featured_media}`
					);

					return {
						id: post.id,
						title: post.title.rendered,
						// Use source_url as primary, fallback to media_details.file
						image:
							imageData.source_url ||
							(imageData.media_details?.file
								? `${process.env.CLOUDWAYS_UPLOADS_URL}/${imageData.media_details.file}`
								: "/images/default-post-image.jpg"),
						content: post.content.rendered,
						createdAt: new Date(post.date),
					};
				} catch (error) {
					console.error(`Error fetching image for post ${post.id}:`, error);
					return null;
				}
			})
		);

		// Filter out null values and return valid posts
		return postsWithImages.filter(
			(post): post is NonNullable<typeof post> => post !== null
		);
	} catch (error) {
		console.error("Error fetching blog posts:", error);
		return [];
	}
};

export const onGetBlogPost = async (id: string) => {
	try {
		const postUrl = process.env.CLOUDWAYS_POSTS_URL;
		if (!postUrl) {
			console.error("Missing environment variables");
			return [];
		}

		const post = await axios.get(`${postUrl}${id}`);
		if (post.data) {
			const authorUrl = process.env.CLOUDWAYS_USERS_URL;
			if (!authorUrl) {
				console.error("Missing author url in .env");
				return "";
			}
			const author = await axios.get(`${authorUrl}${post.data.author}`);
			if (author.data) {
				return {
					id: post.data.id,
					title: post.data.title.rendered,
					content: post.data.content.rendered,
					createdAt: new Date(post.data.date),
					author: author.data.name,
				};
			}
		}
	} catch (error) {
		console.log(error);
	}
};
