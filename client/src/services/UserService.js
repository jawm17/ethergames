export default {
    getUserInfo: () => {
        return fetch('/user/info')
            .then(response => {
                if (response.status !== 401) {
                    return response.json().then(data => data);
                }
                else
                    return { message: { msgBody: "Unauthorized", msgError: true } };
            });
    },
    updateBalance: (funds) => {
        return fetch('/user/update-balance', {
            method: "post",
            body: JSON.stringify({ "funds": funds }),
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
    updateNumTx: (numTx) => {
        return fetch('/user/update-NumTx', {
            method: "post",
            body: JSON.stringify({ "numTx": numTx }),
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
}