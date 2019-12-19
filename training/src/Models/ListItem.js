/* eslint-disable no-console */
export class ListItem {
    constructor(row_id, title, shortDescription, longDescription, itemType , path){
        this.row_id = row_id;
        this.title = title;
        this.shortDescription = shortDescription;
        this.longDescription = longDescription;
        this.itemType = itemType;
        this.path = path;
    }

    static convertSmpLesson({row_id, lrnLsnTitle, lrnLsnShortDescription = '', lrnLsnLongDescription = ''}){
        return new ListItem(parseInt(row_id), lrnLsnTitle, lrnLsnShortDescription, lrnLsnLongDescription);
    }

    static convertSmpCourse({row_id, lrnPlnTitle, lrnPlnShortDescription = '', lrnPlnLongDescription = ''}) {
        return new ListItem(parseInt(row_id), lrnPlnTitle, lrnPlnShortDescription, lrnPlnLongDescription);
    }

    static convertCategoryToListItem(category) {
        return new ListItem(parseInt(category.row_id),  category.title, "Description d'une Catégorie",
                            category.description, CATEGORY, category.path);
    }

    static convertContentItemToListItem(item) {
        return new ListItem(parseInt(item.row_id), item.title, "Description d'un contenu", item.description, CONTENT, item.path);
    }

}
    export const CATEGORY = "category";
    export const CONTENT = "content";
