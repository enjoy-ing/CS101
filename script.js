document.addEventListener("DOMContentLoaded", () => {
    const amountInput = document.getElementById("amount");
    const fromCurrency = document.getElementById("from-currency");
    const toCurrency = document.getElementById("to-currency");
    const convertButton = document.getElementById("convert");
    const convertedAmount = document.getElementById("converted-amount");

    // Populate currency options
    fetch("https://api.exchangerate.host/symbols")
        .then(response => response.json())
        .then(data => {
            const symbols = data.symbols;
            for (const currency in symbols) {
                const option = document.createElement("option");
                option.value = currency;
                option.textContent = `${currency} - ${symbols[currency].description}`;
                fromCurrency.appendChild(option.cloneNode(true));
                toCurrency.appendChild(option.cloneNode(true));
            }
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

        fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`)
            .then(response => response.json())
            .then(data => {
                convertedAmount.textContent = `${data.result.toFixed(2)} ${to}`;
            })
            .catch(err => {
                console.error("Error fetching conversion rate:", err);
                alert("An error occurred. Please try again.");
            });
    });
});
