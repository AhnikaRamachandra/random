const buttons = document.querySelectorAll(".btn button");
buttons.forEach(button => {
    button.addEventListener('click', async e => {
        e.preventDefault();
        const category = button.value;
        const api_url = `https://api.api-ninjas.com/v1/quotes?category=${category}`;
        try {
            const response = await fetch(api_url, {
                headers: { 'X-Api-Key': 'WOa0sWKxDp6WxwnuYNfXKw==rxuCu3oJuo2u6kYb' }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            display(data);
        } catch (error) {
            console.log(error);
        }
    });
});

function display(data) {
    if (data && data.length > 0) {
        const { quote, author } = data[0];
        const inputdata = document.getElementById("myInput");
        inputdata.innerHTML = `${quote}<br><em style="color: #007BFF;">- ${author}</em>`;
    }
}

const copyicon = document.getElementById("copyicon");
copyicon.addEventListener('click', async e => {
    const inputdata = document.getElementById("myInput");
    try {
        await navigator.clipboard.writeText(inputdata.textContent);
        copyicon.style.color = "black";
        copyicon.removeAttribute('title');
        setTimeout(() => {
            copyicon.title = "Copied to clipboard";
            copyicon.style.color = "";
        }, 1000);
    } catch (error) {
        console.log(error);
    }
});
