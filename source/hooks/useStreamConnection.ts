import {useState, useEffect, useCallback} from 'react';
import {WebcastPushConnection} from 'tiktok-live-connector';
import type {
	StreamStats,
	ChatMessage,
	GiftEvent,
	FollowEvent,
	LikeEvent,
	ShareEvent,
} from '../types.js';
import {getNicknameColor} from '../utils/colors.js';
import {sanitizeWithDefault} from '../utils/text.js';

const MAX_RETRIES = 5;
const RETRY_DELAY = 2000;

export function useStreamConnection(username: string) {
	const [connection, setConnection] = useState<WebcastPushConnection | null>(
		null,
	);
	const [streamStats, setStreamStats] = useState<StreamStats>({
		viewerCount: 0,
		likeCount: 0,
		totalGifts: 0,
		followCount: 0,
		shareCount: 0,
	});
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [gifts, setGifts] = useState<GiftEvent[]>([]);
	const [follows, setFollows] = useState<FollowEvent[]>([]);
	const [likes, setLikes] = useState<LikeEvent[]>([]);
	const [shares, setShares] = useState<ShareEvent[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [isConnecting, setIsConnecting] = useState(true);
	const [retryCount, setRetryCount] = useState(0);

	const shouldRetryError = (error: string): boolean => {
		// List of error patterns that indicate permanent failures
		const permanentFailures = ['user_not_found', 'Failed to retrieve room_id'];

		return !permanentFailures.some(failure => error.includes(failure));
	};

	const handleChat = useCallback((data: any) => {
		const newMessage: ChatMessage = {
			id: Math.random().toString(),
			nickname: sanitizeWithDefault(data.nickname, 'anonymous'),
			nicknameColor: getNicknameColor(data.nickname),
			message: data.comment,
			timestamp: Date.now(),
		};
		setMessages(prev => [...prev, newMessage].slice(-50));
	}, []);

	const handleGift = useCallback((data: any) => {
		const newGift: GiftEvent = {
			id: Math.random().toString(),
			type: 'gift',
			nickname: sanitizeWithDefault(data.nickname, 'anonymous'),
			nicknameColor: getNicknameColor(data.nickname),
			giftId: data.giftId,
			giftName: data.giftName,
			diamondCount: data.diamondCount,
			repeatCount: data.repeatCount,
			timestamp: Date.now(),
		};

		setGifts(prev => [...prev, newGift].slice(-10));
		setStreamStats(prev => ({
			...prev,
			totalGifts: prev.totalGifts + data.diamondCount * data.repeatCount,
		}));
	}, []);

	const handleFollow = useCallback((data: any) => {
		const newFollow: FollowEvent = {
			id: Math.random().toString(),
			type: 'follow',
			nickname: sanitizeWithDefault(data.nickname, 'anonymous'),
			nicknameColor: getNicknameColor(data.nickname),
			timestamp: Date.now(),
		};
		setFollows(prev => [...prev, newFollow].slice(-10));
		setStreamStats(prev => ({
			...prev,
			followCount: prev.followCount + 1,
		}));
	}, []);

	const handleLike = useCallback((data: any) => {
		const newLike: LikeEvent = {
			id: Math.random().toString(),
			type: 'like',
			nickname: sanitizeWithDefault(data.nickname, 'anonymous'),
			nicknameColor: getNicknameColor(data.nickname),
			likeCount: data.likeCount,
			timestamp: Date.now(),
		};
		setLikes(prev => [...prev, newLike].slice(-10));
		setStreamStats(prev => ({
			...prev,
			likeCount: prev.likeCount + data.likeCount,
		}));
	}, []);

	const handleShare = useCallback((data: any) => {
		const newShare: ShareEvent = {
			id: Math.random().toString(),
			type: 'share',
			nickname: sanitizeWithDefault(data.nickname, 'anonymous'),
			nicknameColor: getNicknameColor(data.nickname),
			timestamp: Date.now(),
		};
		setShares(prev => [...prev, newShare].slice(-10));
		setStreamStats(prev => ({
			...prev,
			shareCount: prev.shareCount + 1,
		}));
	}, []);

	const handleRoomUser = useCallback((data: any) => {
		setStreamStats(prev => ({
			...prev,
			viewerCount: data.viewerCount,
		}));
	}, []);

	const connectWithRetry = useCallback(
		async (tiktokConnection: WebcastPushConnection, attempt: number) => {
			try {
				await tiktokConnection.connect();
				setIsConnecting(false);
				setConnection(tiktokConnection);
				setError(null);
				setRetryCount(0);
			} catch (err) {
				const errorMessage =
					err instanceof Error ? err.message : 'Unknown error';

				// Check if we should retry or fail fast
				if (shouldRetryError(errorMessage)) {
					if (attempt < MAX_RETRIES) {
						setIsConnecting(true);
						setError(
							`Connection attempt ${
								attempt + 1
							}/${MAX_RETRIES} failed: ${errorMessage}. Retrying...`,
						);

						await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
						return connectWithRetry(tiktokConnection, attempt + 1);
					}
				}

				// Either it's a permanent failure or we've exhausted retries
				setIsConnecting(false);
				setError(errorMessage);
			}
		},
		[],
	);

	useEffect(() => {
		const tiktokConnection = new WebcastPushConnection(username);

		// Start connection process with initial attempt
		connectWithRetry(tiktokConnection, 0);

		// Set up event listeners
		tiktokConnection.on('chat', handleChat);
		tiktokConnection.on('gift', handleGift);
		tiktokConnection.on('follow', handleFollow);
		tiktokConnection.on('like', handleLike);
		tiktokConnection.on('share', handleShare);
		tiktokConnection.on('roomUser', handleRoomUser);

		// Add handlers for connection events
		tiktokConnection.on('streamEnd', actionId => {
			setError(
				`Stream ended${
					actionId === 3
						? ' by user'
						: actionId === 4
						? ' by platform moderator'
						: ''
				}`,
			);
			setIsConnecting(false);
		});

		tiktokConnection.on('disconnected', () => {
			setError('Connection disconnected');
			setIsConnecting(false);
		});

		return () => {
			tiktokConnection.disconnect();
		};
	}, [
		username,
		handleChat,
		handleGift,
		handleFollow,
		handleLike,
		handleShare,
		handleRoomUser,
		connectWithRetry,
	]);

	return {
		connection,
		streamStats,
		messages,
		gifts,
		follows,
		likes,
		shares,
		error,
		isConnecting,
		retryCount,
	};
}
