window.onload = () => {

    question = window.location.pathname.split('/')[2];
    fetch(`/get-question-by-id/${question}`)
        .then((reponse) => {
            return reponse.json();
        })
        .then(data => {
            let sumVote = data.data.like + data.data.dislike;
            document.querySelector(".js-voteCount").textContent = `${sumVote} vote`;
            document.querySelector(".js-questionContent").textContent = `${data.data.content}`;
            if (sumVote != 0) {
                document.querySelector(".blue-column").style.width = `${(data.data.like / sumVote) * 100}%`;
                document.querySelector(".blue-column").style.width = `${(data.data.like / sumVote) * 100}%`;

            }

})
}