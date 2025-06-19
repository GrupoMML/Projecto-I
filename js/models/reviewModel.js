

/* * Review Model * */

const getReviews = () => JSON.parse(localStorage.getItem("reviews")) || [];
const saveReviews = (reviews) => localStorage.setItem("reviews", JSON.stringify(reviews));

class Review {
    id = '';
    student = '';
    teacher = '';
    lesson = '';
    rating = 0;
    comments = '';
    date = '';
    constructor(id, student, teacher, lesson, rating, comments, date) {
        this.id = id;
        this.student = student;
        this.teacher = teacher;
        this.lesson = lesson;
        this.rating = rating;
        this.comments = comments;
        this.date = date || new Date().toISOString();
    }
}
function createReview(reviewData) {
    const reviews = getReviews();
    const newReview = new Review(
        reviewData.id || Date.now(),
        reviewData.student,
        reviewData.teacher,
        reviewData.lesson,
        reviewData.rating,
        reviewData.comments,
        reviewData.date
    );
    reviews.push(newReview);
    localStorage.setItem("reviews", JSON.stringify(reviews));
    return newReview;
}


function deleteReview(id) {
    let reviews = getReviews();
    reviews = reviews.filter(r => r.id != id);
    localStorage.setItem("reviews", JSON.stringify(reviews));
}

export { getReviews, createReview, deleteReview };