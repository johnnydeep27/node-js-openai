function onSubmit(e){
    e.preventDefault();

    document.querySelector('.msg').textContent = '';
    document.querySelector('#image-list').textContent = '';

    const prompt = document.querySelector('#prompt').value;
    const size = document.querySelector('#size').value;

    if (prompt === '') {
        alert('Please add some text');
        return;
    }

    generateImageRequest(prompt, size);
}

async function generateImageRequest(prompt, size) {
    try {
        showSpinner();

        const response = await fetch('/openai/generateimage', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                prompt,
                size
            })
        });
        
        if(!response.ok) {
            removeSpinner();
            throw new Error('That image could not be generated');
        }

        const data = await response.json();

        data.data.forEach(obj => {
            Object.entries(obj).forEach(([key, value]) => {
                var li = document.createElement('li');
                var img = document.createElement('img');
                li.className = 'col col-md-3';
                img.src = value;
                li.appendChild(img);

                document.getElementById('image-list').appendChild(li);
            });
        });
        
        // const imageUrl = data.data;

        // document.querySelector('#image').src = imageUrl;
        removeSpinner();
    } catch (error) {
        document.querySelector('.msg').textContent = error;
    }
}

function showSpinner() {
    document.querySelector('.spinner').classList.add('show');
}

function removeSpinner() {
    document.querySelector('.spinner').classList.remove('show');
}

document.querySelector('#image-form').addEventListener('submit', onSubmit);