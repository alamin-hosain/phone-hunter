
const loadPhones = async (inputText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit)

}

const displayPhones = (phones, dataLimit) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    //display 20 phones only
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none')
    }
    else {
        showAll.classList.add('d-none')
    }



    //displya no phones
    const noPhone = document.getElementById('no-found-message');
    if (phones.length === 0) {
        console.log(phones.length)
        noPhone.classList.remove('d-none')
    }
    else {
        noPhone.classList.add('d-none')
    }

    //  display all phone
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
            <div class="card p-4">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural
                        lead-in to additional content. This content is a little bit longer.</p>

                    <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Details</button>
                </div>
            </div>
        `;
        phoneContainer.appendChild(phoneDiv);

    })

    //Stop Loader
    toggleSpinner(false)
}

const processSearch = (dataLimit) => {
    toggleSpinner(true)
    const inputField = document.getElementById('input-field');
    const inputText = inputField.value;
    loadPhones(inputText, dataLimit);
    // inputField.value = '';
}

// handle search button click
document.getElementById('btn-search').addEventListener('click', function () {
    //Start Loader
    processSearch(10)
})

//Search input field enter key handler
document.getElementById('input-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processSearch(10);
    }
})

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none')
    }
}


// Not the best way to load show all
document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch();
})


const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetail(data.data);
}

const displayPhoneDetail = phone => {

    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
        <p>Release Data: ${phone.releaseDate ? phone.releaseDate : 'No Release Date Found'}</p>
        <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'No Storage Info Found'}</p>
        <p>Others: ${phone.others ? phone.others.Bluetooth : 'No Bluetooth Information'} </p>

    `;
}


loadPhones('apple');



