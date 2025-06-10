import { defineEventHandler, getRouterParams, createError } from 'h3';
import { useStorage } from '#imports';

export default defineEventHandler(async (event) => {
  const params = getRouterParams(event);
  const riskId = params.id;

  if (!riskId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Risk ID is required',
    });
  }

  // Files in `server/assets/` are accessed via `assets:server` storage.
  // The path `risks/${riskId}.md` becomes `risks:${riskId}.md`
  const assetPath = `risks:${riskId}.md`;

  const content = await useStorage('assets:server').getItem(assetPath);

  if (content === null) {
    throw createError({
      statusCode: 404,
      statusMessage: `Risk content for ID ${riskId} not found`,
    });
  }

  return { content };
}); 