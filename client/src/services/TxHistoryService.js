export default {
    getBlockTx: (address) => {
        return fetch(`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=8AAGX8PGJWQ9WDHYQ5N28SYKZ27ENKJ3VS`)
            .then(response => {
                if (response.status !== 401) {
                    return response.json().then(data => data);
                }
                else
                    return { message: { msgBody: "Unauthorized", msgError: true } };
            });
    }
}