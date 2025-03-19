export interface StreamStats {
	viewerCount: number;
	likeCount: number;
	totalGifts: number;
	followCount: number;
	shareCount: number;
}

export interface ChatMessage {
	id: string;
	nickname: string;
	nicknameColor: string;
	message: string;
	timestamp: number;
}

export interface BaseEvent {
	id: string;
	type: 'gift' | 'follow' | 'like' | 'share';
	nickname: string;
	nicknameColor: string;
	timestamp: number;
}

export interface GiftEvent extends BaseEvent {
	type: 'gift';
	giftId: number;
	giftName: string;
	diamondCount: number;
	repeatCount: number;
}

export interface FollowEvent extends BaseEvent {
	type: 'follow';
}

export interface LikeEvent extends BaseEvent {
	type: 'like';
	likeCount: number;
}

export interface ShareEvent extends BaseEvent {
	type: 'share';
}
