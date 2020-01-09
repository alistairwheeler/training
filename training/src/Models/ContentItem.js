export class ContentItem {
    constructor({
                    row_id, trnLsnOrder, trnLsnTitle, trnLsnDescription, trnLsnVideoUrl, trnLsnHtmlContent, trnLsnPath,
                    trnLsnCatId, trnLsnCatId__trnCatTitle, trnLsnCatId__trnCatPath
                }) {
        this.row_id = parseInt(row_id);
        this.order = trnLsnOrder;
        this.title = trnLsnTitle;
        this.description = trnLsnDescription;
        this.videoUrl = trnLsnVideoUrl;
        this.videoUrl = trnLsnVideoUrl;
        this.content = trnLsnHtmlContent;
        this.path = trnLsnPath;
        this.categoryId = trnLsnCatId;
        this.categoryTitle = trnLsnCatId__trnCatTitle;
        this.categoryPath = trnLsnCatId__trnCatPath;
    }

    static toTreeViewItem({row_id, trnLsnTitle, trnLsnPath}) {
        return ({
            id: row_id,
            name: trnLsnTitle,
            path: trnLsnPath,
            type: 'contentItem'
        })
    }
}
