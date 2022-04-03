function LoginPageTemplate() {
    return {
        tag: 'div',
        cls: 'content',
        content: [
            {
                tag: 'h2',
                content: 'Камень-ножницы-бумага'
            },
            {
                tag: 'h3',
                content: 'Введите имя и нажмите на кнопку, чтобы начать игру',
            },
            {
                tag: 'form',
                cls: 'buttons-box',
                content: [
                    {
                        tag: 'input',
                        cls: ['login-form__input', 'input'],
                        content: 'input text',
                        attrs: {
                            placeholder: 'Your nickname'
                        }
                    },
                    {
                        tag: 'button',
                        cls: ['login-form__button', 'button'],
                        content: 'Войти'
                    },
                ]       
            }
        ]
    }
}

function LobbyPageTemplate() {
    return {
        tag: 'div',
        cls: 'content',
        content: [
            {
                tag: 'h2',
                content: 'Лобби'
            },
            {
                tag: 'div',
                cls: 'lobby__players-list',
            },
            {
                tag: 'div',
                cls: 'buttons-box',
                content: [
                    {
                        tag: 'button',
                        cls: ['lobby__button', 'button'],
                        content: 'Играть!'
                    },
                    {
                        tag: 'button',
                        cls: ['lobby__button-logout', 'button'],
                        content: 'Logout'
                    }        
                ]
            }
        ]
    }
}

function GamePageTemplate(enemy) {
    return {
        tag: 'div',
        cls: 'content',
        content: [
            {
                tag: 'h2',
                content: 'Игра'
            },
            {
                tag: 'h3',
                content: `Вы против <${enemy}>`,
            },
            {
                tag: 'div',
                cls: 'buttons-box',
                content: [
                    {
                        tag: 'button',
                        cls: ['game__button-rock', 'button'],
                        content: 'Камень'
                    },
                    {
                        tag: 'button',
                        cls: ['game__button-scissors', 'button'],
                        content: 'Ножницы'
                    },
                    {
                        tag: 'button',
                        cls: ['game__button-paper', 'button'],
                        content: 'Бумага'
                    }        
                ]
            }
        ]
    }
}

function WaitingPageTemplate(rival, message, title='Игра') {
    const rival_str = rival === 'NoEnemyYet' ? '' : `Вы против <${rival}>`
    return {
        tag: 'div',
        cls: 'content',
        content: [
            {
                tag: 'h2',
                content: title
            },
            {
                tag: 'h3',
                content: rival_str,
            },
            {
                tag: 'h2',
                content: message,
            },
            {
                tag: 'h2',
                content: '',
            },
        ]
    }
}

function FinalPageTemplate(rival, message, title='Игра') {
    return {
        tag: 'div',
        cls: 'content',
        content: [
            {
                tag: 'h2',
                content: title
            },
            {
                tag: 'h3',
                content: `Вы против <${rival}>`,
            },
            {
                tag: 'h2',
                content: message,
            },
            {
                tag: 'div',
                cls: 'buttons-box',
                content: [
                    {
                        tag: 'button',
                        cls: ['final__button-play-again', 'button'],
                        content: 'Играть еще!'
                    },
                    {
                        tag: 'button',
                        cls: ['final__button-lobby', 'button'],
                        content: 'В лобби'
                    },        
                ]
            }
        ]
    }
}
