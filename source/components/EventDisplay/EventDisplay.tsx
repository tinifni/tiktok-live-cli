import React, {useRef, useEffect, useState} from 'react';
import {Box, Text, measureElement, useStdout} from 'ink';
import type {BaseEvent} from '../../types.js';

interface EventDisplayProps<T extends BaseEvent> {
	title: string;
	events: T[];
	height: number;
	renderEvent: (event: T) => React.ReactNode;
}

export function EventDisplay<T extends BaseEvent>({
	title,
	events,
	height,
	renderEvent,
}: EventDisplayProps<T>) {
	const [remainingWidth, setRemainingWidth] = useState(0);
	const containerRef = useRef<any>();
	const {stdout} = useStdout();

	const updateWidth = () => {
		if (containerRef.current) {
			const {width} = measureElement(containerRef.current);
			setRemainingWidth(Math.max(0, width - title.length - 5));
		}
	};

	useEffect(() => {
		updateWidth();

		stdout.on('resize', updateWidth);

		return () => {
			stdout.off('resize', updateWidth);
		};
	}, [title, stdout]);

	return (
		<Box flexDirection="column" height={height}>
			<Box ref={containerRef} height={1}>
				<Text>
					<Text color="gray">──</Text>
					<Text color="white"> {title} </Text>
					<Text color="gray">{'─'.repeat(remainingWidth)}</Text>
				</Text>
			</Box>
			<Box flexDirection="column" height={height - 1} overflow="hidden">
				{events.map(event => (
					<Box key={event.id}>
						<Text wrap="wrap">{renderEvent(event)}</Text>
					</Box>
				))}
			</Box>
		</Box>
	);
}

export type {EventDisplayProps};
