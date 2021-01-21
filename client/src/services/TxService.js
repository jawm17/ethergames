export default {
    withdraw: (funds, to, from) => {
        return fetch('/user/sendTransaction', {
            method: "post",
            body: JSON.stringify({ "funds": funds, "to": to, "from": from, "type": "withdraw"}),
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
    potPayment: (amount, game) => {
        return fetch('/game/payment', {
            method: "post",
            body: JSON.stringify({ "amount": amount, "game": game }),
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