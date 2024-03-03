const loadPhone = async (searchValue='13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchValue}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhone(phones, isShowAll);
}

const displayPhone = (phones, isShowAll) =>{
    // console.log(phones)
    //1. get container
    const phoneContainer = document.getElementById('phone-container');
    //clear the container cards before adding new card
    phoneContainer.textContent = ' '; //note : aikane container k clear kora hoyeche new search result dekanor joono..
    //search result phones length check...
    // console.log(phones.length);
    //display show all button if there are more than 12 phones..
    const showAllContainer = document.getElementById('show-all-container')
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden')
    }
    //display only first 12 phones..if not showall
    
    if(!isShowAll){
        phones = phones.slice(0,12);
    }

    phones.forEach(phones => {
        // console.log(phones);
        //2. creat a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-base-100 shadow-xl p-7`;
        //3.set innerHTML
        phoneCard.innerHTML = `
        <figure><img src="${phones.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phones.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-center">
            <button onclick="handleShowDetail('${phones.slug}')" class="btn btn-primary">Show Details</button>
          </div>
        </div>
        `
         //4. appndChild..
        phoneContainer.appendChild(phoneCard);
    });
    //hide loading spinner
    toggleLoadingSpinner(false);
}

//
const handleShowDetail = async (id) =>{
    // console.log('clicked show details', id);
    //load single phone data..
    const rest = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await rest.json();
    console.log(data);
    const phone = data.data;
    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
        <img src="${phone.image}" alt="" />
        <p><span>Storage :</span>${phone?.mainFeatures?.storage}</p>
        <p><span>gps :</span>${phone?.others?.GPS || 'no gps'}</p>
        
    `
    
    showPhoneDetails(phone);
}

const showPhoneDetails = (phone) =>{
    console.log(phone);
    //show the modal
    showDetailsModal.showModal();
}

//handle search button
const handleSearch = (isShowAll) => {
    const searchField = document.getElementById('input-field');
    const searchValue = searchField.value;
    console.log(searchValue);
    loadPhone(searchValue, isShowAll);
    toggleLoadingSpinner(true);
}


const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
}


//handle show all button
const handleShowAll = () =>{
    handleSearch(true);
}

loadPhone();
