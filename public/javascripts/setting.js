/* ---------- Global ---------- */

// Check Delete Option
function checkDelete() {
    return confirm('Are you really sure to delete this Data?');
}

/* ---------- Main PAGE ---------- */

/* ---------- CREATE PAGE ---------- */

// Check Validate Form in Create Page and Update Page
function validateForm() {
    let projectName = document.getElementById('searchForm').projectName.value;
    let sumLang = document.getElementById('searchForm').sumLang.value;
    let pjdate1 = document.getElementById('searchForm').pjdate1.value;
    let pjdate2 = document.getElementById('searchForm').pjdate2.value;
    let projectExplanation = document.getElementById('searchForm').projectExplanation.value;
    let projectUrl = document.getElementById('searchForm').projectUrl.value;
    // let githuburl = document.getElementById('searchForm').githuburl.value;
    // let imgData = document.getElementById('searchForm').projectImg.value;
    let portType=document.getElementById('searchForm').portType.value;

    if (projectName, sumLang, pjdate1, pjdate2, projectExplanation, projectUrl, portType === "") {
        alert('Some Fields are Empty!');
        return false;
    }
}