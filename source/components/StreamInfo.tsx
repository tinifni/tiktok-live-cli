import React from 'react';
import {Box, Text} from 'ink';

interface StreamInfoProps {
	stats: {
		viewerCount: number;
		likeCount: number;
		totalGifts: number;
		followCount: number;
		shareCount: number;
	};
}

export function StreamInfo({stats}: StreamInfoProps) {
	return (
		<Box flexDirection="row" gap={2}>
			<Text color="cyan">👤 {stats.viewerCount.toLocaleString()}</Text>
			<Text color="yellow">🎁 {stats.totalGifts.toLocaleString()}</Text>
			<Text color="green">👥 {stats.followCount.toLocaleString()}</Text>
			<Text color="red">❤️ {stats.likeCount.toLocaleString()}</Text>
			<Text color="magenta">📢 {stats.shareCount.toLocaleString()}</Text>
		</Box>
	);
}
