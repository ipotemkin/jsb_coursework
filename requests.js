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
    getPlayerStatus(token, callback) {
        const url = this.urlDomain + `player-status?token=${token}`;
        httpRequest({url, onSuccess: callback});
    }
    startGame(token, callback) {
        const url = this.urlDomain + `start?token=${token}`;
        httpRequest({url, onSuccess: callback});
    }
    getGameStatus(token, gameId, callback=this.gameStatusCallback) {
        const url = this.urlDomain + `game-status?token=${token}&id=${gameId}`;
        httpRequest({url, onSuccess: callback});
    }
    gameStatusCallback(response) {
        console.log(response);
        if (response.status !== 'ok') {
            console.log('error');
            return;
        }
        if (response['game-status'].status === 'waiting-for-start') {
            console.log('no enemy yet');
            renderWaitingScreenNoEnemy();

        } else {
            window.application.enemy = response['game-status'].enemy.login;
            renderGameScreen(window.application.enemy);    
        }
    }
}
