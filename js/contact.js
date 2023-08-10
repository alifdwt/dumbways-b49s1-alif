function submitButton() {
    let name = document.getElementById("input-name").value;
    let email = document.getElementById("input-email").value;
    let phone = document.getElementById("input-phone").value;
    let subject = document.getElementById("select-subject").value;
    let message = document.getElementById("input-message").value;
    const myMail = "aputradewantara@gmail.com"

    if (name === "") {
        alert("Please enter your name!");
    } else if (email === "") {
        alert("Please enter your Email!");
    } else if (!isValidEmail(email)) { // Validate email format
        alert("Please enter a valid email address!");
    } else if (phone === "") {
        alert("Please enter your phone number");
    } else if (!isValidPhone(phone)) { // Validate phone format
        alert("Please enter a valid phone number");
    } else {
        let a = document.createElement("a");
        a.href = `mailto:${myMail}?subject=${subject}&body=Halo, nama saya ${name}, hubungi saya di ${phone}. Saya membutuhkan jasa ${subject}, dan saya pikir Anda cocok.`;
        a.click();

        let data = { name, email, phone, subject, message };
        console.log(data);
    }
};

function isValidEmail(email) {
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function isValidPhone(phone) {
    let phonePattern = /^[0-9]+$/;
    return phonePattern.test(phone);
}

function success() {
    let name = document.getElementById("input-name").value;
    let email = document.getElementById("input-email").value;
    let phone = document.getElementById("input-phone").value;

    if (name == "" || email == "" || phone == "") {
        document.getElementById("form-button").disabled = true;
    } else {
        document.getElementById("form-button").disabled = false;
    }
};