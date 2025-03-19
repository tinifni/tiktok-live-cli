import React from 'react';
import {Box, Text} from 'ink';
import Spinner from 'ink-spinner';

interface ConnectionStatusProps {
	isConnecting: boolean;
	username: string;
	error?: string | null;
}

export function ConnectionStatus({
	isConnecting,
	username,
	error,
}: ConnectionStatusProps) {
	return (
		<Box>
			{isConnecting ? (
				<Box>
					<Text color="yellow">
						<Spinner type="dots" />
						{' Connecting to @'}
						{username}...
					</Text>
					{error && (
						<Box marginLeft={1}>
							<Text color="yellow">{error}</Text>
						</Box>
					)}
				</Box>
			) : (
				<Text color={error ? 'red' : 'green'}>
					{error ? error : `(@${username})`}
				</Text>
			)}
		</Box>
	);
}
