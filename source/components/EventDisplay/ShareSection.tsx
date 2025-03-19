import React from 'react';
import {Text} from 'ink';
import {EventDisplay} from './EventDisplay.js';
import type {ShareEvent} from '../../types.js';

interface ShareSectionProps {
	events: ShareEvent[];
	height: number;
}

export function ShareSection({events, height}: ShareSectionProps) {
	const renderShareEvent = (event: ShareEvent) => (
		<Text key={event.id}>
			<Text>📢 </Text>
			<Text color={event.nicknameColor}>{event.nickname}</Text>
		</Text>
	);

	return (
		<EventDisplay<ShareEvent>
			title="📢 Shares"
			events={events}
			height={height}
			renderEvent={renderShareEvent}
		/>
	);
}
