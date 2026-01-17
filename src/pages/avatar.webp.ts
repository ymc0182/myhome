import type { APIRoute } from "astro";
import sharp from "sharp";

export const GET: APIRoute = async () => {
	const response = await fetch("https://q1.qlogo.cn/g?b=qq&nk=501414437&s=100");
	const arrayBuffer = await response.arrayBuffer();
	
	// Convert to WebP format
	const webpBuffer = await sharp(Buffer.from(arrayBuffer))
		.webp({ quality: 60, effort: 6 })
		.toBuffer();
	
	return new Response(new Uint8Array(webpBuffer), {
		headers: {
			"Content-Type": "image/webp",
			"Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000",
		},
	});
}