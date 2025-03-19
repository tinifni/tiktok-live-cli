import React from 'react';
import {Box, Text, useStdout} from 'ink';
import {useStreamConnection} from './hooks/useStreamConnection.js';
import {WideLayout, NarrowLayout} from './components/Layout.js';

interface AppProps {
	username: string;
}

const LAYOUT_BREAKPOINT = 100;
const LAYOUT_CONFIG = {
	wide: {
		sidebarWidth: '33%',
		chatWidth: '67%',
	},
} as const;

export function App({username}: AppProps) {
	const {stdout} = useStdout();
	const dimensions = {
		rows: stdout.rows || 24,
		columns: stdout.columns || 80,
	};

	const {
		streamStats,
		messages,
		gifts,
		follows,
		likes,
		shares,
		error,
		isConnecting,
	} = useStreamConnection(username);

	// Only exit on permanent errors
	if (
		error &&
		(error.includes('user_not_found') ||
			error.includes('Failed to retrieve room_id'))
	) {
		return (
			<Box>
				<Text color="red">{error}</Text>
			</Box>
		);
	}

	const layoutProps = {
		dimensions,
		messages,
		isConnecting,
		username,
		stats: streamStats,
		gifts,
		follows,
		likes,
		shares,
		layout: LAYOUT_CONFIG.wide,
		error,
	};

	return (
		<Box flexDirection="column" height={dimensions.rows}>
			{dimensions.columns >= LAYOUT_BREAKPOINT ? (
				<WideLayout {...layoutProps} />
			) : (
				<NarrowLayout {...layoutProps} />
			)}
		</Box>
	);
}
