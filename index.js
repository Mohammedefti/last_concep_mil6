// another function
const loadAllPhones =async(status,searchText) =>{
    // console.log("wow 3 second gone");
    // console.log(searchText);
    document.getElementById("spinner").style.display="none";

    // fetch(`https://openapi.programming-hero.com/api/phones?search=iphone`)
    // // converting into json
    // .then(res =>res.json())
    // .then(data=> console.log(data))

    // same process with async  function
    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText?searchText:""}`);
    // converting into json
    const data = await response.json();
    // displayAll phone function ta aikhne thke call korsi....
    // console.log(data.data)
    

    // check with parameters if its work or not. its working
    // console.log(status);
    // jokhon kew show all button e click korbe tokhon aita true hobe aita if er vitre dukhi sob gula element re show korbe ar na korle shudhu 6ta section show korbe
    if (status) {
        displayAllPhone(data.data);
    } else {
        // aikkhane slice er maddhome 0-6 porjonto slice kora hoise.
    displayAllPhone(data.data.slice(0,6));
    }

}

// show all button e click korle je sob section show korbe oitar jonno function
const displayAllPhone =(phones) =>{
    // console.log(phones)
    // section create korar jonno
    const phoneContainer = document.getElementById("phones-container");
    phones.forEach(phone => {
        // console.log(phone);
        // obj destructing
        const {brand, image,slug} = phone;
        const div= document.createElement('div');
        div.innerHTML=`
        <div class="card m-2 bg-base-100 w-96 shadow-xl">
  <figure class="px-10 pt-10">
    <img
      src=${image}
      alt="Shoes"
      class="rounded-xl" />
  </figure>
  <div class="card-body items-center text-center">
    <h2 class="card-title">${brand}</h2>
    <p>${slug}</p>
    <div class="card-actions">
   
      <button onclick="phoneDetails('${slug}')" class="btn btn-primary">Show Details</button>
    </div>
  </div>
</div>
        `
        phoneContainer.appendChild(div);
    });

}

// onclick function for show all button
const handleShowAll=()=>{
    // check function work or not . its working
    // console.log("hello");
    loadAllPhones(true);
}


// search button e click korle loading screen 3sec ghurbe er por choli jabe than akta function re call korbe.

const handleSearch= () =>{
    // check this function works or not
    // console.log("hello");
    // spinner id re block korbo
     document.getElementById("spinner").style.display="block";

    //  search box er line get kroar jonno
    const searchText = document.getElementById("search-box").value;

    // search button e click korle 3 sec por loadAllPhones function ke call kora hobe oitar code.
    setTimeout(function(){
        
       
        // call loadAllPhones function
        loadAllPhones(false, searchText);
    }, 
    // this is delay time
    3000)
}



// function for phone details
const phoneDetails = async(slugs) => {
    // check if we can get slug or not.its working
    // console.log(slug)
    const response= await fetch(` https://openapi.programming-hero.com/api/phone/${slugs}`);
    const data = await response.json();
    console.log(data.data);

    // desctruction for add element in modal
    const {brand,image,slug} = data.data;

    // modal er vitorer element gulare change kora
    const modalContainer = document.getElementById("modal-container");
    modalContainer.innerHTML=`
    <dialog id="my_modal_1" class="modal">
  <div class="modal-box ">
    <h3 class="text-lg font-bold">${brand}</h3>
    <p class="py-4">${slug}</p>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
</dialog> 
    `
    // modal er function call 
    my_modal_1.showModal();


}

// reload dile jate sobgula reload hoi oi jonno
loadAllPhones(false,"iphone");
