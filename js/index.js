// document.getElementById("header").innerHTML = `
//     <nav>
//         <div class="left-side">
//             <ul>
//                 <li><img src="images/logo.png" alt=""></li>
//                 <li class="hide-item"><a href="#">Home</a></li>
//                 <li class="hide-item"><a href="blog.html">My Project</a></li>
//             </ul>
//         </div>
//         <div class="right-side hide-item">
//             <a href="contact.html">Contact Me</a>
//         </div>

//         <!-- Hamburger Menu -->
//         <div class="right-side" id="barsmenu">
//             <button style="background-color: transparent; color: #fd4e2f; cursor: pointer; border: none;" onclick="openHamburger()"><i class="fa-solid fa-bars" style="font-size: 2em; margin-right: 10px;"></i></button>
//         </div>
//     </nav>
//     <div class="hamburger-menu" id="hamburger-menu">
//         <ul>
//             <li><a class="active-page" href="index.html">Home</a></li>
//             <li><a href="blog.html">My Project</a></li>
//             <li><a href="contact.html">Contact Me</a></li>
//         </ul>
//     </div>
// `

let isOpenHamburger = false;

function openHamburger() {
    let hamburgerMenu = document.getElementById("hamburger-menu");

    if (!isOpenHamburger) {
        hamburgerMenu.style.display = "block";
        isOpenHamburger = true;
    } else {
        hamburgerMenu.style.display = "none";
        isOpenHamburger = false;
    }
}