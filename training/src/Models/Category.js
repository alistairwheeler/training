/* eslint-disable no-console */
import {ContentItem} from "./ContentItem";

export class Category {
    constructor({row_id, trnCatOrder, trnCatTitle, trnCatDescription, trnCatPath, trnCatId, trnCatId__trnCatTitle, trnCatId__trnCatPath}) {
        this.row_id = parseInt(row_id);
        this.order = trnCatOrder;
        this.title = trnCatTitle;
        this.description = trnCatDescription;
        this.path = trnCatPath;
        this.parentId = trnCatId;
        this.parentTitle = trnCatId__trnCatTitle;
        this.parentPath = trnCatId__trnCatPath;
    }

    static convertExtCategoryToTreeView(extCategory) {
        let tvCategory = this.toTreeViewItem(extCategory);
        let children = [];
        if (extCategory.categories) {
            extCategory.categories.map(extSubCategory => {
                children.push(this.convertExtCategoryToTreeView(extSubCategory))
            })
        }
        if (extCategory.lessons) {
            extCategory.lessons.map(extLesson => {
                children.push(ContentItem.toTreeViewItem(extLesson))
            })
        }
        if (children.length >= 1) {
            tvCategory.children = children;
        }
        return tvCategory;
    }

    static toTreeViewItem({row_id, trnCatTitle, trnCatPath}) {
        return ({
            id: row_id,
            name: trnCatTitle,
            path: trnCatPath,
            type: 'category'
        })
    }

    /**
     * Returns an array made of the breadCrumbItems for a lesson, aka parents + lesson. The objects in the array are
     * composed of the title and the path of the breadCrumbItems.
     * @param extCategory
     * @param lessonPath
     * @returns {Array}
     */
    static findLessonBreadCrumb(extCategory, lessonPath) {
        let parents = [];
        let obj = {};
        if (extCategory.categories) {
            let category = extCategory.categories.find(cat => lessonPath.includes(cat.trnCatPath));
            if (category !== undefined) {
                obj.title = category.trnCatTitle;
                obj.path = category.trnCatPath;
                parents.push(obj);
                parents.push(...this.findLessonBreadCrumb(category, lessonPath));
            } else {
                console.log("category is undefined")
            }
        } else if (extCategory.lessons) {
            let lesson = extCategory.lessons.find(lsn => lessonPath.includes(lsn.trnLsnPath));
            if (lesson !== undefined) {
                obj.title = lesson.trnLsnTitle;
                obj.path = lesson.trnLsnPath;
                parents.push(obj);
            } else {
                console.log("lesson is undefined")
            }
        }
        return parents;
    }

    /**
     * Returns an array made of the breadCrumbItems of a provided lesson (its path is provided)
     * @param extCategory The category in which to research the breadCrumbItems
     * @param lessonPath The lessonPath identifying the lesson to search for
     */
    static findParentsOfLesson(extCategory, lessonPath){
        console.log("findParentsOfLesson");
        let parents = [];
        let obj = {};
        if (extCategory.categories) {
            let category = extCategory.categories.find(cat => lessonPath.includes(cat.trnCatPath));
            if (category !== undefined) {
                obj.title = category.trnCatTitle;
                obj.path = category.trnCatPath;
                parents.push(obj);
                parents.push(...this.findParentsOfLesson(category, lessonPath));
            } else {
                console.log("category is undefined")
            }
        }
        return parents;
    }
}

