export class Section {
    constructor(row_id, title, courseId, courseName){
        this.row_id = row_id,
            this.title = title,
            this.courseId = courseId,
            this.courseName = courseName
    }

    static convertFromSimplicite(smpSection){
        return new Section(
            smpSection.row_id,
            smpSection.lrnPrtTitle,
            smpSection.lrnPrtPlnId,
            smpSection.lrnPrtPlnId__lrnPlnTitle
        );
    }

    static convertToTreeView(section){
        return {
            id: section.row_id,
            name: section.lrnPrtTitle,
        }
    }

}
