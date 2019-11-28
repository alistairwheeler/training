export class ListItem {
    constructor(row_id, title, shortDescription, longDescription ){
        this.row_id = row_id;
        this.title = title;
        this.shortDescription = shortDescription;
        this.longDescription = longDescription;
    }

    static convertSmpLesson({row_id, lrnLsnTitle, lrnLsnShortDescription = '', lrnLsnLongDescription = ''}){
        return new ListItem(parseInt(row_id), lrnLsnTitle, lrnLsnShortDescription, lrnLsnLongDescription);
    }

    static convertSmpCourse({row_id, lrnPlnTitle, lrnPlnShortDescription = '', lrnPlnLongDescription = ''}) {
        return new ListItem(parseInt(row_id), lrnPlnTitle, lrnPlnShortDescription, lrnPlnLongDescription);
    }

}
