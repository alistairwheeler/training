export class Category {
    constructor(row_id, trnCatOrder, trnCatTitle, trnCatDescription, trnCatPath, trnCatId, trnCatId_trnCatTitle, trnCatId_trnCatPath){
        this.row_id = row_id;
        this.order = trnCatOrder;
        this.title = trnCatTitle;
        this.description = trnCatTitle;
        this.description = trnCatDescription;
        this.path = trnCatPath;
        this.parentId = trnCatId;
        this.parentTitle = trnCatId_trnCatTitle;
        this.parentPath = trnCatId_trnCatPath;
    }
}
