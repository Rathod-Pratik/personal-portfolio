import path from 'path';
import fs from 'fs/promises';

export default async function handler(req) {
  const { searchParams } = new URL(req.url); // Get URL search params
  const slug = searchParams.get('slug'); // Get slug from query params
  // Sanitize slug
  const sanitizedSlug = slug.replace(/[^a-zA-Z0-9-_]/g, '');
  const filePath = path.join(process.cwd(), '../BlogData', `${sanitizedSlug}.json`); 

  try {
    const data = await fs.readFile(filePath, 'utf-8'); // Read file
    const jsonData = JSON.parse(data); // Parse JSON data
    return new Response(JSON.stringify(jsonData), { status: 200 }); // Return JSON response
  } catch (error) {
    console.error('File read error:', error);
    return new Response(JSON.stringify({ error: "File not found" }), { status: 404 }); // Error handling
  }
}
