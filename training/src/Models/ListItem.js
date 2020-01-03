/* eslint-disable no-console */
export class ListItem {
    constructor(row_id, order, title, shortDescription, longDescription, itemType , path){
        this.row_id = row_id;
        this.order = order;
        this.title = title;
        this.shortDescription = shortDescription;
        this.longDescription = longDescription;
        this.itemType = itemType;
        this.path = path;
    }

    static convertCategory(category) {
        return new ListItem(parseInt(category.row_id), parseInt(category.order), category.title, "Description d'une Catégorie",
                            category.description, CATEGORY, category.path);
    }

    static convertContentItem(item) {
        return new ListItem(parseInt(item.row_id), parseInt(item.order), item.title, "Description d'un contenu",
            item.description, CONTENT, item.path);
    }

}
    export const CATEGORY = "category";
    export const CONTENT = "content";
