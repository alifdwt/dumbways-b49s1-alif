let dataBlog = [];
// console.log("Berhasil");

function addBlog(event) {
    event.preventDefault();

    let title = document.getElementById("input-title-blog").value;
    let startDate = new Date(document.getElementById("input-startdate-blog").value);
    let endDate = new Date(document.getElementById("input-enddate-blog").value);
    let description = document.getElementById("input-description-blog").value;
    let inputNodeJS = document.getElementById("input-nodejs-blog").checked;
    let inputNextJS = document.getElementById("input-nextjs-blog").checked;
    let inputReactJS = document.getElementById("input-reactjs-blog").checked;
    let inputTypeScript = document.getElementById("input-typescript-blog").checked;
    let uploadImg = document.getElementById("input-upload-blog").files;
    
    let image;
    if (uploadImg.length > 0) {
        image = URL.createObjectURL(uploadImg[0]);
    } else {
        image = document.getElementById("placeholder-img").src;
    }

    // let durasi = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());
    let durasi = (endDate.getTime() - startDate.getTime()) / 86400000;
    let nodeJsLogo = inputNodeJS ? "" : "style='display: none;'";
    let nextJsLogo = inputNextJS ? "" : "display: none;";
    let reactJsLogo = inputReactJS ? "" : "style='display: none;'";
    let typeScriptLogo = inputTypeScript ? "" : "display: none;";

    let blog = {
        title,
        postAt: new Date(),
        durasi,
        description,
        nodeJsLogo,
        nextJsLogo,
        reactJsLogo,
        typeScriptLogo,
        image
    };
    // console.log(startDate.getMonth())
    dataBlog.push(blog);
    // console.log(dataBlog);

    renderBlog();
}

function renderBlog() {
    document.getElementById("blog-content-form").innerHTML = "";

    for (let index = 0; index < dataBlog.length; index++) {
        document.getElementById("blog-content-form").innerHTML += `
        <div class="blog-content-card">
            <div class="card-img">
                <img src=${dataBlog[index].image} alt="">
            </div>
            <div class="card-text">
                <h2><a href="blog-detail.html">${dataBlog[index].title}</a></h2>
                <span>${getDurasi(dataBlog[index].durasi)}</span><br>
                <span>${getFullTime(dataBlog[index].postAt)}</span>
                <p>${dataBlog[index].description}</p>
            </div>
            <div class="card-techstack">
                <i class="fa-brands fa-node-js" ${dataBlog[index].nodeJsLogo}></i>
                <img src="images/nextjs-icon.svg" alt="nextjs-icon" style="${dataBlog[index].nextJsLogo}width: 20px; height: 20px; margin-right: 10px;">
                <i class="fa-brands fa-react" ${dataBlog[index].reactJsLogo}></i>
                <img src="images/typescript-icon-512x512-we5ze0xe.png" alt="" style="${dataBlog[index].typeScriptLogo}width: 20px; height: 20px;">
            </div>
            <div class="post-time">
                <p style="margin: 5px; text-align: right; font-size: .8em; color: grey;">${getDistanceTime(dataBlog[index].postAt)}</p>
            </div>
            <div class="card-button">
                <button>Edit</button>
                <button>Delete</button>
            </div>
        </div>
        `;
    }
}

function getFullTime(time) {
    let monthName = [
        "January",
        "February",
        "March",
        "Apr",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    let date = time.getDate();
    let monthIndex = time.getMonth();
    let year = time.getFullYear();
    let hours = time.getHours();
    let minutes = time.getMinutes();

    if (hours <= 9) {
        hours = "0" + hours;
    } else if (minutes <= 9) {
        minutes = "0" + minutes;
    }

    return `${date} ${monthName[monthIndex]} ${year} ${hours}:${minutes} WIB`;
}

function getDistanceTime(time) {
    let timeNow = new Date();
    let timePost = time;
  
    let distance = timeNow - timePost;
  
    let milisecond = 1000;
    let secondInHours = 3600;
    let hoursInDays = 24;
  
    let distanceDay = Math.floor(
      distance / (milisecond * secondInHours * hoursInDays)
    );
    let distanceHours = Math.floor(distance / (milisecond * 60 * 60));
    let distanceMinutes = Math.floor(distance / (milisecond * 60));
    let distanceSecond = Math.floor(distance / milisecond);
  
    if (distanceDay > 0) {
      return `${distanceDay} days ago`;
    } else if (distanceHours > 0) {
      return `${distanceHours} hours ago`;
    } else if (distanceMinutes > 0) {
      return `${distanceMinutes} minutes ago`;
    } else {
      return `${distanceSecond} seconds ago`;
    }
  }

function getDurasi(day) {
    let daysInMonth = 30;
    let monthsInYear = 12;
    let durasiMonth = Math.floor(day / daysInMonth);
    let durasiYear = Math.floor(day / (daysInMonth * monthsInYear));

    if (durasiYear > 0) {
        return `durasi: ${durasiYear} tahun`;
    } else if (durasiMonth > 0) {
        return `durasi: ${durasiMonth} bulan`;
    } else if (day > 0) {
        return `durasi: ${day} hari`;
    } else {
        return "";
    }
}
  
  setInterval(function () {
    renderBlog();
  }, 3000);