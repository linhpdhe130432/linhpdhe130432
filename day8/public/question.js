window.onload = () => {
    const questionId = window.location.pathname.split('/')[2];
    fetch(`/get-question-by-id/${questionId}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const question = document.querySelector('.question-content');
            question.innerText = data.data.content;     
        })
        .catch(() => {
            console.log('error');
        });
}

