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
                content: 'Экран входа',
            },
            {
                tag: 'input',
                cls: ['login-form__input', 'input'],
                content: 'input text',
                attrs: {
                    placeholder: 'You nickname'
                }
            },
            {
                tag: 'button',
                cls: ['login-form__button', 'button'],
                content: 'Войти'
            },
            // {
            //     tag: 'button',
            //     cls: 'login-form__game-status',
            //     content: 'Статус игры'
            // }
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
            // // {
            // //     tag: 'h3',
            // //     content: 'Экран входа',
            // // },
            // {
            //     tag: 'input',
            //     content: 'input text',
            //     attrs: {
            //         placeholder: 'You nickname'
            //     }
            // },
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
}

function WaitingPageTemplate(rival, message) {
    const rival_str = rival === 'NoEnemyYet' ? '' : `Вы против <${rival}>`
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
                content: rival_str,
            },
            {
                tag: 'h2',
                content: message,
            },
        ]
    }
}

function FinalPageTemplate(rival, message) {
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
                content: `Вы против <${rival}>`,
            },
            {
                tag: 'h2',
                content: message,
            },
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
}



function beerEngineTemplate(beer) {
    return {
        tag: 'div',
        cls: 'beer',
        content: [{
            tag: 'div',
            cls: 'beer__image-container',
            attrs: {
                style: `background-image: url(${beer.image_url});`,
            }
        },
        {
            tag: 'div',
            cls: 'beer__info',
            content: [
                {
                    tag: 'div',
                    cls: 'beer__info-top',
                    content: [
                        {
                            tag: 'div',
                            cls: 'beer__beer-name',
                            content: trunc(beer.name, 40)
                        },
                        {
                            tag: 'div',
                            cls: 'beer__beer-tagline',
                            content: trunc(beer.tagline, 62)
                        },
                        {
                            tag: 'div',
                            cls: 'beer__beer-description',
                            content: trunc(beer.description, 150)
                        }
                    ]
                },
                {
                    tag: 'div',
                    cls: 'beer__beer-abv',
                    content: `alc/vol: ${beer.abv}%`
                }
            ]
        }]
    }
}
