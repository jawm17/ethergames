export default {
    getInfo: (name) => {
        return fetch('/game/info/' + name)
            .then(response => {
                if (response.status !== 401) {
                    return response.json().then(data => data);
                }
                else
                    return { message: { msgBody: "Unauthorized", msgError: true } };
            });
    },
    newScore: (game, user, score) => {
        return fetch('/game/score', {
            method: "post",
            body: JSON.stringify({ "game": game, "score": score, "user": user }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status !== 401) {
                return response.json().then(data => data);
            }
            else
                return { message: { msgBody: "Unauthorized" }, msgError: true };
        });
    },
    potPayout: (game) => {
        return fetch('/game/potPayment', {
            method: "post",
            body: JSON.stringify({ "game": game }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status !== 401) {
                return response.json().then(data => data);
            }
            else
                return { message: { msgBody: "Unauthorized" }, msgError: true };
        });
    }
}