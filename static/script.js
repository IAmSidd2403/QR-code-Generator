function toggleInputFields() {
    const inputType = document.getElementById('input-type').value;
    const textInputSection = document.getElementById('text-input-section');
    const fileInputSection = document.getElementById('file-input-section');

    if (inputType === 'text') {
        textInputSection.classList.remove('hidden');
        fileInputSection.classList.add('hidden');
    } else {
        textInputSection.classList.add('hidden');
        fileInputSection.classList.remove('hidden');
    }
}

function generateQRCode() {
    const inputType = document.getElementById('input-type').value;
    const qrCodeDisplay = document.getElementById('qr-code-display');
    const errorMessage = document.getElementById('error-message');
    const successMessage = document.getElementById('success-message');
    qrCodeDisplay.classList.add('hidden');
    errorMessage.style.display = 'none';
    successMessage.style.display = 'none';

    if (inputType === 'text') {
        const text = document.getElementById('text-input').value.trim();
        if (!text) {
            errorMessage.style.display = 'block';
            errorMessage.innerText = 'Please enter valid text or URL.';
            return;
        }
        displayQRCode(text);
    } else {
        const file = document.getElementById('file-input').files[0];
        if (!file) {
            errorMessage.style.display = 'block';
            errorMessage.innerText = 'Please upload a valid file.';
            return;
        }
        uploadFile(file);
    }
}

function uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);

    fetch('/upload', {
        method: 'POST',
        body: formData,
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.file_url) {
                displayQRCode(window.location.origin + data.file_url);
            } else {
                alert('File upload failed.');
            }
        })
        .catch((error) => {
            console.error('Error uploading file:', error);
        });
}

function displayQRCode(data) {
    const qrCodeDisplay = document.getElementById('qr-code-display');
    const img = document.createElement('img');
    img.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(data)}`;
    img.alt = 'QR Code';
    qrCodeDisplay.innerHTML = ''; // Clear previous QR codes
    qrCodeDisplay.appendChild(img);
    qrCodeDisplay.classList.remove('hidden');

    const successMessage = document.getElementById('success-message');
    successMessage.style.display = 'block';
}







