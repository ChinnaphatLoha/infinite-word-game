export const PAGE = {
    HOME: "home-view",
    MODE: "mode-view",
    GAME: "game-view",
    LEVEL_COMPLETED: "level-completed-view",
    MODE_COMPLETED: "mode-completed-view",
    GAME_COMPLETED: "game-completed-view",
}

export const pages = Object.keys(PAGE).map(key => ({ name: PAGE[key] }))

export const FIRST_PAGE_NAME = PAGE.HOME