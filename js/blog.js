let dataBlog = [];
console.log("Berhasil");

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

    let image = URL.createObjectURL(uploadImg[0]);
    console.log(image);

    let durasi = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());
    let nodeJsLogo = inputNodeJS ? "" : "style='display: none;'";
    let nextJsLogo = inputNextJS ? "" : "display: none;";
    let reactJsLogo = inputReactJS ? "" : "style='display: none;'";
    let typeScriptLogo = inputTypeScript ? "" : "display: none;";

    let blog = {
        title,
        durasi,
        description,
        nodeJsLogo,
        nextJsLogo,
        reactJsLogo,
        typeScriptLogo,
        image
    };

    dataBlog.push(blog);
    console.log(dataBlog);

    renderBlog();
}

function renderBlog() {
    document.getElementById("blog-content").innerHTML = "";

    for (let index = 0; index < dataBlog.length; index++) {
        console.log(dataBlog[index]);

        document.getElementById("blog-content").innerHTML += `
        <div class="blog-content-card">
            <div class="card-img">
                <img src="${dataBlog[index].image}" alt="">
            </div>
            <div class="card-text">
                <h2><a href="blog-detail.html">${dataBlog[index].title}</a></h2>
                <span>durasi: ${dataBlog[index].durasi} bulan</span>
                <p>${dataBlog[index].description}</p>
            </div>
            <div class="card-techstack">
                <i class="fa-brands fa-node-js" ${dataBlog[index].nodeJsLogo}></i>
                <img src="images/nextjs-icon.svg" alt="nextjs-icon" style="${dataBlog[index].nextJsLogo}width: 20px; height: 20px; margin-right: 10px;">
                <i class="fa-brands fa-react" ${dataBlog[index].reactJsLogo}></i>
                <img src="images/typescript-icon-512x512-we5ze0xe.png" alt="" style="${dataBlog[index].typeScriptLogo}width: 20px; height: 20px;">
            </div>
            <div class="card-button">
                <button>Edit</button>
                <button>Delete</button>
            </div>
        </div>
        `;
    }
}