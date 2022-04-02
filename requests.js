class Requests {
    constructor(urlDomain) {
        this.urlDomain = urlDomain;

        this.getGameStatus = this.getGameStatus.bind(this);
        this.checkGameStatus = this.checkGameStatus.bind(this);
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
        console.log('before checking game-status == waiting-for-start');
        if (response['game-status'].status === 'waiting-for-start') {
            console.log('inside checking game-status == waiting-for-start');
            console.log('no enemy yet');
            
            if (window.application.timer) {
                console.log(window.application.counter++);
            } else {
                renderWaitingScreenNoEnemy();
            }

        } else {
            // clearing timer for periodical checking the game status
            if (window.application.timer) {
                clearInterval(window.application.timer);
                window.application.timer = undefined;
                window.application.counter = 0;
            }
            
            window.application.enemy = response['game-status'].enemy.login;
            renderGameScreen(window.application.enemy);    
        }
    }
    checkGameStatus() {
        this.getGameStatus(window.application.token, window.application.gameId);
    }
}
