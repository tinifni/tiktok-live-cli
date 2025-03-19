import React from 'react';
import {Box, Text} from 'ink';
import {StreamInfo} from './StreamInfo.js';
import {ConnectionStatus} from './ConnectionStatus.js';

interface ChatMessage {
	id: string;
	nickname: string;
	nicknameColor: string;
	message: string;
	timestamp: number;
}

interface ChatMessagesProps {
	messages: ChatMessage[];
	isConnecting: boolean;
	username: string;
	stats: {
		viewerCount: number;
		likeCount: number;
		totalGifts: number;
		followCount: number;
		shareCount: number;
	};
	error?: string | null;
}

export function ChatMessages({
	messages,
	isConnecting,
	username,
	stats,
	error,
}: ChatMessagesProps) {
	return (
		<Box flexDirection="column" height="100%">
			<Box>
				<Text color="white">💬 Chat </Text>
				<ConnectionStatus
					isConnecting={isConnecting}
					username={username}
					error={error}
				/>
				<Text> </Text>
				<StreamInfo stats={stats} />
			</Box>
			<Box flexDirection="column" flexGrow={1} overflow="hidden">
				{messages.map(msg => (
					<Box key={msg.id}>
						<Text wrap="wrap">
							<Text color={msg.nicknameColor}>{msg.nickname}</Text>
							<Text>: {msg.message}</Text>
						</Text>
					</Box>
				))}
			</Box>
		</Box>
	);
}
