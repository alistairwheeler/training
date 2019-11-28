export class Lesson {
    constructor(row_id, title, genConcepts, learningOutcomes, exercise, pdfUrl, videoUrl, sectionId, sectionName, courseId, courseName, order ){
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
        this.order = order;
    }

    static formatFromSimplicite({row_id, lrnLsnTitle,lrnLsnConcepts,
                                    lrnLsnLearningOutcomes,lrnLsnExercice,lrnLsnSlides,lrnLsnVideo,lrnLsnPrtId
                                    ,lrnLsnPrtId__lrnPrtTitle,lrnLsnPrtId__lrnPrtPlnId,lrnLsnPrtId__lrnPrtPlnId__lrnPlnTitle,
                                    lrnLsnOrder}){
        return new Lesson(
            row_id,
            lrnLsnTitle,
            lrnLsnConcepts,
            lrnLsnLearningOutcomes,
            lrnLsnExercice,
            lrnLsnSlides,
            lrnLsnVideo,
            lrnLsnPrtId,
            lrnLsnPrtId__lrnPrtTitle,
            lrnLsnPrtId__lrnPrtPlnId,
            lrnLsnPrtId__lrnPrtPlnId__lrnPlnTitle,
            lrnLsnOrder
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
