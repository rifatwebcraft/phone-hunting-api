const loadPhone = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone');
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhone(phones);
}

function displayPhone(phones){
    // console.log(phones)
    phones.forEach(phones => {
        console.log(phones);
    });
}

loadPhone();