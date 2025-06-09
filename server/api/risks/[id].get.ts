import { defineEventHandler, getRouterParams, createError } from 'h3';
import { promises as fs } from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
  const params = getRouterParams(event);
  const riskId = params.id;
 

  if (!riskId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Risk ID is required',
    });
  }

  try {
    const filePath = path.join(process.cwd(), 'content', 'risks', `${riskId}.md`);
    const content = await fs.readFile(filePath, 'utf-8');
    return { content };
  } catch (error) {
    throw createError({
      statusCode: 404,
      statusMessage: `Risk content for ID ${riskId} not found`,
    });
  }
}); 