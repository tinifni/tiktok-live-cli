import React from 'react';
import {Text} from 'ink';
import {EventDisplay} from './EventDisplay.js';
import type {LikeEvent} from '../../types.js';

interface LikeSectionProps {
	events: LikeEvent[];
	height: number;
}

export function LikeSection({events, height}: LikeSectionProps) {
	const renderLikeEvent = (event: LikeEvent) => (
		<Text key={event.id}>
			<Text>❤️ </Text>
			<Text color={event.nicknameColor}>{event.nickname}</Text>
			<Text> x{event.likeCount}</Text>
		</Text>
	);

	return (
		<EventDisplay<LikeEvent>
			title="❤️ Likes"
			events={events}
			height={height}
			renderEvent={renderLikeEvent}
		/>
	);
}
