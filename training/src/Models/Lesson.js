export class Lesson {
    constructor(row_id, title, genConcepts, learningOutcomes, exercise, pdfUrl, videoUrl, courseId, courseName ){
        this.row_id = row_id;
        this.title = title;
        this.genConcepts = genConcepts;
        this.learningOutcomes = learningOutcomes;
        this.exercise = exercise;
        this.pdfUrl = pdfUrl; this.videoUrl = videoUrl;
        this.courseId = courseId;
        this.courseName = courseName;
    }

    static formatFromBackEnd(smpLesson){
        return new Lesson(
            smpLesson.row_id,
            smpLesson.lrnLsnTitle,
            smpLesson.lrnLsnConcepts,
            smpLesson.lrnLsnLearningOutcomes,
            smpLesson.lrnLsnExercice,
            smpLesson.lrnLsnSlides,
            smpLesson.lrnLsnVideo,
            smpLesson.lrnLsnPrtId,
            smpLesson.lrnLsnPrtId__lrnPrtTitle,
        );
    }
}
