import React from 'react';
import {Text} from 'ink';
import {EventDisplay} from './EventDisplay.js';
import type {FollowEvent} from '../../types.js';

interface FollowSectionProps {
	events: FollowEvent[];
	height: number;
}

export function FollowSection({events, height}: FollowSectionProps) {
	const renderFollowEvent = (event: FollowEvent) => (
		<Text key={event.id}>
			<Text>👥 </Text>
			<Text color={event.nicknameColor}>{event.nickname}</Text>
		</Text>
	);

	return (
		<EventDisplay<FollowEvent>
			title="👥 Follows"
			events={events}
			height={height}
			renderEvent={renderFollowEvent}
		/>
	);
}
