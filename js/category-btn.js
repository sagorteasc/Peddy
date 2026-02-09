// // category button
// const loadCategoryBtn = (data) => {
//     const catagory = document.getElementById('adopt-category');
//     console.log(data);
//     data.forEach(item => {
//         // console.log(item);

//         // category button data
//         const btnContainer = document.createElement('div');
//         btnContainer.innerHTML = `
//         <button id="${item.id}" onclick="loadPetId(${item.id})" class="btn flex items-center gap-2 w-full md:w-40 lg:w-40 h-[70px] rounded-2xl border-[rgba(14,122,129,0.15)]" >
//                 <img class="w-10" src="${item.category_icon}">
//                 <p class="font-bold text-xl md:text-2xl lg:text-2xl">${item.category}</p>
//         </button>
//         `
//         catagory.append(btnContainer);


//     });
// }

// const loadPetId = async (petId) => {
//     // alert(petId)
//     const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${petId}`)
//     const data = await res.json()
//     console.log(data.categories);
//     data.pets.forEach(item => {
//         loadDefaultDisplay(item)
//     })
// }
// // loadCategoryBtn();
// // loadPetId();'