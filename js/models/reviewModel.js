

/* * Review Model * */

const getReviews = () => JSON.parse(localStorage.getItem("reviews")) || [];
const saveReviews = (reviews) => localStorage.setItem("reviews", JSON.stringify(reviews));

class Review {
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
function createReview(id, student, teacher, lesson, rating, comments, date) {
    const reviews = getReviews();
    const review = new Review(id, student, teacher, lesson, rating, comments, date);
    reviews.push(review);
    saveReviews(reviews);
    return review;
}

export { getReviews, createReview, Review };