let allPets = [];
// load categories
const loadCategory = async () => {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories')
        const data = await res.json()
        categoryBtns(data.categories);
    }
    catch (err) {
        console.error('Error:', err);
    }
}

// display catagory btns
const categoryBtns = (categories) => {
    // console.log(categories);
    const catagoryContainer = document.getElementById('adopt-category');
    categories.forEach(item => {
        // console.log(item);
        const btnContainer = document.createElement('div');
        btnContainer.innerHTML = `
        <button id="btn-${item.category}" onclick="spinner('${item.category}')" class="btn category-btn flex items-center gap-2 w-full md:w-40 lg:w-40 h-[70px] rounded-2xl border-[rgba(14,122,129,0.15)]" >
                <img class="w-10" src="${item.category_icon}">
                <p class="font-bold text-xl md:text-2xl lg:text-2xl">${item.category}</p>
        </button>
        `
        catagoryContainer.append(btnContainer);
    });
}

// remove active btn
const removeActiveBtn = () => {
    const nonActive = document.getElementsByClassName('category-btn');
    for (const btn of nonActive) {
        btn.classList.remove('bg-[rgba(14,122,129,0.1)]')
        btn.classList.remove('border-2');
        btn.classList.remove('rounded-[120px]');
    }
}


// load pet by categories
const loadPetCategories = async (id) => {
    // alert(id);
    showSpinner();
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
        const data = await res.json()
        // removeActiveBtn();
        // const activeBtn = document.getElementById(`btn-${id}`);
        // // console.log(activeBtn);
        // activeBtn.classList.add('bg-[rgba(14,122,129,0.1)]')
        // activeBtn.classList.add('border-2');
        // activeBtn.classList.add('rounded-[120px]');
        allPets = data.data;
        displayPets(data.data);
        document.getElementById('spin').classList.add('hidden');
    }
    catch (err) {
        console.error('Error:', err);
    }
}

// load default pets
const loadPets = async () => {
    try {
        showSpinner();
        setTimeout(async () => {
            const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets')
            const data = await res.json()
            allPets = data.pets;
            displayPets(data.pets);
            document.getElementById('spin').classList.add('hidden');
        }, 2000);
    }
    catch (err) {
        console.error('Error:', err);
    }
}


// show spinner 
const showSpinner = () => {
    document.getElementById('adopt').innerHTML = '';
    document.getElementById('spin').classList.remove('hidden');
    document.getElementById('favorite').classList.add('hidden');
}

const spinner = (id) => {
    showSpinner();
    removeActiveBtn();
    const activeBtn = document.getElementById(`btn-${id}`);
    // console.log(activeBtn);
    activeBtn.classList.add('bg-[rgba(14,122,129,0.1)]')
    activeBtn.classList.add('border-2');
    activeBtn.classList.add('rounded-[120px]');

    setTimeout(function () {
        loadPetCategories(id);
    }, 2000);
}

// sorting in descending order
const sorting = () => {
    showSpinner();
    setTimeout(function () {
        const sorted = [...allPets].sort((a, b) => {
            return (b.price ?? 0) - (a.price ?? 0);
        })
        displayPets(sorted);
        document.getElementById('spin').classList.add('hidden');
    }, 2000);
}

// load pet display
const displayPets = (pets) => {
    // console.log(pets);
    const categoryContainer = document.getElementById('category-container');
    const divPlace = document.getElementById('adopt');
    divPlace.className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";
    const fav = document.getElementById('favorite');
    divPlace.innerHTML = '';
    if (pets.length === 0) {
        categoryContainer.classList.remove('grid');
        divPlace.classList.remove('grid');
        fav.classList.add('hidden');
        divPlace.innerHTML = `
            <div class="flex flex-col justify-center items-center my-10 min-h-screen">
                <img class="w-36 h-36 mb-4" src="images/error.webp" alt="">
                <p class="font-bold text-[32px] text-center">Oops!! Sorry, There is no content here</p>
            </div>
        `
    }
    else {
        categoryContainer.classList.add('grid');
        divPlace.classList.add('grid');
        fav.classList.remove('hidden');
        document.getElementById('favorite').classList.remove('hidden');
    }
    pets.forEach(pet => {
        // console.log(pet);
        const card = document.createElement('div');
        card.classList.add('rounded-xl', 'w-full', 'shadow-sm');
        card.innerHTML = `
            <figure class="p-2 md:p-5 lg:p-5">
            <img src="${pet.image}" class="rounded-xl w-full h-40" />
            </figure>
            <div class="p-2 pt-0 md:p-5 lg:p-5">
                <h2 class="card-title font-bold text-xl">${pet.pet_name}</h2>
                <div class="py-3 text-sm text-[rgba(19,19,19,0.7)] md:text-base lg:text-base">
                    <p class="flex items-center gap-1 whitespace-nowrap">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_2081_39)"><path d="M3.33334 3.33337H8.33334V8.33337H3.33334V3.33337Z" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M11.6667 3.33337H16.6667V8.33337H11.6667V3.33337Z" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.33334 11.6666H8.33334V16.6666H3.33334V11.6666Z" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M11.6667 14.1666C11.6667 14.8297 11.9301 15.4656 12.3989 15.9344C12.8677 16.4032 13.5036 16.6666 14.1667 16.6666C14.8297 16.6666 15.4656 16.4032 15.9344 15.9344C16.4033 15.4656 16.6667 14.8297 16.6667 14.1666C16.6667 13.5036 16.4033 12.8677 15.9344 12.3989C15.4656 11.93 14.8297 11.6666 14.1667 11.6666C13.5036 11.6666 12.8677 11.93 12.3989 12.3989C11.9301 12.8677 11.6667 13.5036 11.6667 14.1666Z" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_2081_39"><rect width="20" height="20" fill="white"/></clipPath></defs>
                        </svg>
                        Breed: ${pet.breed !== null && pet.breed !== undefined && pet.breed !== '' ? pet.breed : 'No Available Data'}
                    </p>
                    <p class=" flex items-center gap-1">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.625 2.5V4.375M14.375 2.5V4.375M2.5 15.625V6.25C2.5 5.75272 2.69754 5.27581 3.04917 4.92417C3.40081 4.57254 3.87772 4.375 4.375 4.375H15.625C16.1223 4.375 16.5992 4.57254 16.9508 4.92417C17.3025 5.27581 17.5 5.75272 17.5 6.25V15.625M2.5 15.625C2.5 16.1223 2.69754 16.5992 3.04917 16.9508C3.40081 17.3025 3.87772 17.5 4.375 17.5H15.625C16.1223 17.5 16.5992 17.3025 16.9508 16.9508C17.3025 16.5992 17.5 16.1223 17.5 15.625M2.5 15.625V9.375C2.5 8.87772 2.69754 8.40081 3.04917 8.04917C3.40081 7.69754 3.87772 7.5 4.375 7.5H15.625C16.1223 7.5 16.5992 7.69754 16.9508 8.04917C17.3025 8.40081 17.5 8.87772 17.5 9.375V15.625" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Birth: ${pet.date_of_birth !== null && pet.date_of_birth !== undefined && pet.date_of_birth !== '' ? pet.date_of_birth : 'No Available Data'}
                    </p>
                    <p class=" flex items-center gap-1">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.7" clip-path="url(#clip0_2081_51)"><path d="M10 11.6666V17.5" stroke="#131313" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.5 15H12.5" stroke="#131313" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 5C10.8841 5 11.7319 5.35119 12.357 5.97631C12.9821 6.60143 13.3333 7.44928 13.3333 8.33333C13.3333 9.21739 12.9821 10.0652 12.357 10.6904C11.7319 11.3155 10.8841 11.6667 10 11.6667C9.11594 11.6667 8.2681 11.3155 7.64297 10.6904C7.01785 10.0652 6.66666 9.21739 6.66666 8.33333C6.66666 7.44928 7.01785 6.60143 7.64297 5.97631C8.2681 5.35119 9.11594 5 10 5Z" stroke="#131313" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.5 2.5C12.5 3.16304 12.2366 3.79893 11.7678 4.26777C11.2989 4.73661 10.663 5 10 5C9.33696 5 8.70107 4.73661 8.23223 4.26777C7.76339 3.79893 7.5 3.16304 7.5 2.5" stroke="#131313" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_2081_51"><rect width="20" height="20" fill="white"/></clipPath></defs>
                        </svg>
                        Gender: ${pet.gender !== null && pet.gender !== undefined && pet.gender !== '' ? pet.gender : 'No Available Data'}
                    </p>
                    <p class=" flex items-center gap-1">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_2081_59)"><path d="M13.9167 6.66667C13.7508 6.19603 13.4479 5.7858 13.0469 5.48878C12.6459 5.19176 12.1652 5.02153 11.6667 5H8.33334C7.67029 5 7.03441 5.26339 6.56557 5.73223C6.09673 6.20107 5.83334 6.83696 5.83334 7.5C5.83334 8.16304 6.09673 8.79893 6.56557 9.26777C7.03441 9.73661 7.67029 10 8.33334 10H11.6667C12.3297 10 12.9656 10.2634 13.4344 10.7322C13.9033 11.2011 14.1667 11.837 14.1667 12.5C14.1667 13.163 13.9033 13.7989 13.4344 14.2678C12.9656 14.7366 12.3297 15 11.6667 15H8.33334C7.83479 14.9785 7.35409 14.8082 6.95311 14.5112C6.55213 14.2142 6.24921 13.804 6.08334 13.3333" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 2.5V5M10 15V17.5" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_2081_59"><rect width="20" height="20" fill="white"/></clipPath></defs>
                        </svg>
                        Price: ${pet.price !== null && pet.price !== undefined && pet.price !== '' ? `${pet.price}$` : 'No Available Data'}
                    </p>
                </div>
                <hr class="py-4 text-[rgba(19,19,19,0.1)]">
                <div class="grid grid-cols-3 gap-2">
                    <button onclick="favDisplay('${pet.image}')" class="btn rounded-lg hover:border-[#0E7A81] "><img class="w-5" src="https://img.icons8.com/?size=100&id=82788&format=png&color=000000"></button>
                    <button onclick="adopting(this)" class="btn text-[#0E7A81] rounded-lg hover:bg-[#0E7A81] hover:text-white">Adopt</button>
                    <button onclick="detailsDisplay('${pet.petId}')" class="btn text-[#0E7A81] rounded-lg hover:bg-[#0E7A81] hover:text-white">Details</button>
                </div>
            </div>
    `
        divPlace.appendChild(card);
    })
}

//  favorite display
const favDisplay = (image) => {
    const favContainer = document.getElementById('favorite');
    const div = document.createElement('div')
    // div.classList.add('mb-2')
    div.innerHTML = `
            <img class="w-full h-20 object-cover rounded-xl lg:h-full" src="${image}" />
    `
    favContainer.append(div)
}

// adopt button functionality
const adopting = (adoptBtn) => {
    const modal = document.getElementById('adoptModal');
    const counting = document.getElementById('countdown');
    function adoptProcessCounting(second) {
        modal.showModal();
        let times = second;
        counting.innerText = `${times}`;
        const inteval = setInterval(() => {
            times--;
            counting.innerText = `${times}`;
            if (times <= 0) {
                clearInterval(inteval);
                modal.close();
            }
        }, 1000)
    }
    adoptProcessCounting(3);
    adoptBtn.disabled = true;
    adoptBtn.classList.add('disabled:bg-zinc-400', 'disabled:text-neutral-500');
    adoptBtn.innerText = 'adopted';
}

// details display
const detailsDisplay = async (id) => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
        const data = await res.json()
        const pet = data.petData;
        const detailId = document.getElementById('detailModal');
        const detailsContainer = document.getElementById('detailContent');
        detailsContainer.innerHTML = `
            <div>
                <img class="w-full rounded-xl mb-4" src="${pet.image}">
                <div class="mb-6">
                    <h3 class="font-bold text-2xl mb-2">${pet.pet_name}</h3>
                    <div class="grid grid-cols-1 gap-2 mb-2 md:grid-cols-2 lg:grid-cols-2">
                        <p class="flex items-center gap-1 text-[rgba(19,19,19,0.7)] whitespace-nowrap">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_2081_39)"><path d="M3.33334 3.33337H8.33334V8.33337H3.33334V3.33337Z" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M11.6667 3.33337H16.6667V8.33337H11.6667V3.33337Z" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.33334 11.6666H8.33334V16.6666H3.33334V11.6666Z" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M11.6667 14.1666C11.6667 14.8297 11.9301 15.4656 12.3989 15.9344C12.8677 16.4032 13.5036 16.6666 14.1667 16.6666C14.8297 16.6666 15.4656 16.4032 15.9344 15.9344C16.4033 15.4656 16.6667 14.8297 16.6667 14.1666C16.6667 13.5036 16.4033 12.8677 15.9344 12.3989C15.4656 11.93 14.8297 11.6666 14.1667 11.6666C13.5036 11.6666 12.8677 11.93 12.3989 12.3989C11.9301 12.8677 11.6667 13.5036 11.6667 14.1666Z" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_2081_39"><rect width="20" height="20" fill="white"/></clipPath></defs>
                            </svg>
                            Breed: ${pet.breed !== null && pet.breed !== undefined && pet.breed !== '' ? pet.breed : 'No Available Data'}
                        </p>
                        <p class="flex items-center gap-1 text-[rgba(19,19,19,0.7)]">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.625 2.5V4.375M14.375 2.5V4.375M2.5 15.625V6.25C2.5 5.75272 2.69754 5.27581 3.04917 4.92417C3.40081 4.57254 3.87772 4.375 4.375 4.375H15.625C16.1223 4.375 16.5992 4.57254 16.9508 4.92417C17.3025 5.27581 17.5 5.75272 17.5 6.25V15.625M2.5 15.625C2.5 16.1223 2.69754 16.5992 3.04917 16.9508C3.40081 17.3025 3.87772 17.5 4.375 17.5H15.625C16.1223 17.5 16.5992 17.3025 16.9508 16.9508C17.3025 16.5992 17.5 16.1223 17.5 15.625M2.5 15.625V9.375C2.5 8.87772 2.69754 8.40081 3.04917 8.04917C3.40081 7.69754 3.87772 7.5 4.375 7.5H15.625C16.1223 7.5 16.5992 7.69754 16.9508 8.04917C17.3025 8.40081 17.5 8.87772 17.5 9.375V15.625" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            Birth: ${pet.date_of_birth !== null && pet.date_of_birth !== undefined && pet.date_of_birth !== '' ? pet.date_of_birth : 'No Available Data'}
                        </p>
                        <p class="flex items-center gap-1 text-[rgba(19,19,19,0.7)]">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.7" clip-path="url(#clip0_2081_51)"><path d="M10 11.6666V17.5" stroke="#131313" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.5 15H12.5" stroke="#131313" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 5C10.8841 5 11.7319 5.35119 12.357 5.97631C12.9821 6.60143 13.3333 7.44928 13.3333 8.33333C13.3333 9.21739 12.9821 10.0652 12.357 10.6904C11.7319 11.3155 10.8841 11.6667 10 11.6667C9.11594 11.6667 8.2681 11.3155 7.64297 10.6904C7.01785 10.0652 6.66666 9.21739 6.66666 8.33333C6.66666 7.44928 7.01785 6.60143 7.64297 5.97631C8.2681 5.35119 9.11594 5 10 5Z" stroke="#131313" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.5 2.5C12.5 3.16304 12.2366 3.79893 11.7678 4.26777C11.2989 4.73661 10.663 5 10 5C9.33696 5 8.70107 4.73661 8.23223 4.26777C7.76339 3.79893 7.5 3.16304 7.5 2.5" stroke="#131313" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_2081_51"><rect width="20" height="20" fill="white"/></clipPath></defs>
                            </svg>
                            Gender: ${pet.gender !== null && pet.gender !== undefined && pet.gender !== '' ? pet.gender : 'No Available Data'}
                        </p>
                        <p class="flex items-center gap-1 text-[rgba(19,19,19,0.7)]">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_2081_59)"><path d="M13.9167 6.66667C13.7508 6.19603 13.4479 5.7858 13.0469 5.48878C12.6459 5.19176 12.1652 5.02153 11.6667 5H8.33334C7.67029 5 7.03441 5.26339 6.56557 5.73223C6.09673 6.20107 5.83334 6.83696 5.83334 7.5C5.83334 8.16304 6.09673 8.79893 6.56557 9.26777C7.03441 9.73661 7.67029 10 8.33334 10H11.6667C12.3297 10 12.9656 10.2634 13.4344 10.7322C13.9033 11.2011 14.1667 11.837 14.1667 12.5C14.1667 13.163 13.9033 13.7989 13.4344 14.2678C12.9656 14.7366 12.3297 15 11.6667 15H8.33334C7.83479 14.9785 7.35409 14.8082 6.95311 14.5112C6.55213 14.2142 6.24921 13.804 6.08334 13.3333" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 2.5V5M10 15V17.5" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_2081_59"><rect width="20" height="20" fill="white"/></clipPath></defs>
                            </svg>
                            Price: ${pet.price !== null && pet.price !== undefined && pet.price !== '' ? `${pet.price}$` : 'No Available Data'}
                        </p>
                    </div>
                    <p class="flex items-center gap-1 text-[rgba(19,19,19,0.7)]">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.7" clip-path="url(#clip0_2081_51)"><path d="M10 11.6666V17.5" stroke="#131313" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.5 15H12.5" stroke="#131313" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 5C10.8841 5 11.7319 5.35119 12.357 5.97631C12.9821 6.60143 13.3333 7.44928 13.3333 8.33333C13.3333 9.21739 12.9821 10.0652 12.357 10.6904C11.7319 11.3155 10.8841 11.6667 10 11.6667C9.11594 11.6667 8.2681 11.3155 7.64297 10.6904C7.01785 10.0652 6.66666 9.21739 6.66666 8.33333C6.66666 7.44928 7.01785 6.60143 7.64297 5.97631C8.2681 5.35119 9.11594 5 10 5Z" stroke="#131313" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.5 2.5C12.5 3.16304 12.2366 3.79893 11.7678 4.26777C11.2989 4.73661 10.663 5 10 5C9.33696 5 8.70107 4.73661 8.23223 4.26777C7.76339 3.79893 7.5 3.16304 7.5 2.5" stroke="#131313" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_2081_51"><rect width="20" height="20" fill="white"/></clipPath></defs>
                        </svg>
                        Vaccinated Status: ${pet.vaccinated_status !== null && pet.vaccinated_status !== undefined && pet.vaccinated_status !== '' ? pet.vaccinated_status : 'No Available Data'}
                    </p>
                </div>
                <hr class="py-4 text-[rgba(19,19,19,0.1)]">
                <div class"mb-2">
                    <h3 class="font-semibold text-lg mb-3">Details Information</h3>
                    <p class="text-[rgba(19,19,19,0.7)]">${pet.pet_details}</p>
                </div>
            </div>
        `
        detailId.showModal();
    }
    catch (err) {
        console.error('Error:', err);
    }
}

showSpinner()
loadPets();
loadCategory();