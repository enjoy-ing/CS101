document.addEventListener("DOMContentLoaded", () => {
    const amountInput = document.getElementById("amount");
    const fromCurrency = document.getElementById("from-currency");
    const toCurrency = document.getElementById("to-currency");
    const convertButton = document.getElementById("convert");
    const convertedAmount = document.getElementById("converted-amount");
    const apiKey = "cur_live_OK8FMGNAvgTsCrp1TCMRv4tXAJ3Ywu4O0FDGWweG";

    // Fetch available currencies
    fetch(`https://api.currencyapi.com/v3/latest?apikey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.data);
            currencies.forEach(currency => {
                const option = document.createElement("option");
                option.value = currency;
                option.textContent = currency;
                fromCurrency.appendChild(option.cloneNode(true));
                toCurrency.appendChild(option.cloneNode(true));
            });
        })
        .catch(err => {
            console.error("Error fetching currencies:", err);
            alert("Unable to load currencies. Please try again later.");
        });

    // Perform conversion
    convertButton.addEventListener("click", () => {
        const amount = parseFloat(amountInput.value);
        const from = fromCurrency.value;
        const to = toCurrency.value;

        if (isNaN(amount) || !from || !to) {
            alert("Please enter a valid amount and select currencies.");
            return;
        }

        fetch(`https://api.currencyapi.com/v3/latest?apikey=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                const rates = data.data;
                if (rates[from] && rates[to]) {
                    const fromRate = rates[from].value;
                    const toRate = rates[to].value;
                    const convertedValue = (amount / fromRate) * toRate;
                    convertedAmount.textContent = `${convertedValue.toFixed(2)} ${to}`;
                } else {
                    alert("Invalid currency selection. Please try again.");
                }
            })
            .catch(err => {
                console.error("Error performing conversion:", err);
                alert("An error occurred while converting. Please try again.");
            });
    });
});
