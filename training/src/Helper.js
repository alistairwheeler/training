/** @function Converts a Simplicité treeView in an array of objects that can be displayed by Vuetify in the drawer */
export function convertSmpTreeView(smpTreeView) {
    //Retrieve the sections :
    let sections = smpTreeView.map(globalSection => globalSection.item); //item est réellement l'objet section, les sections sont donc récupérées
    //Convert the sections to vuetify treeView objects
    let tvSections = sections.map((elt) => ({id: elt.row_id, name: elt.lrnPrtTitle, children: []}));

    //Retrieve the lessons :
    let links = smpTreeView.map(globalSection => globalSection.links);
    let arrayOfSectionFolder = links.map(link => link[0].list);
    let lessons = [];
    arrayOfSectionFolder.forEach(arraySection => {
        arraySection.forEach(lesson => lessons.push(lesson.item))
    });

    //Convert them to vuetify treeView objects and map them to the section
    let tvLessons = lessons.map((elt) => ({
        id: elt.row_id,
        name: elt.lrnLsnTitle,
        sectionId: elt.lrnLsnPrtId,
        order: elt.lrnLsnOrder,
    }));
    //For each lesson, if the sectionId is the same as a sectionId present in the tvSections array, we push this lesson as a children of the array
    for (let i = 0; i < tvLessons.length; i++) {
        for (let j = 0; j < tvSections.length; j++) {
            if (tvLessons[i].sectionId === tvSections[j].id) {
                tvSections[j].children.push(tvLessons[i])
            }
        }
    }
    //Now, for each section, we take the lessons in it (children) and order them by their order field
    for (let j = 0; j < tvSections.length; j++) {
        tvSections[j].children.sort((les1, les2) => les1.order - les2.order);
    }
    // eslint-disable-next-line no-console
    console.log("finished converting smpTreeView");

    return tvSections;
}

/** @function Sorts the IDs from a CONVERTED treeView to be able to navigate with the arrows */
export function sortLessonIDs(treeViewItems) {
    let orderedIDs = [];
    treeViewItems.forEach(section => {
        section.children.forEach(lesson => orderedIDs.push(parseInt(lesson.id)))
    });
    return orderedIDs;
}
