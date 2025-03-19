const COLORS = ['green', 'yellow', 'blue', 'magenta', 'cyan', 'red'] as const;

export type UserColor = (typeof COLORS)[number];

export function getNicknameColor(nickname: string): UserColor {
	const safeNickname = nickname || 'anonymous';
	let sum = 0;
	for (let i = 0; i < safeNickname.length; i++) {
		sum += safeNickname.charCodeAt(i);
	}
	return COLORS[sum % COLORS.length]!;
}
