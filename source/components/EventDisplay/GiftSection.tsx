import React from 'react';
import {Text} from 'ink';
import {EventDisplay} from './EventDisplay.js';
import type {GiftEvent} from '../../types.js';

interface GiftSectionProps {
	events: GiftEvent[];
	height: number;
}

export function GiftSection({events, height}: GiftSectionProps) {
	const renderGiftEvent = (event: GiftEvent) => (
		<Text key={event.id}>
			<Text>🎁 </Text>
			<Text color={event.nicknameColor}>{event.nickname}</Text>
			<Text> sent </Text>
			<Text color="magenta">{event.giftName}</Text>
			<Text> x{event.repeatCount}</Text>
		</Text>
	);

	return (
		<EventDisplay<GiftEvent>
			title="🎁 Gifts"
			events={events}
			height={height}
			renderEvent={renderGiftEvent}
		/>
	);
}
