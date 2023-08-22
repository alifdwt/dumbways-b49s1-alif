let dataBlog = [];
// console.log("Berhasil");

function addBlog(event) {
  event.preventDefault();

  let title = document.getElementById("input-title-blog").value;
  let startDate = new Date(
    document.getElementById("input-startdate-blog").value
  );
  let endDate = new Date(document.getElementById("input-enddate-blog").value);
  let description = document.getElementById("input-description-blog").value;
  let inputNodeJS = document.getElementById("input-nodejs-blog").checked;
  let inputNextJS = document.getElementById("input-nextjs-blog").checked;
  let inputReactJS = document.getElementById("input-reactjs-blog").checked;
  let inputTypeScript = document.getElementById(
    "input-typescript-blog"
  ).checked;
  let uploadImg = document.getElementById("input-upload-blog").files;

  let image;
  if (uploadImg.length > 0) {
    image = URL.createObjectURL(uploadImg[0]);
  } else {
    image = document.getElementById("placeholder-img").src;
  }

  let durasi = (endDate.getTime() - startDate.getTime()) / 86400000;
  let nodeJsLogo = inputNodeJS ? '<i class="fa-brands fa-node-js"></i>' : "";
  let nextJsLogo = inputNextJS
    ? '<img src="images/nextjs-icon.svg" alt="nextjs-icon" style="width: 20px; height: 20px; margin-right: 10px;">'
    : "";
  let reactJsLogo = inputReactJS ? '<i class="fa-brands fa-react"></i>' : "";
  let typeScriptLogo = inputTypeScript
    ? '<img src="images/typescript-icon-512x512-we5ze0xe.png" alt="" style="width: 20px; height: 20px;">'
    : "";

  let blog = {
    title,
    postAt: new Date(),
    durasi,
    description,
    nodeJsLogo,
    nextJsLogo,
    reactJsLogo,
    typeScriptLogo,
    image,
  };
  dataBlog.push(blog);
  renderBlog();
}

function renderBlog() {
  document.getElementById("recent-blog-post").innerHTML = `
    <div class="recent-img">
        <img src="${dataBlog[dataBlog.length - 1].image}" alt="">
    </div>
    <div class="recent-description">
        <div class="recent-text">
            <h2><a href="blog-detail.html">${
              dataBlog[dataBlog.length - 1].title
            }</a></h2>
            <span>${getDurasi(dataBlog[dataBlog.length - 1].durasi)}</span><br>
            <span>${getFullTime(dataBlog[dataBlog.length - 1].postAt)}</span>
            <p>${dataBlog[dataBlog.length - 1].description}</p>
        </div>
        <div class="card-techstack">
            ${dataBlog[dataBlog.length - 1].nodeJsLogo}
            ${dataBlog[dataBlog.length - 1].nextJsLogo}
            ${dataBlog[dataBlog.length - 1].reactJsLogo}
            ${dataBlog[dataBlog.length - 1].typeScriptLogo}
        </div>
        <div class="post-time">
            <p style="margin: 0; text-align: right; font-size: .8em; color: grey;">${getDistanceTime(
              dataBlog[dataBlog.length - 1].postAt
            )}</p>
        </div>
        <div class="recent-button">
            <button>Edit</button>
            <button>Delete</button>
        </div>
    </div>
    `;
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
                ${dataBlog[index].nodeJsLogo}
                ${dataBlog[index].nextJsLogo}
                ${dataBlog[index].reactJsLogo}
                ${dataBlog[index].typeScriptLogo}
            </div>
            <div class="post-time">
                <p style="margin: 5px; text-align: right; font-size: .8em; color: grey;">${getDistanceTime(
                  dataBlog[index].postAt
                )}</p>
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
    "December",
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

function generateRandomDate(from, to) {
  return new Date(
    from.getTime() + Math.random() * (to.getTime() - from.getTime())
  );
}
let postDate = generateRandomDate(new Date(2023, 0, 1), new Date());
let postDateFrom = getDistanceTime(postDate);
document.getElementById("blog-content").innerHTML = `
    <div class="blog-content-card">
        <div class="card-img">
            <img src="images/Android-main.jpg" alt="">
        </div>
        <div class="card-text">
            <h2><a href="blog-detail.html">Android adalah OS Terkeren</a></h2>
            <span>durasi: 3 bulan</span><br>
            <span>${getFullTime(postDate)}</span>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sit amet augue elementum, malesuada est a, finibus odio. Fusce laoreet scelerisque urna, vel accumsan dui pellentesque at. Suspendisse vehicula eu lacus a malesuada. In hac habitasse platea dictumst. Vivamus maximus eget sapien sed lobortis. In tortor velit, tincidunt posuere sem ut, finibus lobortis urna. Nunc mauris leo, porta quis varius eget, efficitur a ex. Phasellus feugiat lacus et pulvinar mollis. Phasellus a sodales velit. Suspendisse potenti. Donec dictum urna sapien, ut blandit massa porta sit amet.</p>
        </div>
        <div class="card-techstack">
            <i class="fa-brands fa-node-js"></i>
            <img src="images/nextjs-icon.svg" alt="" style="width: 20px; height: 20px; margin-right: 10px;">
            <i class="fa-brands fa-react"></i>
            <img src="images/typescript-icon-512x512-we5ze0xe.png" alt="" style="width: 20px; height: 20px;">
        </div>
        <div class="post-time">
            <p style="margin: 5px; text-align: right; font-size: .8em; color: grey;">${postDateFrom}</p>
        </div>
        <div class="card-button">
            <button>Edit</button>
            <button>Delete</button>
        </div>
    </div>
    <div class="blog-content-card">
        <div class="card-img">
            <img src="images/Android_logo_2019_(stacked).svg.png" alt="">
        </div>
        <div class="card-text">
            <h2><a href="blog-detail.html">Vestibulum aliquam vel massa</a></h2>
            <span>durasi: 3 bulan</span><br>
            <span>${getFullTime(postDate)}</span>
            <p>Pellentesque placerat tortor vehicula pellentesque ornare. Vivamus in sollicitudin orci. Duis rhoncus turpis at erat ultricies, quis tincidunt nibh suscipit. Ut sit amet laoreet ex. In vel maximus mauris, ut congue nisi. In sem ante, accumsan non laoreet vitae, luctus at turpis. Nulla nec malesuada sem, vitae tempor velit. Aenean et ex libero. Sed at tellus malesuada, accumsan mi ut, molestie tortor. Curabitur eros diam, volutpat at turpis nec, aliquet consectetur odio. Suspendisse sed nisi nec sapien tristique hendrerit.</p>
        </div>
        <div class="card-techstack">
            <i class="fa-brands fa-google-play"></i>
            <i class="fa-brands fa-android"></i>
            <i class="fa-brands fa-java"></i>
        </div>
        <div class="post-time">
            <p style="margin: 5px; text-align: right; font-size: .8em; color: grey;">${postDateFrom}</p>
        </div>
        <div class="card-button">
            <button>Edit</button>
            <button>Delete</button>
        </div>
    </div>
    <div class="blog-content-card">
        <div class="card-img">
            <img src="images/Placeholder_view_vector.svg.png" alt="">
        </div>
        <div class="card-text">
            <h2><a href="blog-detail.html">Lorem ipsum dolor sit amet</a></h2>
            <span>durasi: 3 bulan</span><br>
            <span>${getFullTime(postDate)}</span>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum aliquam vel massa vel vulputate. Sed placerat dictum tincidunt. Duis nisl orci, placerat sit amet pellentesque at, hendrerit nec velit. Maecenas pellentesque, mi sed lacinia mollis, lorem eros consequat velit, consectetur sagittis lectus tellus non eros. Donec finibus tincidunt sodales. Mauris fringilla nunc vitae mollis lacinia. Suspendisse rutrum, est a hendrerit ullamcorper, elit tellus tristique nisi, tempor accumsan tellus leo nec nulla. Vivamus eget magna malesuada, ullamcorper tellus non, laoreet erat. Vestibulum nec arcu nulla. Donec tempus erat ac tempor porta. Mauris ante dolor, pretium in felis sed, elementum eleifend quam. Aliquam erat volutpat.</p>
        </div>
        <div class="card-techstack">
            <i class="fa-brands fa-google-play"></i>
            <i class="fa-brands fa-android"></i>
            <i class="fa-brands fa-java"></i>
        </div>
        <div class="post-time">
            <p style="margin: 5px; text-align: right; font-size: .8em; color: grey;">${postDateFrom}</p>
        </div>
        <div class="card-button">
            <button>Edit</button>
            <button>Delete</button>
        </div>
    </div>
    <div class="blog-content-card">
        <div class="card-img">
            <img src="images/coding-image.jpg" alt="">
        </div>
        <div class="card-text">
            <h2><a href="blog-detail.html">Kenali Komputer Kentang Sejak DIni</a></h2>
            <span>durasi: 3 bulan</span><br>
            <span>${getFullTime(postDate)}</span>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sit amet augue elementum, malesuada est a, finibus odio. Fusce laoreet scelerisque urna, vel accumsan dui pellentesque at. Suspendisse vehicula eu lacus a malesuada. In hac habitasse platea dictumst. Vivamus maximus eget sapien sed lobortis. In tortor velit, tincidunt posuere sem ut, finibus lobortis urna. Nunc mauris leo, porta quis varius eget, efficitur a ex. Phasellus feugiat lacus et pulvinar mollis. Phasellus a sodales velit. Suspendisse potenti. Donec dictum urna sapien, ut blandit massa porta sit amet.</p>
        </div>
        <div class="card-techstack">
            <i class="fa-brands fa-node-js"></i>
            <img src="images/nextjs-icon.svg" alt="" style="width: 20px; height: 20px; margin-right: 10px;">
            <i class="fa-brands fa-react"></i>
            <img src="images/typescript-icon-512x512-we5ze0xe.png" alt="" style="width: 20px; height: 20px;">
        </div>
        <div class="post-time">
            <p style="margin: 5px; text-align: right; font-size: .8em; color: grey;">${postDateFrom}</p>
        </div>
        <div class="card-button">
            <button>Edit</button>
            <button>Delete</button>
        </div>
    </div>
`;

function arrayIsEmpty(array) {
  if (!Array.isArray(array)) {
    return FALSE;
  }
  if (array.length == 0) {
    return true;
  }
  return false;
}

if (arrayIsEmpty(dataBlog)) {
  document.getElementById("recent-blog-post").innerHTML = `
    <div class="recent-img">
        <img src="images/coding-image.jpg" alt="">
    </div>
    <div class="recent-description">
        <div class="recent-text">
            <h2><a href="blog-detail.html">Kenali Komputer Kentang Sejak Dini</a></h2>
            <span>durasi: 3 bulan</span><br>
            <span>${getFullTime(postDate)}</span>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias sapiente fuga natus consequatur, officiis magni, quidem dicta expedita nemo corrupti suscipit ad sint? Aspernatur in quia illo magni possimus odit explicabo, numquam odio, maiores quo voluptatem officia omnis libero quasi corrupti necessitatibus ab animi mollitia totam tempore. Dignissimos eveniet sequi repellat odit temporibus cum dolor ducimus corporis obcaecati consequatur debitis quis incidunt doloremque at explicabo quisquam eum eaque quasi perferendis dicta vero, in a blanditiis asperiores. Soluta aliquid tempora voluptatem ducimus saepe, nihil, quidem corrupti sapiente nam fugiat quasi dolor assumenda accusamus consequatur sunt deserunt facere officiis nulla sit optio!</p>
        </div>
        <div class="card-techstack">
            <i class="fa-brands fa-node-js"></i>
            <img src="images/nextjs-icon.svg" alt="" style="width: 20px; height: 20px; margin-right: 10px;">
            <i class="fa-brands fa-react"></i>
            <img src="images/typescript-icon-512x512-we5ze0xe.png" alt="" style="width: 20px; height: 20px;">
        </div>
        <div class="post-time">
            <p style="margin: 0; text-align: right; font-size: .8em; color: grey;">${postDateFrom}</p>
        </div>
        <div class="recent-button">
            <button>Edit</button>
            <button>Delete</button>
        </div>
    </div>
    `;
}

setInterval(function () {
  renderBlog();
}, 3000);
