/**
 * Sanitizes a string to only contain valid UTF-8 characters
 * Removes emojis, special characters, and other non-UTF-8 symbols
 */
export function sanitizeText(text: string): string {
	// First, replace undefined or null with empty string
	if (!text) return '';

	// Remove surrogate pairs (emojis and other special characters)
	const stripped = text.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '');

	// Keep only printable UTF-8 characters
	return stripped.replace(/[^\x20-\x7E\u00A0-\u00FF]/g, '').trim();
}

/**
 * Returns a default value if the input is empty after sanitization
 */
export function sanitizeWithDefault(
	text: string | undefined | null,
	defaultValue: string,
): string {
	const sanitized = sanitizeText(text || '');
	return sanitized || defaultValue;
}
