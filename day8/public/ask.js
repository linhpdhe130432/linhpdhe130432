window.onload = () => {
    const textArea = document.querySelector('.form-control');
    
    textArea.addEventListener('input',(event) => {
        const value= textArea.value;
        const remain = 200 - value.length;

        const remainCharacter = document.querySelector('.remain-character');

        remainCharacter.innerText= `Con ${remain}/200 ki tu`;
    }
    
    );
    const formSubmit = document.querySelector('.input-text'); 
    formSubmit.addEventListener('submit',(event) => {
        event.preventDefault();
        const value = textArea.value;
        if (!value) {
            const errorMessage = document.querySelector('.noti');
            errorMessage.innerText = 'Please re enter';
        }
        else {
            const errorMessage = document.querySelector('.noti');
            errorMessage.innerText = '';

            //use fetch() API to send data to server 
            fetch(`/create-question`,{
                method: 'POST',// uppercase all characters;
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    questionContent: value,
                }),
            })
                .then( (response) => {
                    return response.json();
                }) // call if this request success
                .then((data)=> {
                    
                    window.location.href=`/questions/${data.data.id}`;
                })
                .catch((error) => {
                    console.log(error);
                }); // call if this request fail
        }
     });
};