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
    }
}