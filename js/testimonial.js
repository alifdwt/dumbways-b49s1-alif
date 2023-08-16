class Testimonial {
    #quote = "";
    #image = "";

    constructor(quote, image) {
        this.#quote = quote;
        this.#image = image;
    }

    get quote() {
        return this.#quote;
    }

    get image() {
        return this.#image;
    }

    get author() {
        throw new Error("getAuthor() method must be implemented.");
    }

    get testimonialHTML() {
        return `
            <div class="testimonial">
                <div class="image">
                    <img src="${this.image}" alt="project-photo">
                </div>
                <p class="quote">
                    ${this.quote}
                </p>
                <div class="description">
                    <img src="${this.profPic}" alt="">
                    <div class="person">
                        <span class="name">${this.author}</span><br>
                        <span class="job">${this.jobAuthor}</span><br>
                        <a href="https://linkedin.com/in/${this.linkedinId}/"><i class="fa-brands fa-linkedin"></i> LinkedIn</a>
                    </div>
                </div>
            </div>
        `;
    }
}

class AuthorTestimonial extends Testimonial {
    #author = "";
    #jobAuthor = "";
    #linkedinId = "";
    #profPic = "";

    constructor(author, quote, image, jobAuthor, linkedinId, profPic) {
        super(quote, image);
        this.#author = author;
        this.#jobAuthor = jobAuthor;
        this.#linkedinId = linkedinId;
        this.#profPic = profPic;
    }

    get author() {
        return this.#author;
    }

    get jobAuthor() {
        return this.#jobAuthor;
    }

    get linkedinId() {
        return this.#linkedinId;
    }

    get profPic() {
        return this.#profPic;
    }
}

const testimonial1 = new AuthorTestimonial(
    "Muhammad Yesus Sidharta",
    "Sangat puas dengan layanan jasa pembuatan web dari tim ini. Mereka sangat responsif terhadap kebutuhan kami dan berhasil menghasilkan situs web yang sesuai dengan visi dan misi perusahaan kami. Desainnya modern dan fungsional, serta integrasi dengan sistem backend berjalan dengan lancar. Terima kasih atas profesionalisme dan dedikasinya!",
    "https://img.freepik.com/premium-vector/kids-website-landing-page-ui-design-template_502601-12.jpg",
    "Data Scientist at PT. Jaya Abadi",
    "alifdwt",
    "https://s3.ap-southeast-1.amazonaws.com/cdn.vcgamers.com/news/wp-content/uploads/2023/02/foto-pp-wa-aesthetic-12-300x300.jpg"
);

const testimonial2 = new AuthorTestimonial(
    "Yohanes Abdul Situmorang",
    "Menggunakan layanan jasa pembuatan web ini adalah keputusan yang sangat tepat. Mereka mengambil waktu untuk mendengarkan ide-ide saya dan mengintegrasikannya ke dalam situs web dengan sempurna. Situs web yang mereka buat mudah digunakan dan tampilannya menarik. Saya sangat merekomendasikan layanan ini kepada siapa pun yang membutuhkan solusi web berkualitas.",
    "https://sketch-cdn.imgix.net/assets/blog/sketch-ui-design%402x.png?ixlib=rb-4.1.0&fit=max&w=1920&q=95&auto=format&fm=png&s=74863334ced26f21e3342c0c375f1dae",
    "Front End Developer at PT. Sumber Makmur",
    "alifdwt",
    "https://s3.ap-southeast-1.amazonaws.com/cdn.vcgamers.com/news/wp-content/uploads/2023/02/foto-pp-wa-aesthetic-6-300x300.jpg"
);

const testimonial3 = new AuthorTestimonial(
    "Sarah Tanjung",
    "Tim di balik layanan jasa pembuatan web ini luar biasa! Mereka tidak hanya memiliki keahlian teknis yang tinggi, tetapi juga memiliki pemahaman mendalam tentang kebutuhan bisnis online. Situs web yang mereka kembangkan untuk startup saya tidak hanya menarik secara visual, tetapi juga memiliki fitur-fitur yang mendukung pertumbuhan bisnis kami. Saya sangat terkesan dengan hasilnya.",
    "https://cdn.dribbble.com/userupload/4060584/file/original-a2dcb88a24da79db509636a26cd98052.png?resize=400x0",
    "Business Development at FoodieVerse",
    "alifdwt",
    "https://wallpapers.com/images/hd/aesthetic-profile-picture-52t290ggbex44jma.jpg"
);

const testimonial4 = new AuthorTestimonial(
    "David Michael",
    "Sebagai organisasi nirlaba, kami mencari solusi yang terjangkau namun efektif untuk membangun situs web kami. Layanan jasa pembuatan web ini memberikan lebih dari yang kami harapkan. Mereka dengan cermat menggambarkan kisah kami melalui desain yang menarik dan mengkomunikasikannya dengan jelas kepada audiens kami. Kami bangga memiliki situs web yang mampu menyampaikan misi kami.",
    "https://cdn.dribbble.com/userupload/2970030/file/original-b405f07b44b99610820219e22202c3a4.png?resize=400x0",
    "Fundraising at GreenEarth",
    "alifdwt",
    "https://wallpapers-clan.com/wp-content/uploads/2023/01/dark-aesthetic-boy-pfp-28.jpg"
);

const testimonial5 = new AuthorTestimonial(
    "Rina Purnama",
    "Saya awalnya ragu-ragu tentang bagaimana layanan jasa pembuatan web dapat mengubah bisnis online saya. Namun, tim ini membuktikan keraguan saya salah. Mereka tidak hanya menciptakan toko online yang indah, tetapi juga memastikan bahwa fungsionalitasnya tidak diragukan. Sekarang, saya memiliki platform yang memudahkan saya mengelola produk dan melayani pelanggan dengan lebih baik.",
    "https://blog.tubikstudio.com/wp-content/uploads/2019/03/bugs_store_webdesign_tubik-1-1024x768.png",
    "Digital Marketing at CraftyStore",
    "alifdwt",
    "https://wallpapers.com/images/hd/aesthetic-profile-picture-bz0zswmqkcfm45ik.jpg"
);

const testimonial6 = new AuthorTestimonial(
    "Irfan Akbar",
    "Penting bagi konsultan bisnis memiliki profil online yang kuat. Layanan jasa pembuatan web ini membantu saya menghadirkan diri saya secara profesional kepada klien potensial. Mereka mendengarkan kebutuhan saya secara seksama dan mengintegrasikannya ke dalam desain yang mencerminkan kepribadian dan layanan saya. Saya sangat puas dengan hasilnya dan telah melihat peningkatan signifikan dalam permintaan layanan konsultasi saya.",
    "https://s3-alpha.figma.com/hub/file/3236068850/252ed11c-029b-409d-b941-19315fb702cd-cover.png",
    "Business Consultant at BizGrowth",
    "alifdwt",
    "https://s3.ap-southeast-1.amazonaws.com/cdn.vcgamers.com/news/wp-content/uploads/2023/02/foto-pp-wa-aesthetic-3-300x300.jpg"
)

let testimonialData = [testimonial1, testimonial2, testimonial3, testimonial4, testimonial5, testimonial6];
let testimonialHTML = "";

for (let i = 0; i < testimonialData.length; i++) {
  testimonialHTML += testimonialData[i].testimonialHTML;
}

document.getElementById("testimonials").innerHTML = testimonialHTML;