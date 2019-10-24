export class Lesson {
    constructor(row_id, title, genConcepts, learningOutcomes, exercise, pdfUrl, videoUrl, sectionId, sectionName, courseId, courseName ){
        this.row_id = row_id;
        this.title = title;
        this.genConcepts = genConcepts;
        this.learningOutcomes = learningOutcomes;
        this.exercise = exercise;
        this.pdfUrl = pdfUrl;
        this.videoUrl = videoUrl;
        this.sectionId = sectionId;
        this.sectionName = sectionName;
        this.courseId = courseId;
        this.courseName = courseName;
    }

    static formatFromSimplicite(smpLesson){
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
            smpLesson.lrnLsnPrtId__lrnPrtPlnId,
            smpLesson.lrnLsnPrtId__lrnPrtPlnId__lrnPlnTitle,
        );
    }

    static convertToTreeView(lesson){
        return ({
            id: lesson.row_id,
            name: lesson.lrnLsnTitle,
            //No children for those elements
        });
    }
}
