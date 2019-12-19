export class Category {
    constructor({row_id, trnCatOrder, trnCatTitle, trnCatDescription, trnCatPath, trnCatId, trnCatId__trnCatTitle, trnCatId__trnCatPath}) {
        this.row_id = parseInt(row_id);
        this.order = trnCatOrder;
        this.title = trnCatTitle;
        this.description = trnCatTitle;
        this.description = trnCatDescription;
        this.path = trnCatPath;
        this.parentId = trnCatId;
        this.parentTitle = trnCatId__trnCatTitle;
        this.parentPath = trnCatId__trnCatPath;
    }
}
