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

    static convertSmpCategory(category) {
        return new ListItem(parseInt(category.row_id), category.title, category.description);
    }

    static convertSmpContentItem(item) {
        return new ListItem(parseInt(item.row_id), item.title, item.description);
    }

}
