export interface Stats {
    _id: string,
    game_id: string,
    number: number,
    title: string,
    comments?: string,
    leaderboard: string[],
    createdAt: string,
    updatedAt: string,
}