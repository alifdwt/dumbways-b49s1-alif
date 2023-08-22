const testimonial = new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", "https://api.npoint.io/b06fed0f38e550b4781f", true);

  xhr.onload = function () {
    if (xhr.status == 200) {
      resolve(JSON.parse(xhr.response));
    } else {
      reject("Error Loading Data");
    }
  };

  xhr.onerror = function () {
    reject("Network Error");
  };

  xhr.send();
});

function addStars(star) {
  let starLogo = '<i class="fa-solid fa-star"></i>';
  return starLogo.repeat(star);
}

async function allTestimonial() {
  try {
    const response = await testimonial;
    let testimonialHTML = "";

    response.forEach((item) => {
      testimonialHTML += `
            <div class="testimonial">
                <div class="image">
                    <img src="${item.projPic}" alt="project-photo">
                    <div class="rating">Rating: ${addStars(item.rating)}</div>
                </div>
                <p class="quote">
                    ${item.review}
                </p>
                <div class="description">
                    <img src="${item.profPic}" alt="">
                    <div class="person">
                        <span class="name">${item.author}</span><br>
                        <span class="job">${item.job} at ${
        item.company
      }</span><br>
                        <a href="https://linkedin.com/in/${
                          item.linkedinId
                        }/"><i class="fa-brands fa-linkedin"></i> LinkedIn</a>
                    </div>
                </div>
            </div>
            `;
    });
    document.getElementById("testimonials").innerHTML = testimonialHTML;
  } catch (error) {
    console.log(error);
  }
}

allTestimonial();

async function filterTestimonial(rating) {
  try {
    const response = await testimonial;
    let testimonialHTML = "";
    const testimonialFiltered = response.filter((item) => {
      return item.rating === rating;
    });

    if (testimonialFiltered.length === 0) {
      testimonialHTML = `<h1>Sorry, data not found 😥</h1>`;
    } else {
      testimonialFiltered.forEach(function (item) {
        testimonialHTML += `
            <div class="testimonial">
                <div class="image">
                    <img src="${item.projPic}" alt="project-photo">
                    <div class="rating">Rating: ${addStars(item.rating)}</div>
                </div>
                <p class="quote">
                    ${item.review}
                </p>
                <div class="description">
                    <img src="${item.profPic}" alt="">
                    <div class="person">
                        <span class="name">${item.author}</span><br>
                        <span class="job">${item.job} at ${
          item.company
        }</span><br>
                        <a href="https://linkedin.com/in/${
                          item.linkedinId
                        }/"><i class="fa-brands fa-linkedin"></i> LinkedIn</a>
                    </div>
                </div>
            </div>
            `;
      });
    }

    document.getElementById("testimonials").innerHTML = testimonialHTML;
  } catch (error) {
    console.log(error);
  }
}
