class Requests {
    constructor(urlDomain) {
        this.urlDomain = urlDomain;
    }
    login(loginName, callback) {
        const url = this.urlDomain + `login?login=${loginName}`;
        httpRequest({url, onSuccess: callback});
    }
    getPlayerList(token, callback) {
        const url = this.urlDomain + `player-list?token=${token}`;
        httpRequest({url, onSuccess: callback});
    }
    startGame(token, callback) {
        const url = this.urlDomain + `start?token=${token}`;
        httpRequest({url, onSuccess: callback});
    }
    getGameStatus(token, gameId, callback) {
        const url = this.urlDomain + `game-status?token=${token}&id=${gameId}`;
        httpRequest({url, onSuccess: callback});
    }
}
