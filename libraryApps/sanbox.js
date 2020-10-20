function returnDate(value) {
    let daysletter = new Date(
        new Date().getFullYear(),
        new Date().getMonth(), 
        new Date().getDate() + value 
    );

    return daysletter
}

console.log(returnDate(8));