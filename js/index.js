const loadPhones = async(searchText, dataLimit) =>{
  const URL = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  try{
    const res = await fetch(URL);
    const data = await res.json();
    showAllPhonesDetails(data.data, dataLimit);
  }
  catch(error){
    console.log(error)
  }
};

const showAllPhonesDetails = (phones, dataLimit) =>{
const phoneDetailsContainer = document.getElementById('phones-container');
phoneDetailsContainer.textContent = '';

// show all button 
const showAll = document.getElementById('show-all');
if(dataLimit && phones.length > 10){
  phones = phones.slice(0, 10)
showAll.classList.remove('d-none');
}
else{
  showAll.classList.add('d-none')
}

// display no phone found 
const noPhoneFound = document.getElementById('no-found-messages')
if(phones.length === 0){
noPhoneFound.classList.remove('d-none')
}
else{
  noPhoneFound.classList.add('d-none')
}
// display all phones
phones.forEach(phone => {
  const {image, phone_name} = phone;
  const phoneDiv = document.createElement('div');
  phoneDiv.classList.add('col')
  phoneDiv.innerHTML = ` 
  <div class="card p-4">
    <img src="${image}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${phone_name}</h5>
      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      <button onclick="loadPhonesDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
    </div>
  `
  phoneDetailsContainer.appendChild(phoneDiv);
});
// stop loader
toggleSpinner(false);
};

const processSearch = (dataLimit) => {
  toggleSpinner(true);
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  loadPhones(searchText, dataLimit);

}
document.getElementById('btn-search').addEventListener('click', function (){
  // starts loader
processSearch(10)
});

// search input field enter key handler
document.getElementById('search-field').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    // code for enter
    processSearch(10)
  }
});

const toggleSpinner = isLoading => {
  const loaderSection = document.getElementById('loader');
  if(isLoading){
    loaderSection.classList.remove('d-none')
  }
  else{
    loaderSection.classList.add('d-none')
  }
}

// not the best way to load show all
document.getElementById('show-all-btn').addEventListener('click', function(){
processSearch();
})

const loadPhonesDetails = async (id) =>{
  const URL = `https://openapi.programming-hero.com/api/phone/${id}`
  try{
    const res = await fetch(URL);
    const data = await res.json();
    displayPoneDetails(data.data);
  }
  catch(error){
    console.log(error)
  }
}

const displayPoneDetails = phone =>{
const modalTitle = document.getElementById('phoneDetailModalLabel');
modalTitle.innerText = phone.name;
const phoneDetails = document.getElementById('phone-detials');
phoneDetails.innerHTML = `
<p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No Release Date Found'}</p>
<p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'No storage Information Found'}</p>
<p>Others: ${phone.others ? phone.others.Bluetooth : 'No Bluetooth Information Found'}</p>
`
}
// loadPhones()
loadPhones('apple')
