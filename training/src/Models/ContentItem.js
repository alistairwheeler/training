export class ContentItem {
    constructor(row_id, trnLsnOrder, trnLsnTitle, trnLsnDescription, trnLsnVideoUrl, trnLsnContent, trnLsnPath,
                trnLsnCatId, trnLsnCatId_trnCatTitle, trnLsnCatId_trnCatPath){
        this.row_id = row_id;
        this.order = trnLsnOrder;
        this.title = trnLsnTitle;
        this.description = trnLsnDescription;
        this.videoUrl = trnLsnVideoUrl;
        this.videoUrl = trnLsnVideoUrl;
        this.content = trnLsnContent;
        this.path = trnLsnPath;
        this.categoryId = trnLsnCatId;
        this.categoryTitle = trnLsnCatId_trnCatTitle;
        this.categoryPath = trnLsnCatId_trnCatPath;
    }

}
