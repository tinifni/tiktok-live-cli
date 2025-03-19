import React from 'react';
import {Box} from 'ink';
import type {
	StreamStats,
	ChatMessage,
	GiftEvent,
	FollowEvent,
	LikeEvent,
	ShareEvent,
} from '../types.js';
import {EventSections} from './EventSections.js';
import {ChatMessages} from './ChatMessages.js';

interface LayoutProps {
	dimensions: {rows: number; columns: number};
	messages: ChatMessage[];
	isConnecting: boolean;
	username: string;
	stats: StreamStats;
	gifts: GiftEvent[];
	follows: FollowEvent[];
	likes: LikeEvent[];
	shares: ShareEvent[];
	layout: {
		sidebarWidth: string;
		chatWidth: string;
	};
}

export function WideLayout({
	dimensions,
	messages,
	isConnecting,
	username,
	stats,
	gifts,
	follows,
	likes,
	shares,
	layout,
}: LayoutProps) {
	const mainContentHeight = dimensions.rows;
	const eventSectionHeight = Math.floor(mainContentHeight / 4);

	return (
		<Box flexDirection="row" height={mainContentHeight}>
			<Box
				width={layout.sidebarWidth}
				flexDirection="column"
				height={mainContentHeight}
				paddingRight={1}
			>
				<EventSections
					height={eventSectionHeight}
					gifts={gifts}
					follows={follows}
					likes={likes}
					shares={shares}
				/>
			</Box>

			<Box width={layout.chatWidth} height={mainContentHeight} paddingLeft={1}>
				<ChatMessages
					messages={messages}
					isConnecting={isConnecting}
					username={username}
					stats={stats}
				/>
			</Box>
		</Box>
	);
}

export function NarrowLayout({
	dimensions,
	messages,
	isConnecting,
	username,
	stats,
	gifts,
	follows,
	likes,
	shares,
}: LayoutProps) {
	const mainContentHeight = dimensions.rows;
	const eventSectionHeight = Math.floor(mainContentHeight / 8);
	const chatHeight = mainContentHeight - eventSectionHeight * 4;

	return (
		<Box flexDirection="column" height={dimensions.rows}>
			<Box flexDirection="column">
				<EventSections
					height={eventSectionHeight}
					gifts={gifts}
					follows={follows}
					likes={likes}
					shares={shares}
				/>
			</Box>

			<Box flexDirection="column" height={chatHeight}>
				<ChatMessages
					messages={messages}
					isConnecting={isConnecting}
					username={username}
					stats={stats}
				/>
			</Box>
		</Box>
	);
}
