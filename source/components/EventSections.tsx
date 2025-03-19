import React from 'react';
import {
	GiftSection,
	FollowSection,
	LikeSection,
	ShareSection,
} from './EventDisplay/index.js';
import type {GiftEvent, FollowEvent, LikeEvent, ShareEvent} from '../types.js';

interface EventSectionsProps {
	height: number;
	gifts: GiftEvent[];
	follows: FollowEvent[];
	likes: LikeEvent[];
	shares: ShareEvent[];
}

export function EventSections({
	height,
	gifts,
	follows,
	likes,
	shares,
}: EventSectionsProps) {
	return (
		<>
			<GiftSection events={gifts} height={height} />
			<FollowSection events={follows} height={height} />
			<LikeSection events={likes} height={height} />
			<ShareSection events={shares} height={height} />
		</>
	);
}
