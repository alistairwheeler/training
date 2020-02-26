export const CATEGORY = "category";
export const LESSON = "lesson";

/** @function Converts the tree sent by the backend as a basic js array */
export function convertTreeToArray(treeView) {
    let rootCategories = [];
    for(let category in treeView){
        //rootCategories.push(convertCategoryToTreeElement(treeView[category]));
        rootCategories.push(convertCategoryToArray(treeView[category]));
    }
    console.log(rootCategories)
    return rootCategories;
}

/** @function Converts a category object to an object containing its values + 2 arrays : categories and lessons */
export function convertCategoryToArray(category){
    let arCategory = {};
    //1. Convert this category
    arCategory.row_id = category.row_id;
    arCategory.trnCatOrder = category.trnCatOrder;
    arCategory.trnCatTitle = category.trnCatTitle;
    arCategory.trnCatPath = category.trnCatPath;
    arCategory.trnCatDescription = category.trnCatDescription;
    arCategory.trnCatId = category.trnCatId;
    arCategory.trnCatId__trnCatTitle = category.trnCatId__trnCatTitle;
    arCategory.trnCatId__trnCatPath = category.trnCatId__trnCatPath;

    //2. Find children categories and convert them
    if(category.categories){ //TODO: check in a different way if there is a "categories" field in the object
        arCategory.categories = [];
        for(let cat in category.categories){
            arCategory.categories.push(convertCategoryToArray(category.categories[cat]))
        }
    }

    //3. Find children lessons
    if(category.lessons){ //TODO: check in a different way if there is a "lessons" field in the object
        arCategory.lessons = [];
        for(let lsn in category.lessons){
            arCategory.lessons.push(category.lessons[lsn])
        }
    }
    return arCategory;
}

/** @function Converts the tree sent by the backend as an array usable by vuetify treeview component */
export function convertTreeToVuetify(treeView) {
    let rootCategories = [];
    for(let category in treeView){
        rootCategories.push(convertCategoryToVuetify(treeView[category]));
    }
    console.log(rootCategories)
    return rootCategories;
}

/** @function Converts a category object to a vuetify tree element
 * subcategories and children lessons are in the children array
 * */
export function convertCategoryToVuetify(category){
    let tvCategory = {};
    //1. Convert this category
    tvCategory.id = category.row_id;
    tvCategory.name = category.trnCatTitle;
    tvCategory.path = category.trnCatPath;
    tvCategory.description = category.trnCatDescription;
    tvCategory.type = CATEGORY;
    tvCategory.children = [];

    //2. Find children categories and convert them
    if(category.categories){ //TODO: check in a different way if there is a "categories" field in the object
        tvCategory.categories = [];
        for(let cat in category.categories){
            tvCategory.children.push(convertCategoryToVuetify(category.categories[cat]))
            //To use if we decide to not use a vuetify treeview to display the hierarchy
            tvCategory.categories.push(convertCategoryToVuetify(category.categories[cat]))
        }
    }

    //3. Find children lessons and convert them
    if(category.lessons){ //TODO: check in a different way if there is a "lessons" field in the object
        tvCategory.lessons = [];
        for(let lsn in category.lessons){
            tvCategory.children.push(convertLessonToVuetify(category.lessons[lsn]))

            //To use if we decide to not use a vuetify treeview to display the hierarchy
            tvCategory.lessons.push(convertLessonToVuetify(category.lessons[lsn]))
        }
    }
    return tvCategory;
}

/** @function Converts a lesson to a vuetify tree element */
export function convertLessonToVuetify(lesson){
    return ({
        id: lesson.row_id,
        name: lesson.trnLsnTitle,
        path: lesson.trnLsnPath,
        description: lesson.trnLsnPath,
        type: LESSON,
    })
}

/**
 * Returns an array made of the breadCrumbItems for a lesson, aka parents + lesson. The objects in the array are
 * composed of the title and the path of the breadCrumbItems.
 * @param extCategory
 * @param lessonPath
 * @returns {Array} containing the parents names + paths
 */
export function findLessonBreadCrumb(extCategory, lessonPath) {
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
 * @returns {Array} containing the parents
 */
export function  findParentsOfLesson(extCategory, lessonPath) {
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
